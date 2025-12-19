(function oneko() {
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (isReducedMotion) return;

  const nekoEl = document.createElement("div");

  let nekoPosX = 32;
  let nekoPosY = 32;

  let mousePosX = 0;
  let mousePosY = 0;

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;

  const nekoSpeed = 10;

  // ----------------------------------------
  // DRAG STATE
  // ----------------------------------------
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  // ----------------------------------------
  // GIF OPTIONS FOR POPUP
  // ----------------------------------------
  const gifOptions = [
    "/oneko/oneko.gif",
    "/oneko/oneko-vaporwave.gif",
    "/oneko/oneko-dog.gif",
    "/oneko/oneko-tora.gif",
    "/oneko/oneko-maia.gif",
  ];

  const gifFrontPics= [
    '/oneko/onekoc.png',
    '/oneko/onekovw.png',
    '/oneko/onekod.png',
    '/oneko/onekot.png',
    '/oneko/onekom.png',
  ]

  const gifNames = [
    'Classic',
    'Vaporwave',
    'Dog',
    'Tora',
    'Maia'
  ]
  // ----------------------------------------
  // SPRITE SHEET MAP
  // ----------------------------------------
  const spriteSets = {
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
  };

  function init() {
    nekoEl.id = "oneko";
    nekoEl.ariaHidden = true;
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "auto"; // IMPORTANT for clicking & dragging
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = 2147483647;

    // APPLY SAVED GIF
    let saved = window.localStorage.getItem("oneko-gif");
    let nekoFile = saved || "/oneko/oneko-vaporwave.gif";

    nekoEl.style.backgroundImage = `url(${nekoFile})`;

    document.body.appendChild(nekoEl);

    document.addEventListener("mousemove", function (event) {
      mousePosX = event.clientX;
      mousePosY = event.clientY;

      if (isDragging) {
        nekoPosX = event.clientX - dragOffsetX;
        nekoPosY = event.clientY - dragOffsetY;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
      }
    });

    // DRAG START
    nekoEl.addEventListener("mousedown", (e) => {
      e.preventDefault();
      if (e.button === 0) {
        isDragging = true;
        dragOffsetX = e.clientX - nekoPosX;
        dragOffsetY = e.clientY - nekoPosY;
      }
    });

    // DRAG END
    document.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // RIGHT CLICK → OPEN GIF MENU
    nekoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      openGifPopup(e.clientX, e.clientY);
    });

    window.requestAnimationFrame(onAnimationFrame);
  }

  // ----------------------------------------
  // POPUP MENU FOR GIF SELECTION
  // ----------------------------------------
 function openGifPopup() {
  nekoEl.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  createNekoPicker({
    nekoEl,
    gifOptions,
    gifFrontPics,
    gifNames,
  });
});

}




  // ----------------------------------------
  // ANIMATION + MOVEMENT
  // ----------------------------------------
  let lastFrameTimestamp;

  function onAnimationFrame(timestamp) {
    if (!nekoEl.isConnected) return;

    if (isDragging) {
      window.requestAnimationFrame(onAnimationFrame);
      return;
    }

    if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;

    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp;
      frame();
    }

    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      let options = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) options.push("scratchWallW");
      if (nekoPosY < 32) options.push("scratchWallN");
      if (nekoPosX > window.innerWidth - 32) options.push("scratchWallE");
      if (nekoPosY > window.innerHeight - 32) options.push("scratchWallS");

      idleAnimation = options[Math.floor(Math.random() * options.length)];
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 192) resetIdleAnimation();
        break;

      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) resetIdleAnimation();
        break;

      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;

    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < nekoSpeed || distance < 48) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite("alert", 0);
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction = "";
    direction = diffY / distance > 0.5 ? "N" : direction;
    direction = diffY / distance < -0.5 ? "S" : direction;
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

  init();
})();

