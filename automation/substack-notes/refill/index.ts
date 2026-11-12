// Substack Notes queue refiller. Deliberately fail-closed until Buffer credentials exist.
// Source: automation/substack-notes/queue.json on the repository's default branch.
const SOURCE = "https://raw.githubusercontent.com/Mark-NYC/multiplying-disciples/claude/multiply-disciples-astro-migration-c04n1x/automation/substack-notes/queue.json";
const API = "https://api.buffer.com";
const textKey = (s: string) => s.trim().replace(/\\s+/g, " ").toLowerCase();
type Note = { id: string; text: string; dueAt: string; status: "approved" | "draft" | "hold" };
async function graphql(key: string, query: string, variables?: Record<string, unknown>) {
  const response = await fetch(API, { method:"POST", headers: {"Authorization": `Bearer ${key}`, "Content-Type":"application/json"}, body: JSON.stringify({query, variables}) });
  if (!response.ok) throw new Error(`Buffer HTTP ${response.status}`);
  const data = await response.json();
  if (data.errors?.length) throw new Error(`Buffer GraphQL: ${JSON.stringify(data.errors)}`);
  return data.data;
}
async function listPosts(key: string, org: string, channel: string, status: string) {
  const entries: {id:string;text:string;dueAt:string}[] = [];
  let after: string | null = null;
  for (let i=0;i<10;i++) {
    const query = `query {
      posts(first: 50, ${after ? `after: ${JSON.stringify(after)},` : ""} input:{organizationId:${JSON.stringify(org)}, filter:{status:[${status}], channelIds:[${JSON.stringify(channel)}]}}) {
        edges { node {id text dueAt} }
        pageInfo {hasNextPage endCursor}
      }
    }`;
    const data = await graphql(key,query);
    const page = data.posts;
    entries.push(...page.edges.map((e: {node:any})=>e.node));
    if (!page.pageInfo.hasNextPage) return entries;
    after = page.pageInfo.endCursor;
    if (!after) throw new Error("Missing pagination cursor");
  }
  throw new Error("History too large for safe deduplication; stopping without writes");
}
Deno.serve(async (request: Request) => {
  try {
    if (request.method !== "POST") return new Response("POST required",{status:405});
    const secret = Deno.env.get("SUBSTACK_REFILL_SECRET");
    if (!secret || request.headers.get("x-refill-secret") !== secret) return new Response("Unauthorized",{status:401});
    const key = Deno.env.get("BUFFER_API_KEY");
    const org = Deno.env.get("BUFFER_ORG_ID");
    const channel = Deno.env.get("BUFFER_SUBSTACK_CHANNEL_ID");
    if (!key || !org || !channel) return Response.json({ready:false,reason:"Missing Buffer configuration"},{status:503});
    const raw = await fetch(SOURCE,{headers:{"Cache-Control":"no-cache"}});
    if (!raw.ok) throw new Error(`GitHub queue unavailable (${raw.status})`);
    const queue = await raw.json();
    if (queue.version!==1 || !Array.isArray(queue.notes)) throw new Error("Invalid queue schema");
    const notes = queue.notes as Note[];
    if (notes.some(n=>!n.id || !n.text || !n.dueAt || !["approved","draft","hold"].includes(n.status))) throw new Error("Invalid queue record");
    if (new Set(notes.map(n=>n.id)).size!==notes.length || new Set(notes.map(n=>textKey(n.text))).size!==notes.length) throw new Error("Duplicate queue IDs or texts");
    const scheduled = await listPosts(key,org,channel,"scheduled");
    const sent = await listPosts(key,org,channel,"sent");
    // Match both scheduled and sent text before any creation. Avoid unverified future modifications.
    const existing = new Set([...scheduled,...sent].map(p=>textKey(p.text || "")));
    const reserved = new Set(scheduled.map(p=>p.dueAt).filter(Boolean));
    const available = Math.max(0,10-scheduled.length);
    const now = Date.now();
    const candidates = notes.filter(n=>n.status==="approved" && Date.parse(n.dueAt)>now+5*60_000)
      .sort((a,b)=>Date.parse(a.dueAt)-Date.parse(b.dueAt))
      .filter(n=>!existing.has(textKey(n.text)) && !reserved.has(n.dueAt));
    // Simultaneous executions must be prevented at scheduler level; otherwise two runs can race.
    const created: {id:string;bufferId:string;dueAt:string}[]=[];
    for (const note of candidates.slice(0,available)) {
      const query = `mutation($input: CreatePostInput!) {
        createPost(input:$input) {
          ... on PostActionSuccess { post {id text dueAt} }
          ... on MutationError {message}
        }
      }`;
      const response = await graphql(key,query);
      if (!response.createPost?.post?.id) throw new Error(`Buffer rejected ${note.id}: ${JSON.stringify(response.createPost)}`);
      created.push({id:note.id,bufferId:response.createPost.post.id,dueAt:note.dueAt});
    }
    return Response.json({ready:true,scheduled:scheduled.length,created,remainingApproved:candidates.length-created.length});
  } catch (error) {
    return Response.json({error:String(error)},{status:500});
  }
});
