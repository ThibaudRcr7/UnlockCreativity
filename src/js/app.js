import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import $ from "jquery";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".lightbox-gallery")) {
    // Dynamically import Lightbox CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/node_modules/lightbox2/dist/css/lightbox.min.css";
    document.head.appendChild(link);

    // Dynamically import Lightbox JS
    import("lightbox2")
      .then((lightbox) => {
        $(document).on("click", "[data-lightbox]", function (event) {
          event.preventDefault();
          lightbox.start($(this)[0]);
        });
      })
      .catch((error) => {
        console.error("Error loading Lightbox:", error);
      });
  }
});

// HEADER NAV - SCROLL :

document.addEventListener("DOMContentLoaded", () => {
  let lastScrollTop = 0;
  const navbar = document.querySelector(".header"); // Assurez-vous que le sélecteur correspond à votre HTML

  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scrolling vers le bas
      navbar.style.top = "-100%"; // Adaptez cette valeur selon la hauteur de votre barre de navigation
    } else {
      // Scrolling vers le haut
      navbar.style.top = "0";
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Pour éviter les valeurs négatives
  });
});

// ETAT ACTIF : HEADER

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  const links = {
    "/index.html": "index-link",
    "/projets.html": "projets-link",
    "/stage.html": "stage-link",
    "/contact.html": "contact-link",
  };

  for (const path in links) {
    if (currentPath.endsWith(path)) {
      document.getElementById(links[path]).classList.add("active");
      break;
    }
  }
});

// CARDS : PARALLAX

let timeln = gsap.timeline({
  scrollTrigger: {
    trigger: ".container-cards",
    pin: true,
    pinSpacing: true,
    start: "top-=180px top",
    end: "+=2000",
    scrub: 1,
    markers: true,
  },
});

timeln
  .addLabel("card1")
  .to(".card--1", {
    yPercent: 0,
    opacity: 1,
    onStart: () => console.log("Animating card--1"),
  })
  .from(".card--2", {
    yPercent: 75,
    opacity: 0,
  })
  .addLabel("card2")
  .to(
    ".card--1",
    {
      scale: 0.95,
      yPercent: -0.5,
      opacity: 0.5,
    },
    "-=0.3"
  )
  .to(".card--2", {
    yPercent: 0,
    opacity: 1,
  })
  .from(".card--3", {
    yPercent: 75,
    opacity: 0,
  })
  .addLabel("card3")
  .to(
    ".card--2",
    {
      scale: 0.98,
      yPercent: -0.4,
      opacity: 0.6,
    },
    "-=0.3"
  )
  .to(".card--3", {
    yPercent: 0,
    opacity: 1,
  });

// Scrolltrigger : Expliquation
document.addEventListener("DOMContentLoaded", function () {
  const containerexp = document.querySelector(".container-exp");
  if (containerexp) {
    let sections = gsap.utils.toArray(".section-expliquation");
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerexp,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + containerexp.offsetWidth,
      },
    });
  }
});

// BURGER MENU : Header

document.addEventListener("DOMContentLoaded", function () {
  var burgerBtn = document.getElementById("burgerBtn");
  var header = document.querySelector(".header");

  burgerBtn.addEventListener("click", function () {
    header.classList.toggle("active");
  });
});

// Progress bar : STAGE

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBar = entry.target;
        skillBar.classList.add("active");
        skillBar.style.setProperty(
          "--skill-level",
          skillBar.getAttribute("data-skill-value")
        );
      }
    });
  });

  document.querySelectorAll(".skill-bar").forEach((bar) => {
    observer.observe(bar);
  });
});

// UNLOCK CREATIVITY : Animation

document.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const unlockElements = document.querySelectorAll(".unlock");
  const creativityElements = document.querySelectorAll(".creativity");

  const scatterFactor = scrollY / 5;

  unlockElements.forEach((element, index) => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = scatterFactor * (index + 1);
    element.style.transform = `translate(${distance * Math.cos(angle)}px, ${
      distance * Math.sin(angle)
    }px)`;
    element.style.opacity = Math.max(1 - scrollY / 300, 0);
  });

  creativityElements.forEach((element, index) => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = scatterFactor * (index + 1);
    element.style.transform = `translate(${distance * Math.cos(angle)}px, ${
      distance * Math.sin(angle)
    }px)`;
    element.style.opacity = Math.max(1 - scrollY / 300, 0);
  });
});

