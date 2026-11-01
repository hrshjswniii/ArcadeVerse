# ArcadeVerse (NSOC '26) — Comprehensive Issue Roadmap
> **20 High-Impact, Essential Issues & Architectural Enhancements**  
> *Ready for GitHub Issues triage, contributor assignments, and milestone tracking.*

---

## Quick Reference Summary Table

| Issue # | Title | Category | Severity | Difficulty |
| :---: | :--- | :--- | :---: | :---: |
| **01** | Standardize Game Lifecycle Bridge (Pause, Resume, Teardown) on Modal Close | Core Platform / Performance | **Critical** | Medium |
| **02** | Centralized Master Audio Bus & Parent-Child Hub Mute Synchronization | Audio / UX | **High** | Medium |
| **03** | Unified Player High-Score & Hall of Fame Leaderboard Submission API | Features / Community | **Critical** | Medium |
| **04** | Universal On-Screen Touch Gamepad Overlay for Mobile Gameplay | Mobile / Accessibility | **Critical** | Hard |
| **05** | Native HTML5 Gamepad API Support (Console Controller Hub & In-Game Play) | Input / Accessibility | **Medium** | Medium |
| **06** | Fix Broken Daily Challenge Completion Verification & Streak Tracking | Bug / Gamification | **High** | Easy |
| **07** | Full Offline Playability via Service Worker (`sw.js`) Cache-First Architecture | PWA / Offline | **High** | Hard |
| **08** | Upgrade Web App Manifest (`manifest.json`) for Modern PWA Installability | PWA / Standards | **Medium** | Easy |
| **09** | Lightweight Fuzzy Search Engine & Multi-Facet Filtering Bar | UX / Catalog | **Medium** | Medium |
| **10** | Enforce Strict Modal Focus Trap & WCAG 2.1 Screen Reader Live Regions | Accessibility / WCAG | **High** | Easy |
| **11** | Universal User Save Data Backup & Migration (Export / Import JSON) | Data / Settings | **Medium** | Easy |
| **12** | Dark & Light Mode Contrast Normalization with Embedded Canvas Themes | UI / Theming | **Medium** | Medium |
| **13** | Cross-Game Global Achievement Engine & Toast Notification System | Gamification / Engagement | **High** | Hard |
| **14** | Automated Headless CI Smoke Test Suite for All 52 Games via Playwright | DevOps / CI/CD | **Critical** | Hard |
| **15** | Dynamic Contributor Discovery in `build-registry.js` (Eliminate Hardcoding) | Tooling / Architecture | **High** | Medium |
| **16** | *Island Survival* Expansion: Night Predators, Campfire Radius & Raft Escape | Game Polish / Mechanics | **High** | Medium |
| **17** | *Witch's Crypt Escape*: Drag-and-Drop Cauldron Mixing & Fluid Splash Physics | Game Polish / Immersion | **Medium** | Medium |
| **18** | Universal Aspect-Ratio Letterbox & Viewport Anchoring for Ultrawide & Mobile | Responsive / Layout | **Medium** | Easy |
| **19** | Adaptive Eco Mode: Frame Rate Throttling & Ambient Background Suspension | Performance / Battery | **Medium** | Medium |
| **20** | Standardize Visual Gameplay Thumbnails (`thumbnail.webp`) for All Games | Visuals / Catalog | **Medium** | Easy |

---

## Detailed Issue Specifications

---

### Issue #01: Standardize Game Lifecycle Bridge (Pause, Resume, Teardown) on Modal Close
- **Labels:** `bug`, `performance`, `memory-leak`, `core-architecture`
- **Severity:** Critical
- **Affected Files:** `assets/js/app.js`, `index.html`, all `games/*/game.js`

#### Problem Description
When a player closes the in-app game modal (`closeGameModal()`), `app.js` replaces `gameIframe.src` with `"about:blank"`. However, active `AudioContext` instances, recursive `requestAnimationFrame` loops, and background intervals inside game scripts often fail to release allocated resources before garbage collection. In games with ambient horror audio (such as *Haunted House* or *Time Warp*), audio nodes occasionally pop or bleed into the parent hub, and repeatedly launching games rapidly inflates DOM memory usage by 150MB–400MB.

