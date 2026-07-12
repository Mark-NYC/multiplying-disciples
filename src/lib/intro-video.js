// Click-to-play wiring for HomeIntroVideo.astro. The <video> element and
// its source are only created once a visitor clicks the poster's play
// button, so the MP4 is never requested on initial page load. GA4 events
// use the same window.dataLayer push pattern as ecosystem-tracking.js and
// labs-feed.js.
function pushVideoEvent(eventName) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    source_page: window.location.pathname,
  });
}

// Enters fullscreen video playback immediately on click. Standard
// Fullscreen API covers desktop + Android Chrome; iOS Safari has no
// requestFullscreen on <video> and needs its own webkit API instead.
function enterFullscreen(video) {
  if (video.requestFullscreen) {
    video.requestFullscreen().catch(() => {});
  } else if (video.webkitEnterFullscreen) {
    video.webkitEnterFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

export function initHomeIntroVideos() {
  document.querySelectorAll('[data-intro-video]').forEach((frame) => {
    const trigger = frame.querySelector('[data-intro-video-trigger]');
    const src = frame.dataset.videoSrc;
    if (!trigger || !src) return;

    const startPlayback = () => {
      const video = document.createElement('video');
      video.className = 'intro-video-frame__player';
      video.controls = true;
      video.playsInline = true;
      video.loop = false;
      video.preload = 'none';
      video.setAttribute('src', src);

      const firedPercents = new Set();
      const milestones = [25, 50, 75];

      video.addEventListener('play', () => {
        firedPercents.clear();
        pushVideoEvent('homepage_video_play');
      });

      video.addEventListener('timeupdate', () => {
        if (!video.duration) return;
        const percent = (video.currentTime / video.duration) * 100;
        for (const milestone of milestones) {
          if (percent >= milestone && !firedPercents.has(milestone)) {
            firedPercents.add(milestone);
            pushVideoEvent(`homepage_video_${milestone}_percent`);
          }
        }
      });

      video.addEventListener('ended', () => {
        pushVideoEvent('homepage_video_complete');
      });

      frame.replaceChildren(video);
      video.play();
      enterFullscreen(video);
    };

    trigger.addEventListener('click', startPlayback);
  });
}
