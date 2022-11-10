'use strict';
import { Infomation } from "./info-algo";

//variable for text
export const startBtn = document.getElementById("start");
const buttonList = document.querySelector(".algorithms_btn");
let currAlgo = "Bubble";
let displayName = document.querySelector(".description h3");
let displayDescription = document.querySelector(".description p");
let timeComplexity = document.querySelector(".description .time_complexity p");
let algorithmTitle = document.querySelector(".select_algorithm h2");
//variable for color
const animationWindow = document.querySelector(".animation_window");
let prevBtn = buttonList.children[0];
//variable for Visualization<canvas>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');  
const canvasWidth = canvas.width; //300
const canvasHeight = canvas.height; //150
const speed = 1;
let barHeightArray = [];
let isSorted = false;
const count = 100;
const width = canvasWidth / count;
const color_basic = '#3F3B6C';
const color_fulfill = '#379237'
const red = '#E97777'
const yellow = '#F0FF42'
// Stop async function 
let isRun = false;
let setTimeoutID;


createBar(count);

// ==================================================== Main Flow functions ============================================================//
buttonList.addEventListener('click', (e) => {
    console.log("isRun: ",isRun);
    const targetName = e.target.dataset.name;
    currAlgo = targetName;
    if(targetName === undefined) { return; }
    if(isRun) {
        for(let i = 0; i <= setTimeoutID; i++) {
            clearTimeout(i);
        }
        isRun = false;
    }
    createBar(count);
    
    //text
    displayName.innerText = Infomation[targetName][0];
    displayDescription.innerText = Infomation[targetName][1];
    timeComplexity.innerText = "avg : " + Infomation[targetName][2];
    algorithmTitle.innerText = Infomation[targetName][0] + " Algorithm";

    //window border color
    animationWindow.style.outline = `1px ridge var(--color-selected-${targetName.toLowerCase()})`;
    
    //button border color
    prevBtn.style.outline = "none";
    prevBtn = e.target;
    e.target.style.outline = `1px ridge var(--color-selected-${targetName.toLowerCase()})`;
})

//start 
startBtn.addEventListener('click', () => {
    console.log("start: clicked");
    if(isRun){
        return;
    }
    else {
        switch(currAlgo) {
            case 'Bubble':
                bubbleSort(barHeightArray);
                break;
            case 'Selection':
                selcetionSort(barHeightArray);
                break;
            case 'Insertion':
                insertionSort(barHeightArray);
                break;
            case 'Merge':
                mergeSort(barHeightArray);
                break;
            case 'Heap':
                heapSort(barHeightArray);
                break;
            case 'Quick':
                quickSort(barHeightArray);
                break;
        }
    }
})

//create bar function 
function createBar(count) {
    //first remove all
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    barHeightArray = [];

    for(let i=0; i<count; i++) {
        var element = getRandomInt(1, count+1);
        barHeightArray.push(element*1.5); //canvas's height is 150, count: 100
    }

    isSorted = false;
    const width = (canvasWidth / count);
    ctx.fillStyle = color_basic;
    for(let i=0; i<count; i++) {
        ctx.fillRect((width*i) + 1, canvasHeight - barHeightArray[i], width-1, barHeightArray[i]);
    }
}

// ==================================================== Sort Algorithm functions ============================================================//

async function bubbleSort(array) {
    isRun = true;
    const len = array.length;
    let endIndex = len;
    let curr;
    for (let i = 0; i < len-1; i++) {
        for (let j = 0; j < len-1-i; j++) {
            curr = j+1;
            await delay(speed);
            if (array[j] > array[j+1]) {
                swap(array, j, j+1);
                curr = j;
            }
            drawBubble(barHeightArray, endIndex, curr);
        }
        endIndex--;
    }
    fulfill(barHeightArray);
    isRun = false;
}
async function selcetionSort(array) {
    isRun = true;
    const len = array.length;
    let i,j,min;
    for(i=0; i<len-1; i++) {
        min = i;
        for(j=i+1; j<len; j++) {
            await delay(speed);
            if(array[min] > array[j]) {
                min = j;
            }
            drawSelection(barHeightArray, min, i);
        }
        await delay(speed);
        if(i != min) {
            swap(array, i, min);
            drawSelection(barHeightArray, min, i);
        }
    }
    fulfill(barHeightArray);
    isRun = false;
}
async function insertionSort(array) {   
    let curr;
    for(let i=1; i<array.length; i++) {
        curr = array[i];
        let left = i-1;
        while(left >= 0 && array[left] > curr) {
            await delay(speed);
            array[left+1] = array[left];
            array[left] = curr;
            left--;
            drawInsertion(array, left, i);
        }
    }
    fulfill(array);
}
async function mergeSort(array) {

}
async function heapSort(array) {
    
}
async function quickSort(array) {
    
}

// ==================================================== Utility functions ============================================================//
function delay(ms) {
    const promise = new Promise(resolve => {
        setTimeoutID = setTimeout(() => {
            resolve();
        }, ms)
    });
    return promise;
}
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function drawBubble(array, endIndex, curr) {
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    for(let i=0; i<array.length; i++) {
        if(i < endIndex) {
            ctx.fillStyle = color_basic;
            ctx.fillRect((width*i) + 1, canvasHeight - barHeightArray[i], width-1, barHeightArray[i]);
            if(i === curr) {
                ctx.fillStyle = red;
                ctx.fillRect((width*i) + 1, canvasHeight - barHeightArray[i], width-1, barHeightArray[i]);
            }
        }
        else {
            ctx.fillStyle = yellow;
            ctx.fillRect((width*i) + 1, canvasHeight - barHeightArray[i], width-1, barHeightArray[i]);
        }
    }
}
function drawSelection(array, min, endIndex) {
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    for(let i=0; i<array.length; i++) {
        ctx.fillStyle = color_basic;
        ctx.fillRect((width*i) + 1, canvasHeight - barHeightArray[i], width-1, barHeightArray[i]);
        if(i === min) {
            ctx.fillStyle = red;
            ctx.fillRect((width*i) + 1, canvasHeight - barHeightArray[i], width-1, barHeightArray[i]);
        }
        if(endIndex > i) {
            ctx.fillStyle = yellow;
            ctx.fillRect((width*i) + 1, canvasHeight - barHeightArray[i], width-1, barHeightArray[i]);
        }
    }
}
function drawInsertion(array, left, endIndex) {
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    for(let i=0; i<array.length; i++) {
        if(i <= endIndex) {
            i === left ? ctx.fillStyle = red : ctx.fillStyle = yellow;
            ctx.fillRect((width*i) + 1, canvasHeight - array[i], width-1, array[i]);
        }
        else {
            i === left ? ctx.fillStyle = red : ctx.fillStyle = color_basic;
            ctx.fillRect((width*i) + 1, canvasHeight - array[i], width-1, array[i]);
        }
    }
}


async function fulfill(array) {
    ctx.fillStyle = color_fulfill;
    for(let i=0; i<array.length; i++) {
        await delay(speed);
        ctx.fillRect((width*i) + 1, canvasHeight - barHeightArray[i], width-1, barHeightArray[i]);
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min);
}