export class SoundManager {
  constructor() {
    this.sounds = new Map();
    this.enabled = true;
    this.volume = 0.5;
  }

  init() {
    // For now, we'll use Web Audio API for simple sound effects
    // In the future, we can add actual sound files
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    console.log('🔊 Sound Manager initialized');
  }

  playStartSound() {
    if (!this.enabled) return;
    this.playBeep(800, 200); // High beep for start
  }

  playFinishSound() {
    if (!this.enabled) return;
    this.playBeep(400, 500); // Lower beep for finish
  }

  playWinSound() {
    if (!this.enabled) return;
    // Play a victory melody
    setTimeout(() => this.playBeep(523, 200), 0);   // C
    setTimeout(() => this.playBeep(659, 200), 200); // E
    setTimeout(() => this.playBeep(784, 400), 400); // G
  }

  playLoseSound() {
    if (!this.enabled) return;
    // Play a descending tone
    setTimeout(() => this.playBeep(400, 200), 0);
    setTimeout(() => this.playBeep(350, 200), 200);
    setTimeout(() => this.playBeep(300, 400), 400);
  }

  playBeep(frequency, duration) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration / 1000);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}