(function Home(){
  "use strict";

  let startBtn;
  let stopBtn;
  let results;
  let worker

  document.addEventListener("DOMContentLoaded", ready, false);

  function ready() {
    console.log("Ready");
    startBtn = document.getElementById("start-btn");
    stopBtn = document.getElementById("stop-btn");
    results = document.getElementById("results");

    startBtn.addEventListener("click", start, false);
    stopBtn.addEventListener("click", stop, false);
    stopBtn.style.display = "none";
  }

  function start() {
    console.log("Starting...");
    startBtn.style.display = "none";
    stopBtn.style.display = "initial";

    results.innerHTML = "";

    worker = new Worker("/worker.js");
    worker.addEventListener("message", onMessage);
    worker.postMessage("Hi");
  }

  function stop() {
    console.log("Stopping...");
    stopBtn.style.display = "none";
    startBtn.style.display = "initial";

    worker.terminate();
  }

  function onMessage(event) {
    console.log("Script received:", event.data);
    const { index, num } = event.data;
    render(index, num);
  }

  function render(index, num) {
    const p = document.createElement("div");
    p.innerText = `Fibonacci (${index}): ${num}`;
    if (results.childNodes.length > 0) {
      results.insertBefore(p, results.childNodes[0]);
    }
    else {
      results.appendChild(p);
    }
  }

})();