#### Technical Specifications & Proposed Solution
1. Establish a standardized bi-directional `postMessage` protocol:
   - Hub to Game: `window.postMessage({ type: 'ARCADEVERSE_PAUSE' }, '*')`
   - Hub to Game: `window.postMessage({ type: 'ARCADEVERSE_TEARDOWN' }, '*')`
2. Create an optional lightweight helper script (`assets/js/arcadeverse-sdk.js`) that games can include:
   ```javascript
   window.ArcadeVerse = {
     onTeardown(callback) {
       window.addEventListener('message', (e) => {
         if (e.data && e.data.type === 'ARCADEVERSE_TEARDOWN') callback();
       });
     }
   };
   ```
3. Update `closeGameModal()` in `app.js` to dispatch the teardown event 100ms before disconnecting the iframe DOM node.

#### Acceptance Criteria
- [ ] Closing any game modal halts all active `AudioContext` nodes immediately without audio pops.
- [ ] No residual `requestAnimationFrame` loops continue running after modal dismissal.
- [ ] Verified zero memory leak growth after opening and closing 10 consecutive games.

---

### Issue #02: Centralized Master Audio Bus & Parent-Child Hub Mute Synchronization
- **Labels:** `enhancement`, `audio`, `ux`
- **Severity:** High
- **Affected Files:** `assets/js/sound-engine.js`, `assets/js/app.js`, `games/*/game.js`

#### Problem Description
The ArcadeVerse hub includes an ambient sound engine toggle in the navigation bar. However, each individual game initializes an independent `SoundEngine` instance that has no communication with the parent hub. When a player toggles mute in the hub header, audio from the active game inside the modal continues blasting at full volume.

#### Technical Specifications & Proposed Solution
1. In `assets/js/sound-engine.js`, dispatch an `ARCADEVERSE_VOLUME_CHANGE` message to the active iframe whenever the hub mute toggle or volume slider changes:
   ```javascript
   if (gameIframe && gameIframe.contentWindow) {
     gameIframe.contentWindow.postMessage({
       type: 'ARCADEVERSE_AUDIO_CONFIG',
       muted: SoundEngine.muted,
       volume: SoundEngine.volume
     }, '*');
   }
   ```
2. Standardize game sound engines to register a master `GainNode` connected to destination, responding to this message dynamically.

#### Acceptance Criteria
- [ ] Muting sound in the hub header immediately silences the active game in the modal.
- [ ] Restoring sound in the hub header restores game audio to its previous level.
- [ ] Hub audio volume preferences in `localStorage` automatically propagate to all launched games.

---

### Issue #03: Unified Player High-Score & Hall of Fame Leaderboard Submission API
- **Labels:** `feature`, `leaderboard`, `gamification`, `high-priority`
- **Severity:** Critical
- **Affected Files:** `assets/js/leaderboard.js`, `leaderboard.html`, `games/*/game.js`

#### Problem Description
`leaderboard.html` currently only displays GitHub contributor metrics (commits, pull requests, roles). There is no mechanism for players to compare high scores or see who holds the record for games like *Brick Breaker DX*, *Space Invaders*, *Cyber Snake*, or *Quantum Minesweeper*. Scores remain isolated in local game memory.

#### Technical Specifications & Proposed Solution
1. Extend `leaderboard.html` with a tab switcher:
   - Tab 1: **Community Contributors** (Current Hall of Fame)
   - Tab 2: **Arcade High Scores** (Player Records per Game)
2. Implement a global `postMessage` score receiver in `assets/js/app.js` and `leaderboard.js`:
   ```javascript
   window.addEventListener('message', (e) => {
     if (e.data && e.data.type === 'ARCADEVERSE_SUBMIT_SCORE') {
       const { gameId, score, playerName, extraData } = e.data;
       ArcadeLeaderboard.recordScore(gameId, score, playerName, extraData);
     }
   });
   ```
3. Store top 10 scores per game in `localStorage` under `arcadeverse_high_scores_v1` with timestamp and player handle.

#### Acceptance Criteria
- [ ] Players completing a game see their score submitted and ranked on `leaderboard.html`.
- [ ] High scores persist across browser sessions.
- [ ] Games can invoke `window.parent.postMessage({ type: 'ARCADEVERSE_SUBMIT_SCORE', ... })` seamlessly.

