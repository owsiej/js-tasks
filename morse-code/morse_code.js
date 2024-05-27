class MorseCrypt {
  MORSE_CODE = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
    0: "-----",
    "&": ".-...",
    "@": ".--.-.",
    ":": "---...",
    ",": "--..--",
    ".": ".-.-.-",
    "'": ".----.",
    "?": "..--..",
    "/": "-..-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    "(": "-.--.",
    ")": "-.--.-",
    "!": "-.-.--",
  };
  constructor(text) {
    this.text = text;
  }

  encryptToMorse() {
    let result = "";
    for (const char of this.text) {
      if (char === " ") {
        result += "/ ";
      } else {
        result += `${this.MORSE_CODE[char.toUpperCase()]} `;
      }
    }
    return result.trimEnd();
  }

  decryptFromMorse() {
    let result = "";
    for (const char of this.text.split(" ")) {
      if (char === "/") {
        result += " ";
      } else {
        const code = Object.entries(this.MORSE_CODE).find(
          (pair) => pair[1] === char
        );
        result += code[0];
      }
    }
    return result;
  }
}

const textToEncode = "This is an example string.";
const textToDecode =
  "- .... .. ... / .. ... / .- -. / . -..- .- -- .--. .-.. . / ... - .-. .. -. --. .-.-.-";

const morseEn = new MorseCrypt(textToEncode);
const morseDe = new MorseCrypt(textToDecode);
console.log(morseEn.encryptToMorse());
console.log(morseDe.decryptFromMorse());
