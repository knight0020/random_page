# ⚔️ Knight0020

A tiny corner of the internet: a static website packed with mini-games, silly toys, seven colorful themes, floating anime-style buddies, and **KnightOS**, a desktop operating system simulator that runs entirely in your browser.

No frameworks, no build step, no dependencies. Just HTML, CSS and vanilla JavaScript.

---

## ✨ Features

### 💻 KnightOS (desktop simulator)
Open it from the **💻 KnightOS** button in the navigation bar.

- Boot sequence and lock screen
- Draggable, resizable windows with minimize, maximize and close
- Taskbar with window buttons, start menu and clock
- Wallpaper that follows the active site theme
- Built-in apps:

| App | What it does |
|---|---|
| ⌨️ Terminal | A working shell with a virtual file system |
| 📁 Files | Browse folders and open files |
| 📝 Notepad | Write and save text files |
| 🧮 Calculator | Basic arithmetic |
| 🎨 Paint | Draw with a color picker and brush size |
| 🎹 Piano | Play with the mouse or the `A S D F G H J K` keys (Web Audio) |
| ⚙️ Settings | Change theme, toggle buddies, reset files |
| 🕹️ Arcade | Jump back to the games on the main page |

Files you create are stored in your browser's `localStorage`, so they survive a page refresh.

**Terminal commands**

```
help  ls  cd  pwd  cat  echo  mkdir  touch  rm  clear  date  whoami
neofetch  theme <name>  cowsay <text>  fortune  open <app>  exit
```

Try `theme neon`, or if you're feeling brave, `sudo rm -rf /`.

### 🎮 Games
- **Tic-Tac-Toe** against a minimax AI (with a small chance to blunder)
- **Memory Match**
- **Snake** with keyboard and on-screen controls
- **Whack-a-Mole**
- **Rock Paper Scissors**
- **Typing Speed** test (WPM)
- **Click Speed** test (clicks per second)
- **Reaction Test**, **Guess the Number**

### 🧰 Toys and tools
Coin Flip, Fortune Generator, Random Color, Magic 8-Ball, Dice Roller (d6 / d12 / d20 / d100), Knight Name Forge, Password Generator (uses `crypto.getRandomValues`), Bad Joke Machine, New Year Countdown, a quote generator, and a "Pointless Button".

### 🎨 Themes
Seven themes, switchable from the **🎨 Themes** menu or the **🎲 Random Theme** button:

`Midnight` · `Neon City` · `Sunset` · `Aurora` · `Lava` · `Candy` (light) · `Sunny` (light)

Themes are built from CSS custom properties, so the whole page (backgrounds, glow, stars, cards, KnightOS) restyles instantly. Your choice is saved between visits.

### 🌸 Anime buddies
Five hand-drawn SVG chibi characters float around the page with sakura petals drifting behind them. Click one and it talks to you and triggers confetti. Turn them off any time with the **🌸 On/Off** button in the nav bar or from KnightOS Settings. The preference is remembered.

### 🥚 Easter egg
Enter the Konami code: `↑ ↑ ↓ ↓ ← → ← → B A`

---

## 📁 Project structure

```
.
├── index.html     # Page markup, main styles, games, toys and theme logic
├── knightos.css   # Styles for KnightOS and the anime buddies
├── knightos.js    # KnightOS: windows, apps, terminal, virtual file system
├── buddies.js     # Floating anime characters and their on/off toggle
└── README.md
```

Keep all four site files in the same folder.

---

## 🚀 Getting started

**Run locally**

1. Clone or download the repository.
2. Open `index.html` in any modern browser. No server needed.

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
# then just open index.html
```

**Host on GitHub Pages**

1. Push the files to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and the `/ (root)` folder, then save.
4. Your site will be live at `https://<your-username>.github.io/<your-repo>/` after a minute or two.

---

## 🛠️ Customizing

**Add a theme**

1. In `index.html`, add a CSS block:

   ```css
   [data-theme=forest]{--bg:#06140a;--bg2:#0c2314;--card:rgba(12,40,22,.7);--text:#eaffef;--muted:#8fbf9f;--accent:#4ade80;--accent2:#facc15;--g1:#4ade80;--g2:#facc15;--g3:#22d3ee}
   ```

2. Add it to the `themes` array in the same file: `["forest","Forest","#4ade80","#facc15"]`.

For a light theme, also override `--soft`, `--hover`, `--nav`, `--border` and `--star` (see `candy` and `sunny`).

**Add a buddy**: edit the `cast` array in `buddies.js`. Each entry is `[hairColor, eyeColor, catEars(0|1), [phrases]]`.

**Add a KnightOS app**: add an entry to the `A` object in `knightos.js` with a title, icon, default size and an `mk(body, arg)` function that builds the app UI. It shows up on the desktop and in the start menu automatically.

---

## 💾 What gets stored in your browser

Everything lives in `localStorage` and never leaves your device.

| Key | Purpose |
|---|---|
| `knightTheme` | Selected theme |
| `knightBuddies` | Whether buddies are on or off |
| `knightClicks`, `knightVisits` | Site statistics |
| `bestReaction`, `snakeBest` | Personal bests |
| `kosfs` | KnightOS virtual file system |

---

## 🗺️ Roadmap

- [ ] More games: 2048, Minesweeper, Tetris, Flappy Knight, Breakout, Connect Four, word game
- [ ] Creative toys: Game of Life, pixel-art editor, particle playground
- [ ] XP, levels and achievements
- [ ] `Ctrl+K` command palette
- [ ] Sound effects with a mute toggle
- [ ] More KnightOS apps (task manager, browser, media player)

---

## 🌐 Browser support

Any modern browser (Chrome, Edge, Firefox, Safari). The themes rely on CSS `color-mix()`, so very old browsers won't render them correctly.

## 📄 License

Add a license of your choice (for example [MIT](https://choosealicense.com/licenses/mit/)) by creating a `LICENSE` file.

---

Made with ⚔️ using HTML, CSS and JavaScript.
