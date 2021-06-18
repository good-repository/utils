import Moment from "moment";
import { Icons } from "../config";

const inputMaskCPF = (value) => {
  if (!value) {
    return value;
  }
  let mask = clearStringOnlyNumbers(value);

  if (mask.length > 11) {
    mask = mask.substring(0, 11);
  }

  if (mask.length <= 11) {
    mask = mask.replace(/(\d{3})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return mask;
};

const removeMaskCPF = (value) => clearStringOnlyNumbers(value);

const inputMaskCNPJ = (value) => {
  let mask = clearStringOnlyNumbers(value);

  if (mask.length > 14) {
    mask = mask.substring(0, 14);
  }
  if (mask.length <= 14) {
    mask = mask.replace(/(\d{2})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d)/, "$1/$2");
    mask = mask.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }
  return mask;
};

const removeMaskCNPJ = (value) => {
  return clearStringOnlyNumbers(value);
};

const inputMaskSSN = (value) => {
  let mask;
  mask = clearStringOnlyNumbers(value);

  if (mask.length > 9) {
    mask = mask.substring(0, 9);
  }
  if (mask.length <= 9) {
    mask = mask.replace(/(\d{3})(\d)/, "$1-$2");
    mask = mask.replace(/(\d{2})(\d{4})$/, "$1-$2");
  }
  return mask;
};

const removeMaskSSN = (value) => {
  return clearStringOnlyNumbers(value);
};

const inputMaskEIN = (value) => {
  if (!value) {
    return value;
  }
  let mask;
  mask = clearStringOnlyNumbers(value);

  if (mask.length > 9) {
    mask = mask.substring(0, 9);
  }

  if (mask.length <= 8) {
    mask = mask.replace(/(\d{1})(\d{7})/, "$1-$2");
  } else if (mask.length <= 9) {
    mask = mask.replace(/(\d{2})(\d{7})$/, "$1-$2");
  }
  return mask;
};

const removeMaskEIN = (value) => clearStringOnlyNumbers(value);

const inputMaskTEL = (value) => {
  if (!value) {
    return value;
  }
  let mask = clearStringOnlyNumbers(value);

  if (mask.length > 11) {
    mask = mask.substring(0, 11);
  }

  if (mask.length <= 10) {
    mask = mask.replace(/(\d{2})(\d)/, "($1) $2");
    mask = mask.replace(/(\d{4})(\d)/, "$1-$2");
  } else if (mask.length <= 11) {
    mask = mask.replace(/(\d{2})(\d{1})(\d)/, "($1) $2 $3");
    mask = mask.replace(/(\d{4})(\d{4})$/, "$1-$2");
  }
  return mask;
};

const inputMaskTELNineNumber = (value) => {
  if (!value) {
    return value;
  }
  let mask = clearStringOnlyNumbers(value);

  mask = mask.substring(0, 9);

  mask = mask.replace(/(\d{1})(\d)/, "$1 $2");
  mask = mask.replace(/(\d{4})(\d{4})$/, "$1-$2");

  return mask;
};

const inputMaskTELEightNumber = (value) => {
  if (!value) {
    return value;
  }
  let mask = clearStringOnlyNumbers(value);

  if (mask.length > 9) {
    mask = mask.substring(0, 9);
  }

  mask = mask.replace(/(\d{4})(\d)/, "$1-$2");

  return mask;
};

const removeMaskTEL = (value) => clearStringOnlyNumbers(value);

const inputMaskDATE = (value) => {
  if (!value) {
    return value;
  }
  let mask = clearStringOnlyNumbers(value);

  if (mask.length > 8) {
    mask = mask.substring(0, 8);
  }

  if (mask.length <= 8) {
    mask = mask.replace(/(\d{2})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{2})(\d{4})$/, "$1.$2");
  }
  return mask;
};

const inputMaskClock = (value) => {
  if (!value) {
    return value;
  }

  let mask = clearStringOnlyNumbers(value);

  if (mask.length > 4) {
    mask = mask.substring(0, 4);
  }

  mask = mask.replace(/(\d{2})(\d{2})/, "$1:$2");
  return mask;
};

const removeMaskDATE = (value) => {
  const newValue = clearStringOnlyNumbers(value);
  return Moment(newValue, "DDMMYYYY").format("YYYY-MM-DD");
};

const inputMaskCEP = (value) => {
  if (!value) {
    return value;
  }
  let mask = clearStringOnlyNumbers(value);

  if (mask.length > 8) {
    mask = mask.substring(0, 8);
  }
  if (mask.length <= 8) {
    mask = mask.replace(/(\d{5})(\d{3})$/, "$1-$2");
  }
  return mask;
};

