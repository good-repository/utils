import { PSAlerts } from "../lib";
import moment from "moment";

function updateFieldMessage(
  label,
  inputErrorMessage,
  validationErrorMessage,
  required
) {
  let errorMessage = !required
    ? "Campo não obrigatório. Remova seu valor ou corrija o seguinte erro para prosseguir: "
    : "";
  if (validationErrorMessage) {
    errorMessage += validationErrorMessage;
  } else if (inputErrorMessage) {
    errorMessage += inputErrorMessage;
  }

  return `${label}{*}${errorMessage}`;
}

function isValidForm(data, showMessage = true) {
  const allKeys = Object.keys(data).filter((f) => !Array.isArray(data[f]));
  let allData = { ...data };

  const formData = {};
  let finalErrorMessage = [];

  const { length } = allKeys;
  for (let i = 0; i < length; i++) {
    const key = allKeys[i];
    const properties = allData[key];
    if (properties && properties.error !== undefined) {
      // if (properties.required) {
      if (properties.required && !properties.value) {
        allData[key] = { ...properties, error: true };
        finalErrorMessage.push(
          updateFieldMessage(
            properties.label,
            properties.errorMessage,
            null,
            true
          )
        );
      } else if (
        Boolean(properties.value) &&
        properties.validation &&
        properties.validation(properties.value, data) !== null
      ) {
        const { isValid, errorMessage } = properties.validation(
          properties.value,
          data
        );

        allData[key].error = !isValid;
        if (!isValid) {
          allData[key].errorMessage = errorMessage;
          finalErrorMessage.push(
            updateFieldMessage(
              properties.label,
              properties.errorMessage,
              errorMessage,
              properties.required
            )
          );
        } else {
          formData[key] = properties.value;
          allData[key].error = false;
        }
      } else {
        formData[key] = properties.value;
        allData[key].error = false;
      }
      // } else {
      //   formData[key] = properties.value;
      //   allData[key].error = false;
      // }
    }
  }
  if (finalErrorMessage.length > 0) {
    if (showMessage) {
      PSAlerts.errorValidation(finalErrorMessage);
    }

    return { isValid: false, formData: null, state: allData };
  }
  return { isValid: true, formData, state: allData };
}

function removeMask(value) {
  return value ? `${value}`.replace(/[^\d]/g, "") : value;
}

const isEMAIL = (value) => {
  const errorMessage = "Email inválido";
  const email = value.trim();
  if (!email) {
    return { isValid: false, errorMessage: "Insira um email" };
  }
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return { isValid: true, errorMessage };
  }
  return { isValid: false, errorMessage };
};

const isCPF = (cpf) => {
  if (!cpf) {
    return { isValid: false, errorMessage: "Insira um número de CPF" };
  }

  let clearCpf = "";
  let errorMessage = "CPF inválido";
  if (cpf) {
    clearCpf = cpf.replace(/[^\d]/g, "");
  } else {
    return { isValid: false, errorMessage: "Insira um número de CPF" };
  }

  let sum = 0;
  let rest;
  if (
    clearCpf.length !== 11 ||
    clearCpf === "00000000000" ||
    clearCpf === "11111111111" ||
    clearCpf === "22222222222" ||
    clearCpf === "33333333333" ||
    clearCpf === "44444444444" ||
    clearCpf === "55555555555" ||
    clearCpf === "66666666666" ||
    clearCpf === "77777777777" ||
    clearCpf === "88888888888" ||
    clearCpf === "99999999999"
  ) {
    return { isValid: false, errorMessage };
  }

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(clearCpf.substring(i - 1, i), 10) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(clearCpf.substring(9, 10), 10)) {
    return { isValid: false, errorMessage };
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(clearCpf.substring(i - 1, i), 10) * (12 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(clearCpf.substring(10, 11), 10)) {
    return { isValid: false, errorMessage };
  }

  return { isValid: true, errorMessage };
};

const isCNPJ = (cnpj) => {
  let clearCnpj = "";
  let errorMessage = "CNPJ inválido";
  if (cnpj) {
    clearCnpj = cnpj.replace(/[^\d]/g, "");
  } else {
    return { isValid: false, errorMessage: "Insira um número de CNPJ" };
  }

  if (clearCnpj === "") {
    return { isValid: false, errorMessage: "Insira um número de CNPJ" };
  }

  if (clearCnpj.length !== 14) {
    return { isValid: false, errorMessage };
  }

  if (
    clearCnpj === "00000000000000" ||
    clearCnpj === "11111111111111" ||
    clearCnpj === "22222222222222" ||
    clearCnpj === "33333333333333" ||
    clearCnpj === "44444444444444" ||
    clearCnpj === "55555555555555" ||
    clearCnpj === "66666666666666" ||
    clearCnpj === "77777777777777" ||
    clearCnpj === "88888888888888" ||
    clearCnpj === "99999999999999"
  ) {
    return { isValid: false, errorMessage };
  }

  let size = clearCnpj.length - 2;
  let numbers = clearCnpj.substring(0, size);
  const digits = clearCnpj.substring(size);

  let sum = 0;
  let position = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * position--;
    if (position < 2) {
      position = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0), 10)) {
    return { isValid: false, errorMessage };
  }

  size += 1;
  numbers = clearCnpj.substring(0, size);
  sum = 0;
  position = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * position--;
    if (position < 2) {
      position = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1), 10)) {
    return { isValid: false, errorMessage };
  }

  return { isValid: true, errorMessage };
};