---

### Issue #04: Universal On-Screen Touch Gamepad Overlay for Mobile Gameplay
- **Labels:** `feature`, `mobile`, `accessibility`, `touch-controls`
- **Severity:** Critical
- **Affected Files:** `assets/js/app.js`, `assets/css/style.css`, `index.html`

#### Problem Description
Over 30 action and retro games in ArcadeVerse (e.g., *Cyber Katana*, *Space Invaders*, *Time Warp*, *Cyber Snake*, *Neon Gravity Rush*) bind strictly to desktop keyboard events (`ArrowLeft`, `ArrowRight`, `Space`, `KeyW`, `KeyA`, `KeyS`, `KeyD`). On mobile devices and touch tablets, these games are completely unplayable because no on-screen touch controls exist.

#### Technical Specifications & Proposed Solution
1. Build a universal, touch-ergonomic virtual gamepad overlay directly inside `.modal-frame-wrapper`:
   - Left side: 4-way Virtual D-Pad / Thumb Joypad (Up, Down, Left, Right).
   - Right side: Action buttons (A: Action / Jump / Shoot [Space], B: Secondary [Shift/Escape]).
2. When touch events occur on the virtual buttons, dispatch synthetic `KeyboardEvent` objects into the iframe:
   ```javascript
   function dispatchKeyToIframe(key, code, keyCode, type) {
     if (!gameIframe.contentDocument) return;
     const evt = new KeyboardEvent(type, { key, code, keyCode, bubbles: true });
     gameIframe.contentDocument.dispatchEvent(evt);
   }
   ```
3. Add a quick toggle button on the modal top bar (`[Gamepad]` icon) allowing users to show/hide the touch overlay at will.

#### Acceptance Criteria
- [ ] Keyboard-only games are 100% playable on iOS Safari and Android Chrome via the virtual overlay.
- [ ] Buttons support multi-touch (moving while jumping/shooting simultaneously).
- [ ] Overlay automatically shows on touch devices and hides on desktop pointer devices.

---

### Issue #05: Native HTML5 Gamepad API Support (Console Controller Hub & In-Game Play)
- **Labels:** `feature`, `input`, `accessibility`, `gamepad`
- **Severity:** Medium
- **Affected Files:** `assets/js/gamepad-navigator.js`, `assets/js/app.js`, `index.html`

#### Problem Description
ArcadeVerse is designed as a digital arcade station, yet it completely lacks HTML5 Gamepad API integration. Users connecting standard Xbox, PlayStation, Nintendo Switch, or generic USB/Bluetooth controllers cannot navigate the game catalog or interact with embedded games.

#### Technical Specifications & Proposed Solution
1. Create `assets/js/gamepad-navigator.js`:
   - Poll `navigator.getGamepads()` at 60 FPS using requestAnimationFrame.
   - Map D-Pad / Left Stick to navigate game cards on `index.html`.
   - Map Button 0 (A / Cross) to launch the selected game modal.
   - Map Button 1 (B / Circle) to close active modals.
   - Map Button 9 (Start / Menu) to trigger the "Surprise Me!" roulette launcher.
2. When the game modal is active, forward raw gamepad axes and button states into the active iframe.

#### Acceptance Criteria
- [ ] Connected gamepads are immediately detected and surface a visual "Gamepad Connected" toast.
- [ ] Full navigation through the catalog without touching the keyboard or mouse.
- [ ] In-game button presses map reliably across standard controllers.

---

### Issue #06: Fix Broken Daily Challenge Completion Verification & Streak Tracking
- **Labels:** `bug`, `gamification`, `good first issue`
- **Severity:** High
- **Affected Files:** `assets/js/daily-challenge.js`, `assets/css/daily-challenge.css`

#### Problem Description
In `assets/js/daily-challenge.js`, daily challenges are generated with a target score (e.g. 500+ points), and `this.completed` is loaded from `localStorage`. However, there is zero logic in the file to ever verify score achievement or set `this.completed = true`. As a result, the mission action button remains stuck on "Deploy Mission" forever, and streak counters never increment.

