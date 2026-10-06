
const inputText = document.getElementById("inputText");

const outputText = document.getElementById("outputText");

const fromLanguage = document.getElementById("fromLanguage");

const toLanguage = document.getElementById("toLanguage");

const translateButton = document.getElementById("translateButton");

const swapButton = document.getElementById("swapButton");

const status = document.getElementById("status");

const characterCount = document.getElementById("characterCount");


// Character counter
inputText.addEventListener("input", function () {

    characterCount.textContent = inputText.value.length;

});


// Translate
translateButton.addEventListener("click", async function () {

    const text = inputText.value.trim();

    const from = fromLanguage.value;

    const to = toLanguage.value;


    // Check empty text
    if (text === "") {

        status.textContent = "Please enter some text.";

        return;
    }


    // Same language
    if (from === to) {

        outputText.value = text;

        status.textContent = "Source and target languages are the same.";

        return;
    }


    // Loading
    translateButton.disabled = true;

    translateButton.textContent = "Translating...";

    status.textContent = "";


    try {

        /*
            Translation API

            This example uses MyMemory's public translation endpoint.
        */

        const url =
            `https://api.mymemory.translated.net/get?` +
            `q=${encodeURIComponent(text)}` +
            `&langpair=${from}|${to}`;


        const response = await fetch(url);


        if (!response.ok) {

            throw new Error("Translation request failed.");

        }


        const data = await response.json();


        // Get translated text
        const translation =
            data.responseData.translatedText;


        outputText.value = translation;


        status.textContent = "Translation completed.";

    }

    catch (error) {

        console.error(error);

        outputText.value = "";

        status.textContent =
            "Unable to translate. Please try again.";

    }

    finally {

        translateButton.disabled = false;

        translateButton.textContent = "Translate";

    }

});


// Swap languages
swapButton.addEventListener("click", function () {

    const oldFrom = fromLanguage.value;

    const oldTo = toLanguage.value;


    fromLanguage.value = oldTo;

    toLanguage.value = oldFrom;


    // Also swap text
    const oldInput = inputText.value;

    const oldOutput = outputText.value;


    inputText.value = oldOutput;

    outputText.value = oldInput;


    characterCount.textContent =
        inputText.value.length;

});

