/*
  FILE: app.js
  DATE: 2022-07-05
  AUTHOR: DSFrey
  DESCRIPTOION: handle the clicking of goats.
*/
'use strict';

/* ****************************************************************************
    GLOBAL VARIABLES
**************************************************************************** */
let productSelectContainer; // HTML element for goats
let resultButton; // a button to show results
// let displayArray; //html elements
let allProductsArray; // an array of product objects
let selectionCount; // the number of user selections
let maxSelectionCount; // the maximum number of selections
let displaySize; // the number of products displayed at once

/* ****************************************************************************
    PRODUCT OBJECTS (Data/Model Objects)
**************************************************************************** */

/**
 * @param {string} name - name of the product
 * @param {string} src - path and filename of the product image
 */
function ProductObjects(name,src) {
  this.name = name;
  this.src = src;
  this.itemSelection = 0;
  this.itemOffer = 0;
}

/* ****************************************************************************
    VIEW LOGIC
**************************************************************************** */

function render() {
  console.log('In render()');
  //get random products
  let displayItems = getRandomItemIndices();
  console.log(displayItems);
  // set image values
  productSelectContainer.innerHTML = '';
  for (let i = 0; i < displayItems.length; i++) {
    let image = document.createElement('img');
    image.src = allProductsArray[displayItems[i]].src;
    image.alt = allProductsArray[displayItems[i]].name;
    productSelectContainer.appendChild(image);
    allProductsArray[displayItems[i]].itemOffer++;
  }
}

/* ****************************************************************************
    CONTROL LOGIC
**************************************************************************** */

/**
 * Initialize the global variables, set up needed event handlers, and
 * perform the initial render.
 */
function initialize() {
  console.log('In initialize()');
  // Get initial references to HTML elements
  selectionCount = 0; // the number of user selections
  maxSelectionCount = 3; // the maximum number of selections
  displaySize = 3; // the number of products displayed at once
  // displayArray = []; //html elements
  productSelectContainer = document.getElementById('productSelectContainer');
  resultButton = document.getElementById('resultButton');
  // instantiate products
  allProductsArray = [];
  allProductsArray.push(new ProductObjects('Bag','./img/bag.jpg'));
  allProductsArray.push(new ProductObjects('Banana','./img/banana.jpg'));
  allProductsArray.push(new ProductObjects('Bathroom','./img/bathroom.jpg'));
  allProductsArray.push(new ProductObjects('Boots','./img/boots.jpg'));
  allProductsArray.push(new ProductObjects('Breakfast','./img/breakfast.jpg'));
  allProductsArray.push(new ProductObjects('Bubblegum','./img/bubblegum.jpg'));
  allProductsArray.push(new ProductObjects('Chair','./img/chair.jpg'));
  allProductsArray.push(new ProductObjects('Cthulhu','./img/cthulhu.jpg'));
  allProductsArray.push(new ProductObjects('Dog-duck','./img/dog-duck.jpg'));
  allProductsArray.push(new ProductObjects('Dragon','./img/dragon.jpg'));
  allProductsArray.push(new ProductObjects('Pen','./img/pen.jpg'));
  allProductsArray.push(new ProductObjects('Pet-sweep','./img/pet-sweep.jpg'));
  allProductsArray.push(new ProductObjects('Scissors','./img/scissors.jpg'));
  allProductsArray.push(new ProductObjects('Shark','./img/shark.jpg'));
  allProductsArray.push(new ProductObjects('Sweep','./img/sweep.jpg'));
  allProductsArray.push(new ProductObjects('Tauntaun','./img/tauntaun.jpg'));
  allProductsArray.push(new ProductObjects('Unicorn','./img/unicorn.jpg'));
  allProductsArray.push(new ProductObjects('Water-can','./img/water-can.jpg'));
  allProductsArray.push(new ProductObjects('Wine-glass','./img/wine-glass.jpg'));

  // Set any event handlers
  productSelectContainer.addEventListener('click', handleProductSelect);
  // perform the initial render
  render();
}

function handleProductSelect(evt) {

}

/**
 * @returns - an array of indices from the products array
 */
function getRandomItemIndices() {
  let displayItems = [];
  let nextRandom = -1;
  for (let i = 0; i < displaySize; i++) {
    do {
      nextRandom = Math.floor(Math.random()*allProductsArray.length);
    } while (displayItems.includes(nextRandom));
    displayItems.push(nextRandom);
  }
  return displayItems;
}

/* ****************************************************************************
    END OF FILE
**************************************************************************** */
