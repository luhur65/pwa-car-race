import { NotificationManager } from './NotificationManager.js';

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
      raceContainer: document.querySelector('#race-container'),
      scoreBoard: document.querySelector('#score-board'),
      scoreList: document.querySelector('#score-list')
    };
  }

  setupEventListeners() {
    // Game engine events
    this.gameEngine.on('raceStarted', () => this.onRaceStarted());
    this.gameEngine.on('playerProgress', (data) => this.onPlayerProgress(data));
    this.gameEngine.on('playerFinished', (data) => this.onPlayerFinished(data));
    this.gameEngine.on('raceFinished', (data) => this.onRaceFinished(data));
    this.gameEngine.on('raceReset', () => this.onRaceReset());

    // UI events
    this.elements.startButton?.addEventListener('click', () => this.startRace());
    this.elements.resetButton?.addEventListener('click', () => this.resetRace());
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
        <div class="player-badge ${player.getBadgeClass()}" title="${player.name}">
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
    
    this.showScoreBoard(results);
    this.showWinnerNotification(winner);
  }

  onRaceReset() {
    this.elements.startButton.disabled = false;
    this.elements.startButton.innerHTML = 'Start Race';
    this.elements.resetButton.style.display = 'none';
    
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
    const message = isPlayerWinner 
      ? `🎉 Congratulations! You won the race!`
      : `😔 ${winner.name} won the race. Better luck next time!`;
    
    this.notificationManager.show({
      title: isPlayerWinner ? 'Victory!' : 'Race Finished',
      message,
      type: isPlayerWinner ? 'success' : 'info',
      duration: 5000
    });
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