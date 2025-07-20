import { NotificationManager } from './NotificationManager.js';
import confetti from 'canvas-confetti';

export class UIManager {
  constructor() {
    this.gameEngine = null;
    this.notificationManager = new NotificationManager();
    this.elements = {};
    this.titleAnimationInterval = null;
  }

  init(gameEngine) {
    this.gameEngine = gameEngine;
    this.setupElements();
    this.setupEventListeners();
    this.renderRaceTrack();
    this.startTitleAnimation();
    
    console.log('🎨 UI Manager initialized');
  }

  setupElements() {
    this.elements = {
      title: document.querySelector('#game-title'),
      startButton: document.querySelector('#start-race'),
      resetButton: document.querySelector('#reset-race'),
      modeToggle: document.querySelector('#mode-toggle'),
      gasButton: document.querySelector('#gas-button'),
      modeIndicator: document.querySelector('#mode-indicator'),
      raceContainer: document.querySelector('#race-container'),
      scoreBoard: document.querySelector('#score-board'),
      scoreList: document.querySelector('#score-list'),
      betSection: document.querySelector('#bet-section'),
      betSelect: document.querySelector('#bet-select'),
      betStatus: document.querySelector('#bet-status')
    };
  }

  setupEventListeners() {
    // Game engine events
    this.gameEngine.on('raceStarted', () => this.onRaceStarted());
    this.gameEngine.on('playerProgress', (data) => this.onPlayerProgress(data));
    this.gameEngine.on('playerFinished', (data) => this.onPlayerFinished(data));
    this.gameEngine.on('raceFinished', (data) => this.onRaceFinished(data));
    this.gameEngine.on('raceReset', () => this.onRaceReset());
    this.gameEngine.on('gameModeChanged', (data) => this.onGameModeChanged(data));

    // UI events
    this.elements.startButton?.addEventListener('click', () => this.startRace());
    this.elements.resetButton?.addEventListener('click', () => this.resetRace());
    this.elements.modeToggle?.addEventListener('click', () => this.toggleGameMode());
    this.elements.gasButton?.addEventListener('click', () => this.acceleratePlayer());
    this.elements.betSelect?.addEventListener('change', (e) => this.placeBet(e.target.value));
  }

  toggleGameMode() {
    const currentMode = this.gameEngine.getGameMode();
    const newMode = currentMode === 'classic' ? 'challenger' : 'classic';
    this.gameEngine.setGameMode(newMode);
  }

  acceleratePlayer() {
    this.gameEngine.acceleratePlayer();
  }

  onGameModeChanged({ mode, players }) {
    this.updateModeIndicator(mode);
    this.renderRaceTrack();
    this.updateGasButtonVisibility(mode);
    this.updateBetSectionVisibility(mode);
    this.populateBetOptions();
  }

  updateModeIndicator(mode) {
    if (this.elements.modeIndicator) {
      const modeText = mode === 'classic' ? 'Classic Race' : 'Challenger Mode';
      const modeIcon = mode === 'classic' ? '🏁' : '⚡';
      this.elements.modeIndicator.innerHTML = `${modeIcon} ${modeText}`;
    }
    
    if (this.elements.modeToggle) {
      const toggleText = mode === 'classic' ? 'Switch to Challenger' : 'Switch to Classic';
      this.elements.modeToggle.textContent = toggleText;
    }
  }

  updateGasButtonVisibility(mode) {
    if (this.elements.gasButton) {
      this.elements.gasButton.style.display = mode === 'challenger' ? 'inline-block' : 'none';
    }
  }

  updateBetSectionVisibility(mode) {
    if (this.elements.betSection) {
      this.elements.betSection.style.display = mode === 'classic' ? 'block' : 'none';
    }
  }

  populateBetOptions() {
    if (!this.elements.betSelect) return;
    
    const players = this.gameEngine.getPlayers();
    const options = ['<option value="">Choose your bet...</option>'];
    
    players.forEach(player => {
      options.push(`<option value="${player.id}">${player.name}</option>`);
    });
    
    this.elements.betSelect.innerHTML = options.join('');
  }

  placeBet(playerId) {
    if (!playerId) {
      this.updateBetStatus('');
      return;
    }
    
    const success = this.gameEngine.setBet(playerId);
    if (success) {
      const player = this.gameEngine.getPlayers().find(p => p.id === playerId);
      this.updateBetStatus(`🎯 You bet on: ${player.name}`);
    }
  }

  updateBetStatus(message) {
    if (this.elements.betStatus) {
      this.elements.betStatus.textContent = message;
    }
  }

  renderRaceTrack() {
    const players = this.gameEngine.getPlayers();
    const raceHTML = players.map(player => this.createPlayerTrackHTML(player)).join('');
    
    if (this.elements.raceContainer) {
      this.elements.raceContainer.innerHTML = raceHTML;
    }
  }

  createPlayerTrackHTML(player) {
    return `
      <div class="mb-4">
        <div class="player-badge ${player.getBadgeClass()}">
          <img src="${player.getCarImagePath()}" alt="${player.name}" class="w-5 h-5 rounded">
          <span>${player.name}</span>
        </div>
        <div class="car-container" id="track-${player.id}">
          <div class="progress-bar ${player.color.replace('bg-', 'bg-').replace('-500', '-200')}" 
               id="progress-${player.id}" style="width: 0%"></div>
          <div class="car" id="car-${player.id}">
            <img src="${player.getCarImagePath()}" alt="${player.name} car" draggable="false">
          </div>
          <div class="finish-line"></div>
        </div>
      </div>
    `;
  }

