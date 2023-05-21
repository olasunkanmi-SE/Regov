import cryptoJs from "crypto-js";

export const setEncryptedLocalStorage = (key: string, value: string, encrypt: boolean) => {
  if (encrypt) {
    try {
      crypto.randomUUID().toString();
      const encryptedText = cryptoJs.AES.encrypt(value, import.meta.env.VITE_SECRET);
      if (encryptedText) {
        localStorage.setItem(key, encryptedText.toString());
      }
    } catch (error) {
      console.log("Error while saving user Data", error);
    }
  } else {
    localStorage.setItem(key, value);
  }
};

export const getDecryptedLocalStorage = (key: string, decrypt: boolean) => {
  let value = localStorage.getItem(key);
  if (value && decrypt) {
    try {
      const decryptedText = cryptoJs.AES.decrypt(value, import.meta.env.VITE_SECRET);
      return decryptedText.toString(cryptoJs.enc.Utf8);
    } catch (error) {
      console.log("Error while getting user data", error);
    }
  }
  return value;
};

export const clearStorage = () => {
  localStorage.clear();
};
