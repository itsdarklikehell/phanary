# Phanary

> **Note:** Phanary has been replaced by [TurboBard](https://github.com/bencodrington/turbo-bard) ([Live site](http://turbobard.com/)). This repository is kept for reference.

Phanary is a lightning-fast fantasy RPG audio solution. Running completely in-browser, it's a free app for desktop and mobile that excels at finding and playing atmospheric music and sound effects for games like D&D and Pathfinder.

## Features

- **Atmospheres**: Intuitively group sounds and music into soundscapes, then fade between them with the click of a button
- **One-shots**: Manually fire a cinematic suspense tone after a plot twist, or set the sound of pouring ale to play every 15 to 30 seconds
- **Auto-play**: With results that update as-you-type, assemble and play a convincing soundscape in seconds
- **Customization**: Change one-shots frequencies, tweak track volumes, rename atmospheres, and recreate specific settings from your campaign through rich sound layering
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **PWA Support**: Install as a Progressive Web App for offline access
- **Export/Import**: Backup and restore your atmospheres, tracks, and one-shots as JSON files

## Screenshots

![Phanary Main Interface](screenshots/main.png)
![Phanary Search](screenshots/search.png)
![Phanary System](screenshots/system.png)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.0 or higher)
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/bencodrington/phanary.git
   cd phanary
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB:
   ```bash
   mongod
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:8080`

### Production Build

```bash
npm run build
npm start
```

## Usage

### Creating an Atmosphere

1. Type keywords in the search bar to find tracks and one-shots
2. Click on search results to add them to your atmosphere
3. Adjust volume levels for each track
4. Set one-shot frequencies (min/max index)
5. Save your atmosphere with a name and tags

### Playing Atmospheres

1. Click on an atmosphere card to start playing
2. Use the fade button to smoothly transition between atmospheres
3. Adjust master volume with the volume slider

### Exporting/Importing Data

1. Go to the System page (`/system`)
2. Login with admin credentials
3. Use the Export button to download all data as JSON
4. Use the Import button to restore from a backup file

### Dark Mode

- Click the moon/sun icon in the top-right corner to toggle dark mode
- The app respects your system preference by default
- Your preference is saved in localStorage

## PWA Installation

1. Open Phanary in Chrome or Edge
2. Click the install icon in the address bar
3. Follow the prompts to install
4. Launch from your home screen or app drawer

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

Copyright (c) 2017 [Ben Codrington](http://projectben.ch/)

The project code is licensed under the [3-Clause BSD License](LICENSE.md).