// Scrolltrigger : section title

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".section-title");

  // Function to check if the device is mobile
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Apply animation only if not on mobile
  if (!isMobile()) {
    gsap.fromTo(
      "#text-behind, #text-behind-blur, #text-front",
      { scale: 1 },
      {
        scale: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: true,
        },
      }
    );
  }
});

// Scaleup works

document.addEventListener("DOMContentLoaded", function () {
  function initScaleupWorks() {
    var section = document.querySelector(".section-works");
    var image = document.querySelector(".section-works__img");

    if (!section || !image) {
      console.log(
        "Section-works or section-works__img not found on this page."
      );
      return; // Exit the function if the elements are not found
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", handleScroll);
            handleScroll();
          } else {
            window.removeEventListener("scroll", handleScroll);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    try {
      observer.observe(section);
    } catch (error) {
      console.error("Failed to observe the element:", error);
    }

    function handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var viewportHeight = window.innerHeight;
      var maxScroll = sectionTop + sectionHeight - viewportHeight;

      if (scrollTop >= sectionTop && scrollTop <= maxScroll) {
        var progress = (scrollTop - sectionTop) / (maxScroll - sectionTop);
        var newWidth = 50 + 50 * progress; // Width changes from 50% to 100%
        image.style.width = newWidth + "vw";
        image.style.position = "fixed";
        image.style.bottom = "0";
        image.style.left = "50%";
        image.style.transform = "translateX(-50%)";
      } else if (scrollTop > maxScroll) {
        image.style.width = "100vw";
        image.style.position = "absolute";
        image.style.bottom = "0";
        image.style.left = "50%";
        image.style.transform = "translateX(-50%)";
      } else {
        image.style.width = "50vw";
        image.style.position = "fixed";
        image.style.bottom = "0";
        image.style.left = "50%";
        image.style.transform = "translateX(-50%)";
      }
    }
  }

  initScaleupWorks();

  ScrollTrigger.create({
    trigger: ".section-works__scaleup",
    start: "top 50%",
    end: "bottom 50%",
    onEnter: function () {
      const targetElement = document.querySelector(".section-works__scaleup");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    },
    onLeaveBack: function () {
      document
        .querySelector(".section-works__scaleup")
        .scrollIntoView({ behavior: "smooth" });
    },
  });
});

// Scrolltrigger : wings

function createAnimations() {
  const endPosition = window.matchMedia("(max-width: 168px)").matches
    ? "bottom+=300 top"
    : "bottom+=600 top";

  gsap.set(".section-wings--img2", { scaleY: 1 });
  gsap.set(".section-wings--img2", { scaleX: -1 });

  gsap.to(".section-wings--img", {
    scrollTrigger: {
      trigger: ".section-wings",
      start: "top center",
      end: endPosition,
      scrub: true,
      onEnter: () =>
        gsap.to(".video-background__content", { opacity: 0, duration: 1 }),
      onEnterBack: () =>
        gsap.to(".video-background__content", { opacity: 0, duration: 1 }),
    },
    keyframes: {
      "0%": { rotation: 0 },
      "25%": { rotation: 10 },
      "50%": { rotation: -10 },
      "75%": { rotation: 10 },
      "100%": { rotation: 0 },
    },
    ease: "power1.inOut",
  });

  gsap.to(".section-wings--img2", {
    scrollTrigger: {
      trigger: ".section-wings",
      start: "top center",
      end: endPosition,
      scrub: true,
      onEnter: () =>
        gsap.to(".video-background__content", { opacity: 0, duration: 1 }),
      onEnterBack: () =>
        gsap.to(".video-background__content", { opacity: 0, duration: 1 }),
    },
    keyframes: {
      "0%": { rotation: 0 },
      "25%": { rotation: -10 },
      "50%": { rotation: 10 },
      "75%": { rotation: -10 },
      "100%": { rotation: 0 },
    },
    ease: "power1.inOut",
  });
}

createAnimations();

window.addEventListener("resize", createAnimations);

// RANDOM MESSENGER

