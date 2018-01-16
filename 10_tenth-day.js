var minList = 0;
var maxList = 255;
var list = [];
var inputDay10 = [97,167,54,178,2,11,209,174,119,248,254,0,255,1,64,190];

function fillArray(minList, maxList) {
    var list = [];
    for (var i = minList; i <= maxList; i++) {
        list.push(i);
    }
    return list;
}

var skip = 0; var position = 0;

function getCircArray(inputArray, startPosition, inputLength) {
    outputArray = [];
    for (var i = 0; i < inputLength; i++) {
        outputArray[i] = inputArray[(startPosition + i)%(inputArray.length)];
    }
    return outputArray;
}

function putCircArray(targetArray, startPosition, inputArray) {
    for (var i = 0; i < inputArray.length; i++) {
        targetArray[(startPosition + i) % (targetArray.length)] = inputArray[i];
    }
    return targetArray;
}

list = fillArray(minList, maxList);
for (var i = 0; i < inputDay10.length; i++) {
    var tempArray = [];
    tempArray = getCircArray(list, position, inputDay10[i])
    tempArray.reverse();
    list = putCircArray(list, position, tempArray);
    position = (position + inputDay10[i] + skip) % (list.length);
    skip++;
}

// -- PART TWO --
function getDenseHash(input, hashLength) {
    denseHash = [];
    for (i = 0; i < (input.length / hashLength); i++) {
        tempXor = input[i*hashLength];
        for (j = 1; j < hashLength; j++) {
            tempXor ^= input[i*hashLength + j];
        }
        denseHash.push(tempXor);
    }
    return denseHash;
}

function arrayToHexString(inputArray) {
    return inputArray.map( function(x) {
        x = x + 0xFFFFFFFF + 1;
        x = x.toString(16);
        x = ("00"+x).substr(-2);
        return x
    }).join('');
}

var inputDay10 = "97,167,54,178,2,11,209,174,119,248,254,0,255,1,64,190";
var inputAscii = [];
for (i = 0; i < inputDay10.length; i++) {
    inputAscii.push(inputDay10.charCodeAt(i));
}
inputAscii.push(17, 31, 73, 47, 23);
list = fillArray(minList, maxList);
skip = 0; position = 0; nOfRounds = 64;

for (var j = 0; j < nOfRounds; j++) {
    for (i = 0; i < inputAscii.length; i++) {
        var tempArray = [];
        tempArray = getCircArray(list, position, inputAscii[i])
        tempArray.reverse();
        list = putCircArray(list, position, tempArray);
        position = (position + inputAscii[i] + skip) % (list.length);
        skip++;
    }
}
var denseHash = getDenseHash(list, 16);
var hexHash = arrayToHexString(denseHash);

console.log("Day 10, first part: " + list[0]*list[1] + ", second part: " + hexHash);