#### Technical Specifications & Proposed Solution
1. Implement a score verification listener inside `DailyChallenge`:
   ```javascript
   window.addEventListener('message', (e) => {
     if (e.data && e.data.type === 'ARCADEVERSE_SUBMIT_SCORE') {
       if (DailyChallenge.challenge && e.data.gameId === DailyChallenge.challenge.game.id) {
         if (e.data.score >= DailyChallenge.challenge.targetScore && !DailyChallenge.completed) {
           DailyChallenge.markCompleted();
         }
       }
     }
   });
   ```
2. In `markCompleted()`:
   - Set `this.completed = true`.
   - Increment `this.streak += 1`.
   - Save updated state to `localStorage`.
   - Update banner button text to `"Mission Accomplished ✅"`.
   - Trigger a victory confetti animation.

#### Acceptance Criteria
- [ ] Hitting the target score in the daily game automatically marks the mission as completed.
- [ ] Daily streak counter increments properly and persists in localStorage.
- [ ] UI reflects completed status without requiring manual page reload.

---

### Issue #07: Full Offline Playability via Service Worker (`sw.js`) Cache-First Architecture
- **Labels:** `pwa`, `offline`, `performance`, `service-worker`
- **Severity:** High
- **Affected Files:** `sw.js`, `index.html`, `manifest.json`

#### Problem Description
`index.html` references `manifest.json`, but no Service Worker is registered. When a user loses internet connectivity or is on an unstable connection, ArcadeVerse fails to load, preventing offline arcade gameplay.

#### Technical Specifications & Proposed Solution
1. Create `sw.js` at the repository root:
   - Cache core hub assets (HTML, CSS, JS, brand logos, Lucide icon script, audio assets) under `arcadeverse-core-v1`.
   - Implement **Cache-First** strategy for static styling and fonts.
   - Implement **Stale-While-Revalidate** strategy for `games-registry.js` and game bundles under `/games/`.
2. Register the service worker in `index.html`:
   ```javascript
   if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
       navigator.serviceWorker.register('./sw.js').catch(err => console.warn('SW registration failed:', err));
     });
   }
   ```
3. Surface a subtle "Offline Mode Ready" banner when all core bundles are cached.

#### Acceptance Criteria
- [ ] Turning on Chrome DevTools "Offline" mode allows the homepage and previously visited games to load seamlessly.
- [ ] Lighthouse PWA audit reports a passing Service Worker score.
- [ ] Cache automatically invalidates when new version hashes are deployed.

---

### Issue #08: Upgrade Web App Manifest (`manifest.json`) for Modern PWA Installability
- **Labels:** `pwa`, `standards`, `good first issue`
- **Severity:** Medium
- **Affected Files:** `manifest.json`, `assets/public/`

#### Problem Description
The current `manifest.json` lacks a 512x512 icon, `screenshots` array, `id`, and category declarations. Consequently, modern Chromium, Edge, and Android devices will not trigger the native rich PWA install banner.

#### Technical Specifications & Proposed Solution
1. Add a 512x512 PNG icon to `assets/public/favicon-512x512.png`.
2. Update `manifest.json`:
   ```json
   {
     "id": "com.arcadeverse.nsoc26",
     "name": "ArcadeVerse: Open-Source Community Arcade",
     "short_name": "ArcadeVerse",
     "start_url": "./index.html",
     "scope": "./",
     "display": "standalone",
     "orientation": "any",
     "background_color": "#060913",
     "theme_color": "#00f5ff",
     "categories": ["games", "entertainment"],
     "icons": [
       { "src": "assets/public/favicon-32x32.png", "sizes": "32x32", "type": "image/png" },
       { "src": "assets/public/favicon-192x192.png", "sizes": "192x192", "type": "image/png" },
       { "src": "assets/public/favicon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
     ],
     "screenshots": [
       { "src": "assets/public/screenshot-desktop.webp", "sizes": "1280x720", "type": "image/webp", "form_factor": "wide" },
       { "src": "assets/public/screenshot-mobile.webp", "sizes": "720x1280", "type": "image/webp" }
     ]
   }
   ```

#### Acceptance Criteria
- [ ] Desktop and mobile browsers display the native "Install ArcadeVerse" prompt.
- [ ] Lighthouse PWA installability check passes 100%.