var Messenger = function (el) {
  var m = this;

  m.init = function () {
    m.codeletters = "壁に耳あり障子に目あり";
    m.message = 0;
    m.current_length = 0;
    m.fadeBuffer = false;
    m.messages = ["PASSION", "CREATION", "AMBITION"];

    setTimeout(m.animateIn, 500);
  };

  m.generateRandomString = function (length) {
    var random_text = "";
    var reduced_length = Math.floor(length);
    while (random_text.length < reduced_length) {
      random_text += m.codeletters.charAt(
        Math.floor(Math.random() * m.codeletters.length)
      );
    }

    return random_text;
  };

  m.animateIn = function () {
    if (m.current_length < m.messages[m.message].length) {
      m.current_length = m.current_length + 2;
      if (m.current_length > m.messages[m.message].length) {
        m.current_length = m.messages[m.message].length;
      }

      var message = m.generateRandomString(m.current_length);
      $(el).html(message);

      setTimeout(m.animateIn, 300);
    } else {
      setTimeout(m.animateFadeBuffer, 300);
    }
  };

  m.animateFadeBuffer = function () {
    if (m.fadeBuffer === false) {
      m.fadeBuffer = [];
      for (var i = 0; i < m.messages[m.message].length; i++) {
        m.fadeBuffer.push({
          c: Math.floor(Math.random() * 20) + 1,
          l: m.messages[m.message].charAt(i),
        });
      }
    }

    var do_cycles = false;
    var message = "";

    for (var i = 0; i < m.fadeBuffer.length; i++) {
      var fader = m.fadeBuffer[i];
      if (fader.c > 0) {
        do_cycles = true;
        fader.c--;
        message += m.codeletters.charAt(
          Math.floor(Math.random() * m.codeletters.length)
        );
      } else {
        message += fader.l;
      }
    }

    $(el).html(message);

    if (do_cycles === true) {
      setTimeout(m.animateFadeBuffer, 80);
    } else {
      setTimeout(m.cycleText, 2000);
    }
  };

  m.cycleText = function () {
    m.message = m.message + 1;
    if (m.message >= m.messages.length) {
      m.message = 0;
    }

    m.current_length = 0;
    m.fadeBuffer = false;
    $(el).html("");

    setTimeout(m.animateIn, 200);
  };

  m.init();
};

var messenger = new Messenger($("#messenger"));

// CARD ABOUT : 3D TILT ANIM

