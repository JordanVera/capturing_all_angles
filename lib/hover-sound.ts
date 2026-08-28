let ctx: AudioContext | null = null;
let last = 0;

function context() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new AudioCtx();
  }
  return ctx;
}

export function unlockHoverSound() {
  const audio = context();
  if (audio && audio.state === "suspended") {
    void audio.resume();
  }
}

export function playHoverSound() {
  const now = performance.now();
  if (now - last < 60) return;
  last = now;

  const audio = context();
  if (!audio) return;
  if (audio.state === "suspended") return;

  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(620, audio.currentTime);
  osc.frequency.exponentialRampToValueAtTime(360, audio.currentTime + 0.075);
  gain.gain.setValueAtTime(0.0001, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.032, audio.currentTime + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.075);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + 0.09);
}