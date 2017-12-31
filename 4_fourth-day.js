var passphrase = [];
var lineCounter = 0;
var wordCounter = 0;
var phrase = "";
var validCount = 0;
var validAnagramsCount = 0;

passphrase[0] = new Array(0);
for(var i = 0; i < inputDay4.length; i++)
{
    if( inputDay4[i] === '\n')  // Detecting end of the line
    {
        passphrase[lineCounter].push(phrase);
        
        if(checkPassphrase(passphrase[lineCounter], false))
        {
            validCount++;
        }
        if(checkPassphrase(passphrase[lineCounter], true))
        {
            validAnagramsCount++;
        }
        
        passphrase[lineCounter+1] = new Array(0);
        phrase = "";
        lineCounter++;
        wordCounter = 0;
    }
    else if( inputDay4[i] === ' ') // Detecting end of the word
    {
        passphrase[lineCounter].push(phrase);
        phrase = "";
        wordCounter++;
    }
    else
    {
        phrase += inputDay4[i];
    }
}

function checkPassphrase(passphraseToCheck, asAnagram)
{
    var valid = true;
    
    if(asAnagram)
    {
        // Sorting all phrases alphabetically, so that two same anagrams can be detected
        for(var i = 0; i < passphraseToCheck.length; i++)
        {
            passphraseToCheck[i] = passphraseToCheck[i].split('').sort().join('');
        }
    }
    
    for(var i = 0; i < passphraseToCheck.length; i++)
    {
        for(var j = (i+1); j < passphraseToCheck.length; j++)
        {
            if(passphraseToCheck[i] === passphraseToCheck[j])
            {
                valid = false;
                return valid;
            }
        }
    }
    return valid;
}

console.log("Day 4, first part: " + validCount + ", second part: " + validAnagramsCount);