const removeMaskCEP = (value) => {
  return clearStringOnlyNumbers(value);
};

const transformDateToMonthDay = (date) => {
  return Moment(date).format("L");
};

const transformDateToTimeHour = (date) => {
  return Moment(date).format("LT");
};

const transformDateToISO = (date) => {
  const aux = removeMaskDATE(date);
  return new Date(aux).toISOString();
};

const transformDateToMonthYear = (date) => {
  return Moment(date).format("MMMM/YYYY");
};

const transformDateToDayMonthYear = (date) => {
  // if (!Moment(date).isValid()) {
  //   return "";
  // }
  return Moment(date).format("DD/MM/YYYY");
};

const dateTransformToFullFormat = (date) => {
  return Moment(date).format("LLL");
};

const dateTransformToApiFormat = (date) => {
  if (!date) {
    return null;
  }
  return Moment(date).format("YYYY-MM-DD");
};

const dateTransformToDDMMYYYY = (date) => {
  if (!date) {
    return date;
  }

  return Moment(date).format("DDMMYYYY");
};

const toCamelCase = (textValue) => {
  return textValue
    .split(" ")
    .map((splitText) => {
      return (
        splitText.charAt(0).toUpperCase() + splitText.slice(1).toLowerCase()
      );
    })
    .join(" ");
};

const toUpperCase = (textValue) => {
  const resultText = textValue ? textValue.toUpperCase() : textValue;
  return resultText;
};

const clearStringOnlyNumbers = (value) =>
  value ? `${value}`.replace(/\D/g, "") : value;

const organizeTransactionsAndConcatValues = (transactions) => {
  const { length } = transactions;

  const transactionGroups = {};
  for (let i = 0; i < length; i += 1) {
    const {
      amountBrl,
      groupDescriptionMcc,
      groupMcc,
      creditFlag,
    } = transactions[i];

    const resultValue = creditFlag === 1 ? 0 : amountBrl;

    if (groupMcc === null) {
      if (!transactionGroups[0]) {
        transactionGroups[0] = {
          value: resultValue,
          groupName: "Outros",
          mcc: 0,
        };
      } else {
        transactionGroups[0].value += resultValue;
      }
    } else if (!transactionGroups[groupMcc]) {
      transactionGroups[groupMcc] = {
        value: resultValue,
        groupName: groupDescriptionMcc,
        mcc: groupMcc,
      };
    } else {
      transactionGroups[groupMcc].value += resultValue;
    }
  }

  const transitionGroupArray = Object.values(transactionGroups);
  transitionGroupArray.sort((a, b) => (a.value < b.value ? 1 : -1));
  return transitionGroupArray;
};

const convertMoneyTextMask = (value) => {
  if (value) {
    const stringOnlyNumbers = `${Number(value).toFixed(2)}`.replace(/\D/g, "");
    if (!stringOnlyNumbers) {
      return "R$ 0,00";
    }

    const { length } = stringOnlyNumbers;
    if (length === 1) {
      return `R$ 0,0${stringOnlyNumbers}`;
    }
    if (length === 2) {
      return `R$ 0,${stringOnlyNumbers}`;
    }
    let moneyMask = "";

    for (let i = length - 1; i >= 0; i -= 1) {
      if (i === length - 2) {
        moneyMask = `,${stringOnlyNumbers[i]}${moneyMask}`;
      } else if (i < length - 5 && (i - length - 3) % 3 === 0) {
        moneyMask = `${stringOnlyNumbers[i]}.${moneyMask}`;
      } else {
        moneyMask = `${stringOnlyNumbers[i]}${moneyMask}`;
      }
    }

    return `R$ ${moneyMask}`;
  }
  return "R$ 0,00";
};

const convertMoneyInputMask = (value) => {
  if (value) {
    let mask = `${value}`.replace(/\D/g, "");

    const contador = (value.length - 5) / 3;

    mask = mask.replace(/^([.\d]+)(\d{2})$/, "$1,$2");
    for (let i = 0; i < contador; i += 1) {
      mask = mask.replace(/(\d+)(\d{3})([.,\d]+)$/, "$1.$2$3");
    }

    mask = `R$ ${mask}`;
    return mask;
  }

  return value;
};

const removeMoneyMask = (value) => {
  const stringValue = `${value}`.replace(/\D/g, "");
  if (stringValue.length === 1) {
    return parseFloat(`0.0${stringValue}`).toFixed(2);
  }
  if (stringValue.length === 2) {
    return parseFloat(`0.${stringValue}`).toFixed(2);
  }
  return parseFloat(stringValue.replace(/(\d+)(\d{2})$/, "$1.$2")).toFixed(2);
};

