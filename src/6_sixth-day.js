var inputDay6 = [
4, 10, 4, 1, 8, 4, 9, 14, 5, 1, 14, 15, 0, 15, 3, 5
];

function findMaxIndex(inputArray) {
    var index = 0;
    var maxValue = 0;
    
    for (var i = 0; i < inputArray.length; i++) {
        if (inputArray[i] > maxValue) {
            maxValue = inputArray[i];
            index = i;
        }
    }
    return index;
}

function redistributeBlocks(inputArray, index) {
    var redistributedValue = inputArray[index];
    for (var i = (index + 1); i < (redistributedValue + index + 1); i++) {
        inputArray[i%(inputArray.length)]++;
        inputArray[index]--;
    }
}

function checkForBeforeSeenState(allArrays, currentArray) {
    for (var i = 0; i < allArrays.length; i++) {
        if (compareArrays(allArrays[i], currentArray)) {
            return true;
        }
    }
    return false;
}

function compareArrays(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
        return false;
    }
    for(var i = 0; i < firstArray.length; i++) {
        if(firstArray[i] !== secondArray[i]) {
            return false;
        }
    }
    return true;
}

var maxIndex = 0;
var arrayHistory = [];
var iteration = {
    first: 0,
    second: 0
};

while (!checkForBeforeSeenState(arrayHistory, inputDay6)) {
    maxIndex = 0;
    arrayHistory[iteration.first] = inputDay6.slice();
    maxIndex = findMaxIndex(inputDay6);
    redistributeBlocks(inputDay6, maxIndex);
    iteration.first++;
}

arrayHistory = [];
while (!checkForBeforeSeenState(arrayHistory, inputDay6)) {
    maxIndex = 0;
    arrayHistory[iteration.second] = inputDay6.slice();
    maxIndex = findMaxIndex(inputDay6);
    redistributeBlocks(inputDay6, maxIndex);
    iteration.second++;
}

console.log("Day 6, first part: " + iteration.first + ", second part: " + iteration.second);