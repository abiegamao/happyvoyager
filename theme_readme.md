# Happy Voyager Theme Documentation

This document outlines the design system and theme configuration for the Happy Voyager project, based on `app/globals.css`.

## Design System Overview

The project uses **Tailwind CSS v4** with an inline theme configuration.

### Typography

- **Heading Font**: `Avenir`, "Avenir Next", system-ui, sans-serif
- **Body Font**: `Avenir`, "Avenir Next", system-ui, sans-serif
- **Script Font**: Custom script font (defined via variable)

### Color Palette

The theme defines semantic color variables that map to specific hex codes.

| Semantic Name | Hex Code | Description |
| :--- | :--- | :--- |
| **Background** | `#f9f5f2` | Soft Cream |
| **Foreground** | `#3a3a3a` | Charcoal |
| **Primary** | `#e3a99c` | Dusty Rose |
| **Secondary** | `#e7ddd3` | Warm Beige |
| **Muted** | `#f2d6c9` | Soft Peach |
| **Accent** | `#bbcccd` | Sage Green |

#### Raw Colors

- **Charcoal**: `#3a3a3a`
- **Warm Beige**: `#e7ddd3`
- **Dusty Rose**: `#e3a99c`
- **Soft Peach**: `#f2d6c9`
- **Cream**: `#f9f5f2`
- **Sage**: `#bbcccd`

### UI Elements

#### Buttons

- **Primary Button**: Gradient background (Dusty Rose to darker shade), rounded, shadow.
  - Class: `.btn-primary`
- **Secondary Button**: Transparent background, Dusty Rose border.
  - Class: `.btn-secondary`

#### Cards

- **Glass Effect**: White with opacity and blur.
  - Class: `.glass`
- **Card Hover**: Lift and shadow effect.
  - Class: `.card-hover`

### Animations

The project includes several custom animations:
- `animate-float`: Gentle floating motion.
- `animate-pulse-soft`: Soft pulsing opacity/scale.
- `animate-slide-up`: Slide up fade in.
- `animate-fade-in`: Simple fade in.
- `animate-wiggle`: Rotation wiggle.
- `animate-sparkle`: Sparkle effect.
- `animate-draw-path`: SVG path drawing animation.

### Layout

- **Section Padding**: Responsive padding classes (`.section-padding`).
- **Container**: Standard max-width containers are used (e.g., `max-w-7xl`).

## Usage Guidelines

- Use `text-[#3a3a3a]` for main text if semantic classes aren't applying correctly, but prefer `text-foreground`.
- Use `font-[family-name:var(--font-body)]` for standard text.
- For new pages, ensure the `Header` and `Footer` components are used to maintain layout consistency.
