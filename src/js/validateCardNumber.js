import verify from "../json/verificationPayments.json";

// Валидация структуры verify
const isValidVerificationData = (data) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return false;
  }
  return Object.values(data).every(
    (ids) =>
      Array.isArray(ids) &&
      ids.every((id) => typeof id === "string" && id.length > 0)
  );
};

if (!isValidVerificationData(verify)) {
  console.warn("Invalid verificationPayments.json data. Using empty fallback.");
  verify = {};
}

export function validateCardNumber(cardNumber) {
  // Базовая валидация формата
  if (typeof cardNumber !== "string" && typeof cardNumber !== "number") {
    return false;
  }

  const cardStr = String(cardNumber).trim();

  if (!/^\d+$/.test(cardStr) || cardStr.length < 13 || cardStr.length > 19) {
    return false;
  }

  let sum = 0;

  for (let i = 0; i < cardStr.length; i++) {
    let result = parseInt(cardStr[i], 10);

    // Удвоение каждой второй цифры с конца
    if ((cardStr.length - i) % 2 === 0) {
      result *= 2;
      if (result > 9) {
        result -= 9; // эквивалентно sum цифр (например, 14 → 1+4=5)
      }
    }
    sum += result;
  }

  return sum % 10 === 0;
}

export function checkPayment(cardNumber) {
  // Валидация ввода
  if (typeof cardNumber !== "string" && typeof cardNumber !== "number") {
    return false;
  }

  const cardStr = String(cardNumber).trim();

  if (!/^\d+$/.test(cardStr)) {
    return false;
  }

  // Поиск платёжной системы
  for (const [paymentName, prefixes] of Object.entries(verify)) {
    for (const prefix of prefixes) {
      if (cardStr.startsWith(prefix)) {
        return paymentName.toLowerCase();
      }
    }
  }

  return false;
}
