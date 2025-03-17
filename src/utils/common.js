export const areInArray = (arr, ...elements) => {
  for (let element of elements) {
    if (arr?.includes(element)) {
      return true;
    }
  }
  return false;
};

export const newFormatPrice = (price) => {
  const isNegative = price < 0;
  const numberString = String(Math.abs(price)); 
  const numberArray = numberString.split("");
  const dotPosition = numberArray.length % 3 || 3;

  for (let i = dotPosition; i < numberArray.length; i += 4) {
    numberArray.splice(i, 0, ".");
  }

  let formattedNumber = numberArray.join("");

  return isNegative ? `- ${formattedNumber}` : formattedNumber;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 0.5 },
  },
};

export const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: 0.5 },
  },
};

export const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: 1 },
  },
};

export const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: 1 },
  },
};

export function formatDateTimeVN(isoString) {
  const date = new Date(isoString);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  };

  const formatter = new Intl.DateTimeFormat("vi-VN", options);
  const formattedParts = formatter.formatToParts(date);

  const time = `${formattedParts.find((p) => p.type === "hour").value}:${
    formattedParts.find((p) => p.type === "minute").value
  }`;

  const dateStr = `${formattedParts.find((p) => p.type === "day").value}/${
    formattedParts.find((p) => p.type === "month").value
  }/${formattedParts.find((p) => p.type === "year").value}`;

  return `${time} | ${dateStr}`;
}

export const formatCurrencyToVND = (input) => {
  const amount = typeof input === "string" ? parseFloat(input) : input;

  if (isNaN(amount)) {
    throw new Error(
      "Invalid input value. Please enter a number or string containing numbers."
    );
  }

  const formattedAmount = amount.toLocaleString("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formattedAmount;
};
