/*jshint esversion: 8 */ 


// Unsplash API
import require from "./node_modules/require";
const functions = require("./node_modules/firebase-functions");
let config = require("./env.json");
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let fetchCount = 5;
let isReady = false;
let numberOfImagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

if (Object.keys(functions.config()).length) {
  config = functions.config();
}

getPhotos();

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(getURL(config.unsplash_api.key, fetchCount));
    photosArray = await response.json();
    console.log("data: " + JSON.stringify(photosArray));
    displayPhotos(photosArray);
  } catch (error) {
    console.log("There was a problem fetching photos: " + error);
  }
}

// Put URL together using template literals, which only works inside functions.
function getURL(key, count) {
  return `https://api.unsplash.com/photos/random?client_id=${key}&count=${count}`;
}

// Create Elements for Links and Photos, then add to DOM
function displayPhotos(pArray) {
  numberOfImagesLoaded = 0;
  totalImages = pArray.length;
  pArray.forEach(photo => {
    console.log("photo: " + JSON.stringify(photo));
    // create <a></a> link to unsplash photo
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank"
    });

    // create <img> image element for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // event listener to check when each photo has loaded
    img.addEventListener("load", imageLoaded);

    // put <img> inside <a></a> then put both inside image-container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Check if photos have loaded
function imageLoaded() {
  numberOfImagesLoaded++;

  if (numberOfImagesLoaded === totalImages) {
    isReady = true;
    loader.hidden = true;
    fetchCount = 30;
  }
}

// check to see if scrolling near bottom of page
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isReady) {
    // reset isReady back to false for next loading of photos
    isReady = false;
    getPhotos();
  }
});
