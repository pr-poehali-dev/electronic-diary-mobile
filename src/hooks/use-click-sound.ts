import { useCallback, useRef } from 'react';

const playLegoClick = (ctx: AudioContext) => {
  const now = ctx.currentTime;

  // Short plastic "click" — characteristic Lego snap
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.type = 'square';
  osc1.frequency.setValueAtTime(1200, now);
  osc1.frequency.exponentialRampToValueAtTime(400, now + 0.04);
  gain1.gain.setValueAtTime(0.18, now);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
  osc1.start(now);
  osc1.stop(now + 0.06);

  // Soft "thud" layer for the plastic feel
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  osc2.connect(filter);
  filter.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(220, now);
  osc2.frequency.exponentialRampToValueAtTime(80, now + 0.05);
  filter.type = 'lowpass';
  filter.frequency.value = 600;
  gain2.gain.setValueAtTime(0.22, now);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
  osc2.start(now);
  osc2.stop(now + 0.07);
};

export const useClickSound = () => {
  const ctxRef = useRef<AudioContext | null>(null);

  const play = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    playLegoClick(ctx);
  }, []);

  return play;
};

export default useClickSound;
