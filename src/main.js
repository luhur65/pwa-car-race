import './style.css';
import { GameEngine } from './js/core/GameEngine.js';
import { UIManager } from './js/ui/UIManager.js';
import { SoundManager } from './js/audio/SoundManager.js';

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const gameEngine = new GameEngine();
  const uiManager = new UIManager();
  const soundManager = new SoundManager();
  
  // Initialize game components
  gameEngine.init();
  uiManager.init(gameEngine);
  soundManager.init();
  
  // Start the application
  console.log('🏁 Car Race Game initialized successfully!');
});