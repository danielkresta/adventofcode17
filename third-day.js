var input = 312051;

// Finding the closest odd sqrt
var closestSqrt = Math.ceil(Math.sqrt(input));
if (!(closestSqrt % 2))
{
    closestSqrt++;
}

// Calculating the distance from the corner to the middle point of the square side
var sideSize = (Math.pow(closestSqrt, 2) - Math.pow((closestSqrt - 2), 2) )/4;

// Calculating all four middlepoints
var middlepoint = {
    bottom: {
        coef: 0.5,
        val: function() {return ( Math.pow(closestSqrt, 2) - (this.coef * sideSize) ); }
    },
    left: {
        coef: 1.5,
        val: function() {return ( Math.pow(closestSqrt, 2) - (this.coef * sideSize) ); }
    },
    top: {
        coef: 2.5,
        val: function() {return ( Math.pow(closestSqrt, 2) - (this.coef * sideSize) ); }
    },
    right: {
        coef: 3.5,
        val: function() {return ( Math.pow(closestSqrt, 2) - (this.coef * sideSize) ); }
    } 
}

var distance = {
    fromMidpoint: function() {return ( ( closestSqrt-1 )/2 );},
    toMidpoint: function() {
        return Math.min
        (
           Math.abs( input - middlepoint.bottom.val() ),
           Math.abs( input - middlepoint.left.val() ),
           Math.abs( input - middlepoint.top.val() ),
           Math.abs( input - middlepoint.right.val() )
        );
    },
    full: function() {return ( this.fromMidpoint() + this.toMidpoint() );}
}

// --PART TWO--
var fieldWidth = 20;
var fieldHeight = 20;
// Create 20x20 matrix filled with zeros
var field = new Array(fieldWidth);
for (var i = 0; i < fieldWidth; i++)
{
    field[i] = new Array(fieldHeight);
    field[i].fill(0);
}

function changeDirection(inputDirection)
{
    var outputDirection;
    switch(inputDirection)
    {
        case "right":
            outputDirection = "up";
            break;
        case "up":
            outputDirection = "left";
            break;
        case "left":
            outputDirection = "down"
            break;
        case "down":
            outputDirection = "right"
            break;
        default:
            outputDirection = "unknown"
    }
    return outputDirection;
}

function moveCoords(coordinates, direction)
{
    switch(direction)
    {
        case "right":
            coordinates.x++;
            break;
        case "up":
            coordinates.y--;
            break;
        case "left":
            coordinates.x--;
            break;
        case "down":
            coordinates.y++;
            break;
        default:
    }
}

function calculateAroundCoords(field, coordinates)
{
    var sum;
    sum = 0;
    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            sum += field[coordinates.x - 1 + i][coordinates.y - 1 + j];
        }
    }
    return sum;
}

// Starting in the center
var xStart = 10;
var yStart = 10;
var changeAfterSteps = 1;
var firstRun = true;
var direction = "right"; // Initial direction
var coordinates = {
    x: xStart,
    y: yStart,
}
field[xStart][yStart] = 1;
var movesInDirectionCounter = 0;
var currentSum = 0;

while(currentSum < input)
{
    moveCoords(coordinates, direction);
    movesInDirectionCounter++;
    if(movesInDirectionCounter == changeAfterSteps)
    {
        direction = changeDirection(direction);
        movesInDirectionCounter = 0;
        // Increase the number of steps in every other iteration
        if(firstRun)
        {
            firstRun = false;
        }
        else
        {
            changeAfterSteps++;
            firstRun = true;
        }
    }
    currentSum = calculateAroundCoords(field, coordinates);
    field[coordinates.x][coordinates.y] = currentSum;
    //console.log(currentSum + " at " + coordinates.x +  "." + coordinates.y);
}

console.log("Day 3, first part: " + distance.full() + ", second part " + currentSum);