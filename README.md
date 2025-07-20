## Car Race HTML5 - Modern Racing Game

Car Race HTML5 adalah sebuah permainan balapan mobil modern berbasis web yang dibuat menggunakan **Vite**, **Tailwind CSS 4**, dan **JavaScript ES6+**. Game ini dirancang untuk dimainkan langsung di browser dengan teknologi web terdepan, serta mendukung Progressive Web App (PWA) sehingga dapat diakses secara offline setelah di-install di perangkat.

### 🚀 Teknologi Modern

- **Vite**: Build tool modern untuk development yang cepat dengan Hot Module Replacement (HMR)
- **Tailwind CSS 4**: Framework CSS utility-first terbaru untuk styling yang efisien
- **JavaScript ES6+**: Arsitektur modular dengan class-based components dan modern JavaScript patterns
- **PWA Support**: Progressive Web App dengan service worker dan manifest
- **Web Audio API**: Sistem audio modern untuk sound effects

### 🎮 Mode Permainan

#### 1. **Classic Race Mode** (Mode Balapan Klasik)
- **5 Pemain**: 1 pemain utama (Ando) dan 4 bot (Alex, Dono, Tejo, Jepri)
- **Auto Racing**: Semua mobil berlomba otomatis dengan kecepatan acak
- **Realistic Finish**: Balapan berhenti ketika mobil pertama mencapai garis finish
- **Progress Tracking**: Mobil lain berhenti sesuai posisi mereka (tidak semua 100%)

#### 2. **Challenger Mode** (Mode Tantangan) - *Coming Soon*
- **1vs1 Battle**: Ando (User) vs 1 komputer (dipilih acak)
- **Manual Control**: User mengontrol mobil Ando dengan menekan tombol gas
- **Speed Challenge**: Klik tombol gas secepat mungkin untuk mengalahkan komputer
- **Random Opponent**: Setiap game, komputer memilih mobil lawan secara acak

### ✨ Fitur Utama

- **Modern UI/UX**: Desain glassmorphism dengan gradient backgrounds yang menarik
- **Smooth Animations**: Animasi pergerakan mobil yang halus dan responsif
- **Real-time Notifications**: Sistem notifikasi interaktif dengan SweetAlert-style
- **Sound Effects**: Audio feedback menggunakan Web Audio API
- **Responsive Design**: Tampilan optimal di semua perangkat (mobile, tablet, desktop)
- **Score Board**: Papan skor real-time dengan hasil akhir yang detail
- **PWA Ready**: Dapat di-install dan dimainkan offline

### 🏗️ Arsitektur Modular

Proyek ini menggunakan arsitektur JavaScript ES6+ yang modular:

```
src/
├── js/
│   ├── core/
│   │   └── GameEngine.js      # Core game logic
│   ├── models/
│   │   ├── Player.js          # Player data model
│   │   └── RaceTrack.js       # Race track model
│   ├── ui/
│   │   ├── UIManager.js       # UI management
│   │   └── NotificationManager.js # Notification system
│   ├── audio/
│   │   └── SoundManager.js    # Audio system
│   └── utils/
│       └── EventEmitter.js    # Custom event system
├── style.css                  # Tailwind CSS styles
└── main.js                    # Application entry point
```

### 🎯 Kegunaan

Proyek ini cocok untuk:

- **Learning Modern Web Development**: Contoh implementasi Vite, Tailwind CSS 4, dan ES6+
- **PWA Case Study**: Studi kasus Progressive Web App pada game HTML5
- **Modular JavaScript Architecture**: Referensi arsitektur JavaScript yang scalable
- **Game Development**: Inspirasi pengembangan game berbasis web browser

### 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 🗺️ Roadmap Pengembangan

#### Phase 1: Core Improvements ✅
- ✅ Modernisasi dengan Vite + Tailwind CSS 4
- ✅ Arsitektur JavaScript ES6+ modular
- ✅ Realistic race logic (stop when first car finishes)
- ✅ Enhanced UI/UX dengan modern design

#### Phase 2: Challenger Mode 🚧
- 🚧 Mode 1vs1 dengan kontrol manual user
- 🚧 Speed clicking mechanism untuk kontrol gas
- 🚧 Random opponent selection
- 🚧 Enhanced sound effects untuk mode challenger

#### Phase 3: Advanced Features 📋
- 📋 **Mode Multiplayer Online**: Real-time racing dengan teman
- 📋 **Car Customization**: Pilih dan modifikasi mobil
- 📋 **Power-ups & Obstacles**: Item dan rintangan di lintasan
- 📋 **Tournament Mode**: Sistem turnamen dengan bracket
- 📋 **Leaderboard Global**: Skor tertinggi dari seluruh dunia

#### Phase 4: Enhanced Experience 📋
- 📋 **Advanced Physics**: Sistem fisika mobil yang lebih realistis
- 📋 **Multiple Tracks**: Berbagai lintasan dengan tema berbeda
- 📋 **Weather Effects**: Cuaca yang mempengaruhi gameplay
- 📋 **Achievement System**: Sistem pencapaian dan reward
- 📋 **Mobile Optimization**: Kontrol touch yang lebih baik

### 🎨 Design Philosophy

Game ini mengadopsi prinsip desain modern:
- **Apple-level Aesthetics**: Perhatian detail pada UI/UX
- **Micro-interactions**: Animasi halus untuk feedback user
- **Accessibility**: Desain yang mudah diakses semua user
- **Performance First**: Optimasi untuk performa terbaik

### 🤝 Kontribusi

Kontribusi, ide, dan masukan sangat terbuka untuk pengembangan lebih lanjut! 

**Cara berkontribusi:**
1. Fork repository ini
2. Buat branch untuk fitur baru (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

### 📝 Update Log

#### v2.0.0 - Modern Rewrite
- 🚀 **Complete modernization** dengan Vite, Tailwind CSS 4, dan ES6+
- 🏗️ **Modular architecture** dengan separation of concerns
- 🎨 **Modern UI/UX** dengan glassmorphism dan smooth animations
- 🏁 **Realistic race logic** - balapan berhenti saat ada pemenang
- 🔊 **Web Audio API** untuk sound effects
- 📱 **Enhanced PWA** dengan better caching strategy

#### v1.0.0 - Initial Release
- ✅ Basic HTML5 car racing game
- ✅ 5 player racing with random speeds
- ✅ Bootstrap UI framework
- ✅ Basic PWA support

---

**Author:** @dharma_situmorang  
**Tech Stack:** Vite + Tailwind CSS 4 + JavaScript ES6+ + PWA  
**License:** ISC