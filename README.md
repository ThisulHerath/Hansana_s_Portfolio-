# Hansana portfolio — floating graphics and editing guide

The completed source is in `C:\Users\thisu\Desktop\freetime\pettiport\Hansana`. A source ZIP is supplied alongside this guide. Extract the ZIP, run `npm install`, then `npm run dev`. Use `npm run build` for the deployable `dist` folder and `npm run preview` to check it.

## Architecture

- `src/App.jsx` owns the controller and motion toggle. It mounts one background behind the whole portfolio.
- `src/hooks/useScrollSection.js` exports the section order and tracks the active section. Scroll progress, scroll position, pointer and interaction target live in a stable ref; only a section change updates React state.
- `src/components/FloatingBackground.jsx` owns the Canvas, animation loop, damped springs, touch and keyboard focus handling, resizing, visibility and motion preferences.
- `src/components/FloatingShape.js` contains theme presets, shape initialization and rendering. This is a Canvas drawing module, rather than a React component for each particle. All shapes share one drawing loop.
- `src/components/FloatingBackground.css` provides fixed layering, screen blending and the subtle texture.
- `src/App.css` provides glass panels, mobile navigation and shared refinements. Hero and project styling live in their respective CSS files.

No animation dependencies are required. The Canvas API produces organic outlines with translucent shading and rotating mesh rings. This implementation is 2D; it does not use volumetric 3D, physical glass refraction or a fluid simulation. React Three Fiber + Drei would suit a future version requiring those effects, with a larger rendering cost. The supplied source files are complete and can be copied together into another React project.

## Connect sections, step by step

1. Mount the controller once, in your page root:

```jsx
import { useState } from 'react';
import FloatingBackground from './components/FloatingBackground';
import useScrollSection from './hooks/useScrollSection';

export default function Page() {
  const { activeSection, scene } = useScrollSection();
  const [paused, setPaused] = useState(false);
  return (
    <div className="portfolio" data-motion={paused ? 'paused' : 'playing'}>
      <FloatingBackground scene={scene} paused={paused} />
      <main>
        <section id="top">Hero</section>
        <section id="about">About</section>
        <section id="work">Selected work</section>
        <section id="contact">Contact</section>
      </main>
      <button aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        {paused ? 'Resume motion' : 'Pause motion'}
      </button>
    </div>
  );
}
```

2. Give each section a unique ID. List those IDs in visual page order in `SECTION_IDS`. Existing IDs are `top`, `about`, `work`, `experience`, `skills`, `achievements`, `contact`. The section crossing 38% of viewport height becomes active. Navigation can use `activeSection` to set `aria-current="location"`.

3. Add a matching preset to `THEMES` in `FloatingShape.js`:

```js
design: { color: [255, 143, 115], lobes: 4, speed: 0.55, glass: 0.28 },
```

`color` is RGB; `lobes` controls the organic silhouette; `speed` controls float and rotation speed; `glass` controls fill opacity. Values smoothly converge to the new section preset. Keep lobe counts at positive integers in the presets; the renderer interpolates outlines between them during transitions. Unknown sections fall back to the hero theme.

4. Mark interactive regions with `data-float-target`:

```jsx
<article data-float-target>
  <h3>Project name</h3>
  <details>
    <summary>My contribution</summary>
    <p>Project details.</p>
  </details>
</article>
<span className="skill-tag" data-float-target>Creative strategy</span>
```

Pointer events on descendants locate the closest marked region. Nearby shapes spring toward the card center and brighten. Elsewhere, they gently repel the cursor. Focus on a control inside a marked region triggers the same attraction; a touch activates it until release or cancellation. The canvas never intercepts clicks or touch scrolling.

5. For a non-scroll trigger, assign the preset key to `scene.current.section` in an event handler. The renderer reads it next frame. Scroll tracking will reclaim that value on the next scroll or resize; use the actual section IDs for persistent page-section behavior.

## Layering and glass styling

```css
.floating-background { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.floating-background canvas { width: 100%; height: 100%; mix-blend-mode: screen; }
main, .contact { position: relative; z-index: 1; }
.navbar { position: sticky; top: 0; z-index: 50; }
.stat-card, .edu-card { background: #1b2140a8; backdrop-filter: blur(8px); }
```

Blur is limited to small panels and navigation; there is no expensive full-screen animated blur. Translucent section backgrounds let the graphics remain visible while maintaining readable content.

## Performance and accessibility

- One `requestAnimationFrame` loop draws six shapes on desktop, three on small screens or coarse-pointer devices.
- Pixel ratio is capped at 1.5 on desktop and 1 on mobile. Resize updates the backing canvas size.
- Damped springs use elapsed seconds and clamp long frame gaps.
- Shapes use 96 outline segments and three mesh rings each. No per-frame React state updates, physics dependency, textures or external assets.
- Background tabs stop drawing. Returning to the tab restarts one loop.
- Reduced motion renders a static scene, with no continuous animation. CSS animations and transitions also stop. Section changes can redraw the static scene.
- Pause freezes the background and the hero notes. The operating system's reduced-motion setting takes precedence over resume.
- A skip link, visible keyboard focus, semantic sections, native project disclosure controls and an Escape-aware mobile menu are included.

The implementation targets smooth 60fps through a small rendering workload. Actual frame rate depends on device and browser; it is not guaranteed or verified on physical mobile hardware. Optimization follows [MDN's Canvas guidance](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas).

## Editing content

Personal details, experience, skills, education and projects remain in `src/data/content.js`. The contact email, phone and LinkedIn links use those values. The existing PDF is retained in `public/Hansana_Perera_Resume.pdf`.

Project cover graphics are newly designed typographic portfolio treatments, not original campaign deliverables. Replace them with real project images when available. To add or reorder projects, update the cover labels, contribution copy and visual colors in `Projects.jsx` as well as the content data; current visual treatments correspond to the four existing projects.

All biography, academic dates and accomplishments were retained from the supplied content. No new client work or performance results were invented.

## Verification completed

Production build and lint passed. Browser checks at 320, 375, 390, 768, 1024 and 1440 pixels found no horizontal document overflow. Mobile menu, section highlighting, project disclosure, pause/resume, static reduced-motion rendering and the PDF response passed, with no page errors. Desktop and mobile screenshots are included. Dependency audit reports zero known vulnerabilities after compatible transitive dependency fixes.
