// src/utils/getRandomGradient.js
export function getRandomGradient() {
    const gradients = [
      "linear-gradient(to bottom, #000000, #1a1a40, #3a0ca3, #0077b6, #e0e7ff)",
      "linear-gradient(to bottom, #1f1c2c, #928dab, #ffffff)",
      "linear-gradient(to bottom, #1e3c72, #2a5298, #fceabb)",
      "linear-gradient(to bottom, #16222a, #3a6073, #b993d6, #fbeaf1)"
    ];
  
    return gradients[Math.floor(Math.random() * gradients.length)];
  }
  