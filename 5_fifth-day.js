var outOfBounds = false;
var iteration = {
    first: 0,
    second: 0
};
var pointer = 0;
var tempInputArray = inputDay5.slice();

while(!outOfBounds)
{
    pointer += tempInputArray[pointer]++;
    iteration.first++;
    if( (pointer < 0) || (pointer >= tempInputArray.length) )
    {
        outOfBounds = true;
    }
}

pointer = 0;
outOfBounds = false;
while(!outOfBounds)
{
    if( inputDay5[pointer] >= 3)
    {
        pointer += inputDay5[pointer]--;
    }
    else
    {
        pointer += inputDay5[pointer]++;
    }
    iteration.second++;
    if( (pointer < 0) || (pointer >= inputDay5.length) )
    {
        outOfBounds = true;
    }
}
console.log("Day 5, first part: " + iteration.first + ", second part: " + iteration.second);