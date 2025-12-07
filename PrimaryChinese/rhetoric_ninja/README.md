# 修辭忍者 (Rhetoric Ninja)

A Fruit Ninja-style game built with React and Canvas API. Slice scrolls containing rhetorical devices (metaphors) while avoiding bombs!

## Features

- 🎯 **Physics-based scrolls**: Scrolls are thrown from the bottom in parabolic arcs with gravity
- ✂️ **Slicing mechanic**: Track mouse/touch movement with glowing blade trail
- 💥 **Collision detection**: Precise line-segment intersection detection
- 🎨 **Visual feedback**: Split animations, flash effects, and smooth trails
- 📱 **Touch support**: Works on both desktop and mobile devices

## Game Rules

- **Target**: Slice scrolls containing metaphors (比喻) - Green scrolls
- **Neutral**: Regular sentences - Orange scrolls (no penalty, no points)
- **Bombs**: Faulty sentences - Red scrolls (lose a life if sliced)
- **Lives**: Start with 3 lives
- **Scoring**: +10 points for each metaphor sliced

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## How to Play

1. Use your mouse or finger to draw across the screen
2. Slice the green scrolls (metaphors) to score points
3. Avoid slicing the red scrolls (bombs) or you'll lose a life
4. Orange scrolls are neutral - slice them if you want, but they don't give points
5. Game ends when you run out of lives

## Technical Details

- Built with React 18
- Canvas API for rendering and physics
- Tailwind CSS for UI styling
- Vite for fast development and building
- Class-based Scroll objects for physics simulation
- Real-time collision detection using line-segment intersection