---

### Issue #09: Lightweight Fuzzy Search Engine & Multi-Facet Filtering Bar
- **Labels:** `enhancement`, `ux`, `search`, `catalog`
- **Severity:** Medium
- **Affected Files:** `assets/js/app.js`, `index.html`, `assets/css/style.css`

#### Problem Description
The catalog search relies solely on `.includes()` substring matching. Minor typos (e.g. "solitare", "spae", "sudok") yield 0 results. Furthermore, users cannot filter games by difficulty (Easy, Medium, Hard, Expert) or combine multiple tags simultaneously.

#### Technical Specifications & Proposed Solution
1. Incorporate a lightweight, zero-dependency fuzzy search matching algorithm (Bitap or Levenshtein distance $\le 2$).
2. Expand the search toolbar with:
   - **Difficulty Dropdown:** All, Easy, Medium, Hard, Expert, Survival.
   - **Sort Dropdown:** Featured, Alphabetical (A-Z), Community Rating, Newest Release.
   - **Multi-select Tag Chips:** Halloween, Action, Retro, Top-Down, Puzzle, Sci-Fi.
3. Debounce input queries by 200ms to guarantee 60 FPS typing responsiveness.

#### Acceptance Criteria
- [ ] Searches with 1–2 character typos successfully return the intended game.
- [ ] Combining Category + Difficulty + Search query filters results accurately.
- [ ] Filter clearing resets all facets smoothly without full page reload.

---

### Issue #10: Enforce Strict Modal Focus Trap & WCAG 2.1 Screen Reader Live Regions
- **Labels:** `accessibility`, `a11y`, `wcag`, `keyboard`
- **Severity:** High
- **Affected Files:** `assets/js/app.js`, `assets/css/style.css`, `index.html`

#### Problem Description
When the game player modal opens, keyboard focus is initially set to `closeModalBtn`. However, pressing Tab repeatedly allows the focus cursor to escape the modal window and cycle through obscured background elements on `index.html`. Furthermore, screen readers are not notified of modal launch via proper `aria-modal="true"` or `aria-live` status regions.

#### Technical Specifications & Proposed Solution
1. Implement a focus trap utility in `assets/js/app.js`:
   - Query all focusable elements inside `.modal-window` (`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`).
   - Listen for `keydown` (Tab / Shift+Tab):
     - If on last element and pressing Tab, cycle focus back to first element.
     - If on first element and pressing Shift+Tab, cycle focus back to last element.
2. Mark `#main-content`, `#navbar`, and footer with `aria-hidden="true"` while the modal is open, and remove the attribute on close.
3. Add `role="dialog"` and `aria-modal="true"` to `#game-modal`.

#### Acceptance Criteria
- [ ] Tab navigation is strictly trapped inside the modal while open.
- [ ] Pressing `Escape` reliably closes the modal and returns focus to the initiating card button.
- [ ] Automated accessibility audit reports zero focus-order violations.

---

### Issue #11: Universal User Save Data Backup & Migration (Export / Import JSON)
- **Labels:** `feature`, `data-persistence`, `settings`
- **Severity:** Medium
- **Affected Files:** `assets/js/app.js`, `index.html`, `assets/css/style.css`

#### Problem Description
All player preferences, favorited games, star ratings, recently played history, daily challenge streaks, and accessibility configurations are stored in fragmented `localStorage` keys. Clearing browser cache or switching devices wipes all user progress permanently.

#### Technical Specifications & Proposed Solution
1. Build a "Backup & Restore" modal in settings:
   - **Export Button:** Gathers all `arcadeverse_*` keys into a formatted JSON structure and triggers a file download: `arcadeverse-backup-YYYY-MM-DD.json`.
   - **Import Button:** Accepts a JSON file, validates schema and checksum, restores all `localStorage` entries, and prompts the user to refresh.
2. Provide a "Reset All Data" option with two-step confirmation for clean debugging.

#### Acceptance Criteria
- [ ] Exported JSON contains complete favorites, ratings, and streak data.
- [ ] Importing backup on another device or private window restores all user data seamlessly.
- [ ] Malformed or corrupted JSON files are rejected with a clear error toast.

---

