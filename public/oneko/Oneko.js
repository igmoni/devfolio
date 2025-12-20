// oneko.js: https://github.com/adryd325/oneko.js

(async function oneko() {
  const nekoEl = document.createElement("div");
  let nekoPosX = 32,
    nekoPosY = 32,
    mousePosX = 0,
    mousePosY = 0,
    frameCount = 0,
    idleTime = 0,
    idleAnimation = null,
    idleAnimationFrame = 0,
    forceSleep = false,
    grabbing = false,
    grabStop = true,
    nudge = false,
    kuroNeko = false,
    variant = "classic";

  function parseLocalStorage(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(`oneko:${key}`));
      return typeof value === typeof fallback ? value : fallback;
    } catch (e) {
      console.error(e);
      return fallback;
    }
  }

  const nekoSpeed = 10,
    variants = [
      ["classic", "Classic"],
      ["dog", "Dog"],
      ["tora", "Tora"],
      ["maia", "Maia"],
      ["vaporwave", "Vaporwave"],
      ["pink", "Pink"],
    ],
    spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
      scratchWallN: [
        [0, 0],
        [0, -1],
      ],
      scratchWallS: [
        [-7, -1],
        [-6, -2],
      ],
      scratchWallE: [
        [-2, -2],
        [-2, -3],
      ],
      scratchWallW: [
        [-4, 0],
        [-4, -1],
      ],
      tired: [[-3, -2]],
      sleeping: [
        [-2, 0],
        [-2, -1],
      ],
      N: [
        [-1, -2],
        [-1, -3],
      ],
      NE: [
        [0, -2],
        [0, -3],
      ],
      E: [
        [-3, 0],
        [-3, -1],
      ],
      SE: [
        [-5, -1],
        [-5, -2],
      ],
      S: [
        [-6, -3],
        [-7, -2],
      ],
      SW: [
        [-5, -3],
        [-6, -1],
      ],
      W: [
        [-4, -2],
        [-4, -3],
      ],
      NW: [
        [-1, 0],
        [-1, -1],
      ],
    }, // Get keys with 2 or more sprites
    keys = Object.keys(spriteSets).filter((key) => spriteSets[key].length > 1),
    usedKeys = new Set();

  const pickerStyle = document.createElement("style");
  pickerStyle.innerHTML = `
      :root {
      --tooltip-bg: hsl(240 10% 3.9%);
      --tooltip-text: hsl(0 0% 98%);
      --tooltip-border: hsl(240 3.7% 15.9%);
    }

    @media (prefers-color-scheme: light) {
      :root {
        --tooltip-bg: hsl(0 0% 100%);
        --tooltip-text: hsl(240 10% 3.9%);
        --tooltip-border: hsl(240 5.9% 90%);
      }
    }
    #oneko-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.55);
      backdrop-filter: blur(5px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .oneko-modal {
      background: #111;
      padding: 20px;
      border-radius: 14px;
      min-width: 320px;
      max-width: 420px;
      color: #fff;
      box-shadow: 0 20px 60px rgba(0,0,0,0.7);
    }
/* 🌞 Light theme */
@media (prefers-color-scheme: light) {
  .oneko-modal {
    background: #ffffff;
    color: #0a0a0a;
    box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  }
}

/* 🌙 Dark theme (explicit, keeps same behavior) */
@media (prefers-color-scheme: dark) {
  .oneko-modal {
    background: #0f0f0f;
    color: #ffffff;
  }
}

/* 🐱 Cat preview wrapper */
.oneko-preview {
  width: 64px;
  height: 64px;
  border-radius: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    inset 0 2px 6px rgba(0,0,0,0.35),
    inset 0 -2px 6px rgba(255,255,255,0.05);
}

/* Light theme inner shadow */
@media (prefers-color-scheme: light) {
  .oneko-preview {
    box-shadow:
      inset 0 2px 6px rgba(0,0,0,0.15),
      inset 0 -2px 6px rgba(255,255,255,0.6);
  }
}

    .oneko-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .oneko-header h3 {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
    }

    .oneko-close {
      cursor: pointer;
      font-size: 13px;
      opacity: 0.7;
    }

    .oneko-close:hover {
      opacity: 1;
    }

    /* 🔥 TOOLTIP */
        .oneko-tooltip {
      position: absolute;
      top: -34px;
      left: 50%;
      transform: translateX(-50%) scale(0.95);
      background: var(--tooltip-bg);
      color: var(--tooltip-text);
      font-size: 12px;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid var(--tooltip-border);
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      box-shadow: 0 8px 30px rgba(0,0,0,0.35);
      transition:
        opacity 0.15s ease,
        transform 0.15s ease;
      z-index: 10;
    }
    .oneko-variant-button {
      position: relative;
    }

    .oneko-variant-button:hover .oneko-tooltip {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }

    /* ============================= */
/* ✅ NEXT-THEMES / SHADCN FIX   */
/* ============================= */

/* 🌞 LIGHT THEME */
html.light #oneko-overlay .oneko-modal,
html:not(.dark) #oneko-overlay .oneko-modal {
  background: #ffffff !important;
  color: #0a0a0a !important;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25) !important;
}

/* 🌙 DARK THEME */
html.dark #oneko-overlay .oneko-modal {
  background: #0f0f0f !important;
  color: #ffffff !important;
  box-shadow: 0 20px 60px rgba(0,0,0,0.7) !important;
}

/* 🐱 PREVIEW INNER SHADOW – LIGHT */
html.light .oneko-preview,
html:not(.dark) .oneko-preview {
  box-shadow:
    inset 0 2px 6px rgba(0,0,0,0.15),
    inset 0 -2px 6px rgba(255,255,255,0.6) !important;
}

/* 🐱 PREVIEW INNER SHADOW – DARK */
html.dark .oneko-preview {
  box-shadow:
    inset 0 2px 6px rgba(0,0,0,0.45),
    inset 0 -2px 6px rgba(255,255,255,0.05) !important;
}

html.light #oneko-overlay .oneko-close svg,
html:not(.dark) #oneko-overlay .oneko-close svg {
  color: #010101 !important;
}

/* Dark theme */
html.dark #oneko-overlay .oneko-close svg {
  color: #ffffff !important;
}

    
  `;
  document.head.appendChild(pickerStyle);

  function sleep() {
    forceSleep = !forceSleep;
    nudge = false;
    localStorage.setItem("oneko:forceSleep", forceSleep);
    if (!forceSleep) {
      resetIdleAnimation();
      return;
    }

    // If Full App Display is on, sleep on its progress bar instead
    const fullAppDisplay = document.getElementById("fad-progress");
    if (fullAppDisplay) {
      mousePosX = fullAppDisplay.getBoundingClientRect().right - 16;
      mousePosY = fullAppDisplay.getBoundingClientRect().top - 12;
      return;
    }

    // Get the far right and top of the progress bar
    const progressBar = document.querySelector(
      ".main-nowPlayingBar-center .playback-progressbar"
    );
    if (!progressBar) {
      forceSleep = false;
      return;
    }

    const progressBarRight = progressBar.getBoundingClientRect().right;
    const progressBarTop = progressBar.getBoundingClientRect().top;
    const progressBarBottom = progressBar.getBoundingClientRect().bottom;

    // Make the cat sleep on the progress bar
    mousePosX = progressBarRight - 16;
    mousePosY = progressBarTop - 8;

    // Get the position of the remaining time
    const remainingTime = document.querySelector(
      ".main-playbackBarRemainingTime-container"
    );
    if (!remainingTime) return;

    const remainingTimeLeft = remainingTime.getBoundingClientRect().left;
    const remainingTimeBottom = remainingTime.getBoundingClientRect().bottom;
    const remainingTimeTop = remainingTime.getBoundingClientRect().top;

    // Get the position of elapsed time
    const elapsedTime = document.querySelector(
      ".playback-bar__progress-time-elapsed"
    );
    if (!elapsedTime) return;

    const elapsedTimeRight = elapsedTime.getBoundingClientRect().right;
    const elapsedTimeLeft = elapsedTime.getBoundingClientRect().left;

    // If the remaining time is on top right of the progress bar, make the cat sleep to the a little bit to the left of the remaining time
    // Theme compatibility
    if (
      remainingTimeLeft < progressBarRight &&
      remainingTimeTop < progressBarBottom &&
      progressBarTop - remainingTimeBottom < 32
    ) {
      mousePosX = remainingTimeLeft - 16;

      // Comfy special case

      // Move the cat to the left of elapsed time if it is too close to the remaining time (Nord theme)
      if (remainingTimeLeft - elapsedTimeRight < 32) {
        mousePosX = elapsedTimeLeft - 16;
      }
    }
  }

  function create() {
    variant = parseLocalStorage("variant", "classic");
    kuroNeko = parseLocalStorage("kuroneko", false);

    if (!variants.some((v) => v[0] === variant)) {
      variant = "classic";
    }

    nekoEl.id = "oneko";
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    // nekoEl.style.pointerEvents = "none";
    nekoEl.style.backgroundImage = `url('/oneko/skins/oneko-${variant}.gif')`;
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;

    nekoEl.style.zIndex = "99";

    document.body.appendChild(nekoEl);

    window.addEventListener("mousemove", (e) => {
      if (forceSleep) return;

      mousePosX = e.clientX;
      mousePosY = e.clientY;
    });

    window.addEventListener("resize", () => {
      if (forceSleep) {
        forceSleep = false;
        sleep();
      }
    });

    // Handle dragging of the cat
    nekoEl.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      grabbing = true;
      let startX = e.clientX;
      let startY = e.clientY;
      let startNekoX = nekoPosX;
      let startNekoY = nekoPosY;
      let grabInterval;

      const mousemove = (e) => {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        // Scratch in the opposite direction of the drag
        if (absDeltaX > absDeltaY && absDeltaX > 10) {
          setSprite(deltaX > 0 ? "scratchWallW" : "scratchWallE", frameCount);
        } else if (absDeltaY > absDeltaX && absDeltaY > 10) {
          setSprite(deltaY > 0 ? "scratchWallN" : "scratchWallS", frameCount);
        }

        if (
          grabStop ||
          absDeltaX > 10 ||
          absDeltaY > 10 ||
          Math.sqrt(deltaX ** 2 + deltaY ** 2) > 10
        ) {
          grabStop = false;
          clearTimeout(grabInterval);
          grabInterval = setTimeout(() => {
            grabStop = true;
            nudge = false;
            startX = e.clientX;
            startY = e.clientY;
            startNekoX = nekoPosX;
            startNekoY = nekoPosY;
          }, 150);
        }

        nekoPosX = startNekoX + e.clientX - startX;
        nekoPosY = startNekoY + e.clientY - startY;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
      };

      const mouseup = () => {
        grabbing = false;
        nudge = true;
        resetIdleAnimation();
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      };

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);
    });

    nekoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      openPicker();
    });

    nekoEl.addEventListener("dblclick", sleep);

    window.onekoInterval = setInterval(frame, 100);
  }

  function getSprite(name, frame) {
    return spriteSets[name][frame % spriteSets[name].length];
  }

  function setSprite(name, frame) {
    const sprite = getSprite(name, frame);
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    // every ~ 20 seconds
    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) {
        avalibleIdleAnimations.push("scratchWallW");
      }
      if (nekoPosY < 32) {
        avalibleIdleAnimations.push("scratchWallN");
      }
      if (nekoPosX > window.innerWidth - 32) {
        avalibleIdleAnimations.push("scratchWallE");
      }
      if (nekoPosY > window.innerHeight - 32) {
        avalibleIdleAnimations.push("scratchWallS");
      }
      idleAnimation =
        avalibleIdleAnimations[
          Math.floor(Math.random() * avalibleIdleAnimations.length)
        ];
    }

    if (forceSleep) {
      avalibleIdleAnimations = ["sleeping"];
      idleAnimation = "sleeping";
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8 && nudge && forceSleep) {
          setSprite("idle", 0);
          break;
        } else if (nudge) {
          nudge = false;
          resetIdleAnimation();
        }
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192 && !forceSleep) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;

    if (grabbing) {
      grabStop && setSprite("alert", 0);
      return;
    }

    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    // Cat has to sleep on top of the progress bar
    if (
      forceSleep &&
      Math.abs(diffY) < nekoSpeed &&
      Math.abs(diffX) < nekoSpeed
    ) {
      // Make the cat sleep exactly on the top of the progress bar
      nekoPosX = mousePosX;
      nekoPosY = mousePosY;
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;

      idle();
      return;
    }

    if ((distance < nekoSpeed || distance < 48) && !forceSleep) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      // count down after being alerted before moving
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  let pickerOpen = false;
  let overlayEl = null;

  function openPicker() {
    if (pickerOpen) return;
    pickerOpen = true;

    overlayEl = document.createElement("div");
    overlayEl.id = "oneko-overlay";
    overlayEl.innerHTML = `
      <div class="oneko-modal">
        <div class="oneko-header">
          <h3>Choose your Neko</h3>
          <span class="oneko-close">
          <svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  style="
    width: 24px;
    height: 24px;
    color: white;
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;
  "
  onmouseover="this.style.transform='rotate(90deg)'"
  onmouseout="this.style.transform='rotate(0deg)'"
>
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>


    </span>
        </div>
      </div>
    `;

    const modal = overlayEl.querySelector(".oneko-modal");
    modal.appendChild(pickerModal());

    document.body.appendChild(overlayEl);

    overlayEl.querySelector(".oneko-close").onclick = closePicker;
    overlayEl.onclick = (e) => e.target === overlayEl && closePicker();
  }

  function closePicker() {
    pickerOpen = false;
    overlayEl?.remove();
    overlayEl = null;
  }

  create();
  function getIdlePreview() {
    return [spriteSets.idle[0], spriteSets.alert[0]];
  }

  function setVariant(arr) {
    console.log(arr);

    variant = arr[0];
    localStorage.setItem("oneko:variant", `"${variant}"`);
    nekoEl.style.backgroundImage = `url('/oneko/skins/oneko-${variant}.gif')`;
  }

  // Popup modal to choose variant
  function pickerModal() {
    const container = document.createElement("div");
    container.className = "oneko-variant-container";

    const style = document.createElement("style");
    // Each variant is a 64x64 sprite
    style.innerHTML = `
      .oneko-variant-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: center;
        align-items: center;
      }
      .oneko-variant-button {
        width: 64px;
        height: 64px;
        margin: 8px;
        cursor: pointer;
        background-size: 800%;
        border-radius: 25%;
        transition: background-color 0.2s ease-in-out;
        background-position: var(--idle-x) var(--idle-y);
        image-rendering: pixelated;
      }
      .oneko-variant-button:hover, .oneko-variant-button-selected {
        background-color: var(--spice-main-elevated);
      }
      .oneko-variant-button:hover {
        background-position: var(--active-x) var(--active-y);
      }
    `;
    container.appendChild(style);

    const [idle, active] = getIdlePreview();

    function variantButton(variantEnum) {
      const div = document.createElement("div");

      div.className = "oneko-variant-button";
      div.id = variantEnum[0];
      div.style.backgroundImage = `url('/oneko/skins/oneko-${variantEnum[0]}.gif')`;

      div.style.setProperty("--idle-x", `${idle[0] * 64}px`);
      div.style.setProperty("--idle-y", `${idle[1] * 64}px`);
      div.style.setProperty("--active-x", `${active[0] * 64}px`);
      div.style.setProperty("--active-y", `${active[1] * 64}px`);

      // 🔥 Tooltip
      const tooltip = document.createElement("div");
      tooltip.className = "oneko-tooltip";
      tooltip.innerText = variantEnum[1];
      const preview = document.createElement("div");
      preview.className = "oneko-preview";

      preview.appendChild(tooltip);
      div.appendChild(preview);


      div.onclick = () => {
        setVariant(variantEnum);
        document
          .querySelector(".oneko-variant-button-selected")
          ?.classList.remove("oneko-variant-button-selected");
        div.classList.add("oneko-variant-button-selected");
        closePicker();
      };

      if (variantEnum[0] === variant) {
        div.classList.add("oneko-variant-button-selected");
      }

      return div;
    }

    for (const variant of variants) {
      container.appendChild(variantButton(variant));
    }

    return container;
  }

  window.addEventListener("keydown", (e) => {
    if (!e.shiftKey) return;

    if (e.key.toLowerCase() === "x") {
      pickerOpen ? closePicker() : openPicker();
    }

    if (e.key.toLowerCase() === "z") {
      sleep();
    }
  });

  if (parseLocalStorage("forceSleep", false)) {
    while (
      !document.querySelector(
        ".main-nowPlayingBar-center .playback-progressbar"
      )
    ) {
      await new Promise((r) => setTimeout(r, 100));
    }
    sleep();
  }
})();
