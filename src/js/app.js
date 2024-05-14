import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import $ from 'jquery';



gsap.registerPlugin(ScrollTrigger);

'use strict';

// HEADER NAV - SCROLL :

document.addEventListener('DOMContentLoaded', () => {
  let lastScrollTop = 0;
  const navbar = document.querySelector('.header'); // Assurez-vous que le sélecteur correspond à votre HTML

  window.addEventListener('scroll', () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
          // Scrolling vers le bas
          navbar.style.top = '-100%'; // Adaptez cette valeur selon la hauteur de votre barre de navigation
      } else {
          // Scrolling vers le haut
          navbar.style.top = '0';
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Pour éviter les valeurs négatives
  });
});

// CARDS : PARALLAX

let timeln = gsap.timeline({
  scrollTrigger: {
    trigger: ".container-projets",
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


// Scrolltrigger : section title 

document.addEventListener("DOMContentLoaded", function() {
  const section = document.querySelector('.section-title');

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
      }
    }
  );
});



// Scrolltrigger : wings

gsap.to(".section-projets--img", {
  scrollTrigger: {
    trigger: ".section-projets", 
    start: "top top", 
    end: "bottom top",
    scrub: true
  },
  y: "150%", 
  opacity: 0 
});

// RANDOM MESSENGER 

var Messenger = function(el){
  var m = this;
  
  m.init = function(){
    m.codeletters = "壁に耳あり障子に目あり";
    m.message = 0;
    m.current_length = 0;
    m.fadeBuffer = false;
    m.messages = [
      'PASSION',
      'CRÉATION',
      'AMBITION'
    ];
    
    setTimeout(m.animateIn, 500);
  };
  
  m.generateRandomString = function(length){
    var random_text = '';
    var reduced_length = Math.floor(length / 2); // Ajoutez cette ligne pour réduire la taille par 2
    while(random_text.length < reduced_length){ // Modifiez cette ligne pour utiliser reduced_length
      random_text += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
    } 
      
    return random_text;
  };
  
  
  m.animateIn = function(){
    if(m.current_length < m.messages[m.message].length){
      m.current_length = m.current_length + 2;
      if(m.current_length > m.messages[m.message].length) {
        m.current_length = m.messages[m.message].length;
      }
      
      var message = m.generateRandomString(m.current_length);
      $(el).html(message);
      
      setTimeout(m.animateIn, 300);
    } else { 
      setTimeout(m.animateFadeBuffer, 300);
    }
  };
  
  m.animateFadeBuffer = function(){
    if(m.fadeBuffer === false){
      m.fadeBuffer = [];
      for(var i = 0; i < m.messages[m.message].length; i++){
        m.fadeBuffer.push({c: (Math.floor(Math.random()*20))+1, l: m.messages[m.message].charAt(i)}); // Réduisez le nombre de cycles aléatoires
      }
    }
    
    var do_cycles = false;
    var message = ''; 
  
    for(var i = 0; i < m.fadeBuffer.length; i++){
      var fader = m.fadeBuffer[i];
      if(fader.c > 0){
        do_cycles = true;
        fader.c--;
        message += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
      } else {
        message += fader.l;
      }
    }
  
    $(el).html(message);
    
    if(do_cycles === true){
      setTimeout(m.animateFadeBuffer, 80);
    } else {
      setTimeout(m.cycleText, 2000);
    }
  };
  
  
  m.cycleText = function(){
    m.message = m.message + 1;
    if(m.message >= m.messages.length){
      m.message = 0;
    }
    
    m.current_length = 0;
    m.fadeBuffer = false;
    $(el).html('');
    
    setTimeout(m.animateIn, 200);
  };
  
  m.init();
}

var messenger = new Messenger($('#messenger'));


// THREE JS ANIM

var renderer1, renderer2, scene, scene1, scene2, camera1, camera2;

renderer1 = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas-1"),
  antialias: true,
  alpha: true
});

renderer1.setPixelRatio(window.devicePixelRatio);
renderer1.setSize(window.innerWidth, window.innerHeight);

renderer2 = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas-2"),
  antialias: true,
  alpha: true
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

camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.z = 10;
scene1.add(camera1);

camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
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
  envMapIntensity: 10
});

const gltfLoader = new GLTFLoader();
gltfLoader.load(
  '../images/key.glb',
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

    gsap.fromTo(myObject.scale, 
      { x: 0.25, y: 0.25, z: 0.25 }, 
      {
        x: 0.45,  
        y: 0.45, 
        z: 0.45,
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  },
  undefined,
  function (error) {
    console.error('An error happened loading the model:', error);
  }
);

gltfLoader.load(
  '../images/logo.glb',
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
    console.error('Une erreur s\'est produite lors du chargement du deuxième modèle:', error);
  }
);

window.addEventListener("resize", onWindowResize);

function onWindowResize() {
  camera1.aspect = window.innerWidth / window.innerHeight;
  camera1.updateProjectionMatrix();
  renderer1.setSize(window.innerWidth, window.innerHeight);

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

function update2() {

}

function animate1() {
  requestAnimationFrame(animate1);
  update1();
  renderer1.render(scene1, camera1);
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

// gsap.to({}, {
//   duration: duration,
//   repeat: -1,
//   onUpdate: function() {

//     const t = this.progress();

//     const radian = Math.PI * 2 * t;


//     const y = Math.cos(radian) * radius;
//     const z = Math.sin(radian) * radius;

//     camera2.position.set(y, camera2.position.x, z);

//     camera2.lookAt(0, 0, 0);
//   }
// });
