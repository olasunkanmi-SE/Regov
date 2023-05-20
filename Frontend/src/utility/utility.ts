import cryptoJs from "crypto-js";

export const setEncryptedLocalStorage = (key: string, value: string, encrypt: boolean) => {
  localStorage.setItem(key, value);
  if (encrypt) {
    crypto.randomUUID().toString();
    const encryptedText = cryptoJs.AES.encrypt(value, import.meta.env.VITE_SECRET);
    localStorage.setItem(key, encryptedText.toString());
  }
};

export const getDecryptedLocalStorage = (key: string, decrypt: boolean) => {
  let value = localStorage.getItem(key);
  if (value && decrypt) {
    try {
      const decryptedText = cryptoJs.AES.decrypt(value, import.meta.env.VITE_SECRET);
      value = decryptedText.toString(cryptoJs.enc.Utf8);
    } catch (error) {
      console.log("Error decrypting the localstorage key");
    }
  }
  return value;
};
