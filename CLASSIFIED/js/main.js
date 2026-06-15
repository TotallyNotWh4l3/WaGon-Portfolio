// =======================
// Functions
// =======================
const task = {
  wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }
};

// =======================
// Animation Config
// =======================
const globalDelay = 350;

const ANIM_CONFIG = {
  bars: {
    duration: 500,
    interval: 75,
    loopDuration: 2000,
    loopInterval: 500,
    delay: 500,
  },
  slide: {
    duration: 750,
    interval: 250,
    baseDelay: 250,
  },
  anom: {
    duration: 750,
    interval: 150,
    baseDelay: 250,
  },
  rotate: {
    duration: 750,
    delay: 300,
  },
  diamond: {
    duration: 500,
    delay: 900,
  },
  segment: {
    duration: 500,
    interval: 100,
    baseDelay: 1100,
  },
};
// =======================
// Cached DOM Selectors
// =======================
const levelBars = document.querySelectorAll(".bar");
const slideLeftRight = document.querySelectorAll(".slide-lr");
const slideRightLeft = document.querySelectorAll(".slide-rl");
const anomClasses = document.querySelectorAll(".anom-class");
const rotateTargets = document.querySelectorAll(".rotate");
const diamond = document.querySelectorAll(".danger-diamond");
const segItems = document.querySelectorAll(".segment-item");
const barWrap = document.getElementById("barWrap");
const InAuthCred = document.getElementById("in-auth-cred")
const mainContainer = document.getElementById("main-container")
const contProc = document.getElementById("containmentProcedures_Desc")
// =======================
// Utility Functions
// =======================
const animateElement = (element, keyframes, options) => {
  element.animate(keyframes, options);
};

const staggerDelay = (index, interval, base = 0, reverse = false, length = 0) => {
  const effectiveIndex = reverse ? (length - 1 - index) : index;
  return (effectiveIndex * interval) + base + globalDelay;
};
// =======================
// Animations
// =======================
function animateBars() {
  const { duration, interval, loopDuration, loopInterval, delay } = ANIM_CONFIG.bars;
  const horiDelay = (levelBars.length * interval) + duration;

  levelBars.forEach((bar, index) => {
    animateElement(bar, {
      opacity: [0, 1],
      height: ["0%", "6px"],
      width: ["18px", "6px"]
    }, {
      duration,
      easing: "cubic-bezier(0, 0.7, 0.3, 1)",
      delay: staggerDelay(index, interval) + delay,
      fill: "forwards"
    });

    animateElement(bar, {
      width: ["6px", "100%"],
    }, {
      duration,
      easing: "cubic-bezier(0.6, 0, 0.4, 1)",
      delay: staggerDelay(index, interval) + horiDelay / 2,
      fill: "forwards"
    });

    animateElement(bar, {
      backgroundColor: ["hsla(0, 0%, 100%, 1)", "hsla(0, 100%, 75%, 1)"],
      boxShadow: ["0px 0px 8px 2px rgba(255,188,188,1)", "0px 0px 8px 2px rgb(255,86,86)"]
    }, {
      duration: loopDuration,
      easing: "cubic-bezier(0.2, 0, 0.8, 1)",
      delay: staggerDelay(index, loopInterval) + horiDelay,
      iterations: Infinity,
      direction: "alternate",
      fill: "both"
    });
  });
}

function animateSlides() {
  const { duration, interval, baseDelay } = ANIM_CONFIG.slide;

  const slideAnimation = (elements, direction) => {
    elements.forEach((target, index) => {
      animateElement(target, {
        opacity: [0, 1],
        translate: [`${direction}4rem 0`, "0 0"]
      }, {
        duration,
        easing: "cubic-bezier(0.6, 0, 0.4, 1)",
        delay: staggerDelay(index, interval, baseDelay),
        fill: "forwards"
      });
    });
  };

  slideAnimation(slideLeftRight, "");
  slideAnimation(slideRightLeft, "-");
}

function animateAnomClasses() {
  const { duration, interval, baseDelay } = ANIM_CONFIG.anom;

  anomClasses.forEach((target, index) => {
    target.style.height = "0%";
    target.style.width = "0%";

    animateElement(target, {
      height: ["0%", "100%"]
    }, {
      duration: duration / 1.5,
      easing: "cubic-bezier(0, 0, 0.1, 1)",
      delay: staggerDelay(index, interval, baseDelay),
      fill: "forwards"
    });

    animateElement(target, {
      width: ["0%", "100%"]
    }, {
      duration,
      easing: "cubic-bezier(0.7, 0, 0.3, 1)",
      delay: staggerDelay(index, interval, baseDelay + duration / 2),
      fill: "forwards"
    });
  });
}

function animateRotate() {
  const { duration, delay } = ANIM_CONFIG.rotate;

  rotateTargets.forEach((target) => {
    target.style.transform = "rotate(720deg) scale(0)";

    animateElement(target, {
      transform: ["rotate(720deg) scale(0)", "rotate(0deg) scale(1)"]
    }, {
      duration,
      easing: "cubic-bezier(0, 0.3, 0.5, 1)",
      delay: delay + globalDelay,
      fill: "forwards"
    });
  });
}

function animateDiamond() {
  const { duration, delay } = ANIM_CONFIG.diamond;

  diamond.forEach((target) => {
    target.style.transform = "scale(0)";

    animateElement(target, {
      transform: ["scale(0)", "scale(1)"]
    }, {
      duration,
      easing: "cubic-bezier(0, 0.7, 0.3, 1)",
      delay: delay + globalDelay,
      fill: "forwards"
    });
  });
}

function animateSegments() {
  const { duration, interval, baseDelay } = ANIM_CONFIG.segment;

  segItems.forEach((target, index) => {
    target.style.setProperty("--afterIcon-Scale", "0");
    target.style.setProperty("--diamond-size", "0");

    animateElement(target, [
      { "--afterIcon-Scale": "0", "--diamond-size": "0" },
      { "--afterIcon-Scale": "1", "--diamond-size": "2.325rem" }
    ], {
      duration,
      easing: "cubic-bezier(0, 0.7, 0.3, 1)",
      delay: staggerDelay(index, interval, baseDelay),
      fill: "forwards"
    });
  });
}
// =======================
// Call Animations
// =======================
const animations = [
  animateBars,
  animateSlides,
  animateAnomClasses,
  animateRotate,
  animateDiamond,
  animateSegments,
]

export const openFile = () => {

  const barWrapKey = {
    width: ["2%", "100%"],
  }

  const barWrapOpt = {
    duration: 1500,
    easing: "cubic-bezier(0.7, 0, 0.3, 1)",
    fill: "forwards"
  }

  barWrap.animate(barWrapKey, barWrapOpt)

  animations.forEach(fn => fn())

  const MCKey = {
    height: ["9rem", "calc(100vh - 4rem)"]
  }

  const MCOpt = {
    duration: 1500,
    easing: "cubic-bezier(0.4, 0, 0.6, 1)",
    fill: "forwards"
  }
  mainContainer.animate(MCKey, MCOpt)
}


const checkMask = document.getElementById("check-mask")
var oneClick = true

async function clicked() {
  if (oneClick) {
    oneClick = false
    openFile()
    let newTxt = "[ 認証資格情報受理 ]"
    InAuthCred.style.color = "#b8ffc0"
    InAuthCred.textContent = " "
    for (let i = 0; i < newTxt.length; i++) {
      InAuthCred.textContent += newTxt.charAt(i)
      await task.wait(0.01 * (Math.random()*10))
    }
  }
}

checkMask.addEventListener("click", () => {
  clicked()
});

