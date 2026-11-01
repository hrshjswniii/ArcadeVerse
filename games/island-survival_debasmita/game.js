/**
 * Island Survival: Lost Beyond the Shore
 * High-Fidelity Fullscreen 2D Sandbox Survival Adventure
 * Author: Debasmita Bose (DebasmitaBose0)
 */

(() => {
  'use strict';

  // --- Procedural Web Audio Sound Engine ---
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.muted = false;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playChop() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    }

    playMine() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    }

    playEat() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(450, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    }

    playCraft() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      [0, 0.11].forEach(delay => {
        setTimeout(() => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(540, this.ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.07);
          gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.07);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.07);
        }, delay * 1000);
      });
    }

    playAttack() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(340, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    }

    playThunder() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(90, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(25, this.ctx.currentTime + 1.2);
      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.2);
    }

    playVictory() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      const notes = [392, 523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.45);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.45);
        }, idx * 160);
      });
    }
  }

  const sound = new SoundEngine();

  // --- Canvas Setup & Fullscreen Resizing ---
  const canvas = document.getElementById('islandCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // DOM Elements
  const healthBar = document.getElementById('healthBar');
  const hungerBar = document.getElementById('hungerBar');
  const thirstBar = document.getElementById('thirstBar');
  const energyBar = document.getElementById('energyBar');

  const dayText = document.getElementById('dayText');
  const timeText = document.getElementById('timeText');
  const weatherText = document.getElementById('weatherText');
  const weatherFx = document.getElementById('weatherFx');
  const lightningFx = document.getElementById('lightningFx');
  const eventToast = document.getElementById('eventToast');
  const questText = document.getElementById('questText');

  const resWood = document.getElementById('resWood');
  const resStone = document.getElementById('resStone');
  const resVines = document.getElementById('resVines');
  const resLeaves = document.getElementById('resLeaves');
  const resFood = document.getElementById('resFood');
  const equippedTool = document.getElementById('equippedTool');

  // Modals
  const modalCrafting = document.getElementById('modalCrafting');
  const craftingGrid = document.getElementById('craftingGrid');
  const modalHelp = document.getElementById('modalHelp');
  const modalEnding = document.getElementById('modalEnding');
  const endingTitle = document.getElementById('endingTitle');
  const endingDesc = document.getElementById('endingDesc');
  const statDays = document.getElementById('statDays');
  const statCrafted = document.getElementById('statCrafted');
  const statScore = document.getElementById('statScore');

  // --- World Constants ---
  const WORLD_W = 1600;
  const WORLD_H = 1100;
  const ISLAND_CX = WORLD_W / 2;
  const ISLAND_CY = WORLD_H / 2;
  const ISLAND_RX = 680;
  const ISLAND_RY = 440;

  // --- Game State ---
  const state = {
    running: true,
    day: 1,
    timeOfDay: 0.35, // 0=dawn, 0.25=noon, 0.75=dusk, 0.85-1=night
    timeSpeed: 0.015,
    weather: 'clear',
    weatherTimer: 0,
    statsCrafted: 0,
    statsScore: 0,

    camera: { x: 0, y: 0 },

    player: {
      x: ISLAND_CX - 150,
      y: ISLAND_CY + 280,
      vx: 0,
      vy: 0,
      angle: 0,
      speed: 3.5,
      radius: 16,
      walkStep: 0,
      swinging: 0,
      health: 100,
      hunger: 85,
      thirst: 75,
      energy: 90,
      equippedTool: 'Bare Hands',
      hasPlaneBattery: false,
      targetX: null,
      targetY: null,
      interactTarget: null
    },

    inventory: {
      wood: 4,
      stone: 3,
      vines: 1,
      leaves: 5,
      coconuts: 2,
      berries: 2,
      fish: 0,
      meat: 0,
      cookedFood: 0,
      waterBottles: 0
    },

    trees: [],
    rocks: [],
    bushes: [],
    spring: { x: ISLAND_CX + 20, y: ISLAND_CY - 60, radius: 36 },
    planeWreck: { x: ISLAND_CX - 280, y: ISLAND_CY + 320, searched: false },
    radioCliff: { x: ISLAND_CX + 440, y: ISLAND_CY - 220 },

    structures: {
      campfires: [],
      shelters: [],
      rafts: [],
      beacons: []
    },

    wildlife: [],
    fireflies: [],
    particles: [],
    floatingTexts: [],
    screenShake: { intensity: 0, x: 0, y: 0 },
    cloudShadows: [],
    seabirds: [],
    tropicalFish: [],
    windLeaves: [],
    splashRipples: [],

    keys: { up: false, down: false, left: false, right: false }
  };

  // --- World Generation ---
  function initWorld() {
    // Palm & Vine Trees
    for (let i = 0; i < 28; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = 80 + Math.random() * (ISLAND_RY - 100);
      const tx = ISLAND_CX + Math.cos(a) * (d * (ISLAND_RX / ISLAND_RY));
      const ty = ISLAND_CY + Math.sin(a) * d;
      state.trees.push({
        x: tx,
        y: ty,
        hp: 3,
        maxHp: 3,
        type: Math.random() > 0.35 ? 'palm' : 'vine'
      });
    }

    // Granite Boulders
    for (let i = 0; i < 18; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = 100 + Math.random() * (ISLAND_RY - 110);
      const rx = ISLAND_CX + Math.cos(a) * (d * (ISLAND_RX / ISLAND_RY));
      const ry = ISLAND_CY + Math.sin(a) * d;
      state.rocks.push({
        x: rx,
        y: ry,
        hp: 4,
        maxHp: 4
      });
    }

    // Berry Bushes
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = 60 + Math.random() * (ISLAND_RY - 120);
      const bx = ISLAND_CX + Math.cos(a) * (d * (ISLAND_RX / ISLAND_RY));
      const by = ISLAND_CY + Math.sin(a) * d;
      state.bushes.push({
        x: bx,
        y: by,
        hasBerries: true
      });
    }

    // Coastal Crabs
    for (let i = 0; i < 8; i++) {
      state.wildlife.push({
        type: 'crab',
        x: ISLAND_CX - 300 + Math.random() * 600,
        y: ISLAND_CY + 320 + Math.random() * 60,
        vx: 0,
        vy: 0,
        hp: 15,
        maxHp: 15,
        speed: 0.9,
        aggro: false
      });
    }

    // Wild Boars
    for (let i = 0; i < 4; i++) {
      state.wildlife.push({
        type: 'boar',
        x: ISLAND_CX - 150 + Math.random() * 300,
        y: ISLAND_CY - 100 + Math.random() * 200,
        vx: 0,
        vy: 0,
        hp: 50,
        maxHp: 50,
        speed: 1.8,
        aggro: false
      });
    }

    // Fireflies
    for (let i = 0; i < 30; i++) {
      state.fireflies.push({
        x: ISLAND_CX + (Math.random() - 0.5) * ISLAND_RX * 1.5,
        y: ISLAND_CY + (Math.random() - 0.5) * ISLAND_RY * 1.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        pulse: Math.random() * Math.PI * 2
      });
    }

    // Drifting Fluffy Cloud Shadows
    for (let i = 0; i < 5; i++) {
      state.cloudShadows.push({
        x: Math.random() * WORLD_W,
        y: 100 + Math.random() * (WORLD_H - 200),
        rx: 120 + Math.random() * 80,
        ry: 70 + Math.random() * 45,
        speed: 12 + Math.random() * 10
      });
    }

    // Overhead Circling Tropical Seabirds
    for (let i = 0; i < 6; i++) {
      state.seabirds.push({
        cx: ISLAND_CX + (Math.random() - 0.5) * 400,
        cy: ISLAND_CY + (Math.random() - 0.5) * 300,
        radius: 140 + Math.random() * 180,
        angle: Math.random() * Math.PI * 2,
        speed: 0.45 + Math.random() * 0.35,
        flapPhase: Math.random() * Math.PI * 2,
        flapSpeed: 10 + Math.random() * 4,
        x: 0,
        y: 0
      });
    }

    // Coastal Tropical Fish in Shallow Waters
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = ISLAND_RY + 10 + Math.random() * 80;
      state.tropicalFish.push({
        x: ISLAND_CX + Math.cos(a) * (d * (ISLAND_RX / ISLAND_RY)),
        y: ISLAND_CY + Math.sin(a) * d,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        color: ['#ffd54f', '#26c6da', '#ff7043', '#80cbc4'][i % 4],
        tailPhase: Math.random() * Math.PI * 2
      });
    }

    // Ambient Wind Leaves & Petals
    for (let i = 0; i < 18; i++) {
      state.windLeaves.push({
        x: Math.random() * WORLD_W,
        y: Math.random() * WORLD_H,
        vx: 1.2 + Math.random() * 1.5,
        vy: 0.4 + Math.random() * 0.8,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.08,
        size: 3 + Math.random() * 3,
        color: ['#81c784', '#aed581', '#fff59d', '#ffab91'][i % 4]
      });
    }
  }
  initWorld();

  // --- Crafting Recipes System ---
  const CRAFTING_RECIPES = [
    {
      id: 'stone_axe',
      title: 'Stone Axe',
      desc: 'Chops trees in 2 hits instead of 6. Yields extra wood.',
      cost: { wood: 2, stone: 3, vines: 1 },
      onCraft: () => {
        state.player.equippedTool = 'Stone Axe';
        showToast('Crafted Stone Axe! Equipped.');
      }
    },
    {
      id: 'wooden_spear',
      title: 'Wooden Spear',
      desc: 'Formidable weapon for hunting wild boars and catching fish.',
      cost: { wood: 3, stone: 1, vines: 2 },
      onCraft: () => {
        state.player.equippedTool = 'Wooden Spear';
        showToast('Crafted Wooden Spear! Equipped.');
      }
    },
    {
      id: 'fishing_rod',
      title: 'Fishing Rod',
      desc: 'Catch fresh ocean and lagoon fish for high protein.',
      cost: { wood: 2, vines: 2 },
      onCraft: () => {
        state.player.equippedTool = 'Fishing Rod';
        showToast('Crafted Fishing Rod! Fish at water shores.');
      }
    },
    {
      id: 'water_container',
      title: 'Water Container',
      desc: 'Carries clean freshwater gathered from the spring.',
      cost: { coconuts: 2, vines: 2 },
      onCraft: () => {
        state.inventory.waterBottles += 2;
        showToast('Crafted 2 Clean Water Flasks!');
      }
    },
    {
      id: 'bandages',
      title: 'Herbal Bandages',
      desc: 'Treat wounds and restore 35 Health instantly.',
      cost: { leaves: 4, vines: 1 },
      onCraft: () => {
        state.player.health = Math.min(100, state.player.health + 35);
        showToast('Applied Herbal Bandages (+35 Health)!');
      }
    },
    {
      id: 'campfire',
      title: 'Campfire',
      desc: 'Places a campfire. Cooks raw food and warms you at night.',
      cost: { wood: 4, stone: 3 },
      onCraft: () => {
        state.structures.campfires.push({
          x: state.player.x,
          y: state.player.y,
          fuel: 100
        });
        showToast('Built Campfire! Standing near it restores energy.');
      }
    },
    {
      id: 'basic_shelter',
      title: 'Basic Shelter',
      desc: 'A palm lean-to. Protects from tropical storms and allows sleep.',
      cost: { wood: 10, leaves: 8 },
      onCraft: () => {
        state.structures.shelters.push({
          x: state.player.x,
          y: state.player.y
        });
        showToast('Constructed Shelter! Press [Rest] to sleep through night.');
      }
    },
    {
      id: 'escape_raft',
      title: 'Seaworthy Raft (Escape)',
      desc: 'Construct a sturdy raft on the beach to sail to civilization.',
      cost: { wood: 20, vines: 8, leaves: 6, coconuts: 4 },
      onCraft: () => {
        state.structures.rafts.push({
          x: ISLAND_CX,
          y: ISLAND_CY + 400,
          ready: true
        });
        showToast('Built Seaworthy Escape Raft on the beach! Interact to escape!');
      }
    },
    {
      id: 'radio_beacon',
      title: 'SOS Radio Beacon (Escape)',
      desc: 'Erect an emergency radio antenna on the high cliff ridge.',
      cost: { wood: 15, stone: 5, vines: 4 },
      onCraft: () => {
        if (!state.player.hasPlaneBattery) {
          showToast('You still need the Aircraft Radio Battery from the plane crash!');
          return;
        }
        state.structures.beacons.push({
          x: state.radioCliff.x,
          y: state.radioCliff.y,
          active: true
        });
        showToast('Erected SOS Beacon! Emergency distress signals sent!');
      }
    }
  ];

  function renderCraftingManual() {
    craftingGrid.innerHTML = '';
    CRAFTING_RECIPES.forEach(rec => {
      const card = document.createElement('div');
      card.className = 'craft-card';

      let canCraft = true;
      const costParts = [];
      for (const [res, amt] of Object.entries(rec.cost)) {
        const available = state.inventory[res] || 0;
        costParts.push(`${amt} ${res.toUpperCase()} (${available})`);
        if (available < amt) canCraft = false;
      }

      card.innerHTML = `
        <div>
          <span class="craft-card-title">${rec.title}</span>
          <p class="craft-recipe" style="margin: 6px 0;">${rec.desc}</p>
          <p class="craft-recipe"><strong>Cost:</strong> ${costParts.join(', ')}</p>
        </div>
        <button class="btn-craft-item" ${canCraft ? '' : 'disabled'}>Craft</button>
      `;

      card.querySelector('.btn-craft-item').addEventListener('click', () => {
        if (!canCraft) return;
        sound.playCraft();
        for (const [res, amt] of Object.entries(rec.cost)) {
          state.inventory[res] -= amt;
        }
        state.statsCrafted++;
        state.statsScore += 80;
        rec.onCraft();
        updateUI();
        renderCraftingManual();
      });

      craftingGrid.appendChild(card);
    });
  }

  // --- Keyboard & Input Listeners ---
  window.addEventListener('keydown', e => {
    sound.init();
    const k = e.key.toLowerCase();
    if (k === 'w' || k === 'arrowup') state.keys.up = true;
    if (k === 's' || k === 'arrowdown') state.keys.down = true;
    if (k === 'a' || k === 'arrowleft') state.keys.left = true;
    if (k === 'd' || k === 'arrowright') state.keys.right = true;

    if (e.code === 'Space') {
      e.preventDefault();
      performAction();
    }
    if (k === 'c') openCraftingModal();
    if (k === 'e') consumeFoodOrWater();
    if (k === 'r') restOrSleep();
  });

  window.addEventListener('keyup', e => {
    const k = e.key.toLowerCase();
    if (k === 'w' || k === 'arrowup') state.keys.up = false;
    if (k === 's' || k === 'arrowdown') state.keys.down = false;
    if (k === 'a' || k === 'arrowleft') state.keys.left = false;
    if (k === 'd' || k === 'arrowright') state.keys.right = false;
  });

  
  // --- Canvas Click & Tap to Move / Interact ---
  canvas.addEventListener('click', e => {
    sound.init();
    if (!state.running) return;
    const rect = canvas.getBoundingClientRect();
    const clickScreenX = e.clientX - rect.left;
    const clickScreenY = e.clientY - rect.top;
    const worldX = clickScreenX + state.camera.x;
    const worldY = clickScreenY + state.camera.y;

    const p = state.player;
    let targetObj = null;

    // Check if clicked an interactive object
    for (const t of state.trees) {
      if (Math.hypot(worldX - t.x, worldY - t.y) < 40) { targetObj = t; break; }
    }
    if (!targetObj) {
      for (const r of state.rocks) {
        if (Math.hypot(worldX - r.x, worldY - r.y) < 35) { targetObj = r; break; }
      }
    }
    if (!targetObj) {
      for (const b of state.bushes) {
        if (Math.hypot(worldX - b.x, worldY - b.y) < 30) { targetObj = b; break; }
      }
    }
    if (!targetObj && Math.hypot(worldX - state.spring.x, worldY - state.spring.y) < 45) {
      targetObj = state.spring;
    }
    if (!targetObj && Math.hypot(worldX - state.planeWreck.x, worldY - state.planeWreck.y) < 55) {
      targetObj = state.planeWreck;
    }

    if (targetObj) {
      p.targetX = targetObj.x;
      p.targetY = targetObj.y;
      p.interactTarget = targetObj;
    } else {
      p.targetX = worldX;
      p.targetY = worldY;
      p.interactTarget = null;
    }
  });

  // Touch Controls
  const bindTouch = (id, onDown, onUp) => {
    const el = document.getElementById(id);
    if (!el) return;
    const down = e => {
      e.preventDefault();
      sound.init();
      onDown();
    };
    const up = e => {
      e.preventDefault();
      if (onUp) onUp();
    };
    el.addEventListener('touchstart', down, { passive: false });
    el.addEventListener('touchend', up, { passive: false });
    el.addEventListener('mousedown', down);
    el.addEventListener('mouseup', up);
  };

  bindTouch('btnUp', () => { state.keys.up = true; }, () => { state.keys.up = false; });
  bindTouch('btnDown', () => { state.keys.down = true; }, () => { state.keys.down = false; });
  bindTouch('btnLeft', () => { state.keys.left = true; }, () => { state.keys.left = false; });
  bindTouch('btnRight', () => { state.keys.right = true; }, () => { state.keys.right = false; });
  bindTouch('touchAction', () => performAction());

  document.getElementById('btnOpenCrafting').addEventListener('click', openCraftingModal);
  document.getElementById('btnEatDrink').addEventListener('click', consumeFoodOrWater);
  document.getElementById('btnRest').addEventListener('click', restOrSleep);

  function openCraftingModal() {
    sound.playCraft();
    renderCraftingManual();
    modalCrafting.classList.add('open');
  }

  // --- Perform Action (Harvest / Attack / Interact) ---
  function performAction() {
    if (!state.running) return;
    const p = state.player;
    p.swinging = 14; // trigger swing animation
    p.energy = Math.max(0, p.energy - 3);

    let acted = false;

    // 1. Check Trees
    for (let i = state.trees.length - 1; i >= 0; i--) {
      const t = state.trees[i];
      if (Math.hypot(p.x - t.x, p.y - t.y) < p.radius + 52) {
        sound.playChop();
        triggerScreenShake(4);
        const damage = p.equippedTool === 'Stone Axe' ? 2 : 1;
        t.hp -= damage;
        createParticles(t.x, t.y, 10, '#8d6e63');
        if (t.hp <= 0) {
          const woodYield = p.equippedTool === 'Stone Axe' ? 4 : 2;
          state.inventory.wood += woodYield;
          state.inventory.leaves += 2;
          spawnFloatText(t.x, t.y - 25, `+${woodYield} Wood`, '#ffd54f');
          if (t.type === 'palm' && Math.random() < 0.7) {
            state.inventory.coconuts += 1;
            spawnFloatText(t.x + 15, t.y - 45, '+1 Coconut', '#8d6e63');
            showToast(`Chopped tree! Obtained ${woodYield} Wood, 2 Leaves, and a Coconut.`);
          } else if (t.type === 'vine') {
            state.inventory.vines += 2;
            spawnFloatText(t.x + 15, t.y - 45, '+2 Vines', '#81c784');
            showToast(`Chopped vine tree! Obtained ${woodYield} Wood and 2 Jungle Vines.`);
          } else {
            showToast(`Chopped tree! Obtained ${woodYield} Wood.`);
          }
          state.trees.splice(i, 1);
        } else {
          spawnFloatText(t.x, t.y - 20, `Hit ${damage}`, '#ffb74d');
          showToast(`Chopping tree... (${t.hp}/${t.maxHp})`);
        }
        acted = true;
        break;
      }
    }

    // 2. Check Rocks
    if (!acted) {
      for (let i = state.rocks.length - 1; i >= 0; i--) {
        const r = state.rocks[i];
        if (Math.hypot(p.x - r.x, p.y - r.y) < p.radius + 52) {
          sound.playMine();
          triggerScreenShake(4.5);
          r.hp -= 1;
          createParticles(r.x, r.y, 10, '#b0bec5');
          if (r.hp <= 0) {
            state.inventory.stone += 3;
            spawnFloatText(r.x, r.y - 25, '+3 Stone', '#cfd8dc');
            showToast('Mined granite rock! Obtained 3 Stones.');
            state.rocks.splice(i, 1);
          } else {
            spawnFloatText(r.x, r.y - 20, 'Hit 1', '#eceff1');
            showToast(`Mining rock... (${r.hp}/${r.maxHp})`);
          }
          acted = true;
          break;
        }
      }
    }

    // 3. Check Berry Bushes
    if (!acted) {
      for (let i = 0; i < state.bushes.length; i++) {
        const b = state.bushes[i];
        if (Math.hypot(p.x - b.x, p.y - b.y) < p.radius + 45) {
          if (b.hasBerries) {
            b.hasBerries = false;
            sound.playEat();
            state.inventory.berries += 3;
            createParticles(b.x, b.y, 8, '#e91e63');
            spawnFloatText(b.x, b.y - 22, '+3 Berries', '#ff4081');
            showToast('Gathered 3 Ripe Jungle Berries!');
          } else {
            showToast('This bush has no ripe berries right now.');
          }
          acted = true;
          break;
        }
      }
    }

    // 4. Check Freshwater Spring
    if (!acted) {
      if (Math.hypot(p.x - state.spring.x, p.y - state.spring.y) < p.radius + state.spring.radius + 12) {
        sound.playEat();
        p.thirst = 100;
        createParticles(state.spring.x, state.spring.y, 10, '#29b6f6');
        spawnFloatText(state.spring.x, state.spring.y - 25, 'Thirst 100%', '#40c4ff');
        showToast('Drank fresh mountain spring water. Thirst 100%!');
        acted = true;
      }
    }

    // 5. Check Plane Crash Wreckage
    if (!acted) {
      const pw = state.planeWreck;
      if (Math.hypot(p.x - pw.x, p.y - pw.y) < p.radius + 45) {
        if (!pw.searched) {
          pw.searched = true;
          p.hasPlaneBattery = true;
          state.inventory.coconuts += 2;
          state.inventory.cookedFood += 2;
          sound.playCraft();
          triggerScreenShake(3);
          spawnFloatText(pw.x, pw.y - 30, '+Plane Battery & Rations', '#ffd54f');
          showToast('Salvaged Aircraft Emergency Battery & Canned Rations from the wreckage!');
        } else {
          showToast('The aircraft fuselage is stripped of useful parts.');
        }
        acted = true;
      }
    }

    // 6. Check Raft Escape
    if (!acted) {
      for (const r of state.structures.rafts) {
        if (Math.hypot(p.x - r.x, p.y - r.y) < 55) {
          triggerEnding('raft');
          acted = true;
          break;
        }
      }
    }

    // 7. Check SOS Beacon Escape
    if (!acted) {
      for (const b of state.structures.beacons) {
        if (Math.hypot(p.x - b.x, p.y - b.y) < 55) {
          triggerEnding('helicopter');
          acted = true;
          break;
        }
      }
    }

    // 8. Wildlife Attack / Hunt
    if (!acted) {
      for (let i = state.wildlife.length - 1; i >= 0; i--) {
        const w = state.wildlife[i];
        if (Math.hypot(p.x - w.x, p.y - w.y) < p.radius + 36) {
          sound.playAttack();
          triggerScreenShake(5.5);
          const damage = p.equippedTool === 'Wooden Spear' ? 30 : 12;
          w.hp -= damage;
          w.aggro = true;
          createParticles(w.x, w.y, 10, '#ff5252');
          spawnFloatText(w.x, w.y - 20, `-${damage} HP`, '#ff5252');
          if (w.hp <= 0) {
            if (w.type === 'boar') {
              state.inventory.meat += 2;
              spawnFloatText(w.x, w.y - 35, '+2 Raw Meat', '#ff1744');
              showToast('Defeated wild boar! Obtained 2 Raw Meat.');
            } else {
              state.inventory.meat += 1;
              spawnFloatText(w.x, w.y - 35, '+1 Crab Meat', '#ff7043');
              showToast('Caught coastal crab! Obtained 1 Crab Meat.');
            }
            state.wildlife.splice(i, 1);
          } else {
            showToast(`Attacked ${w.type}! (${w.hp}/${w.maxHp} HP)`);
          }
          acted = true;
          break;
        }
      }
    }

    // 9. Fishing in Ocean
    if (!acted && p.equippedTool === 'Fishing Rod') {
      const normX = (p.x - ISLAND_CX) / (ISLAND_RX - 20);
      const normY = (p.y - ISLAND_CY) / (ISLAND_RY - 20);
      if (normX * normX + normY * normY > 0.85) {
        sound.playMine();
        if (Math.random() < 0.65) {
          state.inventory.fish += 1;
          createParticles(p.x, p.y, 8, '#26c6da');
          spawnFloatText(p.x, p.y - 25, '+1 Fresh Fish', '#00e5a3');
          showToast('Reeled in a fresh ocean fish!');
        } else {
          showToast('The fish nibbled the bait and slipped away.');
        }
        acted = true;
      }
    }

    updateUI();
  }

  // --- Consume Food or Water ---
  function consumeFoodOrWater() {
    const p = state.player;
    sound.init();

    if (state.inventory.cookedFood > 0) {
      state.inventory.cookedFood--;
      p.hunger = Math.min(100, p.hunger + 40);
      p.health = Math.min(100, p.health + 20);
      sound.playEat();
      showToast('Ate Cooked Meal (+40 Hunger, +20 Health)!');
    } else if (state.inventory.coconuts > 0) {
      state.inventory.coconuts--;
      p.hunger = Math.min(100, p.hunger + 15);
      p.thirst = Math.min(100, p.thirst + 25);
      sound.playEat();
      showToast('Cracked fresh coconut (+15 Hunger, +25 Thirst)!');
    } else if (state.inventory.berries > 0) {
      state.inventory.berries--;
      p.hunger = Math.min(100, p.hunger + 12);
      p.thirst = Math.min(100, p.thirst + 8);
      sound.playEat();
      showToast('Ate juicy berries (+12 Hunger, +8 Thirst)!');
    } else if (state.inventory.fish > 0 || state.inventory.meat > 0) {
      let nearCampfire = false;
      for (const cf of state.structures.campfires) {
        if (Math.hypot(p.x - cf.x, p.y - cf.y) < 70) {
          nearCampfire = true;
          break;
        }
      }
      if (nearCampfire) {
        if (state.inventory.meat > 0) {
          state.inventory.meat--;
          state.inventory.cookedFood++;
          sound.playChop();
          showToast('Cooked raw meat over campfire! (+1 Cooked Meal)');
        } else {
          state.inventory.fish--;
          state.inventory.cookedFood++;
          sound.playChop();
          showToast('Grilled fresh fish over campfire! (+1 Cooked Meal)');
        }
      } else {
        if (state.inventory.fish > 0) state.inventory.fish--;
        else state.inventory.meat--;
        p.hunger = Math.min(100, p.hunger + 18);
        p.health = Math.max(0, p.health - 8);
        sound.playEat();
        showToast('Ate raw meat without cooking (-8 Health)! Build a campfire to cook safely.');
      }
    } else if (state.inventory.waterBottles > 0) {
      state.inventory.waterBottles--;
      p.thirst = 100;
      sound.playEat();
      showToast('Drank from clean water flask. Thirst 100%!');
    } else {
      showToast('No food or water in inventory! Forage coconuts or berries.');
    }
    updateUI();
  }

  // --- Rest or Sleep ---
  function restOrSleep() {
    const p = state.player;
    sound.init();

    let nearShelter = false;
    for (const sh of state.structures.shelters) {
      if (Math.hypot(p.x - sh.x, p.y - sh.y) < 65) {
        nearShelter = true;
        break;
      }
    }

    let nearCampfire = false;
    for (const cf of state.structures.campfires) {
      if (Math.hypot(p.x - cf.x, p.y - cf.y) < 70) {
        nearCampfire = true;
        break;
      }
    }

    if (nearShelter) {
      state.timeOfDay = 0.05;
      state.day++;
      p.energy = 100;
      p.health = Math.min(100, p.health + 25);
      p.hunger = Math.max(0, p.hunger - 20);
      p.thirst = Math.max(0, p.thirst - 20);
      state.statsScore += 150;
      sound.playVictory();
      showToast(`Slept safely in shelter! Day ${state.day} begins.`);

      if (state.day >= 6) triggerEnding('castaway');
    } else if (nearCampfire) {
      p.energy = Math.min(100, p.energy + 35);
      showToast('Rested by the warm campfire (+35 Energy).');
    } else {
      showToast('Cannot rest safely in the open wild! Stand near a campfire or shelter.');
    }
    updateUI();
  }

  // --- Trigger Endings ---
  function triggerEnding(type) {
    state.running = false;
    statDays.textContent = state.day;
    statCrafted.textContent = state.statsCrafted;
    statScore.textContent = state.statsScore;

    if (type === 'raft') {
      sound.playVictory();
      endingTitle.textContent = 'ENDING 1: OCEAN VOYAGER';
      endingTitle.className = 'ending-title victory';
      endingDesc.innerHTML = `
        <p>You launched the seaworthy raft into the calm turquoise waves with packed provisions.</p>
        <p style="margin-top: 10px;">After two days adrift, an international cargo freighter spotted your sail on the horizon and hoisted you aboard! You are going home!</p>
      `;
    } else if (type === 'helicopter') {
      sound.playVictory();
      endingTitle.textContent = 'ENDING 2: RESCUED BY AIR';
      endingTitle.className = 'ending-title victory';
      endingDesc.innerHTML = `
        <p>The emergency SOS radio beacon echoed across military search frequencies.</p>
        <p style="margin-top: 10px;">At daybreak, a Coast Guard search & rescue helicopter circled the island and landed on the beach. You survived!</p>
      `;
    } else if (type === 'castaway') {
      sound.playVictory();
      endingTitle.textContent = 'ENDING 3: ISLAND SOVEREIGN';
      endingTitle.className = 'ending-title victory';
      endingDesc.innerHTML = `
        <p>You adapted to the wild, built shelters, mastered fire, and conquered the island's wilderness.</p>
        <p style="margin-top: 10px;">You are no longer a castaway—you are the sovereign master of this tropical paradise!</p>
      `;
    } else {
      endingTitle.textContent = 'ENDING 4: CLAIMED BY THE WILD';
      endingTitle.className = 'ending-title defeat';
      endingDesc.innerHTML = `
        <p>Your vital signs plummeted to zero. The harsh wilderness of the uncharted island claimed your life.</p>
        <p style="margin-top: 10px;">Remember to manage hunger, drink clean water, and build shelters before night falls.</p>
      `;
    }
    modalEnding.classList.add('open');
  }

  function showToast(msg) {
    eventToast.textContent = msg;
    eventToast.classList.add('active');
    setTimeout(() => {
      eventToast.classList.remove('active');
    }, 3200);
  }

  function spawnFloatText(x, y, text, color = '#ffeb3b') {
    state.floatingTexts.push({
      x,
      y,
      text,
      color,
      vy: -1.2,
      alpha: 1,
      life: 0,
      maxLife: 42
    });
  }

  function triggerScreenShake(intensity = 4) {
    state.screenShake.intensity = Math.max(state.screenShake.intensity, intensity);
  }

  function createParticles(x, y, count, color) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const spd = 1 + Math.random() * 2.5;
      state.particles.push({
        x,
        y,
        vx: Math.cos(a) * spd,
        vy: Math.sin(a) * spd,
        radius: 2 + Math.random() * 2.5,
        color,
        life: 20
      });
    }
  }

  // --- Main 60 FPS Simulation Update ---
  let lastTime = performance.now();

  function update(delta) {
    if (!state.running) return;

    // Time cycle
    state.timeOfDay = (state.timeOfDay + state.timeSpeed * delta) % 1.0;
    if (state.timeOfDay < 0.01 && delta > 0) state.day++;

    let hour = Math.floor(state.timeOfDay * 24);
    let ampm = hour >= 12 ? 'PM' : 'AM';
    let h12 = hour % 12 || 12;
    timeText.textContent = `${h12}:00 ${ampm}`;
    dayText.textContent = `Day ${state.day}`;

    // Weather Simulation
    state.weatherTimer += delta;
    if (state.weatherTimer > 35) {
      state.weatherTimer = 0;
      const roll = Math.random();
      if (roll < 0.48) {
        state.weather = 'clear';
        weatherText.textContent = 'Clear';
        weatherFx.className = 'weather-overlay';
      } else if (roll < 0.82) {
        state.weather = 'rain';
        weatherText.textContent = 'Rainfall';
        weatherFx.className = 'weather-overlay rain';
        state.player.thirst = Math.min(100, state.player.thirst + 12);
      } else {
        state.weather = 'storm';
        weatherText.textContent = 'Storm';
        weatherFx.className = 'weather-overlay storm';
        sound.playThunder();
        triggerScreenShake(7);
        lightningFx.classList.add('flash');
        setTimeout(() => lightningFx.classList.remove('flash'), 120);
      }
    }

    // Screen Shake Decay
    if (state.screenShake.intensity > 0) {
      state.screenShake.x = (Math.random() - 0.5) * state.screenShake.intensity * 2.2;
      state.screenShake.y = (Math.random() - 0.5) * state.screenShake.intensity * 2.2;
      state.screenShake.intensity *= 0.88;
      if (state.screenShake.intensity < 0.2) {
        state.screenShake.intensity = 0;
        state.screenShake.x = 0;
        state.screenShake.y = 0;
      }
    }

    // Floating Text Popups Update
    for (let i = state.floatingTexts.length - 1; i >= 0; i--) {
      const ft = state.floatingTexts[i];
      ft.y += ft.vy;
      ft.life++;
      ft.alpha = 1 - (ft.life / ft.maxLife);
      if (ft.life >= ft.maxLife) state.floatingTexts.splice(i, 1);
    }

    // Drifting Cloud Shadows
    state.cloudShadows.forEach(c => {
      c.x += c.speed * delta;
      if (c.x > WORLD_W + c.rx + 50) c.x = -c.rx - 50;
    });

    // Circling Overhead Seabirds
    state.seabirds.forEach(b => {
      b.angle += b.speed * delta;
      b.x = b.cx + Math.cos(b.angle) * b.radius;
      b.y = b.cy + Math.sin(b.angle) * (b.radius * 0.65);
      b.flapPhase += b.flapSpeed * delta;
    });

    // Coastal Tropical Fish in Shallow Waters
    state.tropicalFish.forEach(f => {
      f.x += f.vx;
      f.y += f.vy;
      f.tailPhase += 0.25;
      const dCenter = Math.hypot(f.x - ISLAND_CX, f.y - ISLAND_CY);
      if (dCenter < ISLAND_RY + 15 || dCenter > ISLAND_RY + 180) {
        f.vx = -f.vx;
        f.vy = -f.vy;
      }
      if (Math.hypot(f.x - state.player.x, f.y - state.player.y) < 70) {
        const fleeA = Math.atan2(f.y - state.player.y, f.x - state.player.x);
        f.vx = Math.cos(fleeA) * 2.8;
        f.vy = Math.sin(fleeA) * 2.8;
      }
    });

    // Ambient Wind Leaves & Petals
    state.windLeaves.forEach(l => {
      l.x += l.vx;
      l.y += l.vy;
      l.rot += l.rotSpeed;
      if (l.x > WORLD_W + 50) l.x = -50;
      if (l.y > WORLD_H + 50) l.y = -50;
    });

    // Splash Ripples
    for (let i = state.splashRipples.length - 1; i >= 0; i--) {
      const sp = state.splashRipples[i];
      sp.r += 0.55;
      sp.alpha -= 0.025;
      if (sp.alpha <= 0) state.splashRipples.splice(i, 1);
    }

    // Player Movement & Click-to-Move
    const p = state.player;
    let dx = 0;
    let dy = 0;
    if (state.keys.up) dy -= 1;
    if (state.keys.down) dy += 1;
    if (state.keys.left) dx -= 1;
    if (state.keys.right) dx += 1;

    let isMoving = false;
    if (dx !== 0 || dy !== 0) {
      isMoving = true;
      p.targetX = null;
      p.targetY = null;
      p.interactTarget = null;
      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }
      p.angle = Math.atan2(dy, dx);
      p.x += dx * p.speed;
      p.y += dy * p.speed;
      p.walkStep += 0.25;
    } else if (p.targetX !== null && p.targetY !== null) {
      const dist = Math.hypot(p.targetX - p.x, p.targetY - p.y);
      const stopDist = p.interactTarget ? 50 : 6;
      if (dist > stopDist) {
        isMoving = true;
        p.angle = Math.atan2(p.targetY - p.y, p.targetX - p.x);
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.walkStep += 0.25;
      } else {
        if (p.interactTarget) {
          performAction();
          p.interactTarget = null;
        }
        p.targetX = null;
        p.targetY = null;
      }
    }

    // Footstep Dust & Shallow Water Ripples
    if (isMoving && Math.random() < 0.42) {
      const isWater = Math.hypot(p.x - ISLAND_CX, p.y - ISLAND_CY) > ISLAND_RY - 22;
      if (isWater) {
        state.splashRipples.push({ x: p.x, y: p.y + 8, r: 4, alpha: 0.75 });
      } else {
        state.particles.push({
          x: p.x - Math.cos(p.angle) * 10,
          y: p.y - Math.sin(p.angle) * 10 + 6,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -Math.random() * 0.6,
          radius: 2.2 + Math.random() * 2,
          color: 'rgba(215, 204, 200, 0.45)',
          life: 14
        });
      }
    }

    // Dynamic Quest Progression Updates
    if (questText) {
      if (state.inventory.wood < 4 || state.inventory.stone < 3) {
        questText.textContent = `Gather Wood (${state.inventory.wood}/4) & Stone (${state.inventory.stone}/3) to craft basic survival tools [SPACE / Click]`;
      } else if (p.equippedTool === 'Bare Hands') {
        questText.textContent = 'Open Crafting [C] and forge a Stone Axe to chop wood twice as fast!';
      } else if (state.structures.campfires.length === 0) {
        questText.textContent = 'Open Crafting [C] and build a Campfire & Survival Shelter to stay warm and rest [R]!';
      } else if (!state.planeWreck.searched) {
        questText.textContent = 'Head West along the beach to search the crashed Plane Fuselage for emergency supplies!';
      } else {
        questText.textContent = 'ESCAPE! Craft a Sea Raft at the shore OR build the Cliff SOS Beacon to signal rescue!';
      }
    }

    if (p.swinging > 0) p.swinging--;

    // Constrain inside island bounds
    const normX = (p.x - ISLAND_CX) / (ISLAND_RX - 20);
    const normY = (p.y - ISLAND_CY) / (ISLAND_RY - 20);
    if (normX * normX + normY * normY > 1) {
      const a = Math.atan2(p.y - ISLAND_CY, (p.x - ISLAND_CX) * (ISLAND_RY / ISLAND_RX));
      p.x = ISLAND_CX + Math.cos(a) * (ISLAND_RX - 20);
      p.y = ISLAND_CY + Math.sin(a) * (ISLAND_RY - 20);
    }

    // Camera follow player smoothly
    state.camera.x = p.x - canvas.width / 2;
    state.camera.y = p.y - canvas.height / 2;

    // Vitals decay
    p.hunger = Math.max(0, p.hunger - 0.7 * delta);
    p.thirst = Math.max(0, p.thirst - 1.1 * delta);

    if (p.hunger <= 0 || p.thirst <= 0) {
      p.health = Math.max(0, p.health - 6 * delta);
    } else if (p.hunger > 70 && p.thirst > 70 && p.health < 100) {
      p.health = Math.min(100, p.health + 1.2 * delta);
    }

    if (p.health <= 0) triggerEnding('death');

    // Wildlife Update with Animated Walking / Fleeing
    state.wildlife.forEach(w => {
      if (w.type === 'boar') {
        w.walkPhase = (w.walkPhase || 0) + (Math.hypot(w.vx || 0, w.vy || 0) > 0.1 ? 0.22 : 0.04);
        if (w.aggro) {
          const a = Math.atan2(p.y - w.y, p.x - w.x);
          w.x += Math.cos(a) * w.speed;
          w.y += Math.sin(a) * w.speed;
          if (Math.hypot(p.x - w.x, p.y - w.y) < p.radius + 14) {
            p.health = Math.max(0, p.health - 12 * delta);
            triggerScreenShake(3);
          }
        } else {
          if (Math.random() < 0.02) {
            w.vx = (Math.random() - 0.5) * w.speed;
            w.vy = (Math.random() - 0.5) * w.speed;
          }
          w.x += w.vx || 0;
          w.y += w.vy || 0;
        }
      } else if (w.type === 'crab') {
        w.legPhase = (w.legPhase || 0) + 0.28;
        const distToPlayer = Math.hypot(p.x - w.x, p.y - w.y);
        if (distToPlayer < 80) {
          w.clawAlert = Math.min(1, (w.clawAlert || 0) + 0.15);
          // Scuttle away sideways
          const a = Math.atan2(w.y - p.y, w.x - p.x);
          w.x += Math.cos(a) * 1.5;
          w.y += Math.sin(a) * 1.5;
        } else {
          w.clawAlert = Math.max(0, (w.clawAlert || 0) - 0.05);
          if (Math.random() < 0.03) {
            w.vx = (Math.random() - 0.5) * w.speed;
            w.vy = (Math.random() - 0.5) * w.speed;
          }
          w.x += w.vx || 0;
          w.y += w.vy || 0;
        }
      }
    });

    // Fireflies Update
    state.fireflies.forEach(ff => {
      ff.x += ff.vx;
      ff.y += ff.vy;
      ff.pulse += 0.05;
    });

    // Particles
    for (let i = state.particles.length - 1; i >= 0; i--) {
      const pt = state.particles[i];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.life--;
      if (pt.life <= 0) state.particles.splice(i, 1);
    }

    updateUI();
  }

  function updateUI() {
    const p = state.player;
    healthBar.style.width = `${p.health}%`;
    hungerBar.style.width = `${p.hunger}%`;
    thirstBar.style.width = `${p.thirst}%`;
    energyBar.style.width = `${p.energy}%`;

    resWood.textContent = state.inventory.wood;
    resStone.textContent = state.inventory.stone;
    resVines.textContent = state.inventory.vines;
    resLeaves.textContent = state.inventory.leaves;
    resFood.textContent = state.inventory.coconuts + state.inventory.berries + state.inventory.fish + state.inventory.meat + state.inventory.cookedFood;
    equippedTool.textContent = p.equippedTool;
  }

  // --- Dynamic 60 FPS Canvas 2D Rendering Engine ---
  function render(time) {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.save();
    // Apply Camera Translation with Screen Shake
    ctx.translate(-state.camera.x + state.screenShake.x, -state.camera.y + state.screenShake.y);

    // 1. Endless Deep Ocean with Multi-Tier Animated Waves
    const oceanGrad = ctx.createRadialGradient(ISLAND_CX, ISLAND_CY, 220, ISLAND_CX, ISLAND_CY, 950);
    oceanGrad.addColorStop(0, '#0277bd');
    oceanGrad.addColorStop(0.7, '#01579b');
    oceanGrad.addColorStop(1, '#002244');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(state.camera.x - 50, state.camera.y - 50, w + 100, h + 100);

    // Dynamic Rolling Wave Arcs in Deep Ocean
    for (let waveTier = 0; waveTier < 4; waveTier++) {
      const wRadiusX = ISLAND_RX + 80 + waveTier * 65 + Math.sin(time * 0.0012 + waveTier) * 14;
      const wRadiusY = ISLAND_RY + 65 + waveTier * 45 + Math.cos(time * 0.0012 + waveTier) * 12;
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 - waveTier * 0.025})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(ISLAND_CX, ISLAND_CY, wRadiusX, wRadiusY, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Coastal Tropical Fish in Shallow Waters
    state.tropicalFish.forEach(f => {
      ctx.save();
      ctx.translate(f.x, f.y);
      const angle = Math.atan2(f.vy, f.vx);
      ctx.rotate(angle);
      ctx.fillStyle = f.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, 7, 3.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Wagging tail
      const tailWag = Math.sin(f.tailPhase) * 3;
      ctx.beginPath();
      ctx.moveTo(-6, 0);
      ctx.lineTo(-11, -3 + tailWag);
      ctx.lineTo(-11, 3 + tailWag);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });

    // Dynamic Lapping Shoreline Wave Foam (In and Out Rhythmic Tide)
    const tide = (Math.sin(time * 0.0016) + 1) * 9;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(ISLAND_CX, ISLAND_CY, ISLAND_RX + 4 + tide, ISLAND_RY + 4 + tide, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Sandy Beach Terrain
    ctx.fillStyle = '#dfc282';
    ctx.beginPath();
    ctx.ellipse(ISLAND_CX, ISLAND_CY, ISLAND_RX, ISLAND_RY, 0, 0, Math.PI * 2);
    ctx.fill();

    // Subtle Beach Shell & Pebble Specks
    ctx.fillStyle = 'rgba(180, 150, 100, 0.35)';
    for (let s = 0; s < 24; s++) {
      const sa = s * 0.28;
      const sx = ISLAND_CX + Math.cos(sa) * (ISLAND_RX - 35);
      const sy = ISLAND_CY + Math.sin(sa) * (ISLAND_RY - 25);
      ctx.beginPath();
      ctx.arc(sx, sy, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Dense Rainforest Grass & Dirt Paths
    ctx.fillStyle = '#2e7d32';
    ctx.beginPath();
    ctx.ellipse(ISLAND_CX, ISLAND_CY - 15, ISLAND_RX - 85, ISLAND_RY - 75, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1b5e20';
    ctx.beginPath();
    ctx.ellipse(ISLAND_CX, ISLAND_CY - 15, ISLAND_RX - 150, ISLAND_RY - 120, 0, 0, Math.PI * 2);
    ctx.fill();

    // Soft Drifting Cloud Shadows Over Terrain
    ctx.fillStyle = 'rgba(8, 24, 40, 0.12)';
    state.cloudShadows.forEach(c => {
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.rx, c.ry, 0.2, 0, Math.PI * 2);
      ctx.fill();
    });

    // 4. Freshwater Lagoon / Mountain Spring with Water Ripples
    const sp = state.spring;
    ctx.fillStyle = '#29b6f6';
    ctx.beginPath();
    ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
    ctx.fill();
    const springPulse = (Math.sin(time * 0.0025) + 1) * 3;
    ctx.strokeStyle = 'rgba(129, 212, 250, 0.65)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(sp.x, sp.y, sp.radius - 8 + springPulse, 0, Math.PI * 2);
    ctx.stroke();

    // Splash / Water Wade Ripples
    state.splashRipples.forEach(sr => {
      ctx.strokeStyle = `rgba(178, 235, 242, ${sr.alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(sr.x, sr.y, sr.r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // 5. Plane Crash Site Fuselage on Beach
    const pw = state.planeWreck;
    ctx.save();
    ctx.translate(pw.x, pw.y);
    ctx.rotate(-0.35);
    ctx.fillStyle = '#cfd8dc';
    ctx.fillRect(-45, -16, 90, 32);
    ctx.fillStyle = '#90a4ae';
    ctx.fillRect(-12, -50, 24, 100);
    // Dynamic smoke plume
    const smokeWobble = Math.sin(time * 0.004) * 6;
    ctx.fillStyle = 'rgba(80, 80, 80, 0.32)';
    ctx.beginPath();
    ctx.arc(20 + smokeWobble, -25, 14, 0, Math.PI * 2);
    ctx.arc(28 + smokeWobble * 1.5, -45, 19, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 6. Placed Structures
    // Campfires with Animated Dancing Flames & Flying Sparks
    state.structures.campfires.forEach(cf => {
      // Warm Light Glow Pulse
      const glowPulse = 115 + Math.sin(time * 0.006) * 15;
      const cGlow = ctx.createRadialGradient(cf.x, cf.y, 10, cf.x, cf.y, glowPulse);
      cGlow.addColorStop(0, 'rgba(255, 140, 0, 0.52)');
      cGlow.addColorStop(0.7, 'rgba(255, 80, 0, 0.18)');
      cGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = cGlow;
      ctx.beginPath();
      ctx.arc(cf.x, cf.y, glowPulse, 0, Math.PI * 2);
      ctx.fill();

      // Stone ring
      ctx.fillStyle = '#4e342e';
      ctx.beginPath();
      ctx.arc(cf.x, cf.y, 16, 0, Math.PI * 2);
      ctx.fill();

      // Multi-tier procedural dancing fire tongues
      const f1 = Math.sin(time * 0.015) * 5;
      const f2 = Math.cos(time * 0.018) * 4;
      ctx.fillStyle = '#ff3d00';
      ctx.beginPath();
      ctx.ellipse(cf.x + f2 * 0.3, cf.y - 2, 11, 14 + f1 * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ff9800';
      ctx.beginPath();
      ctx.ellipse(cf.x - f2 * 0.2, cf.y - 4, 7, 10 + f1 * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffeb3b';
      ctx.beginPath();
      ctx.ellipse(cf.x, cf.y - 6, 4, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Flying fire ember spark
      if (Math.random() < 0.25) {
        state.particles.push({
          x: cf.x + (Math.random() - 0.5) * 8,
          y: cf.y - 8,
          vx: (Math.random() - 0.5) * 0.9,
          vy: -1.2 - Math.random() * 1.4,
          radius: 1.8,
          color: '#ffea00',
          life: 22
        });
      }
    });

    // Shelters
    state.structures.shelters.forEach(sh => {
      ctx.fillStyle = '#5d4037';
      ctx.beginPath();
      ctx.moveTo(sh.x - 26, sh.y + 22);
      ctx.lineTo(sh.x, sh.y - 25);
      ctx.lineTo(sh.x + 26, sh.y + 22);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#388e3c';
      ctx.fillRect(sh.x - 20, sh.y, 40, 20);
    });

    // Rafts
    state.structures.rafts.forEach(rf => {
      ctx.fillStyle = '#8d6e63';
      ctx.fillRect(rf.x - 30, rf.y - 18, 60, 36);
      ctx.fillStyle = '#fff';
      ctx.fillRect(rf.x - 2, rf.y - 35, 4, 30);
      ctx.fillStyle = '#ffe082';
      ctx.beginPath();
      ctx.moveTo(rf.x + 2, rf.y - 32);
      ctx.lineTo(rf.x + 24, rf.y - 20);
      ctx.lineTo(rf.x + 2, rf.y - 8);
      ctx.fill();
    });

    // SOS Radio Beacons with Flashing Strobe
    state.structures.beacons.forEach(bc => {
      ctx.fillStyle = '#b0bec5';
      ctx.fillRect(bc.x - 4, bc.y - 40, 8, 40);
      const beaconStrobe = Math.sin(time * 0.012) > 0.2 ? '#ff1744' : '#880015';
      ctx.fillStyle = beaconStrobe;
      ctx.beginPath();
      ctx.arc(bc.x, bc.y - 42, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // 7. Granite Boulders
    state.rocks.forEach(rk => {
      ctx.fillStyle = '#78909c';
      ctx.beginPath();
      ctx.arc(rk.x, rk.y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#546e7a';
      ctx.beginPath();
      ctx.arc(rk.x + 4, rk.y - 4, 8, 0, Math.PI * 2);
      ctx.fill();
    });

    // 8. Berry Bushes with Gleaming Berries
    state.bushes.forEach(bs => {
      ctx.fillStyle = '#43a047';
      ctx.beginPath();
      ctx.arc(bs.x, bs.y, 15, 0, Math.PI * 2);
      ctx.fill();
      if (bs.hasBerries) {
        ctx.fillStyle = '#e91e63';
        ctx.beginPath();
        ctx.arc(bs.x - 5, bs.y - 3, 4, 0, Math.PI * 2);
        ctx.arc(bs.x + 5, bs.y + 3, 4, 0, Math.PI * 2);
        ctx.arc(bs.x, bs.y + 6, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 9. Palm Trees with Dynamic Wind-Swaying Fronds
    state.trees.forEach(tr => {
      // Trunk shadow
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.ellipse(tr.x + 6, tr.y + 4, 10, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Textured Trunk
      ctx.fillStyle = '#6d4c41';
      ctx.beginPath();
      ctx.arc(tr.x, tr.y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Multi-layer Palm fronds with sinusoidal wind sway
      for (let fa = 0; fa < Math.PI * 2; fa += Math.PI / 3) {
        const frondSway = Math.sin(time * 0.0025 + fa) * 5.5;
        ctx.beginPath();
        ctx.moveTo(tr.x, tr.y - 10);
        ctx.quadraticCurveTo(
          tr.x + Math.cos(fa) * 20,
          tr.y - 10 + Math.sin(fa) * 20 + frondSway,
          tr.x + Math.cos(fa) * 34,
          tr.y - 10 + Math.sin(fa) * 34 + frondSway
        );
        ctx.lineWidth = 10;
        ctx.strokeStyle = tr.type === 'palm' ? '#2e7d32' : '#1b5e20';
        ctx.stroke();
      }

      // Coconuts
      if (tr.type === 'palm') {
        ctx.fillStyle = '#4e342e';
        ctx.beginPath();
        ctx.arc(tr.x - 4, tr.y - 8, 4.5, 0, Math.PI * 2);
        ctx.arc(tr.x + 4, tr.y - 8, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 10. Dynamic Wildlife with Animated Legs & Claws
    state.wildlife.forEach(wl => {
      ctx.save();
      ctx.translate(wl.x, wl.y);
      if (wl.type === 'boar') {
        const walkSin = Math.sin(wl.walkPhase || 0);
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.24)';
        ctx.beginPath();
        ctx.ellipse(0, 8, 16, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        // Trotting 4 Legs
        ctx.strokeStyle = '#271813';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(-10, 5); ctx.lineTo(-10 + walkSin * 4, 13);
        ctx.moveTo(-4, 5); ctx.lineTo(-4 - walkSin * 4, 13);
        ctx.moveTo(4, 5); ctx.lineTo(4 + walkSin * 4, 13);
        ctx.moveTo(10, 5); ctx.lineTo(10 - walkSin * 4, 13);
        ctx.stroke();

        // Boar Body
        ctx.fillStyle = '#4e342e';
        ctx.beginPath();
        ctx.ellipse(0, 0, 17, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head with Bobbing & Snout
        const headBob = Math.sin(wl.walkPhase * 0.5) * 1.5;
        ctx.fillStyle = '#3e2723';
        ctx.beginPath();
        ctx.arc(12, -2 + headBob, 8, 0, Math.PI * 2);
        ctx.fill();

        // White Tusks
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(16, -1 + headBob);
        ctx.lineTo(21, -6 + headBob);
        ctx.lineTo(18, 0 + headBob);
        ctx.fill();

        // Eye
        ctx.fillStyle = wl.aggro ? '#ff1744' : '#111';
        ctx.beginPath();
        ctx.arc(13, -5 + headBob, 1.8, 0, Math.PI * 2);
        ctx.fill();
      } else if (wl.type === 'crab') {
        const legWalk = Math.sin(wl.legPhase || 0);
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        ctx.beginPath();
        ctx.ellipse(0, 4, 12, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // 6 Animated Walking Legs
        ctx.strokeStyle = '#e64a19';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-7, 0); ctx.lineTo(-13 + legWalk * 3, 6);
        ctx.moveTo(-3, 0); ctx.lineTo(-8 - legWalk * 3, 7);
        ctx.moveTo(3, 0); ctx.lineTo(8 + legWalk * 3, 7);
        ctx.moveTo(7, 0); ctx.lineTo(13 - legWalk * 3, 6);
        ctx.stroke();

        // Shell
        ctx.fillStyle = '#ff5722';
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 7.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Stalk Eyes
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(-3, -7, 2.2, 0, Math.PI * 2);
        ctx.arc(3, -7, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-3, -7, 1.2, 0, Math.PI * 2);
        ctx.arc(3, -7, 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Animated Pinching Claws
        const clawLift = (wl.clawAlert || 0) * 5;
        ctx.fillStyle = '#d84315';
        ctx.beginPath();
        ctx.ellipse(-9, -4 - clawLift, 4, 3, -0.4, 0, Math.PI * 2);
        ctx.ellipse(9, -4 - clawLift, 4, 3, 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    // 11. Player Character with Dynamic Walking Animation & Tool Trail
    const p = state.player;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);

    // Player Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.beginPath();
    ctx.ellipse(0, 2, p.radius * 1.15, p.radius * 0.75, 0, 0, Math.PI * 2);
    ctx.fill();

    // Walking Gait Bob
    const walkBob = Math.sin(p.walkStep) * 1.5;

    // Backpack
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(-p.radius * 0.9, -6 + walkBob * 0.5, 6, 12);

    // Torso / Shirt
    ctx.fillStyle = '#0288d1';
    ctx.beginPath();
    ctx.arc(0, walkBob * 0.5, p.radius * 0.85, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#ffe0b2';
    ctx.beginPath();
    ctx.arc(0, walkBob, p.radius * 0.55, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    ctx.fillStyle = '#3e2723';
    ctx.beginPath();
    ctx.arc(0, -2 + walkBob, p.radius * 0.45, Math.PI, Math.PI * 2);
    ctx.fill();

    // Tool in Hand with Animated Swing Arc Trail
    const swingOffset = p.swinging > 0 ? (p.swinging / 14) * Math.PI * 0.75 : 0;
    ctx.save();
    ctx.rotate(swingOffset);

    if (p.equippedTool === 'Stone Axe') {
      ctx.fillStyle = '#8d6e63';
      ctx.fillRect(p.radius * 0.7, -3, 15, 5);
      ctx.fillStyle = '#78909c';
      ctx.fillRect(p.radius * 0.7 + 10, -8, 8, 16);
    } else if (p.equippedTool === 'Wooden Spear') {
      ctx.fillStyle = '#8d6e63';
      ctx.fillRect(p.radius * 0.7, -2, 26, 4);
      ctx.fillStyle = '#b0bec5';
      ctx.beginPath();
      ctx.moveTo(p.radius * 0.7 + 26, -5);
      ctx.lineTo(p.radius * 0.7 + 34, 0);
      ctx.lineTo(p.radius * 0.7 + 26, 5);
      ctx.fill();
    } else if (p.equippedTool === 'Fishing Rod') {
      ctx.fillStyle = '#d7ccc8';
      ctx.fillRect(p.radius * 0.7, -2, 32, 3);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p.radius * 0.7 + 32, 0);
      ctx.lineTo(p.radius * 0.7 + 45, 14);
      ctx.stroke();
    }
    ctx.restore();

    ctx.restore();

    // 12. Floating Dynamic Wind Leaves
    state.windLeaves.forEach(l => {
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.rot);
      ctx.fillStyle = l.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, l.size, l.size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // 13. Particles
    state.particles.forEach(pt => {
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // 14. Fireflies Glowing at Dusk / Night
    if (state.timeOfDay > 0.7 || state.timeOfDay < 0.2) {
      state.fireflies.forEach(ff => {
        const glow = (Math.sin(ff.pulse) + 1) * 0.5;
        ctx.fillStyle = `rgba(180, 255, 50, ${glow * 0.85})`;
        ctx.beginPath();
        ctx.arc(ff.x, ff.y, 2.8, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 15. Floating Action Prompt Indicator
    let nearestPrompt = null;
    let minDist = 75;
    const px = state.player.x;
    const py = state.player.y;

    for (const t of state.trees) {
      const d = Math.hypot(px - t.x, py - t.y);
      if (d < minDist) {
        minDist = d;
        nearestPrompt = { x: t.x, y: t.y - 45, text: '[SPACE / Click] Chop Wood' };
      }
    }
    for (const r of state.rocks) {
      const d = Math.hypot(px - r.x, py - r.y);
      if (d < minDist) {
        minDist = d;
        nearestPrompt = { x: r.x, y: r.y - 32, text: '[SPACE / Click] Mine Stone' };
      }
    }
    for (const b of state.bushes) {
      const d = Math.hypot(px - b.x, py - b.y);
      if (d < minDist) {
        minDist = d;
        nearestPrompt = { x: b.x, y: b.y - 25, text: b.hasBerries ? '[SPACE / Click] Pick Berries' : 'Empty Bush' };
      }
    }
    const dSpring = Math.hypot(px - state.spring.x, py - state.spring.y);
    if (dSpring < minDist + 15) {
      minDist = dSpring;
      nearestPrompt = { x: state.spring.x, y: state.spring.y - 32, text: '[SPACE / Click] Drink Water' };
    }
    const dPlane = Math.hypot(px - state.planeWreck.x, py - state.planeWreck.y);
    if (dPlane < minDist + 25) {
      minDist = dPlane;
      nearestPrompt = { x: state.planeWreck.x, y: state.planeWreck.y - 38, text: state.planeWreck.searched ? 'Plane Searched' : '[SPACE / Click] Search Wreckage' };
    }
    for (const w of state.wildlife) {
      const d = Math.hypot(px - w.x, py - w.y);
      if (d < minDist) {
        minDist = d;
        nearestPrompt = { x: w.x, y: w.y - 25, text: '[SPACE / Click] Hunt Animal' };
      }
    }

    if (nearestPrompt) {
      ctx.save();
      // Responsive dynamic font scaling for high-DPI and mobile displays
      const isMobileTouch = window.innerWidth <= 640 || ('ontouchstart' in window);
      const displayText = isMobileTouch ? nearestPrompt.text.replace('\[SPACE / Click\]', '[ACT / Tap]') : nearestPrompt.text;
      const fontSize = isMobileTouch ? 11 : 12;
      ctx.font = 'bold ' + fontSize + 'px "Segoe UI", sans-serif';
      const textWidth = ctx.measureText(displayText).width;
      ctx.fillStyle = 'rgba(6, 20, 36, 0.92)';
      ctx.strokeStyle = '#ffb703';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(nearestPrompt.x - textWidth / 2 - 8, nearestPrompt.y - 11, textWidth + 16, 22, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffea00';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(displayText, nearestPrompt.x, nearestPrompt.y);
      ctx.restore();
    }

    // 16. Floating Dynamic Text Popups (+Wood, +Stone, etc.)
    state.floatingTexts.forEach(ft => {
      ctx.save();
      ctx.font = 'bold 13px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = `rgba(0, 0, 0, ${ft.alpha * 0.9})`;
      ctx.lineWidth = 3;
      ctx.strokeText(ft.text, ft.x, ft.y);
      ctx.fillStyle = ft.color;
      ctx.globalAlpha = ft.alpha;
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    });

    ctx.restore(); // Restore Camera

    // 17. Day/Night Color Grading Vignette
    let darknessAlpha = 0;
    if (state.timeOfDay > 0.75) {
      darknessAlpha = Math.min(0.85, (state.timeOfDay - 0.75) * 3.5);
    } else if (state.timeOfDay < 0.15) {
      darknessAlpha = Math.max(0, 0.85 - (state.timeOfDay / 0.15) * 0.85);
    }

    if (darknessAlpha > 0) {
      ctx.fillStyle = `rgba(4, 10, 22, ${darknessAlpha})`;
      ctx.fillRect(0, 0, w, h);
    }

    // 18. Weather: Falling Rain Streaks
    if (state.weather === 'rain' || state.weather === 'storm') {
      ctx.strokeStyle = state.weather === 'storm' ? 'rgba(200, 230, 255, 0.35)' : 'rgba(180, 220, 255, 0.25)';
      ctx.lineWidth = 1.5;
      const rainCount = state.weather === 'storm' ? 45 : 25;
      for (let r = 0; r < rainCount; r++) {
        const rx = ((time * 1.5 + r * 67) % (w + 100)) - 50;
        const ry = (time * 2.8 + r * 43) % h;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 8, ry + 18);
        ctx.stroke();
      }
    }

    // 19. Circling Overhead Seabirds in Screen Space
    state.seabirds.forEach(b => {
      const screenX = b.x - state.camera.x;
      const screenY = b.y - state.camera.y;
      if (screenX >= -50 && screenX <= w + 50 && screenY >= -50 && screenY <= h + 50) {
        ctx.save();
        ctx.translate(screenX, screenY);
        // Soft ground shadow
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.beginPath();
        ctx.ellipse(0, 45, 12, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // White gull with animated flapping wings
        const wingFlap = Math.sin(b.flapPhase) * 6;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#37474f';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-12, wingFlap);
        ctx.lineTo(0, -2);
        ctx.lineTo(12, wingFlap);
        ctx.lineTo(0, 4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    });
  }

  // --- Animation Frame Loop ---
  function loop(currentTime) {
    const delta = Math.min(0.1, (currentTime - lastTime) / 1000);
    lastTime = currentTime;

    update(delta);
    render(currentTime);

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // --- Modal Bindings ---
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-close');
      const el = document.getElementById(id);
      if (el) el.classList.remove('open');
    });
  });

  document.getElementById('helpBtn').addEventListener('click', () => {
    sound.init();
    modalHelp.classList.add('open');
  });

  const soundToggle = document.getElementById('soundToggle');
  const soundIcon = document.getElementById('soundIcon');
  soundToggle.addEventListener('click', () => {
    sound.muted = !sound.muted;
    if (sound.muted) {
      soundIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>';
    } else {
      sound.init();
      soundIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>';
    }
  });

  document.getElementById('btnRestartGame').addEventListener('click', () => {
    window.location.reload();
  });

  updateUI();
})();

  // Dynamic screen resize handling for touch HUD recalculation
  window.addEventListener('resize', () => {
    if (state && state.canvas) {
      state.canvas.width = window.innerWidth;
      state.canvas.height = window.innerHeight;
    }
  }, { passive: true });