const formatBankId = (bankId) => {
  const stringBankId = `${bankId}`;
  const { length } = stringBankId;
  if (length === 1) {
    return `00${bankId}`;
  }
  if (length === 2) {
    return `0${bankId}`;
  }
  return `${bankId}`;
};

const formatCardNumber = (cardNumber) => {
  const stringNumber = `${cardNumber}`;
  const { length } = stringNumber;
  let formatedCardNumber = "";
  for (let i = 0; i < length; i += 1) {
    formatedCardNumber +=
      i % 4 === 0 && i > 0 ? ` ${cardNumber[i]}` : cardNumber[i];
  }

  return formatedCardNumber;
};
const setCardFlag = (cardNumber) => {
  var cardNumber = cardNumber.replace(/[^0-9]+/g, "");

  var cards = {
    VISA: /^4[0-9]{12}(?:[0-9]{3})/,
    MASTERCARD: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{14}$/,
    DINERS: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
    AMEX: /^3[47][0-9]{13}/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{12}/,
    HIPERCARD: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
    ELO: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
    JCB: /^(?:2131|1800|35\d{3})\d{11}/,
    AURA: /^(5078\d{2})(\d{2})(\d{11})$/,
  };

  for (var flag in cards) {
    if (cards[flag].test(cardNumber)) {
      return flag;
    }
  }

  if (cardNumber.length > 15) return "Bandeira Desconhecida";

  return "";
};

function noCapitalize(word) {
  const prepos = [
    "da",
    "do",
    "das",
    "dos",
    "a",
    "e",
    "é",
    "à",
    "á",
    "o",
    "que",
    "se",
    "de",
    "para",
    "por",
    "pelo",
    "com",
  ];

  return prepos.includes(word.toLowerCase());
}

function getWordsBySeparator(text, separator) {
  return text.split(separator);
}

function capitalizeWord(word, restToLowerCase) {
  if (!noCapitalize(word)) {
    return `${word.charAt(0).toUpperCase()}${
      restToLowerCase ? word.slice(1).toLowerCase() : word.slice(1)
    }`;
  } else {
    return word.toLowerCase();
  }
}

function capitalizeText(splitedText, separators, restToLowerCase) {
  if (splitedText.length > 1) {
    return splitedText
      .map((word) => {
        return capitalizeWord(word, restToLowerCase);
      })
      .join(separators);
  } else {
    return capitalizeWord(splitedText.join(""), restToLowerCase);
  }
}

function capitalizeBySeparators(text, separators) {
  let resultText = text;
  for (let i = 0; i < separators.length; i++) {
    resultText = capitalizeText(
      getWordsBySeparator(resultText, separators[i]),
      separators[i],
      i === 0
    );
  }

  return resultText;
}

function inputMaskCPFCNPJ(value) {
  if (!value) {
    return value;
  }
  let mask = clearStringOnlyNumbers(value);

  if (mask.length > 14) {
    mask = mask.substring(0, 14);
  } else if (mask.length <= 11) {
    mask = mask.substring(0, 11);
  }

  if (mask.length <= 11) {
    mask = mask.replace(/(\d{3})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else if (mask.length <= 14) {
    mask = mask.replace(/(\d{2})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d)/, "$1.$2");
    mask = mask.replace(/(\d{3})(\d)/, "$1/$2");
    mask = mask.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }
  return mask;
}

export default {
  inputMaskCPF,
  removeMaskCPF,
  inputMaskCNPJ,
  removeMaskCNPJ,
  inputMaskSSN,
  removeMaskSSN,
  inputMaskEIN,
  removeMaskEIN,
  inputMaskTEL,
  inputMaskTELEightNumber,
  inputMaskTELNineNumber,
  removeMaskTEL,
  inputMaskDATE,
  inputMaskClock,
  removeMaskDATE,
  inputMaskCEP,
  removeMaskCEP,
  transformDateToMonthDay,
  transformDateToTimeHour,
  dateTransformToFullFormat,
  dateTransformToApiFormat,
  dateTransformToDDMMYYYY,
  toCamelCase,
  toUpperCase,
  clearStringOnlyNumbers,
  transformDateToISO,
  removeMoneyMask,
  convertMoneyInputMask,
  convertMoneyTextMask,
  transformDateToMonthYear,
  transformDateToDayMonthYear,
  organizeTransactionsAndConcatValues,
  formatBankId,
  formatCardNumber,
  setCardFlag,
  capitalizeBySeparators,
  inputMaskCPFCNPJ,
};
