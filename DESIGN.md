---
name: Jonah Chang Portfolio
description: A live control atlas for software that moves through the physical world.
colors:
  atlas-cobalt: "#1438c7"
  deep-cobalt: "#0c258d"
  cobalt-mist: "#dce4ff"
  signal-orange: "#ff5b19"
  route-white: "#f5f3ec"
  bright-paper: "#fffdf7"
  graphite-ink: "#121212"
typography:
  display:
    fontFamily: "Cabinet Grotesk, Arial Black, Arial, sans-serif"
    fontSize: "clamp(3.5rem, 8.3vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Cabinet Grotesk, Arial Black, Arial, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Cabinet Grotesk, Arial, sans-serif"
    fontSize: "clamp(2rem, 3.5vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 0.92
  body:
    fontFamily: "Cabinet Grotesk, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  body-large:
    fontFamily: "Cabinet Grotesk, Arial, sans-serif"
    fontSize: "clamp(1.15rem, 2.1vw, 1.65rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Cascadia Mono, SFMono-Regular, Consolas, monospace"
    fontSize: "0.72rem"
    fontWeight: 700
    letterSpacing: "0.08em"
  label-small:
    fontFamily: "Cascadia Mono, SFMono-Regular, Consolas, monospace"
    fontSize: "0.65rem"
    fontWeight: 700
    letterSpacing: "0.08em"
rounded:
  plate: "0px"
  control: "999px"
  media: "16px"
spacing:
  compact: "12px"
  standard: "20px"
  chapter: "clamp(8rem, 15vw, 13rem)"
components:
  button-primary:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.plate}"
    padding: "14px 20px"
  button-secondary:
    backgroundColor: "{colors.bright-paper}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.plate}"
    padding: "14px 20px"
---

# Design System: Jonah Chang Portfolio

## Overview

**Creative North Star: "The Control Atlas"**

Railway control diagrams, plotted robot paths, and precision engineering documents become one bright portfolio system. Work is organized as connected destinations: route lines establish relationships, junctions expose choices, and state changes make sequence visible.

**Key Characteristics:**

- Large cobalt fields and route-white working surfaces
- Signal orange reserved for action and active state
- Oversized Cabinet Grotesk against factual measurement text
- Route topology and clipped evidence instead of generic card chrome
- Motion that explains connection, sequence, or cause

## Colors

Atlas Cobalt owns whole chapters. Signal Orange carries actions and live routes. Route White and Bright Paper support reading, Graphite Ink provides structure, and Cobalt Mist is the only secondary text color on cobalt.

**The Signal Rule.** Orange always communicates action, direction, or live state.

## Typography

Cabinet Grotesk supplies civic-scale display authority and direct body copy. The platform monospace appears only for language, coordinates, or measured system metadata.

**The Wide-Type Rule.** Display copy receives enough width to remain two lines on desktop and no more than three on narrow screens.

## Layout

The desktop system uses wide asymmetric grids with route lines crossing columns. Chapters use the `chapter` spacing token. The featured bento is six columns by two rows with complete 12-cell occupancy. Below 760px, layouts collapse to one vertical route and all hover-dependent behavior becomes explicit tap behavior.

## Elevation & Depth

The system is flat and printed at rest. Depth comes from overlaps, color transitions, image clipping, and a hard `7px 7px` graphite offset shadow on active plates.

**The Diagram-First Rule.** Structure must remain legible with all decorative depth removed.

## Shapes

Project plates and navigation are square. Media apertures may curve to 16px. Circles are reserved for route destinations and carousel controls; pills are reserved for compact embedded media or state controls.

## Components

### Buttons

Square, bordered controls use Signal Orange for primary action and Bright Paper for secondary action. Hover lifts up-left into a hard graphite offset shadow. Focus uses a 3px Signal Orange ring.

### Cards / Containers

Feature plates use structural borders without soft shadow. Project carousel plates gain the hard offset shadow only on hover or focus. Media is grayscale at rest and restores color on engagement.

### Navigation

The split navigation is a Bright Paper plate with a hard graphite offset. A miniature route bridges identity and actions. On small screens, secondary links disappear while the contact action remains.

### Route

The route is the signature component: a weighted line, semantic destination nodes, and one active Signal Orange state. It may organize navigation, narrative, or project relationships.

## Do's and Don'ts

### Do:

- **Do** lead with working project evidence and code-native motion.
- **Do** use route changes, nodes, and line weight to expose information architecture.
- **Do** keep body copy within a readable 65–75 character measure.
- **Do** preserve keyboard, reduced-motion, and no-API fallbacks.

### Don't:

- **Don't** use stars, neon glow, gradient text, glass cards, or a generic dark developer theme.
- **Don't** invent telemetry, testimonials, clients, awards, or metrics.
- **Don't** turn every item into the same rounded card.
- **Don't** use monospace as the primary voice.
