export const GlobalMask = (mask, value) => {
  if (!value) {
    return;
  }
  // const maxLength = mask.length;

  let newValue = "";

  const clearedValue = String(value).replace(/\D/g, "");
  const maskArray = mask.split(" ");

  const numberOfLoopings = maskArray.length;

  let charCounter = 0;

  for (let i = 0; i < numberOfLoopings; i++) {
    if (maskArray[i] === "_") {
      maskArray.splice(i, 1, clearedValue[charCounter]);
      charCounter++;
    }
    newValue += maskArray[i];
  }
  return newValue;
};
