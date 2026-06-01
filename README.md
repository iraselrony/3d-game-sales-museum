# Global Game Sales Walkthrough

An interactive low-poly 3D data museum built with React, Vite, Three.js, React Three Fiber, Drei, Framer Motion, and Zustand. The walkthrough visualizes 12 ranked top-selling video games as explorable exhibits.

## Setup

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

## Dataset

The local dataset lives in `src/data/games.js`. Each record includes rank, title, estimated sales label, platform, release year, era, publisher, region/flag label, note, accent color, and placeholder cover metadata.

The ranking uses a single-title paid/pack-in sample policy. It intentionally avoids broad all-version aggregate totals such as every Tetris variant combined. Sales figures are rounded, presentation-oriented estimates cross-checked against public all-time sales references including HP Tech Takes, GameSpot, and Wikipedia.

## Feature Checklist

- Low-poly 3D museum with floor, walls, ambient light, spotlights, and neon accents.
- 12 exhibit stations with rank, title, sales, platform, era/year, publisher, region/flag, note, and stylized placeholder cover visuals.
- Click exhibits to select them.
- Right info panel updates from the selected exhibit.
- Previous and next exhibit controls.
- Jump-to-rank control with filtered-rank messaging.
- Platform, era, and region filters.
- Guided tour mode with animated camera transitions.
- Orbit controls for manual inspection.
- Camera movement constrained above the floor.
- Reset view button.
- Methodology and legend panel.
- Local-only data and generated placeholder cover cards.

## Verification

1. Run `npm install`.
2. Run `npm run dev`.
3. Confirm the browser loads without console errors.
4. Confirm all 12 exhibits are visible in the default view.
5. Click multiple exhibits and verify the camera and info panel update.
6. Test next, previous, jump-to-rank, and reset view.
7. Apply platform, era, and region filters and verify dimmed/active exhibit behavior.
8. Start guided tour and verify it advances through active filtered exhibits.
9. Optionally run:

```bash
npm run build
```

## Known Limitations

- Sales data is a local sample of rounded public estimates, not an audited commercial database.
- Cover art is generated placeholder design. Replace it only with licensed artwork or client-provided assets.
- The experience is optimized for desktop browsers. Smaller screens are protected from layout breakage but are not the primary target.
