import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import $ from "jquery";

gsap.registerPlugin(ScrollTrigger);

("use strict");


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

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;

  const links = {
      '/index.html': 'index-link',
      '/projets.html': 'projets-link',
      '/stage.html': 'stage-link',
      '/contact.html': 'contact-link',
  };

  for (const path in links) {
      if (currentPath.endsWith(path)) {
          document.getElementById(links[path]).classList.add('active');
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
  },
});

timeln.addLabel("card1");
timeln.to(".card--1", {
  yPercentPercen: 0,
  opacity: 1,
});

timeln.from(".card--2", {
  yPercent: 75,
  opacity: 0,
});
timeln.addLabel("card2");

timeln.to(
  ".card--1",
  {
    scale: 0.95,
    yPercent: -0.5,
    opacity: 0.5,
  },
  "-=0.3"
);

timeln.to(".card--2", {
  yPercent: 0,
  opacity: 1,
});

timeln.from(".card--3", {
  yPercent: 75,
  opacity: 0,
});
timeln.addLabel("card3");

timeln.to(
  ".card--2",
  {
    scale: 0.98,
    yPercent: -0.4,
    opacity: 0.6,
  },
  "-=0.3"
);

timeln.to(".card--3", {
  yPercent: 0,
  opacity: 1,
});

timeln.to(".card--3", {});


// Scrolltrigger : Expliquation
document.addEventListener("DOMContentLoaded", function() {
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
        end: () => "+=" + containerexp.offsetWidth
      }
    });
  }
});

// BURGER MENU : Header


  document.addEventListener('DOMContentLoaded', function() {
    var burgerBtn = document.getElementById('burgerBtn');
    var header = document.querySelector('.header');

    burgerBtn.addEventListener('click', function() {
      header.classList.toggle('active');
    });
  });


// Progress bar : STAGE

document.addEventListener("DOMContentLoaded", function() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBar = entry.target;
        skillBar.classList.add('active');
        skillBar.style.setProperty('--skill-level', skillBar.getAttribute('data-skill-value'));
      }
    });
  });

  document.querySelectorAll('.skill-bar').forEach(bar => {
    observer.observe(bar);
  });
});



// UNLOCK CREATIVITY : Animation

document.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const unlockElements = document.querySelectorAll('.unlock');
  const creativityElements = document.querySelectorAll('.creativity');

  const scatterFactor = scrollY / 5; 

  unlockElements.forEach((element, index) => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = scatterFactor * (index + 1); 
      element.style.transform = `translate(${distance * Math.cos(angle)}px, ${distance * Math.sin(angle)}px)`;
      element.style.opacity = Math.max(1 - scrollY / 300, 0);
  });

  creativityElements.forEach((element, index) => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = scatterFactor * (index + 1);
      element.style.transform = `translate(${distance * Math.cos(angle)}px, ${distance * Math.sin(angle)}px)`;
      element.style.opacity = Math.max(1 - scrollY / 300, 0);
  });
});


// Scrolltrigger : section title

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".section-title");

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
      },
    }
  );
});

// Scaleup works

document.addEventListener('DOMContentLoaded', function() {
  const image = document.querySelector('.section-works__img');
  const section = document.querySelector('.section-works');

  if (!image || !section) {
    console.error('Element not found: .section-works__img or .section-works');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(section);

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const maxScroll = sectionTop + sectionHeight - viewportHeight;

    if (scrollTop >= sectionTop && scrollTop <= maxScroll) {
      const progress = (scrollTop - sectionTop) / (maxScroll - sectionTop);
      const newWidth = 50 + 50 * progress; // Width changes from 50% to 100%
      image.style.width = newWidth + 'vw';
      image.style.position = 'fixed';
      image.style.bottom = '0';
      image.style.left = '50%';
      image.style.transform = 'translateX(-50%)';
    } else if (scrollTop > maxScroll) {
      image.style.width = '100vw';
      image.style.position = 'absolute';
      image.style.bottom = '0';
      image.style.left = '50%';
      image.style.transform = 'translateX(-50%)';
    } else {
      image.style.width = '50vw';
      image.style.position = 'fixed';
      image.style.bottom = '0';
      image.style.left = '50%';
      image.style.transform = 'translateX(-50%)';
    }
  }
});


// Scrolltrigger : wings

gsap.set(".section-wings--img2", { scaleY: 1 });
gsap.set(".section-wings--img2", { scaleX: -1 });

gsap.to(".section-wings--img", {
  scrollTrigger: {
    trigger: ".section-wings",
    start: "top center",
    end: "bottom+=700 top",
    scrub: true,
    onEnter: () => gsap.to(".video-background__content", { opacity: 0, duration: 1 }),
    onEnterBack: () => gsap.to(".video-background__content", { opacity: 0, duration: 1 }),
  },
  keyframes: {
    "0%": { rotation: 0 },
    "25%": { rotation: 10 },
    "50%": { rotation: -10 },
    "75%": { rotation: 10 },
    "100%": { rotation: 0 },
  },
  ease: "power1.inOut"
});

gsap.to(".section-wings--img2", {
  scrollTrigger: {
    trigger: ".section-wings",
    start: "top center",
    end: "bottom+=700 top",
    scrub: true,
    onEnter: () => gsap.to(".video-background__content", { opacity: 0, duration: 1 }), 
    onEnterBack: () => gsap.to(".video-background__content", { opacity: 0, duration: 1 }), 
  },
  keyframes: {
    "0%": { rotation: 0 },
    "25%": { rotation: -10 },
    "50%": { rotation: 10 },
    "75%": { rotation: -10 },
    "100%": { rotation: 0 },
  },
  ease: "power1.inOut"
});

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
    about.addEventListener("touchend", () => (about.style.transform = defaultPosition));
  } else {
    about.addEventListener("mousemove", (e) => updateTilt(e.clientX, e.clientY));
    about.addEventListener("mouseleave", () => (about.style.transform = defaultPosition));
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
    console.log("Model loaded successfully");
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

    gsap.fromTo(
      myObject.scale,
      { x: 0.25, y: 0.25, z: 0.25 },
      {
        x: 0.45,
        y: 0.45,
        z: 0.45,
        scrollTrigger: {
          trigger: ".section-title",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  },
  undefined,
  function (error) {
    console.error("An error happened loading the model:", error);
  }
);

gltfLoader.load(
  "../images/logo.glb",
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
  },
  undefined,
  function (error) {
    console.error(
      "Une erreur s'est produite lors du chargement du deuxième modèle:",
      error
    );
  }
);

window.addEventListener("resize", onWindowResize);

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
console.log("test");

const radius = 30;
const duration = 20;

 gsap.to({}, {
   duration: duration,
   repeat: -1,
   onUpdate: function() {
     const t = this.progress();
     const radian = Math.PI * 2 * t;
     const y = Math.cos(radian) * radius;
     const z = Math.sin(radian) * radius;
     camera2.position.set(y, camera2.position.x, z);
     camera2.lookAt(0, 0, 0);
   }
 });
