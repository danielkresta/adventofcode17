
var instruction = [];
var registers = [];
var maxReg = 0;
var highestReg = 0;

instruction = parseInput(inputDay8, instruction);
for(var i = 0; i < instruction.length; i++)
{
    executeCommand(instruction, i, registers);
    maxReg = findMaxRegIndex(registers);
    if ( registers[maxReg].val > highestReg )
    {
        highestReg = registers[maxReg].val;
    }
}
console.log("Day 6, first part: " + registers[maxReg].val + ", second part: " + highestReg);

function parseInput(inputString, instruction)
{
    var linedString = inputString.split("\n");
    var line;
    for(var i = 1; i < linedString.length-1; i++)
    {
        line = linedString[i].split(" ");
        instruction.push(
            {
                register: line[0],
                increment: ( line[1] === "inc" ),
                amount: Number(line[2]),
                condition: {
                    registerToCompare: line[4],
                    operation: line[5],
                    amountToCompare: Number(line[6])
                }
            }
        );
    }
    return instruction;
}

function executeCommand(instruction, line, registers)
{
    var registerToChangeIndex = findRegister(instruction[line].register, registers);
    var registerToCompare = findRegister(instruction[line].condition.registerToCompare, registers);
    
    if ( registerToChangeIndex === -1 )
    {
        registers.push(
            {
                name: instruction[line].register,
                val: 0
            }
        );
        registerToChangeIndex = registers.length-1;
    }
    if ( registerToCompare === -1 )
    {
        registers.push(
            {
                name: instruction[line].condition.registerToCompare,
                val: 0
            }
        );
        registerToCompare = registers.length-1;
    }
    
    if( evalCondition(registers[registerToCompare].val, instruction[line].condition.amountToCompare, instruction[line].condition.operation) )
    {
        if( instruction[line].increment )
        {
            registers[registerToChangeIndex].val += instruction[line].amount;
        }
        else
        {
            registers[registerToChangeIndex].val -= instruction[line].amount;
        }
    }
    
    return registers;
}

function findRegister(name, registers)
{
    for(var i = 0; i < registers.length; i++)
    {
        if( registers[i].name === name )
        {
            return i;
        }
    }
    return -1;
}

function evalCondition(x, y, condition)
{
    switch(condition)
    {
        case ("=="): return(x == y);
        case ("!="): return(x != y);
        case (">="): return(x >= y);
        case (">"):  return(x > y);
        case ("<="): return(x <= y);
        case ("<"): return(x < y);
    }
}

function findMaxRegIndex(inputArray)
{
    var index = 0;
    var maxValue = 0;
    
    for(var i = 0; i < inputArray.length; i++)
    {
        if(inputArray[i].val > maxValue)
        {
            maxValue = inputArray[i].val;
            index = i;
        }
    }
    
    return index;
}