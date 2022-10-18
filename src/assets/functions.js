import { POWER } from "./buttons";

export const search = (array, keyword) => {
  let res = [];
  array.forEach((element, index) => {
    if (keyword == element) res.push(index);
  });
  return res;
};

export const powerBaseGetter = (formula, POWER_SEARCH_RESULT) => {
  let powers_bases = [];
  POWER_SEARCH_RESULT.forEach((power_index) => {
    let base = [];
    let parantheses_count = 0;

    let previous_index = power_index - 1;
    while (previous_index >= 0) {
      if (formula[previous_index] === "(") parantheses_count--;
      if (formula[previous_index] === ")") parantheses_count++;

      let is_operator = false;
      const OPERATORS = ["+", "-", "*", "/"];
      OPERATORS.forEach((OPERATOR) => {
        if (formula[previous_index] === OPERATOR) is_operator = true;
      });
      let is_power = formula[previous_index] === POWER;
      if ((is_operator && parantheses_count === 0) || is_power) break;
      base.unshift(formula[previous_index]);
      previous_index--;
    }
    powers_bases.push(base.join(""));
  });
  return powers_bases;
};
