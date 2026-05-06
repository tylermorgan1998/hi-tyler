// ============================================================================
// EDIT THIS SECTION - All your content and settings
// ============================================================================

// Typewriter text - words to cycle through
const TYPEWRITER_WORDS = ['cool', 'awesome', 'rad', 'fun', 'neat'];

// About page content
const ABOUT_CONTENT = {
  title: "Design lead based in New York",
  bio: "I believe great design is about more than aesthetics—it's about solving problems and creating meaningful experiences. My approach is rooted in understanding users, embracing simplicity, and pushing the boundaries of innovation.",
  personalText: "When I'm not designing, you'll find me traveling for music festivals, attending drag shows, filling up my Steam library, or binging isekai anime."
};

// Expertise areas
const EXPERTISE = [
  {
    title: "Digital Product Design",
    color: "#ec4899",
    description: "UX/UI design, product strategy, and user research",
    skills: ["Figma", "Framer", "Webflow"]
  },
  {
    title: "Graphic Design",
    color: "#a855f7",
    description: "Branding, packaging, and visual identity",
    skills: ["Photoshop", "Illustrator", "InDesign"]
  },
  {
    title: "3D & Development",
    color: "#18a0fb",
    description: "3D design, prototyping, and front-end code",
    skills: ["Blender", "HTML/CSS", "React"]
  }
];

// Featured projects
const PROJECTS = [
  {
    id: 'nexus',
    title: "Nexus",
    description: "Creating a more personal, less frustrating way to get tech support.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
  },
  {
    id: 'tribe-so-admin',
    title: "Tribe.so Admin onboarding",
    description: "Increase user engagement",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
  },
  {
    id: 'lendscape',
    title: "Lendscape",
    description: "Lend and Borrow Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-29ac87e57e47?w=800&q=80"
  },
  {
    id: 'flop-app',
    title: "Flop App",
    description: "Social media for poker players",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80"
  },
  {
    id: 'promot3-dashboard',
    title: "Promot3 Dashboard",
    description: "Project management app",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
  }
];

// Default color for typewriter text (RGB)
const DEFAULT_COLOR = {
  r: 13,
  g: 153,
  b: 255
};

// ============================================================================
// END EDITABLE SECTION
// ============================================================================


// ============================================================================
// Application Logic - You can edit this if you know JavaScript
// ============================================================================

// State
let currentWordIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typewriterColor = { ...DEFAULT_COLOR };
let isColorPickerOpen = false;

// Color picker state
let hue = 205;
let saturation = 95;
let value = 100;

// DOM Elements
let typewriterElement;
let colorBox;
let colorInput;
let colorPicker;
let svPicker;
let svCursor;
let hueSlider;
let hueCursor;
let rInput, gInput, bInput;
let sidebar;
let designPanel;
let homeContent;
let aboutContent;
let splineIframeLoaded = false;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  initializeColorPicker();
  initializeTabs();
  renderExpertise();
  renderProjects();
  startTypewriter();
});

// Get all DOM elements
function initializeElements() {
  typewriterElement = document.getElementById('typewriter');
  colorBox = document.getElementById('color-box');
  colorInput = document.getElementById('color-input');
  colorPicker = document.getElementById('color-picker');
  svPicker = document.getElementById('sv-picker');
  svCursor = document.getElementById('sv-cursor');
  hueSlider = document.getElementById('hue-slider');
  hueCursor = document.getElementById('hue-cursor');
  rInput = document.getElementById('r-input');
  gInput = document.getElementById('g-input');
  bInput = document.getElementById('b-input');
  sidebar = document.getElementById('sidebar');
  designPanel = document.getElementById('design-panel');
  homeContent = document.getElementById('home-content');
  aboutContent = document.getElementById('about-content');
}

// Typewriter effect
function startTypewriter() {
  typewriterElement.textContent = '';
  typewriterLoop();
}

function typewriterLoop() {
  const currentWord = TYPEWRITER_WORDS[currentWordIndex];
  
  if (isDeleting) {
    currentCharIndex--;
    typewriterElement.textContent = currentWord.substring(0, currentCharIndex);
    
    if (currentCharIndex === 0) {
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % TYPEWRITER_WORDS.length;
      setTimeout(typewriterLoop, 500);
      return;
    }
  } else {
    currentCharIndex++;
    typewriterElement.textContent = currentWord.substring(0, currentCharIndex);
    
    if (currentCharIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typewriterLoop, 2000);
      return;
    }
  }
  
  const typingSpeed = isDeleting ? 50 : 100;
  setTimeout(typewriterLoop, typingSpeed);
}

