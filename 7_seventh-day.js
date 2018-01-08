var tower = [];
var foundBottom = false;
var currentIndex = 0;
var nextIndex = 0;
var initialProgram = "";

tower = parseInput(inputDay7);

while( !foundBottom )
{
    nextIndex = searchForAbove(tower[currentIndex].name, tower);
    if (nextIndex === -1)
    {
        initialProgram = tower[currentIndex].name;
        foundBottom = true;
    }
    currentIndex = nextIndex;
}
console.log("Day 6, first part: " + initialProgram + ", ");
calculateNext(initialProgram, tower);

function parseInput(inputString)
{
    var tower = [];
    var name = "";
    var current = "name";
    var weight = 0;
    var weightString = "";
    var lineCounter = -1;

    for(var i = 0; i < inputDay7.length; i++)
    {
        switch( inputDay7[i] )
        {
            case ('\n'):
                if (current === "above")
                {
                    tower[lineCounter].above.count++;
                    tower[lineCounter].above.name.push(name);
                    name = "";
                }
                lineCounter++;
                tower.push(
                    {
                        name: "",
                        weight: 0,
                        above: {
                            count: 0,
                            name: []
                        }
                    }
                );
                current = "name";
                break;
            case (' '):
                if (current === "name")
                {
                    tower[lineCounter].name = name;
                    name = "";
                }
                break;
            case (','):
                if (current === "above")
                {
                    tower[lineCounter].above.count++;
                    tower[lineCounter].above.name.push(name);
                    name = "";
                }
                break;
            case ('('):
                current = "weight";
                break;
            case (')'):
                tower[lineCounter].weight = Number(weightString);
                weightString = 0;
                current = "none";
                break;
            case ('-'):
            case ('>'):
                current = "above";
                break;
            default:
                switch(current)
                {
                    case ("name"):
                        name += inputDay7[i];
                        break;
                    case ("weight"):
                        weightString += inputDay7[i];
                        break;
                    case ("above"):
                        name += inputDay7[i];
                        break;
                }
                break;
        }
    }
    
    return tower;
}

function searchForName(name, tower)
{
    for(var i = 0; i < tower.length; i++)
    {
        if( tower[i].name === name )
        {
            return i;
        }
    }
    return -1;
}

function searchForAbove(name, tower)
{
    for(var i = 0; i < tower.length; i++)
    {
        for(var j = 0; j < tower[i].above.count; j++)
        {
            if( tower[i].above.name[j] === name )
            {
                return i;
            }
        }
    }
    return -1;
}

function calculateNext(name, tower)
{
    var sum = 0;
    var index;
    var weight = [];
    index = searchForName(name, tower);
    if( tower[index].above.count === 0)
    {
        sum = tower[index].weight;
    }
    else
    {
        for(var i = 0; i < tower[index].above.count; i++)
        {
            // Recursion
            weight[i] = calculateNext(tower[index].above.name[i], tower);
            sum += weight[i];
        }
        var distinctIndex = findDistinct(weight);
        if ( distinctIndex !== -1 )
        {
            var badProgram = {
                name: tower[index].above.name[distinctIndex],
                index: 0,
                weight: {
                    program: 0,
                    all: weight[distinctIndex],
                    correctAll: weight[1 - distinctIndex%2],
                    correct: function() { return ( this.program + ( this.correctAll - this.all ) ); }
                }
            };
            badProgram.index = searchForName(badProgram.name, tower);
            badProgram.weight.program = tower[badProgram.index].weight;
            
            console.log("second part: " + "Program " + badProgram.name + " needs to weigh " + badProgram.weight.correct() )
            sum -= badProgram.weight.program;
            sum += badProgram.weight.correct();
        }
        sum += tower[index].weight;
    }
    return sum;
}

function findDistinct(inputArray)
{
    for(var i = 1; i < (inputArray.length-1); i++)
    {
        if( (inputArray[i] !== inputArray[i-1]) && (inputArray[i] !== inputArray[i+1]) )
        {
            return i;
        }
        else if( (inputArray[i] !== inputArray[i-1]) && (inputArray[i] === inputArray[i+1]) )
        {
            return (i-1);
        }
        else if( (inputArray[i] === inputArray[i-1]) && (inputArray[i] !== inputArray[i+1]) )
        {
            return (i+1);
        }
    }
    return (-1);
}