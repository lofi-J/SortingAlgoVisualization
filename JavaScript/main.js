'use strict';
import { Infomation } from "./info-algo.js";

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
const mergeSpeed = 100;
let targetArray = []; // It is sort target
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
                bubbleSort(targetArray);
                break;
            case 'Selection':
                selcetionSort(targetArray);
                break;
            case 'Insertion':
                insertionSort(targetArray);
                break;
            case 'Merge':
                mergeSortFunc();
                break;
            case 'Heap':
                heapSort(targetArray);
                console.log(targetArray);
                break;
            case 'Quick':
                quickSort(targetArray);
                break;
        }
    }
})

//create bar function 
function createBar(count) {
    //first remove all
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    targetArray = [];

    for(let i=0; i<count; i++) {
        var element = getRandomInt(1, count+1);
        targetArray.push(element*1.5); //canvas's height is 150, count: 100
    }

    const width = (canvasWidth / count);
    ctx.fillStyle = color_basic;
    for(let i=0; i<count; i++) {
        ctx.fillRect((width*i) + 1, canvasHeight - targetArray[i], width-1, targetArray[i]);
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
            drawBubble(targetArray, endIndex, curr);
        }
        endIndex--;
    }
    fulfill(targetArray);
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
            drawSelection(targetArray, min, i);
        }
        // await delay(speed);
        if(i != min) {
            swap(array, i, min);
            drawSelection(targetArray, min, i);
        }
    }
    fulfill(targetArray);
    isRun = false;
}
async function insertionSort(array) {   
    isRun = true;
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
    isRun = false;
}
let temp = [];
async function mergeSortFunc() {
    isRun = true;
    await mergeSort(targetArray, 0, targetArray.length-1);
    await fulfill(targetArray);
    isRun = false;
}
async function mergeSort(array, start, end) {
    if(start < end) {
        const mid = (start + end) >> 1;
        await mergeSort(array, start, mid);
        await mergeSort(array, mid+1, end);
        await merge(array, start, mid, end);
        await drawMerge(targetArray, start, end);

        await delay(mergeSpeed);
    }
    async function merge(array, start, mid, end) {
        let index = start;
        let leftIndex = start;
        let rightIndex = mid+1;
        while(leftIndex<=mid && rightIndex <=end) {
            if(array[leftIndex] < array[rightIndex]) {
                temp[index] = array[leftIndex];
                leftIndex++;
            }
            else {
                temp[index] = array[rightIndex];
                rightIndex++;
            }
            index++;
        }
        if(leftIndex > mid) {
            for(let i=rightIndex; i<=end; i++) {
                temp[index] = array[i];
                index++;
            }
        }
        else {
            for(let i=leftIndex; i<=mid; i++) {
                temp[index] = array[i];
                index++;
            }
        }
        index = start;
        while(index <= end) {
            array[index] = temp[index];
            index++;
        }
    }
}

async function heapSort(array) {
    isRun = true;
    const len = array.length;
    let lastIndex = len-1;
    //build heap
    for(let i=Math.floor(len/2)-1; i>=0; i--) {
        await delay(mergeSpeed);
        await drawHeap(array, lastIndex);
        heapify(array, len, i);
    }
    //sort
    while(lastIndex > 0) {
        await delay(mergeSpeed);
        await drawHeap(array, lastIndex);
        swap(array, 0, lastIndex);
        heapify(array, lastIndex, 0);
        lastIndex--;
    }
    await fulfill(array);
    isRun = false;
    function heapify(array, range, index) {
        let largest = index;
        // l: leftChild, r: rightChild
        const l = (index * 2) + 1;
        const r = (index * 2) + 2;
    
        if(l < range && array[largest] < array[l]) { largest = l; }
        if(r < range && array[largest] < array[r]) { largest = r; }
    
        if(largest != index) {
            swap(array, index, largest);
            //again heapify
            heapify(array, range, largest);
        }
    }
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
            ctx.fillRect((width*i) + 1, canvasHeight - targetArray[i], width-1, targetArray[i]);
            if(i === curr) {
                ctx.fillStyle = red;
                ctx.fillRect((width*i) + 1, canvasHeight - targetArray[i], width-1, targetArray[i]);
            }
        }
        else {
            ctx.fillStyle = yellow;
            ctx.fillRect((width*i) + 1, canvasHeight - targetArray[i], width-1, targetArray[i]);
        }
    }
}
function drawSelection(array, min, endIndex) {
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    for(let i=0; i<array.length; i++) {
        ctx.fillStyle = color_basic;
        ctx.fillRect((width*i) + 1, canvasHeight - targetArray[i], width-1, targetArray[i]);
        if(i === min) {
            ctx.fillStyle = red;
            ctx.fillRect((width*i) + 1, canvasHeight - targetArray[i], width-1, targetArray[i]);
        }
        if(endIndex > i) {
            ctx.fillStyle = yellow;
            ctx.fillRect((width*i) + 1, canvasHeight - targetArray[i], width-1, targetArray[i]);
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
async function drawMerge(array, start, end) {
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    
    for(let i=0; i<array.length; i++) {
        ctx.fillStyle = color_basic;
        ctx.fillRect((width*i) + 1, canvasHeight - targetArray[i], width-1, targetArray[i]);
    }
    for(let i=start; i<=end; i++) {
        ctx.fillStyle = red;
        ctx.fillRect((width*i) + 1, canvasHeight - targetArray[i], width-1, targetArray[i]);
    }
}
async function drawHeap(array, lastIndex) {
    ctx.clearRect(0,0,canvasWidth,canvasHeight);

    for(let i=0; i<array.length; i++) {
        if(i > lastIndex) {
            ctx.fillStyle = red;
        } else {
            ctx.fillStyle = color_basic;
        }
        ctx.fillRect((width*i) + 1, canvasHeight - targetArray[i], width-1, targetArray[i]);
    }
}


async function fulfill(array) {
    ctx.fillStyle = color_fulfill;
    for(let i=0; i<array.length; i++) {
        await delay(speed);
        ctx.fillRect((width*i) + 1, canvasHeight - targetArray[i], width-1, targetArray[i]);
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min);
}