// Update typewriter color
function updateTypewriterColor() {
  const color = `rgb(${typewriterColor.r}, ${typewriterColor.g}, ${typewriterColor.b})`;
  typewriterElement.style.color = color;
}

// Color picker initialization
function initializeColorPicker() {
  rgbToHsv(DEFAULT_COLOR.r, DEFAULT_COLOR.g, DEFAULT_COLOR.b);
  updateColorDisplay();
  updateTypewriterColor();
  
  colorBox.addEventListener('click', function() {
    isColorPickerOpen = !isColorPickerOpen;
    colorPicker.classList.toggle('open', isColorPickerOpen);
  });
  
  // Saturation/Value picker
  let isDraggingSV = false;
  
  svPicker.addEventListener('mousedown', function(e) {
    isDraggingSV = true;
    updateSV(e);
  });
  
  document.addEventListener('mousemove', function(e) {
    if (isDraggingSV) {
      updateSV(e);
    }
  });
  
  document.addEventListener('mouseup', function() {
    isDraggingSV = false;
  });
  
  // Hue slider
  let isDraggingHue = false;
  
  hueSlider.addEventListener('mousedown', function(e) {
    isDraggingHue = true;
    updateHue(e);
  });
  
  document.addEventListener('mousemove', function(e) {
    if (isDraggingHue) {
      updateHue(e);
    }
  });
  
  document.addEventListener('mouseup', function() {
    isDraggingHue = false;
  });
  
  // RGB inputs
  rInput.addEventListener('input', function() {
    typewriterColor.r = parseInt(this.value) || 0;
    rgbToHsv(typewriterColor.r, typewriterColor.g, typewriterColor.b);
    updateColorDisplay();
    updateTypewriterColor();
  });
  
  gInput.addEventListener('input', function() {
    typewriterColor.g = parseInt(this.value) || 0;
    rgbToHsv(typewriterColor.r, typewriterColor.g, typewriterColor.b);
    updateColorDisplay();
    updateTypewriterColor();
  });
  
  bInput.addEventListener('input', function() {
    typewriterColor.b = parseInt(this.value) || 0;
    rgbToHsv(typewriterColor.r, typewriterColor.g, typewriterColor.b);
    updateColorDisplay();
    updateTypewriterColor();
  });
}

// Update saturation and value from picker
function updateSV(e) {
  const rect = svPicker.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  
  x = Math.max(0, Math.min(x, rect.width));
  y = Math.max(0, Math.min(y, rect.height));
  
  saturation = (x / rect.width) * 100;
  value = 100 - (y / rect.height) * 100;
  
  hsvToRgb(hue, saturation, value);
  updateColorDisplay();
  updateTypewriterColor();
}

// Update hue from slider
function updateHue(e) {
  const rect = hueSlider.getBoundingClientRect();
  let x = e.clientX - rect.left;
  
  x = Math.max(0, Math.min(x, rect.width));
  
  hue = (x / rect.width) * 360;
  
  hsvToRgb(hue, saturation, value);
  updateColorDisplay();
  updateTypewriterColor();
}

// Convert HSV to RGB
function hsvToRgb(h, s, v) {
  h = h / 360;
  s = s / 100;
  v = v / 100;
  
  let r, g, b;
  
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  
  typewriterColor.r = Math.round(r * 255);
  typewriterColor.g = Math.round(g * 255);
  typewriterColor.b = Math.round(b * 255);
}

// Convert RGB to HSV
function rgbToHsv(r, g, b) {
  r = r / 255;
  g = g / 255;
  b = b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  
  let h = 0;
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
    } else if (max === g) {
      h = ((b - r) / delta + 2) / 6;
    } else {
      h = ((r - g) / delta + 4) / 6;
    }
  }
  
  const s = max === 0 ? 0 : delta / max;
  const v = max;
  
  hue = h * 360;
  saturation = s * 100;
  value = v * 100;
}

// Update color display
function updateColorDisplay() {
  const color = `rgb(${typewriterColor.r}, ${typewriterColor.g}, ${typewriterColor.b})`;
  const hexColor = rgbToHex(typewriterColor.r, typewriterColor.g, typewriterColor.b);
  
  colorBox.style.backgroundColor = color;
  colorInput.value = hexColor;
  
  // Update RGB inputs
  rInput.value = typewriterColor.r;
  gInput.value = typewriterColor.g;
  bInput.value = typewriterColor.b;
  
  // Update SV picker background
  const hueColor = hsvToRgbColor(hue, 100, 100);
  svPicker.style.background = `
    linear-gradient(to right, #fff, ${hueColor}),
    linear-gradient(to bottom, transparent, #000)
  `;
  svPicker.style.backgroundBlendMode = 'multiply';
  
  // Update cursors
  svCursor.style.left = saturation + '%';
  svCursor.style.top = (100 - value) + '%';
  hueCursor.style.left = (hue / 360 * 100) + '%';
}

