const shebaCodeCheck = (code: string): boolean => {
  if (!/^IR\d{24}$/.test(code)) return false;
  const checkString = `${code.substring(4)}1827${code.substring(2, 4)}`;
  return BigInt(checkString) % BigInt(97) === BigInt(1);
};

const nationalCodeCheck = (code: string): boolean => {
  if (!/^\d{10}$/.test(code)) return false;
  const codeDigits = code.split("").map(Number);
  const checkSum = codeDigits[9];
  const sum = codeDigits
    .slice(0, 9)
    .reduce((acc, digit, index) => acc + digit * (10 - index), 0);
  const remainder = sum % 11;
  return checkSum === (remainder < 2 ? remainder : 11 - remainder);
};

const bankCardCheck = (code: string): boolean => {
  const cleanedCode = code.replace(/\D/g, "");
  if (!/^\d{16}$/.test(cleanedCode)) return false;
  const digits = cleanedCode.split("").map(Number);
  let sum = 0;
  for (let i = digits.length - 1; i >= 0; i--) {
    const digit = digits[i] * (i % 2 === 0 ? 1 : 2);
    sum += digit > 9 ? digit - 9 : digit;
  }
  return sum % 10 === 0;
};

const validateEmail = (val: string): string | boolean => {
  const isValidEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val);
  return isValidEmail ? true : "Invalid email format.";
};

const validateURL = (val: string): string | boolean => {
  const regex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  return regex.test(val) ? true : "Invalid URL format.";
};

const validatePassword = (password: string): string | boolean => {
  const rules = [/[A-Z]/, /[a-z]/, /[0-9]/, /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/];
  for (const rule of rules) {
    if (!rule.test(password)) {
      return `Password must contain at least one ${rule
        .toString()
        .slice(2, -2)}.`;
    }
  }
  return password.length >= 8 || "Password must be at least 8 characters long.";
};
