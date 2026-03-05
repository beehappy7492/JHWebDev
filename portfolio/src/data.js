// ─── Birth date: Nov 6 2004, 5:00pm ────────────────────────────────────────
export const BIRTH_DATE = new Date('2004-11-06T17:00:00')

// ─── Name shown at the top ──────────────────────────────────────────────────
export const YOUR_NAME = 'JAMES HARRIS'

// ─── Inline bio links + colors ─────────────────────────────────────────────
export const TECH_LINKS = [
  { key: 'react',  label: 'React',        color: '#61dafb' },
  { key: 'csharp', label: 'C#',           color: '#9b4f96' },
  { key: 'cpp',    label: 'C++',          color: '#659ad2' },
  { key: 'python', label: 'Python',       color: '#f7c948' },
  { key: 'web',    label: 'HTML/CSS/JS',  color: '#e97a3e' },
  { key: 'others', label: 'others',       color: '#c084fc' },
]

// ─── Expanded panel content per tech ───────────────────────────────────────
// Wrap words in [brackets] to highlight them in the tech's accent colour.
// Add a screenshot URL to `img` on any project card, or leave null for a tinted placeholder.
export const TECH_DETAILS = {
  react: {
    label: 'React',
    color: '#61dafb',
    summary:
      'React is my [primary frontend framework]. I build [component-driven] UIs with hooks, context, and [GSAP] for animation — focused on performance, clean architecture, and interfaces that actually feel good to use.',
    projects: [
      {
        name: 'This Portfolio',
        href: 'https://bumblebeeweb.dev',
        img: '/Screenshot 2026-03-05 071320.png',
        desc: 'You\'re looking at it. Built with React 18 + Vite, featuring a Three.js particle field that spells "WELCOME" in the background, interactive tech panels, and a real-time age counter.',
      },
      {
        name: 'Sort Visualizer',
        href: '#',
        img: '/sort_visualizer.png',
        desc: 'Interactive sorting algorithm visualizer built with React 18 + Vite. Animates Bubble, Selection, Insertion, Merge, Quick, and Heap sort in real time with colour-coded states and live comparison/swap counters.',
      },
      {
        name: 'Live Shader Editor',
        href: '#',
        img: '/live_shader_editor.png',
        desc: 'Browser-based GLSL fragment shader playground built with React + WebGL. Write shaders live and watch them render in real time — exposes uniforms like time, mouse position, and resolution as interactive sliders.',
      },
    ],
  },
  csharp: {
    label: 'C#',
    color: '#9b4f96',
    summary:
      'I use [C#] and [.NET] for systems that need structure — procedural generation, simulation, and tooling. I like the language for its strong type system and how well it handles [complex state] without becoming a mess.',
    projects: [
      {
        name: 'Maze Generator',
        href: '#',
        img: '/maze_generator.png',
        desc: 'Console maze generator in C# .NET 8 with four algorithms — DFS, Prim\'s, Kruskal\'s, and Aldous-Broder. Features animated generation, multiple render styles, and an A* solver.',
      },
      {
        name: 'Procedural Dungeon Engine',
        href: '#',
        img: '/dungeon_engine.png',
        desc: 'Dungeon generation engine in C# using BSP tree partitioning to carve rooms, connect corridors, and place encounters. Exports playable maps and supports pluggable room templates and encounter tables.',
      },
    ],
  },
  cpp: {
    label: 'C++',
    color: '#659ad2',
    summary:
      '[C++] is where I go when performance actually matters. I use it for [graphics programming], [CPU-bound simulation], and anything that needs to run close to the metal — manual memory, SIMD mindset, zero overhead.',
    projects: [
      {
        name: 'Ray Tracer',
        href: '#',
        img: '/raytracer.png',
        desc: 'C++17 Monte Carlo path tracer with Lambertian, metal, and glass materials. Features anti-aliasing, depth of field, soft shadows, and multi-threaded rendering across all CPU cores.',
      },
      {
        name: 'Software Rasterizer',
        href: '#',
        img: '/software_rasterizer.png',
        desc: 'CPU-only 3D renderer written from scratch in C++. Loads OBJ meshes, implements a full pipeline — vertex transform, triangle rasterization, z-buffering, Phong lighting, and texture mapping — without touching the GPU.',
      },
    ],
  },
  python: {
    label: 'Python',
    color: '#f7c948',
    summary:
      '[Python] is my tool for [rapid prototyping], simulation, and anything math-heavy. I reach for it when I want to test an idea fast — scientific computing, [data visualisation], or scripting things that would take too long in a compiled language.',
    projects: [
      {
        name: 'Cosmic Order Simulation',
        href: '#',
        img: '/cosmic_order.png',
        desc: 'N-body gravitational simulation using a Barnes-Hut O(N log N) tree. Spawns up to 50,000 particles and detects emergent "order pockets" via DBSCAN clustering — testing whether stable cosmological structures arise naturally from near-random initial conditions.',
      },
      {
        name: 'Fractal Explorer',
        href: '#',
        img: '/fractal_explorer.png',
        desc: 'Interactive fractal renderer in Python — Mandelbrot, Julia, and Burning Ship sets with smooth colouring, click-to-zoom, scroll-to-pan, and live Julia constant preview from mouse position.',
      },
    ],
  },
  web: {
    label: 'HTML / CSS / JS',
    color: '#e97a3e',
    summary:
      'I know the [web platform] deeply — not just frameworks, but the raw primitives underneath. [Canvas], [WebGL], the CSS cascade, the event loop. I build things browsers were never supposed to run.',
    projects: [
      {
        name: 'Snake Game',
        href: '#',
        img: '/snake_game.png',
        desc: 'Classic Snake in vanilla HTML/CSS/JS — neon aesthetic, particle burst on eat, localStorage high score, speed levels, and pause support. Single file, no dependencies.',
      },
      {
        name: 'WebGL Fluid Simulation',
        href: '#',
        img: '/webgl-fluid.png',
        desc: 'Real-time fluid dynamics in the browser using WebGL 2 — semi-Lagrangian advection, pressure solve via Jacobi iteration, and dye injection driven by mouse velocity. Runs entirely on the GPU at 60fps.',
      },
    ],
  },
  others: {
    label: 'Other skills',
    color: '#c084fc',
    summary:
      'I also work in [C], [x86 assembly], [GLSL], and [Bash]. Low-level systems, shader pipelines, compilers — the stuff most people avoid. If it touches hardware or runs without a runtime, I find it interesting.',
    projects: [
      {
        name: 'Brainfuck JIT Compiler',
        href: '#',
        img: '/brainfuck_jit.png',
        desc: 'Compiles Brainfuck source directly to x86-64 machine code at runtime using Python ctypes — no interpreter loop. Includes an optimisation pass that collapses repeated instructions and eliminates balanced loop scans.',
      },
      {
        name: 'HTTP Server from Scratch',
        href: '#',
        img: '/http_server.png',
        desc: 'RFC-compliant HTTP/1.1 server written in C using raw POSIX sockets — no frameworks, no libuv. Handles persistent connections, chunked transfer encoding, static file serving, and a basic CGI-style request router.',
      },
    ],
  },
}

// ─── Bottom links ───────────────────────────────────────────────────────────
export const BOTTOM_LINKS = {
  github:      'https://github.com/beehappy7492',
  website:     'https://bumblebeeweb.dev',
  lastProject: { name: 'bumblebeeweb.dev', href: 'https://bumblebeeweb.dev' },
  email:       'jamescook061104@gmail.com',
}
