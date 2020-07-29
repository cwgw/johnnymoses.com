const crypto = window.crypto || window.msCrypto;

export const toPlainText = blocks => {
  if (!blocks) {
    return "";
  }
  return blocks
    .map(block => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map(child => child.text).join("");
    })
    .join("\n\n");
};

// WHATWG crypto RNG - https://w3c.github.io/webcrypto/Overview.html
const whatwgRNG = (length = 16) => {
  const rnds8 = new Uint8Array(length);
  crypto.getRandomValues(rnds8);
  return rnds8;
};

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substring(1);
}

export const randomKey = length => {
  return whatwgRNG(length)
    .reduce((str, n) => str + byteToHex[n], "")
    .slice(0, length);
};