// Helper: HSV to RGB color string
function hsvToRgbColor(h, s, v) {
  const rgb = {};
  h = h / 360;
  s = s / 100;
  v = v / 100;
  
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  
  switch (i % 6) {
    case 0: rgb.r = v; rgb.g = t; rgb.b = p; break;
    case 1: rgb.r = q; rgb.g = v; rgb.b = p; break;
    case 2: rgb.r = p; rgb.g = v; rgb.b = t; break;
    case 3: rgb.r = p; rgb.g = q; rgb.b = v; break;
    case 4: rgb.r = t; rgb.g = p; rgb.b = v; break;
    case 5: rgb.r = v; rgb.g = p; rgb.b = q; break;
  }
  
  return `rgb(${Math.round(rgb.r * 255)}, ${Math.round(rgb.g * 255)}, ${Math.round(rgb.b * 255)})`;
}

// Helper: RGB to Hex
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('').toUpperCase();
}

// Tab switching
function initializeTabs() {
  const tabs = document.querySelectorAll('.tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      switchTab(tabName);
    });
  });
}

function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
  });
  
  // Fade out
  homeContent.style.opacity = '0';
  aboutContent.style.opacity = '0';
  
  setTimeout(() => {
    // Switch content
    homeContent.classList.toggle('active', tabName === 'home');
    aboutContent.classList.toggle('active', tabName === 'about');
    
    // Show/hide sidebar and design panel
    if (tabName === 'home') {
      sidebar.classList.remove('hidden');
      designPanel.classList.remove('hidden');
    } else {
      sidebar.classList.add('hidden');
      designPanel.classList.add('hidden');
      
      // Lazy load Spline iframe only once
      if (!splineIframeLoaded) {
        loadSplineIframe();
        splineIframeLoaded = true;
      }
    }
    
    // Fade in
    setTimeout(() => {
      if (tabName === 'home') {
        homeContent.style.opacity = '1';
      } else {
        aboutContent.style.opacity = '1';
      }
    }, 50);
  }, 200);
}

// Load Spline iframe
function loadSplineIframe() {
  const splineContainer = document.getElementById('spline-container');
  if (splineContainer && !splineContainer.querySelector('.spline-placeholder')) {
    // Create a simple placeholder instead of loading Spline iframe to avoid Three.js warnings
    const placeholder = document.createElement('div');
    placeholder.className = 'spline-placeholder';
    placeholder.innerHTML = `
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px;">
        <div style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #0D99FF 100%); animation: float 3s ease-in-out infinite;"></div>
        <p style="color: #999999; font-size: 14px; text-align: center;">3D Avatar Scene</p>
      </div>
    `;
    splineContainer.appendChild(placeholder);
  }
}

// Render expertise section
function renderExpertise() {
  const expertiseGrid = document.getElementById('expertise-grid');
  
  EXPERTISE.forEach(item => {
    const expertiseDiv = document.createElement('div');
    expertiseDiv.className = 'expertise-item';
    
    const title = document.createElement('h3');
    title.textContent = item.title;
    title.style.color = item.color;
    
    const description = document.createElement('p');
    description.textContent = item.description;
    
    const skillTags = document.createElement('div');
    skillTags.className = 'skill-tags';
    
    item.skills.forEach(skill => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag';
      tag.textContent = skill;
      skillTags.appendChild(tag);
    });
    
    expertiseDiv.appendChild(title);
    expertiseDiv.appendChild(description);
    expertiseDiv.appendChild(skillTags);
    
    expertiseGrid.appendChild(expertiseDiv);
  });
  
  // Add personal text
  document.getElementById('personal-text').textContent = ABOUT_CONTENT.personalText;
}

// Render projects
function renderProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  
  PROJECTS.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const img = document.createElement('img');
    img.className = 'project-image';
    img.src = project.image;
    img.alt = project.title;
    
    const info = document.createElement('div');
    info.className = 'project-info';
    
    const title = document.createElement('h3');
    title.textContent = project.title;
    
    const description = document.createElement('p');
    description.textContent = project.description;
    
    info.appendChild(title);
    info.appendChild(description);
    
    card.appendChild(img);
    card.appendChild(info);
    
    projectsGrid.appendChild(card);
  });
}