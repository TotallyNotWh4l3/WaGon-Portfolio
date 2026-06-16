const log_A_Button = document.getElementById("open-log-A")
const log_B_Button = document.getElementById("open-log-B")

const log_A = document.getElementById("log-A")
const log_B = document.getElementById("log-B")

const key = {
    height: ["0rem", "25rem"]
}

const opt = {
    duration: 1000,
    easing: "cubic-bezier(0.4, 0, 0.6, 1)",
    fill: "forwards"
}

var deBound_A = true
var deBound_B = true

const task = {
    wait(seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }
};

async function log(button, log) {
    log.animate(key, opt)
    let text = "[LOG OPENED]"
    button.textContent = ""
    for (let i = 0; i < text.length; i++) {
        button.textContent += text.charAt(i)
        await task.wait(0.05 * Math.random())
        console.error("test");

    }
    console.warn("CLICK!");
}


log_A_Button.addEventListener("click", () => {
    console.log("deBound_A: " + deBound_A);
    
    if (deBound_A) {
        log(log_A_Button, log_A)
        deBound_A = false
    }
})

log_B_Button.addEventListener("click", () => {
    console.log("deBound_B: " + deBound_B);
    if (deBound_B) {
        log(log_B_Button, log_B)
        deBound_B = false
    }
})  