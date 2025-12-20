(function oneko() {
  if (typeof window === "undefined") return;

  /* =====================================================
     HARD GUARDS — PREVENT DOUBLE CAT (100% FIX)
  ===================================================== */
  if (window.__ONEKO_RUNNING__) return;
  if (document.getElementById("oneko")) return;
  window.__ONEKO_RUNNING__ = true;

  const CONFIG_URL = "/oneko/oneko.config.json";
  const SPRITE_SIZE = 32;

  fetch(CONFIG_URL)
    .then((r) => r.json())
    .then(init)
    .catch(console.error);

  function init(config) {
    const SPEED = config.speed ?? 8;
    const IDLE_TIME = config.idleTime ?? 3000;

    /* =====================================================
       STYLES
    ===================================================== */
    const style = document.createElement("style");
    style.innerHTML = `
      #oneko {
        position: fixed;
        width: ${SPRITE_SIZE}px;
        height: ${SPRITE_SIZE}px;
        left: 32px;
        top: 32px;
        z-index: 9999;
        cursor: pointer;
        background-repeat: no-repeat;
        background-size: auto;
        image-rendering: pixelated;
        user-select: none;
      }

      #oneko-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.45);
        backdrop-filter: blur(5px);
        z-index: 9998;
        display: none;
      }

      #oneko-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 360px;
        background: #0f0f0f;
        color: #fff;
        border-radius: 14px;
        padding: 18px;
        z-index: 9999;
        display: none;
        box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      }

      #oneko-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;
      }

      #oneko-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
      }

      #oneko-grid img {
        width: 48px;
        height: 48px;
        cursor: pointer;
        border-radius: 6px;
      }
    `;
    document.head.appendChild(style);

    /* =====================================================
       ELEMENTS
    ===================================================== */
    const neko = document.createElement("div");
    neko.id = "oneko";
    document.body.appendChild(neko);

    const overlay = document.createElement("div");
    overlay.id = "oneko-overlay";

    const modal = document.createElement("div");
    modal.id = "oneko-modal";
    modal.innerHTML = `
      <div id="oneko-modal-header">
        <h3>Choose Neko</h3>
        <span id="oneko-close" style="cursor:pointer">✕</span>
      </div>
      <div id="oneko-grid"></div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    /* =====================================================
       STATE
    ===================================================== */
    let mouseX = 0,
      mouseY = 0;
    let nekoX = 32,
      nekoY = 32;
    let sleeping = false;
    let idleTimer = null;

    const savedSkin =
      localStorage.getItem("oneko-skin") || config.defaultSkin;

    /* =====================================================
       SPRITE FRAMES (CLASSIC ONEKO)
    ===================================================== */
    const FRAMES = {
      idle: [0, 0],
      sleep: [1, 2],
      walk: [
        [0, 1],
        [1, 1],
        [2, 1],
        [3, 1],
      ],
    };

    let frameIndex = 0;

    function setFrame(x, y) {
      neko.style.backgroundPosition = `-${x * SPRITE_SIZE}px -${
        y * SPRITE_SIZE
      }px`;
    }

    function setSkin(id) {
      const skin = config.skins.find((s) => s.id === id);
      if (!skin) return;

      neko.style.backgroundImage = `url('/oneko/skins/${skin.file}')`;
      localStorage.setItem("oneko-skin", id);
      setFrame(...FRAMES.idle);
    }

    setSkin(savedSkin);

    /* =====================================================
       MOUSE FOLLOW
    ===================================================== */
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      wake();
    });

    function animate() {
      if (!sleeping) {
        const dx = mouseX - nekoX;
        const dy = mouseY - nekoY;
        const dist = Math.abs(dx) + Math.abs(dy);

        if (dist > 2) {
          nekoX += dx / SPEED;
          nekoY += dy / SPEED;
          frameIndex = (frameIndex + 1) % FRAMES.walk.length;
          setFrame(...FRAMES.walk[frameIndex]);
        } else {
          setFrame(...FRAMES.idle);
        }

        neko.style.left = `${nekoX}px`;
        neko.style.top = `${nekoY}px`;
      }
      requestAnimationFrame(animate);
    }

    animate();

    /* =====================================================
       IDLE / SLEEP
    ===================================================== */
    function sleep() {
      sleeping = true;
      setFrame(...FRAMES.sleep);
    }

    function wake() {
      sleeping = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(sleep, IDLE_TIME);
    }

    /* =====================================================
       POPUP (CONFIG-DRIVEN)
    ===================================================== */
    const grid = modal.querySelector("#oneko-grid");

    config.skins.forEach((skin) => {
      const img = document.createElement("img");
      img.src = `/oneko/images/${skin.preview}`;
      img.title = skin.name;
      img.onclick = () => {
        setSkin(skin.id);
        closePopup();
      };
      grid.appendChild(img);
    });

    function openPopup() {
      sleeping = true;
      overlay.style.display = "block";
      modal.style.display = "block";
    }

    function closePopup() {
      overlay.style.display = "none";
      modal.style.display = "none";
      wake();
    }

    /* =====================================================
       CONTROLS (AS REQUESTED)
    ===================================================== */

    // 🖱 RIGHT-CLICK → OPEN SKIN POPUP
    neko.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      openPopup();
    });

    // 🖱 DOUBLE LEFT-CLICK → SLEEP / WAKE
    neko.addEventListener("dblclick", () => {
      sleeping ? wake() : sleep();
    });

    // ⌨ SHORTCUT KEYS
    document.addEventListener("keydown", (e) => {
      // Shift + X → popup
      if (e.shiftKey && e.key.toLowerCase() === "x") {
        openPopup();
      }

      // Shift + Z → sleep / wake
      if (e.shiftKey && e.key.toLowerCase() === "z") {
        sleeping ? wake() : sleep();
      }

      // ESC → close popup
      if (e.key === "Escape") {
        closePopup();
      }
    });

    // Click outside → close popup
    overlay.addEventListener("click", closePopup);
    modal.querySelector("#oneko-close").onclick = closePopup;
  }
})();
