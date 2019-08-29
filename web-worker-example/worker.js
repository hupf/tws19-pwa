"use strict";

console.log("Hello, I'm the worker...");

self.onmessage = onMessage;

function onMessage(event) {
  console.log("Worker received:", event.data);
  self.postMessage("Hey");
}

// var curFib = 0;

// self.onmessage = onMessage

// // **********************************


// function onMessage(evt) {
//   getNextFib();
// }

function getNextFib() {
  var num = fib(curFib)
  self.postMessage({ idx: curFib, fib: num });
  curFib++;
  setTimeout(getNextFib)
}

function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n-1) + fib(n-2);
}
