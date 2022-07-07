/*
  FILE: app.js
  DATE: 2022-07-05
  AUTHOR: DSFrey
  DESCRIPTION: Handle product data collection and display
*/
'use strict';

/* ****************************************************************************
    GLOBAL VARIABLES
**************************************************************************** */
let allData;
let displayContainer; // HTML element for display of products
let table; //HTML element for display of results
let resultButton; // a button to show results
let maxSelectionCount; // the maximum number of selections
let displaySize; // the number of products displayed at once
let displayItems; // array of random indices to display

/* ****************************************************************************
    VIEW LOGIC
**************************************************************************** */

/**
 * Displays a number of product images on the screen
 */
function render() {
  getRandomItemIndices();
  displayContainer.innerHTML = '';
  for (let i = 0; i < displayItems.length; i++) {
    let image = document.createElement('img');
    image.src = allData.allProductsArray[displayItems[i]].src;
    image.alt = allData.allProductsArray[displayItems[i]].name;
    displayContainer.appendChild(image);
    allData.allProductsArray[displayItems[i]].itemOffer++;
  }
}

/**
 * Creates a table to display the voting results
 */
function renderResults() {
  table.innerHTML = '';
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
  table.appendChild(tableTopRow);
  let tableRow;
  for (let i = 0; i < allData.allProductsArray.length; i++) {
    tableRow = document.createElement('tr');
    let productName = document.createElement('td');
    productName.innerText = allData.allProductsArray[i].name;
    tableRow.appendChild(productName);
    let selectedValue = document.createElement('td');
    selectedValue.innerText = allData.allProductsArray[i].itemSelection;
    tableRow.appendChild(selectedValue);
    let offeredValue = document.createElement('td');
    offeredValue.innerText = allData.allProductsArray[i].itemOffer;
    tableRow.appendChild(offeredValue);
    table.appendChild(tableRow);
  }
}

/**
 * Creates a bar chart to display the voting results
 */
function renderChart() {
  let productNameArray = [];
  let itemSelectionArray = [];
  let itemOfferArray = [];
  for (let i = 0; i < allData.allProductsArray.length; i++) {
    productNameArray.push(allData.allProductsArray[i].name);
    itemSelectionArray.push(allData.allProductsArray[i].itemSelection);
    itemOfferArray.push(allData.allProductsArray[i].itemOffer);
  }
  const chartData = {
    labels: productNameArray,
    datasets: [
      {
        label: 'Selected',
        data: itemSelectionArray,
        backgroundColor: ['rgba(12,12,12,0.8'],
        borderColor: ['rgb(0,0,0)'],
        borderWidth: 3,
        xAxisID: 'xS',
        categoryPercentage: 0.85,
      },
      {
        label: 'Offered',
        data: itemOfferArray,
        backgroundColor: ['rgba(220,220,220,0.8'],
        borderColor: ['rgb(0,0,0)'],
        borderWidth: 2,
        xAxisID: 'xO',
        categoryPercentage: 0.9,
      }
    ]
  };
  const config = {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        xO: {
          display: false,
        },
        y: {
          beginAtZero: true
        }
      },
      tooltips: {
        mode: 'point'
      }
    }
  };
  let canvasChart = document.getElementById('resultChart');
  // eslint-disable-next-line no-undef, no-unused-vars
  let resultChart = new Chart(canvasChart,config);
}

/* ****************************************************************************
    CONTROL LOGIC
**************************************************************************** */

/**
 * Initialize the global variables, set up needed event handlers, and perform the initial render.
 */
// eslint-disable-next-line no-unused-vars
function initialize() {
  console.log('In initialize()');
  // eslint-disable-next-line no-undef
  allData = new ProductData(); // instantiate products
  maxSelectionCount = 25; // the maximum number of selections
  displaySize = 3; // the number of products displayed at once
  displayItems = [];
  // Get initial references to HTML elements
  displayContainer = document.getElementById('displayContainer');
  table = document.getElementById('tableContainer');
  resultButton = document.getElementById('resultButton');
  // Set any event handlers
  displayContainer.addEventListener('click', checkProductSelect);
  // perform the initial render
  render();
  handleProductSelect();
}

function checkProductSelect(evt) {
  console.log('in handleProductSelect()');
  for (let i = 0; i < allData.allProductsArray.length; i++) {
    if (evt.target.alt === allData.allProductsArray[i].name) {
      allData.allProductsArray[i].itemSelection++;
      allData.selectionCount++;
      allData.update();
      handleProductSelect();
    }
  }
}

function handleProductSelect() {
  if (allData.selectionCount >= maxSelectionCount) {
    displayContainer.classList.add('no-voting');
    displayContainer.removeEventListener('click',checkProductSelect);
    resultButton.removeAttribute('disabled');
    resultButton.addEventListener('click',() => {renderResults();renderChart();});
  } else {
    render();
  }
}

/**
 * @returns - an array of indices from the products array
 */
function getRandomItemIndices() {
  let nextRandom;
  let nextRandomArray = [];
  for (let i = 0; i < displaySize; i++) {
    do {
      nextRandom = Math.floor(Math.random()*allData.allProductsArray.length);
    } while (nextRandomArray.includes(nextRandom) || displayItems.includes(nextRandom));
    nextRandomArray.push(nextRandom);
  }
  displayItems = nextRandomArray;
}

/* ****************************************************************************
    END OF FILE
**************************************************************************** */