  onRaceStarted() {
    this.elements.startButton.disabled = true;
    this.elements.startButton.innerHTML = '<div class="loading"></div> Racing...';
    this.elements.resetButton.style.display = 'none';
    this.elements.modeToggle.disabled = true;
    if (this.elements.betSelect) {
      this.elements.betSelect.disabled = true;
    }
    this.hideScoreBoard();
  }

  onPlayerProgress({ player, progress }) {
    const progressBar = document.querySelector(`#progress-${player.id}`);
    const car = document.querySelector(`#car-${player.id}`);
    
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
    
    if (car) {
      const trackWidth = car.parentElement.offsetWidth - 40; // Subtract car width
      car.style.left = `${(progress / 100) * trackWidth}px`;
    }
  }

  onPlayerFinished({ player, position }) {
    const car = document.querySelector(`#car-${player.id}`);
    if (car) {
      car.classList.add('animate-bounce-slow');
    }
  }

  onRaceFinished({ winner, results }) {
    this.elements.startButton.disabled = false;
    this.elements.startButton.innerHTML = 'Start Race';
    this.elements.resetButton.style.display = 'inline-block';
    this.elements.modeToggle.disabled = false;
    if (this.elements.betSelect) {
      this.elements.betSelect.disabled = false;
    }
    
    this.showScoreBoard(results);
    this.showWinnerNotification(winner);
    this.checkBetResult(winner);
  }

  onRaceReset() {
    this.elements.startButton.disabled = false;
    this.elements.startButton.innerHTML = 'Start Race';
    this.elements.resetButton.style.display = 'none';
    this.elements.modeToggle.disabled = false;
    if (this.elements.betSelect) {
      this.elements.betSelect.disabled = false;
      this.elements.betSelect.value = '';
    }
    this.updateBetStatus('');
    
    this.hideScoreBoard();
    this.resetCarPositions();
  }

  showScoreBoard(results) {
    if (!this.elements.scoreBoard || !this.elements.scoreList) return;

    const scoreHTML = results.map((player, index) => `
      <div class="score-item ${index === 0 ? 'winner' : ''}">
        <img src="${player.getInfoImagePath()}" alt="${player.name}" class="w-8 h-8 rounded">
        <div class="flex-1">
          <span class="font-semibold">${player.name}</span>
          <span class="ml-2 text-sm opacity-75">Position: ${player.position}</span>
        </div>
        <div class="text-right">
          <span class="font-bold">${player.progress.toFixed(1)}%</span>
        </div>
      </div>
    `).join('');

    this.elements.scoreList.innerHTML = scoreHTML;
    this.elements.scoreBoard.classList.remove('hidden');
  }

  hideScoreBoard() {
    if (this.elements.scoreBoard) {
      this.elements.scoreBoard.classList.add('hidden');
    }
  }

  resetCarPositions() {
    const players = this.gameEngine.getPlayers();
    
    players.forEach(player => {
      const progressBar = document.querySelector(`#progress-${player.id}`);
      const car = document.querySelector(`#car-${player.id}`);
      
      if (progressBar) {
        progressBar.style.width = '0%';
      }
      
      if (car) {
        car.style.left = '0px';
        car.classList.remove('animate-bounce-slow');
      }
    });
  }

  showWinnerNotification(winner) {
    const isPlayerWinner = winner.isHuman;
    const gameMode = this.gameEngine.getGameMode();
    
    let message;
    if (gameMode === 'challenger') {
      message = isPlayerWinner 
        ? `🎉 Excellent! You defeated ${this.gameEngine.getChallengerOpponent()}!`
        : `😔 ${winner.name} won the challenge. Try clicking faster next time!`;
    } else {
      message = isPlayerWinner 
        ? `🎉 Congratulations! Ando won the race!`
        : `😔 ${winner.name} won the race. Better luck next time!`;
    }
    
    this.notificationManager.show({
      title: isPlayerWinner ? 'Victory!' : (gameMode === 'challenger' ? 'Challenge Failed' : 'Race Finished'),
      message,
      type: isPlayerWinner ? 'success' : 'info',
      duration: 5000
    });
  }

  checkBetResult(winner) {
    const gameMode = this.gameEngine.getGameMode();
    if (gameMode !== 'classic') return;
    
    const betResult = this.gameEngine.checkBetResult(winner);
    if (betResult === true) {
      this.showConfetti();
      this.notificationManager.show({
        title: '🎉 Bet Won!',
        message: `Congratulations! You correctly bet on ${winner.name}!`,
        type: 'success',
        duration: 5000
      });
    } else if (betResult === false) {
      const playerBet = this.gameEngine.getPlayerBet();
      const betPlayer = this.gameEngine.getPlayers().find(p => p.id === playerBet);
      this.notificationManager.show({
        title: '😔 Bet Lost',
        message: `You bet on ${betPlayer.name}, but ${winner.name} won the race.`,
        type: 'warning',
        duration: 4000
      });
    }
  }

  showConfetti() {
    // Create multiple confetti bursts
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  startRace() {
    this.gameEngine.startRace();
  }

  resetRace() {
    this.gameEngine.resetRace();
  }

  startTitleAnimation() {
    const titles = [
      'Car Racing', 'Speed Masters', 'Racing Champions', 
      'Fast & Furious', 'Road Warriors', 'Turbo Race'
    ];
    
    let currentIndex = 0;
    
    this.titleAnimationInterval = setInterval(() => {
      if (this.elements.title) {
        this.elements.title.textContent = titles[currentIndex];
        currentIndex = (currentIndex + 1) % titles.length;
      }
    }, 2000);
  }

  destroy() {
    if (this.titleAnimationInterval) {
      clearInterval(this.titleAnimationInterval);
    }
  }
}