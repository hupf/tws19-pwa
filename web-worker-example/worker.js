"use strict";

console.log("Hello, I'm the worker...");

self.onmessage = onMessage;

function onMessage(evt) {
  calculateNextFibonacci();
}

let index = 0;

function calculateNextFibonacci() {
  var num = getFibonacci(index);
  // console.log(`Fibonacci (${index}): ${num}`);
  self.postMessage({ index, num });
  index++;
  setTimeout(calculateNextFibonacci);
}

function getFibonacci(n) {
  if (n < 2) {
    return n;
  }
  return getFibonacci(n - 1) + getFibonacci(n - 2);
}
