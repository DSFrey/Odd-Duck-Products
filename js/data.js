/*
  FILE: app.js
  DATE: 2022-07-07
  AUTHOR: DSFrey
  DESCRIPTION: Handle product data storage
*/
'use strict';

function ProductData() {
  if (localStorage.getItem('data') === null) {
    this.allProductsArray = this.initialize();
    this.selectionCount = 0;
  } else {
    let storedData = JSON.parse(localStorage.getItem('data'));
    this.allProductsArray = storedData.allProductsArray;
    this.selectionCount = storedData.selectionCount;
  }
}

ProductData.prototype.update = function() {
  let storedData = {'allProductsArray': this.allProductsArray,'selectionCount': this.selectionCount};
  localStorage.setItem('data',JSON.stringify(storedData));
};

/**
 * @returns Array of all product objects
 */
ProductData.prototype.initialize = function() {
  let allProductsArray = [];
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
  return allProductsArray;
};

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
