// ===== BACKGROUND MUSIC CONTROLLER =====
// Taruh 2 file musik di folder img/:
//   img/music1.mp3 → lagu awal (intro)
//   img/music2.mp3 → lagu kedua (mulai saat Happy Valentine muncul)
const setupMusic = () => {
  const music1 = document.getElementById("bgMusic1");
  const music2 = document.getElementById("bgMusic2");
  const toggleBtn = document.getElementById("musicToggle");
  let isPlaying = false;
  let currentTrack = music1;

  const playCurrentTrack = () => {
    currentTrack.play().then(() => {
      isPlaying = true;
      toggleBtn.textContent = "🔊";
    }).catch(() => {});
  };

  // Switch from music1 to music2 (called by animation timeline)
  window.switchToMusic2 = () => {
    music1.pause();
    music1.currentTime = 0;
    currentTrack = music2;
    if (isPlaying) {
      playCurrentTrack();
    }
  };

  // Reset to music1 (for replay)
  window.resetToMusic1 = () => {
    music2.pause();
    music2.currentTime = 0;
    music1.currentTime = 0;
    currentTrack = music1;
    if (isPlaying) {
      playCurrentTrack();
    }
  };

  // Autoplay on first interaction (mobile requires user gesture)
  const startOnInteraction = () => {
    playCurrentTrack();
    document.removeEventListener("click", startOnInteraction);
    document.removeEventListener("touchstart", startOnInteraction);
  };
  document.addEventListener("click", startOnInteraction);
  document.addEventListener("touchstart", startOnInteraction);

  // Toggle button
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isPlaying) {
      currentTrack.pause();
      toggleBtn.textContent = "🔇";
      isPlaying = false;
    } else {
      playCurrentTrack();
    }
  });
};

// ===== FLOATING HEARTS BACKGROUND =====
const createFloatingHearts = () => {
  const container = document.getElementById("floatingHearts");
  const hearts = ["💕", "💗", "💖", "❤️", "💝", "💘", "✨", "🌹"];

  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = Math.random() * 6 + 6 + "s";
    heart.style.animationDelay = Math.random() * 10 + "s";
    heart.style.fontSize = Math.random() * 1.5 + 0.8 + "rem";
    container.appendChild(heart);
  }
};

