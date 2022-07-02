import randomWords from "random-words";
export const textOnlyRx = /^[^a-z]*([a-z])[^a-z]*$/i;

export const createWordString = (length = 5, count = 1) => {
  const tempWord = randomWords({ exactly: count, maxLength: length });
  if (tempWord?.[0].length !== length) {
    return createWordString(length, count);
  }
  return tempWord?.[0];
};

export const createWord = (length = 5, count = 1) =>
  new Promise((res) => {
    // Fake Api call
    return setTimeout(() => res(createWordString(length, count)), 1000);
  });

export const allIndexOfChar = (word, char) => {
  const indexes = [];

  for (let index = 0; index < word.length; index++) {
    if (word[index] === char) {
      indexes.push(index);
    }
  }
  return indexes;
};
