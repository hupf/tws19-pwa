[back](README.md)

# Lab: Use a Web Worker

To get in touch with workers and to learn how to setup communication with them, we will first create a Web Worker. At the end of this lab, we will calculate Fibonacci numbers in a separate thread.

We use a dedicated worker, which is only accessible by the script that calls it. Shared workers on the other hand can be accessed by multiple scripts (i.e. multiple tabs). The Service Worker is basically a Web Worker for the network (better names would be "network worker" or "request proxy") that is also shared between multiple tabs.

See also the [Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) article on MDN for more details.

## Basic setup

Create an `index.html` file that includes a `script.js`:

```
<html>
  <body>
    <h1>Fibonacci</h1>
    <button id="start-btn" type="button">Start</button>
    <button id="stop-btn" type="button">Stop</button>
    <div id="results"></div>
    <script src="script.js"></script>
  </body>
</html>
```

And create the `script.js` file with the following basic logic:

```
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
  }

  function stop() {
    console.log("Stopping...");
    stopBtn.style.display = "none";
    startBtn.style.display = "initial";
  }
})();
```

Serve the application (in the same directory as the `index.html` file):

```
npx live-server
```

Now you should be able to toggle the start/stop buttons.

## Setup the worker

Create a `worker.js` file that outputs something:

```
"use strict";

console.log("Hello, I'm the worker...");
```

At the end of your `start()` function of the `script.js`, create the worker by defining the location of the worker script:

```
worker = new Worker("/worker.js");
```

Check if you can see your worker's output in your browser's console.

Observe the worker in the Dev Tools: in the "Sources" (Chrome) or "Debugger" (Firefox) tab, the worker should be listed in the "Threads" section on the right as well as its source file on the left. In Firefox: you can also visit _about:debugging#workers_ and look in the "Other Workers" section.

## Stop the worker

We also want be able to stop the worker. As the calculation of the Fibonacci numbers (we'll implement later) blocks the thread, we cannot send a message to the worker to abort the calculation. Instead, we simply kill it in our `stop()` function:

```
worker.terminate();
```

Observe how it's gone in the Dev Tools.

## Communicate with the worker

Let's send a message to the worker and back.

In your `script.js`, add an event listener for messages from the worker and then send a message to the worker:

```
function start() {
  ...
  worker.addEventListener("message", onMessage);
  worker.postMessage("Hi");
}

function onMessage(event) {
  console.log("Script received:", event.data);
}
```

In your `worker.js`, also add an event listener and respond with another message:

```
self.onmessage = onMessage;

function onMessage(event) {
  console.log("Worker received:", event.data);
  self.postMessage("Hey");
}
```

Check if you can see this conversation in the console.

_Remark:_ It is important to note that the data that is sent via `postMessage` will be copied (i.e. serialized). It is not possible to send functions (although you could send source code and `eval` it in the worker).

## Calculate Fibonacci numbers

Given the following (uneffective) `calculateNextFibonacci()` function in your `worker.js`:

```
let index = 0;

function calculateNextFibonacci() {
  var num = getFibonacci(index);
  console.log(`Fibonacci (${index}): ${num}`);
  index++;
  setTimeout(calculateNextFibonacci);
}

function getFibonacci(n) {
  if (n < 2) {
    return n;
  }
  return getFibonacci(n-1) + getFibonacci(n-2);
}
```

And the following `render()` function in your `script.js`:

```
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
```

Try to implement the communication between the worker and the script, such that the results are rendered to the page as soon as they are available.

## Solution

https://gitlab.puzzle.ch/pitc_members/tws19-pwa/tree/master/web-worker-example
