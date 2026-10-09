/**
 * Procedural Web Audio Room Texture Engine
 * Generates real-time, organic room ambiance (vinyl crackle, hearth fire, rain, or warm room tone)
 * using the browser's native Web Audio API with zero external assets.
 */

export interface RoomTextureController {
  stop: () => void;
  vibeName: string;
}

export function startRoomTexture(themeOrPrompt: string): RoomTextureController {
  const AudioContextClass =
    window.AudioContext ||
    // @ts-expect-error fallback for webkitAudioContext
    window.webkitAudioContext;

  if (!AudioContextClass) {
    throw new Error('Web Audio API is not supported in this browser.');
  }

  const ctx = new AudioContextClass();
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
  masterGain.connect(ctx.destination);

  // Smoothly fade in master volume over 800ms
  masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.8);

  const lower = (themeOrPrompt || '').toLowerCase();
  let vibeName = 'Warm Analog Room Resonance';

  if (lower.includes('rain') || lower.includes('tokyo') || lower.includes('wet') || lower.includes('noir')) {
    vibeName = 'Rain on Glass & Sub-Bass Atmosphere';
    createRainTexture(ctx, masterGain);
  } else if (lower.includes('hearth') || lower.includes('fire') || lower.includes('cabin') || lower.includes('nordic')) {
    vibeName = 'Hearth Ember Crackle & Wind Breath';
    createHearthTexture(ctx, masterGain);
  } else {
    vibeName = 'Turntable Vinyl Crackle & Tube Warmth';
    createVinylTexture(ctx, masterGain);
  }

  const stop = () => {
    try {
      const now = ctx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(masterGain.gain.value, now);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 450);
    } catch {
      // ignore teardown error
    }
  };

  return { stop, vibeName };
}

/**
 * Creates authentic turntable vinyl crackle using procedural impulse noise and tube hum.
 */
function createVinylTexture(ctx: AudioContext, destination: AudioNode) {
  const bufferSize = ctx.sampleRate * 3; // 3 seconds loop
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Surface hiss + Poisson vinyl crackle impulses
  for (let i = 0; i < bufferSize; i++) {
    const isPop = Math.random() < 0.0008;
    const isCrackle = Math.random() < 0.004;

    if (isPop) {
      // Loud vinyl pop
      data[i] = (Math.random() * 2 - 1) * 0.7;
    } else if (isCrackle) {
      // Subtle micro crackle
      data[i] = (Math.random() * 2 - 1) * 0.25;
    } else {
      // Very faint background surface friction (pink noise approximation)
      data[i] = (Math.random() * 2 - 1) * 0.02;
    }
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;
  noiseSource.loop = true;

  // Bandpass filter to shape vinyl texture
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 2400;
  bandpass.Q.value = 0.8;

  const vinylGain = ctx.createGain();
  vinylGain.gain.value = 0.45;

  noiseSource.connect(bandpass);
  bandpass.connect(vinylGain);
  vinylGain.connect(destination);
  noiseSource.start();

  // Subtle 60Hz vacuum tube warmth hum
  const humOsc = ctx.createOscillator();
  humOsc.type = 'sine';
  humOsc.frequency.value = 55; // A1 low warm tone

  const humGain = ctx.createGain();
  humGain.gain.value = 0.025;

  humOsc.connect(humGain);
  humGain.connect(destination);
  humOsc.start();
}

/**
 * Creates soft rain drops and low nocturnal drone.
 */
function createRainTexture(ctx: AudioContext, destination: AudioNode) {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  let lastOut = 0.0;
  // Brownian rain noise
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = data[i];
    // Occasional raindrop ping
    if (Math.random() < 0.0003) {
      data[i] += (Math.random() * 2 - 1) * 0.3;
    }
  }

  const rainSource = ctx.createBufferSource();
  rainSource.buffer = buffer;
  rainSource.loop = true;

  const rainFilter = ctx.createBiquadFilter();
  rainFilter.type = 'lowpass';
  rainFilter.frequency.value = 1100;

  const rainGain = ctx.createGain();
  rainGain.gain.value = 0.5;

  rainSource.connect(rainFilter);
  rainFilter.connect(rainGain);
  rainGain.connect(destination);
  rainSource.start();

  // Low nocturnal drone
  const drone = ctx.createOscillator();
  drone.type = 'triangle';
  drone.frequency.value = 48;

  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.035;

  drone.connect(droneGain);
  droneGain.connect(destination);
  drone.start();
}

/**
 * Creates cozy hearth fire crackle and soft fireplace rumble.
 */
function createHearthTexture(ctx: AudioContext, destination: AudioNode) {
  const bufferSize = ctx.sampleRate * 3;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Fire crackle & ember bursts
  for (let i = 0; i < bufferSize; i++) {
    const isEmber = Math.random() < 0.0012;
    if (isEmber) {
      data[i] = (Math.random() * 2 - 1) * 0.55;
    } else {
      data[i] = (Math.random() * 2 - 1) * 0.015;
    }
  }

  const fireSource = ctx.createBufferSource();
  fireSource.buffer = buffer;
  fireSource.loop = true;

  const fireFilter = ctx.createBiquadFilter();
  fireFilter.type = 'highpass';
  fireFilter.frequency.value = 600;

  const fireGain = ctx.createGain();
  fireGain.gain.value = 0.55;

  fireSource.connect(fireFilter);
  fireFilter.connect(fireGain);
  fireGain.connect(destination);
  fireSource.start();

  // Hearth warmth low rumble
  const rumble = ctx.createOscillator();
  rumble.type = 'sine';
  rumble.frequency.value = 65;

  const rumbleGain = ctx.createGain();
  rumbleGain.gain.value = 0.03;

  rumble.connect(rumbleGain);
  rumbleGain.connect(destination);
  rumble.start();
}
