importScripts("util.js");

onmessage = (message) => {
  const n = message.data;
  getSolution(n, postMessage);
};