const about = document.querySelector(".container-about");
if (about) {
  const defaultPosition =
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

  const updateTilt = (x, y) => {
    const containerRect = about.getBoundingClientRect();
    const mouseX = x - containerRect.left;
    const mouseY = y - containerRect.top;
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;
    const maxTilt = 15; // Adjust the maximum tilt angle as needed

    let tiltX = ((mouseX - centerX) / centerX) * maxTilt;
    let tiltY = ((centerY - mouseY) / centerY) * maxTilt;

    tiltX = Math.min(Math.max(tiltX, -maxTilt), maxTilt);
    tiltY = Math.min(Math.max(tiltY, -maxTilt), maxTilt);

    about.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(1, 1, 1)`;
  };

  let isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    about.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      updateTilt(touch.clientX, touch.clientY);
    });
    about.addEventListener(
      "touchend",
      () => (about.style.transform = defaultPosition)
    );
  } else {
    about.addEventListener("mousemove", (e) =>
      updateTilt(e.clientX, e.clientY)
    );
    about.addEventListener(
      "mouseleave",
      () => (about.style.transform = defaultPosition)
    );
  }
}

// THREE JS ANIM

var renderer1, renderer2, scene, scene1, scene2, camera1, camera2;
var canvas1 = document.getElementById("canvas-1");
if (canvas1) {
  renderer1 = new THREE.WebGLRenderer({
    canvas: canvas1,
    antialias: true,
    alpha: true,
  });

  renderer1.setPixelRatio(window.devicePixelRatio);
  renderer1.setSize(window.innerWidth, window.innerHeight);
}

renderer2 = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas-2"),
  antialias: true,
  alpha: true,
});

renderer2.setPixelRatio(window.devicePixelRatio);
renderer2.setSize(window.innerWidth, window.innerHeight);

scene = new THREE.Scene();
scene1 = new THREE.Scene();
scene2 = new THREE.Scene();

const hdrEquirect = new RGBELoader()
  .setPath(
    "https://raw.githubusercontent.com/miroleon/gradient_hdr_freebie/main/Gradient_HDR_Freebies/"
  )
  .load("ml_gradient_freebie_01.hdr", function () {
    hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
    scene1.environment = hdrEquirect;
    scene2.environment = hdrEquirect;
  });

camera1 = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera1.position.z = 10;
scene1.add(camera1);

camera2 = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera2.position.z = 10;
scene2.add(camera2);

const controls = new OrbitControls(camera2, renderer2.domElement);
controls.target.set(0, 0, 0);
controls.enableZoom = false;
controls.enablePan = false;

var group = new THREE.Group();
scene1.add(group);

var myObject = null;
var mySecondObject = null;

const material1 = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  roughness: 0,
  metalness: 0.6,
  envMapIntensity: 10,
});

const gltfLoader = new GLTFLoader();
gltfLoader.load(
  "../images/key.glb",
  function (gltf) {
    console.log("Premier modèle chargé avec succès");
    const object = gltf.scene;
    object.traverse(function (child) {
      if (child.isMesh) {
        child.material = material1;
      }
    });
    object.scale.setScalar(0.25);
    object.position.set(0, -1.4, 0);
    group.add(object);
    myObject = object;

    // Animation de changement de taille
    const resizeObject = (scale) => {
      gsap.to(myObject.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.5, // Durée de l'animation
      });
    };

    // Animation de changement de position
    const repositionObject = (positionY) => {
      gsap.to(myObject.position, {
        y: positionY,
        duration: 0.5, // Durée de l'animation
      });
    };

    const determineModelSize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 430) {
        resizeObject(0.1);
        repositionObject(-0.4);
      } else if (windowWidth <= 800) {
        resizeObject(0.2);
        repositionObject(-0.7);
      } else if (windowWidth <= 1420) {
        resizeObject(0.25);
        repositionObject(-0.8);
      } else {
        resizeObject(0.45);
        repositionObject(-1.4);
      }
    };

    determineModelSize();

    window.addEventListener("resize", determineModelSize);
  },
  undefined,
  function (error) {
    console.error(
      "Une erreur s'est produite lors du chargement du modèle :",
      error
    );
  }
);

gltfLoader.load(
  "../images/logo2.glb",
  function (gltf) {
    console.log("Deuxième modèle chargé avec succès");
    const secondObject = gltf.scene;
    secondObject.traverse(function (child) {
      if (child.isMesh) {
        child.material = material1;
      }
    });
    secondObject.scale.setScalar(1);
    secondObject.position.set(0, 0, 0);
    scene2.add(secondObject);
    mySecondObject = secondObject;

    // Fonction pour ajuster la taille de l'objet en fonction de la largeur de l'écran
    const adjustObjectSize = () => {
      const windowWidth = window.innerWidth;
      let newScale;

      if (windowWidth <= 800) {
        newScale = 0.5;
      } else if (windowWidth <= 1200) {
        newScale = 0.7;
      } else {
        newScale = 1;
      }

      mySecondObject.scale.setScalar(newScale);
    };

    // Appel initial pour ajuster la taille de l'objet au chargement de la page
    adjustObjectSize();

    // Écouteur d'événement pour ajuster la taille de l'objet lors du redimensionnement de la fenêtre
    window.addEventListener("resize", () => {
      // Appel de la fonction d'ajustement de la taille de l'objet lors du redimensionnement de la fenêtre
      adjustObjectSize();

      // Appel de la fonction d'ajustement de la fenêtre de rendu pour la caméra 1
      onWindowResize();
    });
  },
  undefined,
  function (error) {
    console.error(
      "Une erreur s'est produite lors du chargement du deuxième modèle:",
      error
    );
  }
);

function onWindowResize() {
  camera1.aspect = window.innerWidth / window.innerHeight;
  camera1.updateProjectionMatrix();
  if (canvas1) {
    renderer1.setSize(window.innerWidth, window.innerHeight);
  }

  const nouvelleLargeur = window.innerWidth / 2;
  const nouvelleHauteur = window.innerHeight;
  camera2.aspect = nouvelleLargeur / nouvelleHauteur;
  camera2.updateProjectionMatrix();
  renderer2.setSize(nouvelleLargeur, nouvelleHauteur);
}

function update1() {
  group.rotation.y += 0.001;

  if (myObject) {
    myObject.rotation.y += 0.001;
  }

  camera1.lookAt(0, 0, 0);
}

function update2() {}

function animate1() {
  requestAnimationFrame(animate1);
  update1();
  if (canvas1) {
    renderer1.render(scene1, camera1);
  }
}
function animate2() {
  requestAnimationFrame(animate2);
  update2();
  renderer2.render(scene2, camera2);
}

onWindowResize();
animate1();
animate2();

const radius = 30;
const duration = 20;

gsap.to(
  {},
  {
    duration: duration,
    repeat: -1,
    onUpdate: function () {
      const t = this.progress();
      const radian = Math.PI * 2 * t;
      const y = Math.cos(radian) * radius;
      const z = Math.sin(radian) * radius;
      camera2.position.set(y, camera2.position.x, z);
      camera2.lookAt(0, 0, 0);
    },
  }
);
