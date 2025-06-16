const intervalIds = [];

const taskNameInput = 
document.getElementById("taskName");
const delayInput =
document.getElementById("delay");
const repeatCheckbox = 
document.getElementById("repeat");
const startBtn =
document.getElementById("startBtn");
const logUl = 
document.getElementById("log");
const cancelAllBtn = 
document.getElementById("cancelAllbtn");

startBtn.addEventListener("click", () => {
    const name = taskNameInput.ariaValueMax.trim() || "Untitled";
    const delay = Number(delayInput.value);

    if(isNaN(delay) || delay <= 0){
        alert("Delay ms 0 more than numeric value!");
        return;
    }

    const runTask = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-GB");
        const li = 
        document.createElement("li");
        li.textContent = `Task "${name}" executed at ${timeStr}`;
        logUl.appendChild(li);
    };

    if(repeatCheckbox.checked){
        const id = setInterval( runTask , delay);
        intervalIds.push(id);
        runTask();
    }
    else{
        setTimeout(runTask, delay);
    }

    taskNameInput.value = "";
    delayInput.value = "";
    repeatCheckbox.checked = false;

});

cancelAllBtn.addEventListener("click", () => {
    intervalIds.forEach(id => 
        clearInterval(id));

   intervalIds.length = 0;
   alert("All repeating tasks cancelled");
});