### Issue #12: Dark & Light Mode Contrast Normalization with Embedded Canvas Themes
- **Labels:** `ui`, `theming`, `contrast`, `accessibility`
- **Severity:** Medium
- **Affected Files:** `assets/js/app.js`, `assets/css/style.css`, `games/*/style.css`

#### Problem Description
ArcadeVerse features a Dark / Light theme toggle. However, 90% of community games are hardcoded for dark backgrounds. When the parent hub is in Light Mode, iframes without explicit background fills render on white backgrounds, causing white text, particle effects, and light UI bars to wash out completely.

#### Technical Specifications & Proposed Solution
1. When opening the game modal, pass the active theme as a query parameter or attribute:
   ```javascript
   gameIframe.src = `${game.path}?theme=${document.documentElement.getAttribute('data-theme') || 'dark'}`;
   ```
2. In `assets/css/style.css`, enforce strict `#000000` default background fill on `.modal-frame-wrapper` and `#game-iframe`.
3. Add a global CSS fallback in contributor guidelines ensuring game canvases always declare explicit background colors.

#### Acceptance Criteria
- [ ] Switching between light and dark modes in the hub never causes text or elements to become unreadable inside games.
- [ ] The game modal container maintains high-contrast letterboxing regardless of active theme.

---

### Issue #13: Cross-Game Global Achievement Engine & Toast Notification System
- **Labels:** `feature`, `gamification`, `achievements`, `hall-of-fame`
- **Severity:** High
- **Affected Files:** `assets/js/trophy-card.js`, `assets/js/achievements-engine.js`, `index.html`, `leaderboard.html`

#### Problem Description
While `trophy-card.js` provides visual badges, there is no cross-game achievement engine that detects in-game milestones and awards permanent trophies (e.g., *"Curse Breaker"* for solving Blackwood Manor, *"Castaway"* for surviving 5 days, *"Speedrunner"* for completing an escape room under 3 minutes).

#### Technical Specifications & Proposed Solution
1. Create `assets/js/achievements-engine.js`:
   - Maintain an achievement registry with ID, title, description, icon, and rarity tier.
   - Listen for `ARCADEVERSE_UNLOCK_ACHIEVEMENT` messages from game iframes.
   - Prevent duplicate unlocks; store unlocked achievements in `localStorage`.
2. Display a polished, retro-styled toast in the top-right corner whenever an achievement triggers:
   `[🏆 Achievement Unlocked: Curse Breaker — Banished the 1898 Blackwood entity!]`
3. Add an "Achievements Gallery" tab to `leaderboard.html` showcasing unlocked vs locked trophies with completion percentage.

#### Acceptance Criteria
- [ ] Games can fire achievement unlock events via simple postMessage.
- [ ] Unlocked achievements persist across sessions and display in the Hall of Fame.
- [ ] Sound engine plays an authentic achievement chime upon unlocking.

---

### Issue #14: Automated Headless CI Smoke Test Suite for All 52 Games via Playwright
- **Labels:** `devops`, `ci-cd`, `testing`, `playwright`
- **Severity:** Critical
- **Affected Files:** `.github/workflows/game-smoke-test.yml`, `scripts/smoke-test-games.js`

#### Problem Description
The existing pre-flight script `scripts/validate-games.js` only checks metadata schema and file presence. It does not execute JavaScript code. As a result, PRs with syntax errors, undefined variable references, or broken resize listeners have passed CI and merged, breaking games at runtime.

#### Technical Specifications & Proposed Solution
1. Create `scripts/smoke-test-games.js` using Playwright:
   - Read all games from `games-registry.js`.
   - Launch each game's `index.html` in headless Chromium.
   - Listen to `page.on('pageerror')` and `page.on('console')`.
   - Wait 3 seconds for `requestAnimationFrame` loops and canvas rendering to initialize.
   - Fail with exit code 1 if any unhandled error is thrown.
2. Integrate into `.github/workflows/build-registry.yml` or create `.github/workflows/game-smoke-test.yml` running on pull requests.

#### Acceptance Criteria
- [ ] CI automatically runs headless smoke tests on all incoming PRs.
- [ ] Any PR containing runtime JavaScript syntax or initialization errors is blocked from merging.
- [ ] Smoke test completes under 90 seconds for all 52 games.

