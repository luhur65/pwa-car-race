export class RaceTrack {
  constructor() {
    this.length = 100; // 100% completion
    this.lanes = 5;
    this.finishLine = 100;
  }

  calculatePosition(progress) {
    return Math.min(progress, this.finishLine);
  }

  isFinished(progress) {
    return progress >= this.finishLine;
  }

  getTrackWidth() {
    return 100; // percentage
  }
}