const isCellphone = (cellphone) => {
  let errorMessage = "Número de celular inválido";
  if (!cellphone) {
    return { isValid: false, errorMessage: "Insira um número de celular" };
  }
  const withoutMask = removeMask(cellphone);
  if (withoutMask) {
    if (withoutMask.length === 11) {
      return { isValid: true, errorMessage };
    }
  }
  return { isValid: false, errorMessage };
};

const isCEP = (cep) => {
  let errorMessage = "CEP inválido";
  if (!cep) {
    return { isValid: false, errorMessage: "Insira um número de CEP" };
  }
  const withoutMask = removeMask(cep);
  if (withoutMask) {
    if (withoutMask.length === 8) {
      return { isValid: true, errorMessage: "" };
    }
  }
  return { isValid: false, errorMessage };
};

function isDATE(
  dateString,
  minDate,
  maxDate,
  minDateErrorMessage,
  maxDateErrorMessage
) {
  let errorMessage = "Data inválida";
  if (!dateString) {
    return { isValid: false, errorMessage: "Insira uma data" };
  }

  let date = null;

  if (dateString instanceof Date) {
    date = moment(dateString).format("DD/MM/YYYY");
  } else {
    date = dateString;
  }
  const withoutMask = removeMask(date);

  if (withoutMask) {
    if (withoutMask.length === 8) {
      if (maxDate && moment(withoutMask, "DDMMYYYY").isAfter(moment(maxDate))) {
        errorMessage = maxDateErrorMessage
          ? maxDateErrorMessage
          : `A data nào pode ser superior a ${moment(maxDate).format("L")}`;
        return {
          isValid: false,
          errorMessage,
        };
      } else if (minDate && moment(withoutMask, "DDMMYYYY").isBefore(minDate)) {
        errorMessage = minDateErrorMessage
          ? minDateErrorMessage
          : `A data nào pode ser inferior a ${moment(minDate).format("L")}`;
        return {
          isValid: false,
          errorMessage,
        };
      } else {
        return { isValid: true, errorMessage: "" };
      }
    }
  }
  return { isValid: false, errorMessage };
}

function isHour(
  timeString,
  minTime,
  maxTime,
  minTimeErrorMessage,
  maxTimeErrorMessage
) {
  let errorMessage = "Hora inválida";
  if (!timeString) {
    return { isValid: false, errorMessage: "Insira uma hora" };
  }

  let date = null;
  if (timeString instanceof Date) {
    date = moment(timeString);
  } else {
    date = moment(timeString, "HH:mm");
  }

  if (!isNaN(date.toDate().getTime())) {
    if (
      maxTime &&
      Number(date.format("HHmm")) > Number(moment(maxTime).format("HHmm"))
    ) {
      errorMessage = minTimeErrorMessage
        ? minTimeErrorMessage
        : `O horário não pode ser superior a ${moment(maxTime)
            .add(-1, "minutes")
            .format("HH:mm")}`;
      return {
        isValid: false,
        errorMessage,
      };
    } else if (
      minTime &&
      Number(date.format("HHmm")) < Number(moment(minTime).format("HHmm"))
    ) {
      errorMessage = maxTimeErrorMessage
        ? maxTimeErrorMessage
        : `O horário nào pode ser inferior a ${moment(minTime)
            .add(1, "minutes")
            .format("HH:mm")}`;
      return {
        isValid: false,
        errorMessage,
      };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }
  return { isValid: false, errorMessage };
}

const isValidPassword = (password) => {
  const NUMERIC = "0123456789";
  const AB_CAPITAL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const AB_TINY = "abcdefghijklmnopqrstuvwxyz";
  let validNumeric = false;
  let validAbCapital = false;
  let validAbTiny = false;

  if (!password) {
    return { isValid: false, errorMessage: "Campo Obrigatório" };
  }

  for (let i = 0; i < NUMERIC.length; i++) {
    if (password.includes(NUMERIC.charAt(i))) {
      validNumeric = true;
    }
  }

  for (let i = 0; i < AB_CAPITAL.length; i++) {
    if (password.includes(AB_CAPITAL.charAt(i))) {
      validAbCapital = true;
    }
  }

  for (let i = 0; i < AB_TINY.length; i++) {
    if (password.includes(AB_TINY.charAt(i))) {
      validAbTiny = true;
    }
  }
  if (
    validNumeric === false ||
    validAbCapital === false ||
    validAbTiny === false
  ) {
    return { isValid: false, errorMessage: "Senha inválida" };
  }
  return { isValid: true, errorMessage: "" };
};

const isCPFCNPJValid = (cpfcnpj) => {
  const value = removeMask(cpfcnpj);
  if (!value) {
    return { isValid: false, errorMessage: "Insira um número de CPF ou CNPJ" };
  }
  if (value.length > 11) {
    return isCNPJ(value);
  } else {
    return isCPF(value);
  }
};

export default {
  isEMAIL,
  isValidForm,
  isCellphone,
  isCEP,
  isDATE,
  isHour,
  isCNPJ,
  isCPF,
  isValidPassword,
  removeMask,
  isCPFCNPJValid,
};