// ===== ANIMATION TIMELINE =====
const animationTimeline = () => {
  // Split chars that need to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  const tl = new TimelineMax();

  tl.to(".container", 0.1, {
    visibility: "visible",
  })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10,
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0,
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0,
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible",
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "#ff1493",
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150,
      },
      "+=0.7"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "#ff1493",
      color: "#fff",
      borderRadius: "8px",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=0.5"
    )
    .to(
      ".idea-5 span",
      0.7,
      {
        rotation: 90,
        x: 8,
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0,
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut,
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut,
      },
      0.2,
      "+=1"
    )
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400,
      },
      {
        opacity: 1,
        y: -1000,
      },
      0.2
    )
    .from(
      ".girl-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0,
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150,
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut,
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1",
    })
    // ===== WAGURI QUESTION ANIMATION =====
    .to(".waguri-question", 0.1, {
      visibility: "visible",
    })
    .to(".waguri-question", 1, {
      opacity: 1,
      ease: Power2.easeOut,
    })
    .from(".waguri-text", 0.8, {
      scale: 0.3,
      opacity: 0,
      rotation: -10,
      ease: Elastic.easeOut.config(1, 0.5),
    })
    .staggerFrom(
      ".waguri-buttons button",
      0.5,
      {
        opacity: 0,
        y: 30,
        scale: 0.5,
      },
      0.2
    )
    .addPause()
    // After Yes button resumes → waguri fades out
    .to(".waguri-question", 0.5, {
      opacity: 0,
      y: -30,
    })
    .to(".waguri-question", 0.1, {
      visibility: "hidden",
    })
    // ===== DANCE PARTY CELEBRATION =====
    .to(".dance-party", 0.1, {
      visibility: "visible",
    })
    .to(".dance-party", 0.8, {
      opacity: 1,
      ease: Power2.easeOut,
    })
    .from(".dance-title", 0.8, {
      scale: 0.3,
      opacity: 0,
      rotation: -5,
      ease: Elastic.easeOut.config(1, 0.5),
    })
    // Images appear one by one with dramatic entrances
    .staggerFrom(
      ".dance-img",
      0.8,
      {
        opacity: 0,
        scale: 0,
        rotation: 360,
        ease: Back.easeOut.config(1.7),
      },
      1.0
    )
    // Let them all dance together for a long time 🕺💃
    .to(".dance-party", 0.1, { delay: 12 })
    // Slowly fade out the party
    .to(".dance-party", 1.2, {
      opacity: 0,
      y: -30,
      ease: Power2.easeInOut,
    })
    .to(".dance-party", 0.1, {
      visibility: "hidden",
    })
    // ===== HEART SECTION - SUBARU =====
    .to(".heart-section", 0.1, {
      visibility: "visible",
    })
    .to(".heart-section", 0.8, {
      opacity: 1,
      ease: Power2.easeOut,
    })
    .from(".heart-img", 1, {
      scale: 0,
      rotation: 720,
      opacity: 0,
      ease: Elastic.easeOut.config(1, 0.5),
    })
    .from(".heart-text", 0.8, {
      opacity: 0,
      y: 30,
      skewX: "-10deg",
      ease: Power2.easeOut,
    })
    // Let it linger... 💗
    .to(".heart-section", 0.1, { delay: 5 })
    // Fade out
    .to(".heart-section", 1, {
      opacity: 0,
      y: -20,
      ease: Power2.easeInOut,
    })
    .to(".heart-section", 0.1, {
      visibility: "hidden",
    })
    // ===== ENDING =====
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90,
      },
      "+=1"
    );

  // Handle Waguri buttons
  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");
  const response = document.getElementById("waguri-response");

  btnYes.addEventListener("click", () => {
    response.innerHTML = "Yay! You won't regret it! 💖✨";
    response.style.color = "#ff69b4";
    
    // 🎵 Switch to music 2 on Yes!
    if (window.switchToMusic2) window.switchToMusic2();
    
    // Create celebration hearts burst
    for (let i = 0; i < 30; i++) {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = ["💖", "💕", "💗", "✨", "🎉"][Math.floor(Math.random() * 5)];
      heart.style.left = Math.random() * 100 + "%";
      heart.style.animationDuration = Math.random() * 3 + 2 + "s";
      heart.style.animationDelay = Math.random() * 1 + "s";
      heart.style.fontSize = Math.random() * 2 + 1 + "rem";
      document.getElementById("floatingHearts").appendChild(heart);
    }

    setTimeout(() => {
      tl.resume();
    }, 3000);
  });

  btnNo.addEventListener("click", () => {
    // The No button runs away!
    btnNo.style.position = "relative";
    btnNo.style.left = (Math.random() * 200 - 100) + "px";
    btnNo.style.top = (Math.random() * 200 - 100) + "px";
    btnNo.style.transition = "all 0.3s ease";
    
    // After a few tries, show a message
    if (!btnNo.dataset.tries) btnNo.dataset.tries = 0;
    btnNo.dataset.tries = parseInt(btnNo.dataset.tries) + 1;
    
    if (parseInt(btnNo.dataset.tries) >= 3) {
      response.innerHTML = "Hehe, just say yes already! 😄💕";
      response.style.color = "#ffb6c1";
    }
  });

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    // Reset waguri response
    response.innerHTML = "";
    btnNo.style.left = "0";
    btnNo.style.top = "0";
    btnNo.dataset.tries = 0;
    // Reset dance party
    TweenMax.set(".dance-party", { opacity: 0, visibility: "hidden", y: 0 });
    // Reset heart section
    TweenMax.set(".heart-section", { opacity: 0, visibility: "hidden", y: 0 });
    // 🎵 Reset to music 1
    if (window.resetToMusic1) window.resetToMusic1();
    tl.restart();
  });
};

// ===== FETCH CUSTOMIZATION DATA =====
const fetchData = () => {
  fetch("customize.json")
    .then((data) => data.json())
    .then((data) => {
      Object.keys(data).map((customData) => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .getElementById(customData)
              .setAttribute("src", data[customData]);
          } else {
            document.getElementById(customData).innerText = data[customData];
          }
        }
      });
    });
};

// ===== INITIALIZE =====
const resolveFetch = () => {
  return new Promise((resolve, reject) => {
    fetchData();
    resolve("Fetch done!");
  });
};

// Start floating hearts and music
createFloatingHearts();
setupMusic();

// Then run main animation
resolveFetch().then(animationTimeline());
