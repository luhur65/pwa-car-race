import { Player } from '../models/Player.js';
import { RaceTrack } from '../models/RaceTrack.js';
import { EventEmitter } from '../utils/EventEmitter.js';

export class GameEngine extends EventEmitter {
  constructor() {
    super();
    this.gameMode = 'classic'; // 'classic' or 'challenger'
    this.players = [];
    this.raceTrack = null;
    this.isRacing = false;
    this.raceIntervals = new Map();
    this.raceResults = [];
    this.challengerOpponent = null;
  }

  init() {
    this.setupPlayers();
    this.raceTrack = new RaceTrack();
    console.log('🎮 Game Engine initialized');
  }

  setupPlayers() {
    const playerConfigs = [
      { id: 'player', name: 'Ando', color: 'bg-green-500', isHuman: true },
      { id: 'alex', name: 'Alex', color: 'bg-red-500', isHuman: false },
      { id: 'dono', name: 'Dono', color: 'bg-blue-500', isHuman: false },
      { id: 'tejo', name: 'Tejo', color: 'bg-yellow-500', isHuman: false },
      { id: 'jepri', name: 'Jepri', color: 'bg-purple-500', isHuman: false }
    ];

    this.players = playerConfigs.map(config => new Player(config));
  }

  setupChallengerMode() {
    // Setup 1vs1 mode: Ando vs random opponent
    const opponents = ['alex', 'dono', 'tejo', 'jepri'];
    const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
    
    const opponentConfig = {
      'alex': { id: 'alex', name: 'Alex', color: 'bg-red-500', isHuman: false },
      'dono': { id: 'dono', name: 'Dono', color: 'bg-blue-500', isHuman: false },
      'tejo': { id: 'tejo', name: 'Tejo', color: 'bg-yellow-500', isHuman: false },
      'jepri': { id: 'jepri', name: 'Jepri', color: 'bg-purple-500', isHuman: false }
    };

    this.players = [
      new Player({ id: 'player', name: 'Ando', color: 'bg-green-500', isHuman: true }),
      new Player(opponentConfig[randomOpponent])
    ];
    
    this.challengerOpponent = randomOpponent;
  }

  setGameMode(mode) {
    this.gameMode = mode;
    if (mode === 'challenger') {
      this.setupChallengerMode();
    } else {
      this.setupPlayers();
    }
    this.emit('gameModeChanged', { mode, players: this.players });
  }

  startRace() {
    if (this.isRacing) return;

    this.isRacing = true;
    this.raceResults = [];
    this.emit('raceStarted');

    // Reset all players
    this.players.forEach(player => {
      player.reset();
      if (this.gameMode === 'challenger' && player.isHuman) {
        // Human player in challenger mode - controlled manually
        // Don't start automatic movement
      } else {
        this.startPlayerRace(player);
      }
    });

    console.log(`🏁 ${this.gameMode} race started!`);
  }

  // Method for challenger mode - user clicks gas button
  acceleratePlayer() {
    if (this.gameMode !== 'challenger' || !this.isRacing) return;
    
    const player = this.players.find(p => p.isHuman);
    if (!player || player.isFinished()) return;

    // Increase progress by small amount each click
    const acceleration = Math.random() * 3 + 1; // 1-4% per click
    player.updateProgress(Math.min(player.progress + acceleration, 100));
    
    this.emit('playerProgress', { player, progress: player.progress });

    if (player.progress >= 100) {
      this.handlePlayerFinish(player);
    }
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
    if (!this.raceResults.find(result => result.id === player.id) && this.isRacing) {
      const position = this.raceResults.length + 1;
      player.position = position;
      player.finishTime = Date.now();
      this.raceResults.push(player);

      this.emit('playerFinished', { player, position });

      // Stop race immediately when first player finishes
      if (position === 1) {
        this.stopAllOtherPlayers();
        this.endRace();
      }
    }
  }

  stopAllOtherPlayers() {
    // Clear all intervals to stop other players
    this.raceIntervals.forEach(interval => clearInterval(interval));
    this.raceIntervals.clear();
    
    // Add remaining players to results with their current progress
    this.players.forEach(player => {
      if (!this.raceResults.find(result => result.id === player.id)) {
        const position = this.raceResults.length + 1;
        player.position = position;
        player.finishTime = Date.now();
        this.raceResults.push(player);
      }
    });
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

  getGameMode() {
    return this.gameMode;
  }

  getChallengerOpponent() {
    return this.challengerOpponent;
  }

  getPlayers() {
    return this.players;
  }

  getRaceResults() {
    return this.raceResults;
  }
}