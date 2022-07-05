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
let displayContainer; // HTML element for display of products or results
let resultButton; // a button to show results
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

/**
 * Displays a number of product images on the screen
 */
function render() {
  let displayItems = getRandomItemIndices();
  displayContainer.innerHTML = '';
  for (let i = 0; i < displayItems.length; i++) {
    let image = document.createElement('img');
    image.src = allProductsArray[displayItems[i]].src;
    image.alt = allProductsArray[displayItems[i]].name;
    displayContainer.appendChild(image);
    allProductsArray[displayItems[i]].itemOffer++;
  }
}

function renderResults() {
  displayContainer.innerHTML = '';
  let resultsTable = document.createElement('table');
  let tableTopRow = document.createElement('tr');
  let productHeader = document.createElement('th');
  productHeader.innerText = 'Product';
  tableTopRow.appendChild(productHeader);
  let selectedHeader = document.createElement('th');
  selectedHeader.innerText = 'Selected';
  tableTopRow.appendChild(selectedHeader);
  let offeredHeader = document.createElement('th');
  offeredHeader.innerText = 'Offered';
  tableTopRow.appendChild(offeredHeader);
  resultsTable.appendChild(tableTopRow);
  let tableRow;
  for (let i = 0; i < allProductsArray.length; i++) {
    tableRow = document.createElement('tr');
    let productName = document.createElement('td');
    productName.innerText = allProductsArray[i].name;
    tableRow.appendChild(productName);
    let selectedValue = document.createElement('th');
    selectedValue.innerText = allProductsArray[i].itemSelection;
    tableRow.appendChild(selectedValue);
    let offeredValue = document.createElement('th');
    offeredValue.innerText = allProductsArray[i].itemOffer;
    tableRow.appendChild(offeredValue);
    resultsTable.appendChild(tableRow);
  }
  displayContainer.appendChild(resultsTable);
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
  displayContainer = document.getElementById('displayContainer');
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
  allProductsArray.push(new ProductObjects('Sweep','./img/sweep.png'));
  allProductsArray.push(new ProductObjects('Tauntaun','./img/tauntaun.jpg'));
  allProductsArray.push(new ProductObjects('Unicorn','./img/unicorn.jpg'));
  allProductsArray.push(new ProductObjects('Water-can','./img/water-can.jpg'));
  allProductsArray.push(new ProductObjects('Wine-glass','./img/wine-glass.jpg'));

  // Set any event handlers
  displayContainer.addEventListener('click', checkProductSelect);
  // perform the initial render
  render();
}

function checkProductSelect(evt) {
  console.log('in handleProductSelect()');
  for (let i = 0; i < allProductsArray.length; i++) {
    if (evt.target.alt === allProductsArray[i].name) {
      allProductsArray[i].itemSelection++;
      handleProductSelect();
    }
  }
}

function handleProductSelect() {
  selectionCount++;
  if (selectionCount >= maxSelectionCount) {
    displayContainer.removeEventListener('click',checkProductSelect);
    resultButton.addEventListener('click',renderResults);
  } else {
    render();
  }
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
