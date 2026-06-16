const charMS = 0.025

const logP = document.querySelectorAll(".typing-effect")

var originalText = []

const task = {
    wait(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    },
    delay(seconds, callback) {
        setTimeout(callback, seconds * 1000);
    }
};
function isIndentOrSpace(char) {
    return /\s/.test(char);
}
async function typingEffect(targetElement, index) {
    targetElement.textContent = ""
    console.log("Cleared");

    for (let i = 0; i < originalText[index].length; i++) {
        let char = originalText[index].charAt(i)
        if (isIndentOrSpace(char)) continue
        // console.log("Typing..")
        targetElement.textContent += char
        // console.log("Typed")
        await task.wait(charMS)
    }
    console.warn("Done!")
}
async function recordElement(elementArray) {
    for (let i = 0; i < elementArray.length; i++) {
        let target = elementArray[i]
        originalText[i] = target.textContent
        target.textContent = ""
        console.log(`${i}th Element Recorded`);
    }

    for (let i = 0; i < elementArray.length; i++) {
        let target = elementArray[i]
        let noSpace = originalText[i].replace(/\s+/g, "")
        if (originalText[i]) {
            console.log("Ran..");
            typingEffect(target, i)
            // await task.wait(charMS * (noSpace.length)*1.1)
        } else {
            console.warn(`${i}th element is Not Recorded!!`);
        }
        await task.wait(0.25)
    }
}


const checkMask = document.getElementById("check-mask")
var oneClick = true

checkMask.addEventListener("click", () => {
    if (oneClick) {
        oneClick = false
        recordElement(logP)
    }
});
