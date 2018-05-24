var current = {
    group: {
        active: false,
        nesting: 0
    },
    garbage: {
        active: false
    }
};
var counter = {
    groups: 0,
    score: 0,
    characters: 0
};

for (var i = 0; i < inputDay9.length; i++) {
    if (inputDay9[i] === "<") {
        if (current.garbage.active === false) {
            current.garbage.active = true;
        }
        else {
            counter.characters++;
        }
    } else if (inputDay9[i] === ">") {
        current.garbage.active = false;
    } else if (inputDay9[i] === "!") {
        i++;
    } else {
        if (!current.garbage.active) {
            if (inputDay9[i] === "{") {
                current.group.active = true;
                current.group.nesting++;
            } else if (inputDay9[i] === "}") {
                if (current.group.nesting !== 0) {
                    counter.score += current.group.nesting;
                    current.group.nesting--;
                    counter.groups++;
                }
                if (current.group.nesting === 0) {
                    current.group.active = false;
                }
            }
        } else {
            counter.characters++;
        }
    }
}
console.log("Day 9, first part: " + counter.score + ", second part: " + counter.characters);

/*
//Second Version of the Solution
counter = {
    groups: 0,
    score: 0,
    characters: 0
};
current = {
    group: {
        active: false,
        nesting: 0
    },
    garbage: {
        active: false
    }
};

for (i = 0; i < inputDay9.length; i++) {
    switch (inputDay9[i]) {
        case ("{"):
            if (current.garbage.active) {
                counter.characters++;
            } else {
                current.group.active = true;
                current.group.nesting++;
            }
            break;
        case ("}"):
            if (current.garbage.active) {
                counter.characters++;
            } else {
                if (current.group.nesting !== 0) {
                    counter.score += current.group.nesting;
                    current.group.nesting--;
                    counter.groups++;
                }
                if (current.group.nesting === 0) {
                    current.group.active = false;
                }
            }
            break;
        case ("<"):
            if (current.garbage.active) {
                counter.characters++;
            } else {
                current.garbage.active = true;
            }
            break;
        case (">"):
            if (current.garbage.active) {
                current.garbage.active = false;
            } else {
                counter.characters++;
            }
            break;
        case ("!"):
            i++;
            break;
        default:
            if (current.garbage.active) {
                counter.characters++;
            }
            break;
            
    }
}
console.log("Day 9, first part: " + counter.score + ", second part: " + counter.characters);
*/