---

### Issue #15: Dynamic Contributor Discovery in `build-registry.js` (Eliminate Hardcoding)
- **Labels:** `tooling`, `architecture`, `refactor`
- **Severity:** High
- **Affected Files:** `scripts/build-registry.js`

#### Problem Description
`scripts/build-registry.js` contains a hardcoded `KNOWN_PROFILES` JavaScript object containing contributor names, GitHub logins, and roles. When a new open-source contributor builds a game, their contribution is assigned generic fallback metrics unless a maintainer manually edits the script.

#### Technical Specifications & Proposed Solution
1. Refactor `scripts/build-registry.js` to dynamically extract contributor profiles:
   - Parse `author`, `github`, and `role` fields directly from each game's `game.json`.
   - Execute `git log --author="<github>"` to compute live commit and PR counts dynamically.
   - Remove the static `KNOWN_PROFILES` object in favor of dynamic aggregation.
2. Generate `assets/js/games-registry.js` with 100% dynamic contributor attribution.

#### Acceptance Criteria
- [ ] New contributors submitting games are automatically registered in `CONTRIBUTORS_REGISTRY` without script edits.
- [ ] Commit counts and role titles reflect live repository data accurately.

---

### Issue #16: *Island Survival* Expansion: Night Predators, Campfire Radius & Raft Escape
- **Labels:** `game-polish`, `mechanics`, `gameplay`, `survival`
- **Severity:** High
- **Affected Files:** `games/island-survival_debasmita/game.js`, `games/island-survival_debasmita/style.css`

#### Problem Description
In *Island Survival: Lost Beyond the Shore*, the day/night cycle causes darkness but introduces no actual nocturnal survival threats. Campfires cannot be constructed for warmth/safety, and there is no tangible win condition or escape method.

#### Technical Specifications & Proposed Solution
1. **Campfire Crafting Recipe:**
   - Craftable with 5 Wood + 3 Stones.
   - Placed campfires emit a warm dynamic flickering circular light radius that deters night predators and prevents energy drain.
2. **Night Predator Entities:**
   - Spawn nocturnal island wolves/panthers that stalk the player when darkness falls.
   - Predators flee when approaching campfire light radius or when attacked with a Spear.
3. **Endgame Raft Construction:**
   - Build a multi-tier escape raft on the shore: Tier 1 (15 Timber Logs) $\rightarrow$ Tier 2 (8 Vine Ropes) $\rightarrow$ Tier 3 (1 Cloth Canvas).
   - Boarding the finished raft triggers the cinematic "Escaped the Island!" victory ending.

#### Acceptance Criteria
- [ ] Players can place campfires that dynamically illuminate surrounding darkness.
- [ ] Nighttime introduces genuine survival dread with hostile predator AI.
- [ ] Completing the raft triggers a dedicated victory modal with survival stats.

---

### Issue #17: *Witch's Crypt Escape*: Drag-and-Drop Cauldron Mixing & Fluid Splash Physics
- **Labels:** `game-polish`, `immersion`, `puzzle`, `physics`
- **Severity:** Medium
- **Affected Files:** `games/escape-room_debasmita/game.js`, `games/escape-room_debasmita/style.css`

#### Problem Description
In *Halloween Escape: Witch's Crypt*, adding ingredients to the alchemical cauldron currently requires selecting an item in the bottom tray and clicking a modal button. Players expect tactile physical interaction with the cauldron stage.

#### Technical Specifications & Proposed Solution
1. Add drag-and-drop / direct pointer-drop interaction:
   - Players can drag ingredient icons (Spider Venom, Mandrake Root, Cursed Ash) directly into the cauldron mouth on the canvas.
2. **Fluid Physics & Visual Polish:**
   - On ingredient drop, spawn 12 dynamic liquid droplet splash particles using quadratic bezier curves.
   - Cauldron liquid smoothly transitions color (Deep Purple $\rightarrow$ Murky Violet $\rightarrow$ Bubbling Emerald Acid).
   - Play a fizzy bubbling audio cue synthesized via Web Audio API.

#### Acceptance Criteria
- [ ] Ingredients can be dragged directly into the cauldron with collision detection.
- [ ] Dropping ingredients triggers fluid color shifting and particle splash droplets.
- [ ] Mobile touch drag-and-drop works smoothly without scroll jitter.