function createNekoPicker({ nekoEl, gifOptions, gifFrontPics, gifNames }) {
  // cleanup
  document.getElementById("oneko-popup")?.remove();
  document.getElementById("oneko-backdrop")?.remove();

  /* ---------- BACKDROP ---------- */
  const backdrop = document.createElement("div");
  backdrop.id = "oneko-backdrop";
  Object.assign(backdrop.style, {
    position: "fixed",
    inset: "0",
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(4px)",
    zIndex: 2147483646,
    opacity: "0",
    transition: "opacity 150ms ease",
  });

  /* ---------- POPUP ---------- */
  const popup = document.createElement("div");
  popup.id = "oneko-popup";
  Object.assign(popup.style, {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%) scale(0.95)",
    background: "#0f0f0f",
    padding: "14px",
    borderRadius: "12px",
    zIndex: 2147483647,
    boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
    opacity: "0",
    transition:
      "opacity 150ms ease, transform 200ms cubic-bezier(0.16, 1, 0.3, 1)",
  });

  /* ---------- HEADER ---------- */
  const header = document.createElement("div");
  Object.assign(header.style, {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  });

  const title = document.createElement("span");
  title.textContent = "Choose Neko";
  Object.assign(title.style, {
    fontWeight: "700",
    fontSize: "14px",
    color: "#fff",
  });

  const closeBtn = document.createElement("span");
  closeBtn.textContent = "✕";
  Object.assign(closeBtn.style, {
    cursor: "pointer",
    color: "#aaa",
    fontSize: "14px",
  });

  closeBtn.onclick = close;
  header.append(title, closeBtn);

  /* ---------- FLEX GRID (AUTO WIDTH) ---------- */
  const grid = document.createElement("div");
  Object.assign(grid.style, {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "center", // 👈 THIS CENTERS 2ND ROW
    maxWidth: "180px",        // 3 * 48 + gaps
  });

  gifFrontPics.forEach((frontPic, index) => {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";

    const img = document.createElement("img");
    img.src = frontPic;
    img.width = 48;
    img.height = 48;

    Object.assign(img.style, {
      cursor: "pointer",
      borderRadius: "6px",
      transition: "transform 0.15s ease",
    });

    /* ---------- TOOLTIP ---------- */
    const tooltip = document.createElement("div");
    tooltip.textContent = gifNames[index];
    Object.assign(tooltip.style, {
      position: "absolute",
      bottom: "110%",
      left: "50%",
      transform: "translateX(-50%) translateY(4px)",
      background: "#111",
      color: "#fff",
      fontSize: "11px",
      padding: "4px 8px",
      borderRadius: "6px",
      whiteSpace: "nowrap",
      opacity: "0",
      pointerEvents: "none",
      transition:
        "opacity 120ms ease, transform 120ms cubic-bezier(0.16,1,0.3,1)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
    });

    img.onmouseenter = () => {
      img.style.transform = "scale(1.1)";
      tooltip.style.opacity = "1";
      tooltip.style.transform = "translateX(-50%) translateY(0)";
    };

    img.onmouseleave = () => {
      img.style.transform = "scale(1)";
      tooltip.style.opacity = "0";
      tooltip.style.transform = "translateX(-50%) translateY(4px)";
    };

    img.onclick = () => {
      const selectedGif = gifOptions[index];
      nekoEl.style.backgroundImage = `url(${selectedGif})`;
      localStorage.setItem("oneko-gif", selectedGif);
      close();
    };

    wrapper.append(img, tooltip);
    grid.appendChild(wrapper);
  });

  popup.append(header, grid);
  document.body.append(backdrop, popup);

  /* ---------- OPEN ---------- */
  requestAnimationFrame(() => {
    backdrop.style.opacity = "1";
    popup.style.opacity = "1";
    popup.style.transform = "translate(-50%, -50%) scale(1)";
  });

  backdrop.onclick = close;

  function close() {
    backdrop.style.opacity = "0";
    popup.style.opacity = "0";
    popup.style.transform = "translate(-50%, -50%) scale(0.95)";
    setTimeout(() => {
      backdrop.remove();
      popup.remove();
    }, 150);
  }
}
