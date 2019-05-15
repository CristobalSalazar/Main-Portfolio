var letterWrapper = document.getElementsByClassName("letterWrapper").item(0);
var guesses = document.getElementsByClassName("guesses").item(0);
var scoreCounter = document.getElementById("score");
var lifeCounter = document.getElementById("life");
var mainCounter = document.getElementById("status");
var chosenWord = "";
var progress = "";
var guessedLetters = [];
var score;
var guessesLeft;
var isComplete = false;

var wordList = [
    "hangman",
    "apple",
    "pear",
    "banana",
    "orange",
    "car",
    "vehicle",
    "motorcycle",
    "chris",
    "red",
    "blue",
    "green",
    "yellow",
    "i love code"
];

function isAlpha(str) 
{
    var code;

    for (let i = 0; i < str.length; i++)
    {
        code = str.charCodeAt(i);
        
        if (!(code > 64 && code < 91) && 
            !(code > 96 && code < 123))
        { 
        
            return false;
        }
    }
    return true;
}

function reset()
{
    isComplete = false;
    guessedLetters = [];
    populateLetters();
    progress = chosenWord;
    progress = progress.split(" ").join('');
    guessesLeft = 10;
    score = 0;
    lifeCounter.innerHTML = "Guesses Left: " + guessesLeft;
    scoreCounter.innerHTML = "Score: " + score;
}

function victory()
{
    isComplete = false;
    guessedLetters = [];
    populateLetters();
    progress = chosenWord;
    progress = progress.split(" ").join('');
    guessesLeft = 10;
    score++;
    lifeCounter.innerHTML = "Guesses Left: " + guessesLeft;
    scoreCounter.innerHTML = "Score: " + score;
  
}

function removeChildren()
{
    for (let i = 0; i < letterWrapper.children.length; i++)
    {
        while (letterWrapper.firstChild)
        {
            letterWrapper.removeChild(letterWrapper.firstChild);        
        }
    }

    for (let i = 0; i < guesses.children.length; i++) {
        while (guesses.firstChild)
        {
            guesses.removeChild(guesses.firstChild);
        }
    }
}

function populateLetters()
{
    removeChildren();
    var rndIndx = Math.floor(Math.random() * wordList.length);
    chosenWord = wordList[rndIndx];
    console.log("chosen word is " + chosenWord);

    for (let i = 0; i < chosenWord.length; i++)
    {
        var letterSlot = document.createElement("div");
        letterSlot.className = "letterSlot";
        letterWrapper.appendChild(letterSlot);
        
        if (chosenWord[i] == " ")
        {
            letterSlot.style.display = "hidden";
            letterSlot.style.border = "0px";
        }
    }
}

function guess(e)
{
    if (isComplete)
    {
        return;
    }
    var keynum;   
    
    if (window.event)
    {                   
        keynum = e.keyCode;
    }
    else if (e.which)
    {
        keynum = e.which;
    }
    
    keynum = String.fromCharCode(keynum);

    if (!isAlpha(keynum)) 
    {
        mainCounter.innerHTML = "Please enter a valid letter";
        return;
    } 
        
    
    for (let i = 0; i < chosenWord.length; i++) {

        if (keynum == chosenWord[i])
        {
            letterWrapper.children[i].innerHTML = chosenWord[i].toUpperCase();
            progress =  progress.split(chosenWord[i].toString()).join('')
            console.log(progress);

            if (progress.length <= 0)
            {
                mainCounter.innerHTML = "Correct! The word was " + "'" + chosenWord.toUpperCase() + "'";
                isComplete = true;
                setTimeout(victory, 500);
                return;
            }
        }
    }

    if (guessedLetters.includes(keynum))
    {
        mainCounter.innerHTML = "Already Guessed " + keynum.toUpperCase();
        return;    
    }

    else {
        mainCounter.innerHTML = "'" + keynum.toUpperCase() + "'";

        var guess = document.createElement("div");
        guess.className = "guess";
        guesses.appendChild(guess);

        if (!chosenWord.includes(keynum) && !guessedLetters.includes(keynum))
        {
            guessesLeft--;
            lifeCounter.innerHTML = "Guesses Left: " + guessesLeft;
    
            if (guessesLeft < 0) {
                mainCounter.innerHTML = "GAME OVER";
                reset();
            }
        }

        guessedLetters.push(keynum);
        guess.innerHTML = guessedLetters[guessedLetters.length - 1].toUpperCase();
    }
}

document.onkeypress = guess;
onload = reset;