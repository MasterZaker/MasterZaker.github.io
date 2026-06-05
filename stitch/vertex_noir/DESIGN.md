# Portfolio Design System: Editorial Engine for 3D & Game Design

## 1. Overview & Creative North Star: "The Neon Curator"
The Creative North Star for this design system is **The Neon Curator**. 

In an industry filled with chaotic, "gamer-aesthetic" templates, this system takes the opposite approach: high-end digital brutalism. It treats 3D models and game environments like artifacts in a high-tech museum. We break the "template" look by utilizing heavy typographic scales, intentional asymmetry (e.g., imagery offset from text), and "Deep Space" layering. The goal is to move beyond a standard grid and create a layout that feels like a custom-built HUD (Heads-Up Display) for a premium gaming experience.

---

## 2. Colors: Deep Space & Cyan Ionization
The palette is built on a foundation of `surface` (#11131c) and `surface_container_lowest` (#0c0e17) to provide a vacuum-like depth that makes 3D renders pop.

### The "No-Line" Rule
Explicitly prohibit 1px solid borders for sectioning. We define boundaries through tonal shifts. A section transitions from `surface` to `surface_container_low` (#191b24) to denote a change in content. If a visual break is needed, use a `3.5rem` (10) vertical gap instead of a line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
- **Base Layer:** `surface` (#11131c) for the main background.
- **Content Blocks:** `surface_container` (#1d1f29) for project descriptions.
- **Interactive Elements:** `surface_container_high` (#282933) for hover states.
- **Nesting:** A `surface_container_highest` (#32343e) card should sit inside a `surface_container_low` section to create a soft, natural lift.

### Signature Textures & The "Ion" Glow
- **Glassmorphism:** For floating navigation or project tags, use `surface_variant` (#32343e) at 60% opacity with a `20px` backdrop-blur. 
- **The Glow:** Use `primary_container` (#00f0ff) with a 20% opacity radial gradient behind high-impact 3D model renders to simulate an "emissive" light source.

---

## 3. Typography: Technical Authority
We use a "High-Contrast Pairing" to balance technical precision with editorial flair.

- **Display & Headlines (Space Grotesk):** This font provides the "tech-edge." Use `display-lg` (3.5rem) for hero titles. Kerning should be tightened (-2%) to feel like a high-end title sequence.
- **Body & Titles (Inter):** Inter provides neutral readability. Use `body-lg` (1rem) for project descriptions to ensure the focus remains on the visuals.
- **Labels (Manrope):** Use `label-md` (0.75rem) in All-Caps with 10% letter spacing for metadata like "POLYCOUNT," "ENGINE," or "TOOLS USED."

The hierarchy must be aggressive. A `display-lg` headline should sit closely to a `label-md` tag to create a "Big/Small" dynamic that feels intentional and curated.

---

## 4. Elevation & Depth: Tonal Layering
We abandon traditional shadows in favor of **Tonal Layering** and **Ambient Light.**

- **The Layering Principle:** Depth is achieved by stacking. A card in `surface_container_lowest` (#0c0e17) placed on a `surface` background creates a "recessed" look, perfect for 3D model viewports.
- **Ambient Shadows:** For floating Modals, use a shadow with a 40px blur, 0% spread, and 8% opacity, using the `primary` (#dbfcff) color to mimic light reflecting off a neon source.
- **The "Ghost Border" Fallback:** If a container needs definition against a similar tone, use a 1px border of `outline_variant` (#3b494b) at 20% opacity. 
- **Glass & Depth:** Floating chips (e.g., "Maya," "Unreal Engine 5") must use `surface_bright` (#373943) at 40% opacity with a blur, making them feel like they are floating in front of the model.

---

## 5. Components

### High-Impact Hero Section
- **Layout:** Asymmetric. Name and discipline in `display-lg` left-aligned. A large, floating 3D render (PNG/WebP) or video loop overlapping the text.
- **Background:** A subtle `primary` to `secondary` (#d1bcff) linear gradient at 5% opacity to break the flat black.

### Project Cards (3D Models & Animations)
- **Container:** `surface_container_lowest` (#0c0e17). No borders.
- **Image:** 16:9 aspect ratio with `xl` (0.75rem) corner radius.
- **Hover:** The image scales slightly (1.05x), and a `primary_fixed` (#7df4ff) glow appears at the bottom edge. 
- **No Dividers:** Separate the "Title" and "Year" using a `3` (1rem) horizontal gap, not a vertical bar.

### Buttons (The "Control" Variant)
- **Primary:** Background: `primary` (#dbfcff) | Text: `on_primary` (#00363a). Sharp `sm` (0.125rem) radius for a "military-tech" feel.
- **Secondary:** Outline: `outline` (#849495) at 40% | Text: `on_surface`.
- **States:** On hover, the Primary button should gain a `surface_tint` (#00dbe9) outer glow.

### Technical Spec Chips
- **Style:** Small, `full` (9999px) radius, using `surface_container_highest` (#32343e).
- **Text:** `label-sm` (0.6875rem) using `on_surface_variant` (#b9cacb).

---

## 6. Do's and Don'ts

### Do:
- **Use "Active" Space:** Leave large gaps (`20` / 7rem scale) between the "About" section and "Project Grid" to let the work breathe.
- **Mix Type Weights:** Pair a Bold `display-md` headline with a Light `body-sm` caption.
- **Subtle Motion:** Use slow, 0.8s ease-out transitions for surface color changes on hover.

### Don't:
- **Don't use 100% White:** Use `on_surface` (#e1e1ef). Pure white #FFFFFF is too harsh against the `surface` dark background and looks unrefined.
- **Don't use Box Shadows on Cards:** Rely on the difference between `surface_container_low` and `surface_container_high` to show elevation.
- **Don't Center Everything:** Portfolio sites often default to center-alignment. Maintain a strong "Left-Rail" alignment for text to keep the editorial feel.