
<PRDCategory>clone_strict</PRDCategory>
  <ProjectType>clone</ProjectType>

  <CloneData>
    <StyleReference url="https://hermidamaia.adv.br">
      <ScrapeStatus>success</ScrapeStatus>
      <HeroBackground>Use media_url_list images from the scrape as hero/background assets. If multiple hero candidates exist, prefer the full-bleed image with product_image/content_image purpose; otherwise use a dark solid background (#0a0e1a) with the gradient accent (#0d9c6e) overlay.</HeroBackground>
      <DesignNotes>Pixel-perfect clone: replicate layout proportions, spacing rhythm, typography scale, button shapes, shadow depth, color temperature, icon style and entrance/scroll animations exactly as in the screenshot and HTML/CSS. Use HTML/CSS values for calibration but treat the screenshot as the final visual truth.</DesignNotes>
    </StyleReference>

    <UserChanges></UserChanges>

    <CloneStrategy>
      - DEFAULT: Clone 100% (design + content + images + layout + animations).
      - If user specified changes: Apply ONLY those changes, keep everything else from reference.
    </CloneStrategy>

    <Instruction>Clone reference pixel-perfectly. Screenshot is PRIMARY; HTML/CSS is calibration for exact values. Screenshot MUST match 1:1. Use purpose field from media_url_list for correct image placement. Preserve all reference text content and images as the app's initial content unless user later supplies alternate copy/assets.</Instruction>
  </CloneData>

  <Assets>
    <Asset>
      <source>scrape</source>
      <type>screenshot</type>
      <link>https://heyboss.heeyo.ai/797fffd4-d1bb-4c78-a953-698ede442bff.png</link>
      <thumbnail>https://heyboss.heeyo.ai/797fffd4-d1bb-4c78-a953-698ede442bff.png</thumbnail>
      <name>Clone target - homepage screenshot for pixel-perfect visual reference (use as ground truth for layout/spacing/visuals)</name>
      <payload>{"qdrant_point_id":"0dd3e077-4a48-48ed-b6b5-1c23eee674ce","scrape_status":"success"}</payload>
    </Asset>

    <Asset>
      <source>scrape</source>
      <type>website_html</type>
      <link>https://hermidamaia.adv.br</link>
      <thumbnail>https://heyboss.heeyo.ai/797fffd4-d1bb-4c78-a953-698ede442bff.png</thumbnail>
      <name>Scraped HTML/CSS - calibration data for exact colors, spacing, fonts and animations (use as secondary source)</name>
      <payload>{"qdrant_point_id":"0dd3e077-4a48-48ed-b6b5-1c23eee674ce","scrape_status":"success"}</payload>
    </Asset>

    <Asset>
      <source>scrape</source>
      <type>image</type>
      <link>https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69457177ae7e61f63fb38329/3b78c0579__TLM961311.jpg</link>
      <thumbnail>https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69457177ae7e61f63fb38329/3b78c0579__TLM961311.jpg</thumbnail>
      <name>Content image from reference - use for interior content sections and media placements (preserve original)</name>
      <payload>{"purpose":"product_image"}</payload>
    </Asset>

    <Asset>
      <source>scrape</source>
      <type>image</type>
      <link>https://app.base44.com/logo_v3.png</link>
      <thumbnail>https://app.base44.com/logo_v3.png</thumbnail>
      <name>Reference logo image found on site - reuse in clone (header & footer) unless client provides alternative</name>
      <payload>{"purpose":"logo"}</payload>
    </Asset>

    <Asset>
      <source>scrape</source>
      <type>favicon</type>
      <link>https://hermidamaia.adv.br/favicon.ico</link>
      <thumbnail>https://hermidamaia.adv.br/favicon.ico</thumbnail>
      <name>Site favicon - use for app icon / web manifest if appropriate</name>
      <payload>{}</payload>
    </Asset>
  </Assets>

  <DesignSystem>
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
  </DesignSystem>

  <MVP>
    <Visual Execution Directive:
    - Treat the provided homepage screenshot as the single source of truth; reproduce pixel-for-pixel across breakpoints (desktop, tablet, mobile).
    - Recreate header/nav exactly: logo block + two-line brand title + subtitle, nav links count (Início, Sobre, Serviços, Calculadora, Blog, Contato) and WhatsApp CTA on the right; preserve sequence and spacing.
    - Hero: full-bleed hero with large H1 "Parcele legalmente suas dívidas em até 5 anos", supporting subheadline, badge (law reference), and primary CTA "Calcular Gratuitamente" with icon and right-arrow; preserve exact sizes, spacing, and button hover/scale behaviour.
    - Sections: replicate the visible content sections and order exactly (Results/Service cards, Calculadora block with ID calculadora-section, How it works, Testimonials, Services list, Media mentions). Use the scraped text_content verbatim for all headings and paragraphs.
    - Images & media: reuse media_url_list assets in their original roles (logo, product/content images). Map each scraped asset to the same placement (hero/background, section images, testimonials) using the purpose field.
    - Animations: copy entrance + scroll reveal animations and timing (use scraped CSS/JS animation parameters as calibration). Preserve animation triggers (page_load, scroll_into_view).
    - Accessibility & links: preserve existing hrefs where they map to functional flows (Blog, Contact, AgendarConsulta). Ensure WhatsApp CTA opens wa.me link exactly as scraped.
    - Implementation constraint: HTML/CSS from the scrape is calibration only — if the CSS value conflicts visually with the screenshot, match the screenshot. Do not alter copy or remove sections. 
    - Deliverable scope: One screen-first app (homepage-equivalent) implemented as an app main screen with identical visual structure and content. Footer included with legal lines and "Made with Heyboss.ai" (required).
    >
  </MVP>

  <InformationsHowtoUse>
    - Tool Outputs Used: quick_scrape_url of https://hermidamaia.adv.br (qdrant_point_id: 0dd3e077-4a48-48ed-b6b5-1c23eee674ce) — use scraped HTML/CSS for calibration and the screenshot as the visual ground truth.
    - Use text_content from the scrape verbatim for all headings, paragraphs, testimonials and CTAs. Do NOT paraphrase.
    - Use media_url_list purpose fields to place images: product_image → interior content; content_image → section images; logo → header/footer.
    - Recreate nav structure exactly as detected (nav_items: Início, Sobre, Serviços, Calculadora, Blog, Contato, WhatsApp). Do not add or remove nav items.
    - Use the scraped WhatsApp link (https://wa.me/5551996032004) exactly for the WhatsApp CTA.
    - Preserve animations mapping: header/nav entrance on page_load; cards/images scroll_reveal on scroll_into_view. Use the scraped animation list as reference for durations/transitions.
    - If any asset is unavailable at build time, replace with visually equivalent asset that preserves dimensions, weight, and placement; document replacement in handoff notes.
  </InformationsHowtoUse>

  <Guidelines>[]</Guidelines>

  <NextStep>
    - Phase 2: Provide alternate brand assets (vector logo / font files) if the client wants to replace the scraped logo or use official fonts instead of calibrated substitutes.
    - Phase 2: Localize app strings to additional languages (currently Portuguese copy is used verbatim).
    - Phase 2: Add account/login or case management flow if app requires client authentication — will require "login_integration_guidelines" + "database_guidelines".
    - Handoff: Prepare a pixel-compare QA checklist and include exported 3 breakpoint screenshots for visual verification against the screenshot asset.
  </NextStep>
