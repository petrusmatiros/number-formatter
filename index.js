const NumberFormat = {
  SHORT: "short",
  COMMA: "comma",
  SPACE: "space",
};

function formatNumber(num, format = NumberFormat.COMMA, decimalAmount = 3) {
  errorHandling();
  // Only accept positive integers (round them using floor)
  num = Math.floor(num);

  let formattedNumber = "";

  if (format === NumberFormat.SHORT) {
    formattedNumber = formatShort();
  } else if (format === NumberFormat.COMMA || format === NumberFormat.SPACE) {
    formattedNumber = formatSeperate();
  }

  return formattedNumber;

  function errorHandling() {
    if (num < 1) {
      throw new Error(`Parameter ${num} is not a positive number`);
    }
    if (typeof num !== "number") {
      throw new Error(`Parameter ${num} is not a number`);
    }
    if (typeof decimalAmount !== "number") {
      throw new Error(`Parameter ${decimalAmount} is not a number`);
    }
    if (!Number.isFinite(num)) {
      throw new Error(`Parameter ${num} is not a finite number`);
    }
    if (!Number.isFinite(decimalAmount)) {
      throw new Error(`Parameter ${decimalAmount} is not a finite number`);
    }
    if (
      format !== NumberFormat.SHORT &&
      format !== NumberFormat.COMMA &&
      format !== NumberFormat.SPACE
    ) {
      throw new Error(`Parameter ${format} is not a valid format`);
    }
  }

  function formatShort() {
    let metricPrefix = "";
    const thousand = 1000;
    const million = 1000000;
    const billion = 1000000000;
    const trillion = 1000000000000;
    if (num < thousand) {
      metricPrefix = "K";
      num = (num / thousand).toFixed(decimalAmount);
    } else if (num < million) {
      metricPrefix = "K";
      num = Math.round(num / thousand);
    } else if (num < billion) {
      metricPrefix = "M";
      num = Math.round(num / million);
    } else if (num < trillion) {
      metricPrefix = "B";
      num = Math.round(num / billion);
    } else if (num >= trillion) {
      metricPrefix = "T";
      num = Math.round(num / trillion);
    }
    return `${num} ${metricPrefix}`;
  }

  function formatSeperate() {
    const threeDigits = 3;
    let s = num.toString();

    let firstPos = (s.length - 1) % 3;
    let firstPartDone = false;

    if (s.length > threeDigits) {
      // How many insertions to do of the desired seperator
      let insertions = Math.floor(s.length / 3);
      let inserted = 0;
      for (let i = 0; i < s.length; i++) {
        let toInsert = false;
        if (i > firstPos && (i - firstPos - 1) % 3 === 0) {
          toInsert = true;
        }
        if (toInsert) {
          if (inserted < insertions) {
            if (format === NumberFormat.SPACE) {
              formattedNumber += " ";
            } else if (format === NumberFormat.COMMA) {
              formattedNumber += ",";
            }
            inserted++;
          }
        }
        formattedNumber += s[i];
      }
    } else {
      formattedNumber = s;
    }
    return formattedNumber;
  }
}

const input = {
  num: 500000,
  format: NumberFormat.SHORT,
  decimalAmount: 3,
};
console.log(formatNumber(input.num, input.format, input.decimalAmount));
