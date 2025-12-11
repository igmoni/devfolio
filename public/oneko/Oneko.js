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
    "/oneko/oneko-vaporwave.gif",
    "/oneko/oneko-purple.gif",
    "/oneko/oneko-classic.gif",
    "/oneko/oneko-black.gif",
    "/oneko/oneko-white.gif",
    "/oneko/oneko-rainbow.gif",
  ];

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
  function openGifPopup(x, y) {
    const old = document.getElementById("oneko-popup");
    if (old) old.remove();

    const popup = document.createElement("div");
    popup.id = "oneko-popup";
    popup.style.position = "fixed";
    popup.style.left = x + "px";
    popup.style.top = y + "px";
    popup.style.background = "#111";
    popup.style.padding = "8px";
    popup.style.borderRadius = "8px";
    popup.style.display = "grid";
    popup.style.gridTemplateColumns = "repeat(3, 1fr)";
    popup.style.gap = "6px";
    popup.style.zIndex = 2147483647;

    gifOptions.forEach((gif) => {
      const img = document.createElement("img");
      img.src = gif;
      img.style.width = "48px";
      img.style.height = "48px";
      img.style.cursor = "pointer";
      img.style.borderRadius = "4px";

      img.onclick = () => {
        nekoEl.style.backgroundImage = `url(${gif})`;
        window.localStorage.setItem("oneko-gif", gif);
        popup.remove();
      };

      popup.appendChild(img);
    });

    document.body.appendChild(popup);

    document.addEventListener(
      "click",
      () => {
        popup.remove();
      },
      { once: true }
    );
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