---

### Issue #18: Universal Aspect-Ratio Letterbox & Viewport Anchoring for Ultrawide & Mobile
- **Labels:** `responsive`, `layout`, `css`
- **Severity:** Medium
- **Affected Files:** `assets/css/style.css`, `assets/js/app.js`

#### Problem Description
On 21:9 ultrawide monitors and 9:16 vertical smartphone screens, fixed 16:9 canvas games either stretch distort, or their corners get obscured by top/bottom HUD headers because there is no standardized aspect-ratio letterbox constraint.

#### Technical Specifications & Proposed Solution
1. In `assets/css/style.css`, update `.modal-frame-wrapper`:
   ```css
   .modal-frame-wrapper {
     position: relative;
     width: 100%;
     height: 100%;
     display: flex;
     align-items: center;
     justify-content: center;
     background: #000000;
   }
   #game-iframe {
     max-width: 100%;
     max-height: 100%;
     aspect-ratio: 16 / 9;
     object-fit: contain;
     box-shadow: 0 0 30px rgba(0, 0, 0, 0.9);
   }
   ```
2. Automatically adjust between 16:9 and 4:3 aspect ratios based on game metadata in `game.json`.

#### Acceptance Criteria
- [ ] Games maintain clean, undistorted geometry on ultrawide, standard, and vertical phone displays.
- [ ] Black letterbox / pillarbox bars frame the canvas with crisp edges.

---

### Issue #19: Adaptive Eco Mode: Frame Rate Throttling & Ambient Background Suspension
- **Labels:** `performance`, `battery`, `eco-mode`, `mobile`
- **Severity:** Medium
- **Affected Files:** `assets/js/a11y-engine.js`, `assets/css/style.css`, `index.html`

#### Problem Description
Running 60 FPS HTML5 Canvas games alongside moving CSS ambient glow orbs (`.glow-orb`), animated cyber grids, and fog layers causes severe thermal throttling, frame stutter, and rapid battery depletion on low-to-mid-tier laptops and mobile phones.

#### Technical Specifications & Proposed Solution
1. Add an "Eco Mode / Battery Saver" toggle in the Accessibility Hub:
   - Pauses CSS glow orb animations and background grid drift (`animation-play-state: paused`).
   - Caps game iframe animation loops to 30 FPS when battery level is below 20% via `navigator.getBattery()`.
   - Disables expensive canvas blur filters (`ctx.filter = 'none'`).

#### Acceptance Criteria
- [ ] Toggling Eco Mode reduces CPU/GPU utilization by over 40% on test benchmarks.
- [ ] Low-end mobile devices sustain smooth gameplay without overheating.

---

### Issue #20: Standardize Visual Gameplay Thumbnails (`thumbnail.webp`) for All Games
- **Labels:** `visuals`, `catalog`, `good first issue`
- **Severity:** Medium
- **Affected Files:** `scripts/validate-games.js`, `scripts/build-registry.js`, `assets/js/app.js`, `games/*/thumbnail.webp`

#### Problem Description
Game cards in the catalog currently display generic Lucide vector icons inside solid gradient boxes. Players cannot preview what the gameplay or graphics look like before launching, which diminishes catalog engagement.

#### Technical Specifications & Proposed Solution
1. Standardize a 320x180 WebP gameplay screenshot (`thumbnail.webp`) in each game directory (`games/<game_id>/thumbnail.webp`).
2. Update `scripts/validate-games.js` to optionally verify thumbnail dimensions and compression ($< 45\text{ KB}$).
3. In `assets/js/app.js`, render the thumbnail on the card preview with a subtle hover zoom effect (`transform: scale(1.05)`). Fall back gracefully to the Lucide icon if no thumbnail is provided.

#### Acceptance Criteria
- [ ] Catalog cards display crisp, compressed gameplay preview thumbnails.
- [ ] Cards load with smooth lazy-loading (`loading="lazy"`).
- [ ] Contributor guide updated with image dimensions and format requirements.

---
*Created for ArcadeVerse • NSOC Winter Edition 2026 • Lead: Debasmita Bose (@DebasmitaBose0)*
