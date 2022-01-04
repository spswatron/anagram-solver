const letterInput = document.getElementById("letter-input");
const arrowButton = document.getElementById("arrow-button");
const resultsContainer = document.querySelector(".results-container");

const isLetter = (str) => {
    return str.length === 1 && str.match(/[a-z]/i);
}

const cleanse = (word) => {
    let cleansedWord = "";
    word = word.toLowerCase();
    for (let i = 0; i < word.length; i++) {
        if (isLetter(word.charAt(i))) {
            cleansedWord += word.charAt(i);
        }
    }
    return cleansedWord;
}

const submit = async (e) => {
    const letters = cleanse(letterInput.value);
    console.log("submitting " + letters + "...")
    const res = await fetch("https://side-projects-one.server.ashley-chang.me/anagram_solver/" + letters);
    const json = await res.json();
    const words = json.words;
    let results = "";
    for (const word of words) {
        results += `<div>${word}</div>`
    }
    resultsContainer.innerHTML = results;
}

const enterCheck = (e) => {
    if (e.keyCode === 13) {
        submit(e);
    }
}

letterInput.addEventListener("keyup", enterCheck);
arrowButton.addEventListener("click", submit);