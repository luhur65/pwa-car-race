export class Player {
  constructor({ id, name, color, isHuman = false }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.isHuman = isHuman;
    this.progress = 0;
    this.speed = 0;
    this.position = null;
  }

  updateProgress(newProgress) {
    this.progress = Math.min(newProgress, 100);
  }

  reset() {
    this.progress = 0;
    this.speed = 0;
    this.position = null;
  }

  isFinished() {
    return this.progress >= 100;
  }

  getCarImagePath() {
    return `./img/car/${this.id === 'player' ? 'ando' : this.id}.png`;
  }

  getInfoImagePath() {
    return `./img/info/${this.id === 'player' ? 'ando' : this.id}_info.png`;
  }

  getBadgeClass() {
    const badgeClasses = {
      'player': 'bg-green-500 text-white',
      'alex': 'bg-red-500 text-white',
      'dono': 'bg-blue-500 text-white',
      'tejo': 'bg-yellow-500 text-black',
      'jepri': 'bg-purple-500 text-white'
    };
    
    return badgeClasses[this.id] || 'bg-gray-500 text-white';
  }
}