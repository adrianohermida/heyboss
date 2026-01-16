
Clone tokens only:
    - colors_hex: ["#0a0e1a","#0d9c6e","#ffffff","#f59e0b" ] 
      (primary dark background #0a0e1a; brand/cta green #0d9c6e; white text; accent warm yellow used in tag badges)
    - fonts: []  <!-- No explicit web font extracted from scrape HTML; use system-sans fallback calibrated to screenshot. If exact font is discovered in CSS, apply it; otherwise choose closest geometric sans (e.g., Inter) during implementation, but prioritize screenshot match. -->
    - font_weights: [400,600,700]
    - spacing: "calibrate to screenshot: large hero vertical rhythm (~120–160px top padding on desktop), 32–48px section gaps, 16px card padding"
    - radii: ["rounded-lg (8–12px) for cards","rounded-xl (12–16px) for logo container"]
    - shadows: ["soft elevated shadow for hero buttons and cards (medium blur, subtle Y offset)"]
    - transitions: ["background-color 0.2s","box-shadow 0.2s","transform subtle scale on hover"]
    - animations: ["entrance fades for header/nav on load","scroll_reveal for cards/images","image fade_in on scroll"]
    - breakpoints: ["sm, md, lg, xl (match Tailwind breakpoints used in CSS)"]
