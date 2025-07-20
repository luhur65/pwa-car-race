import { Player } from '../models/Player.js';
import { RaceTrack } from '../models/RaceTrack.js';
import { EventEmitter } from '../utils/EventEmitter.js';

export class GameEngine extends EventEmitter {
  constructor() {
    super();
    this.players = [];
    this.raceTrack = null;
    this.isRacing = false;
    this.raceIntervals = new Map();
    this.raceResults = [];
  }

  init() {
    this.setupPlayers();
    this.raceTrack = new RaceTrack();
    console.log('🎮 Game Engine initialized');
  }

  setupPlayers() {
    const playerConfigs = [
      { id: 'player', name: 'Kamu', color: 'bg-green-500', isHuman: true },
      { id: 'alex', name: 'Alex', color: 'bg-red-500', isHuman: false },
      { id: 'dono', name: 'Dono', color: 'bg-blue-500', isHuman: false },
      { id: 'tejo', name: 'Tejo', color: 'bg-yellow-500', isHuman: false },
      { id: 'jepri', name: 'Jepri', color: 'bg-purple-500', isHuman: false }
    ];

    this.players = playerConfigs.map(config => new Player(config));
  }

  startRace() {
    if (this.isRacing) return;

    this.isRacing = true;
    this.raceResults = [];
    this.emit('raceStarted');

    // Reset all players
    this.players.forEach(player => {
      player.reset();
      this.startPlayerRace(player);
    });

    console.log('🏁 Race started!');
  }

  startPlayerRace(player) {
    const speed = this.generateRandomSpeed();
    let progress = 0;

    const interval = setInterval(() => {
      if (!this.isRacing) {
        clearInterval(interval);
        return;
      }

      progress += Math.random() * 2; // Random progress increment
      player.updateProgress(Math.min(progress, 100));

      this.emit('playerProgress', { player, progress: player.progress });

      if (player.progress >= 100) {
        clearInterval(interval);
        this.handlePlayerFinish(player);
      }
    }, speed);

    this.raceIntervals.set(player.id, interval);
  }

  generateRandomSpeed() {
    return Math.random() * 50 + 20; // Speed between 20-70ms
  }

  handlePlayerFinish(player) {
    if (!this.raceResults.find(result => result.id === player.id)) {
      const position = this.raceResults.length + 1;
      this.raceResults.push({
        ...player,
        position,
        finishTime: Date.now()
      });

      this.emit('playerFinished', { player, position });

      if (this.raceResults.length === this.players.length) {
        this.endRace();
      }
    }
  }

  endRace() {
    this.isRacing = false;
    
    // Clear all intervals
    this.raceIntervals.forEach(interval => clearInterval(interval));
    this.raceIntervals.clear();

    const winner = this.raceResults[0];
    this.emit('raceFinished', { winner, results: this.raceResults });

    console.log('🏆 Race finished!', this.raceResults);
  }

  resetRace() {
    this.isRacing = false;
    this.raceResults = [];
    
    // Clear all intervals
    this.raceIntervals.forEach(interval => clearInterval(interval));
    this.raceIntervals.clear();

    // Reset all players
    this.players.forEach(player => player.reset());
    
    this.emit('raceReset');
    console.log('🔄 Race reset');
  }

  getPlayers() {
    return this.players;
  }

  getRaceResults() {
    return this.raceResults;
  }
}