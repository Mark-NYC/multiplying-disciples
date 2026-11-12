# Substack Notes free-tier publishing queue

**Status:** scaffold deployed, publishing DISABLED until Buffer credentials and reconciliation. Do not populate with historical drafts blindly.

- Queue: `queue.json` on the repository default branch, authoritative source for approved future Notes.
- Worker: `refill/index.ts`, deployed as Supabase Edge Function `substack-notes-refill` in currently connected Supabase project.
- Existing OMC database tables and functions were not changed. No cron job was installed.
- Secret requirements in Supabase Edge Function secrets: `BUFFER_API_KEY`, `BUFFER_ORG_ID`, `BUFFER_SUBSTACK_CHANNEL_ID`, `SUBSTACK_REFILL_SECRET`.
- Call worker with POST and header `x-refill-secret: <SUBSTACK_REFILL_SECRET>`. Never store secrets in GitHub, project notes or chat.
- The endpoint rejects requests unless `SUBSTACK_REFILL_SECRET` is configured and matches.
- Create a single Supabase Cron job to invoke this endpoint at 10 minutes past each hour, with the authorization secret stored in Supabase Vault. Do this only after a tested one-Note scheduling dry run and a Buffer scheduled/sent reconciliation.
- Never allow overlapping worker executions. The present implementation expects a single serialized scheduler and is not suitable for concurrent manual triggers.
- Buffer Free supports 10 scheduled posts per channel. The function fetches scheduled and sent histories and deduplicates approved Notes by normalized text, checks occupied dueAt times, and fills free slots with `customScheduled` Buffer API mutations.
- The queue is empty intentionally; do not populate until existing Substack and Buffer schedules are reconciled.
- Each queue record must have a stable `id`, exact `text`, ISO-8601 UTC `dueAt`, and `status` one of `draft`, `hold`, `approved`.
- Keep all content strategy, style constraints, and repetition checks in the existing Substack Notes ChatGPT project. This queue is delivery infrastructure only.

## Before enabling

1. Connect the Substack Notes channel to Buffer Free.
2. Generate one personal Buffer API key under Buffer Settings > API, enter it **directly** in Supabase Edge Function secrets.
3. Retrieve organization/channel IDs from Buffer API with the key, enter those IDs in Supabase secrets.
4. Set a high-entropy `SUBSTACK_REFILL_SECRET` in Supabase and Vault; never send it in chat.
5. Reconcile Buffer scheduled/sent plus native Substack scheduled Notes. Add only new, approved future Notes.
6. Test a single safely dated Note and verify it appears correctly in Buffer. Confirm it eventually publishes successfully before enabling recurring cron.
7. Only then create the recurring Cron job. Monitor logs and Buffer errors. Stop automatically on API failures.

**Not yet verified:** live Buffer credentials, API schema compatibility, successful creation, native Substack schedule reconciliation, and actual publication.
