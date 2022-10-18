import { POWER } from "./buttons";
import { search } from "../assets/functions";

export const reducer = (state, { type, payload }) => {
  const { trigo, inv_trigo, powerBaseGetter } = payload;
  switch (type) {
    case "number":
      return {
        ...state,
        operation: [...state.operation, payload.symbol],
        formula: [...state.formula, payload.formula],
      };
    case "operator":
      return {
        ...state,
        operation: [...state.operation, payload.symbol],
        formula: [...state.formula, payload.formula],
      };
    case "math_function":
      if (payload.symbol === "x^y") {
        payload.symbol = "^(";
        return {
          ...state,
          operation: [...state.operation, payload.symbol],
          formula: [...state.formula, payload.formula],
        };
      }
      return {
        ...state,
        operation: [
          ...state.operation,
          payload.symbol !== "!" ? payload.symbol + "(" : payload.symbol,
        ],
        formula: [...state.formula, payload.formula + "("],
      };
    case "trigo_function":
      return {
        ...state,
        operation: [...state.operation, payload.symbol + "("],
        formula: [...state.formula, payload.formula],
      };
    case "key":
      if (payload.symbol === "C")
        return { ...state, formula: [], operation: [], result: undefined };
      if (payload.symbol === "⌫") {
        let temp = state.operation.slice(0, -1);
        if (temp.length === 0) {
          return {
            ...state,
            formula: state.formula.slice(0, -1),
            operation: temp,
            result: undefined,
          };
        }
        return {
          ...state,
          formula: state.formula.slice(0, -1),
          operation: state.operation.slice(0, -1),
        };
      }
      if (payload.symbol === "Rad") {
        return { ...state, rad: true };
      }
      if (payload.symbol === "Deg") {
        return { ...state, rad: false };
      }
      break;

    case "calculate":
      let formulaStr = state.formula.join("");

      let POWER_SEARCH_RESULT = search(state.formula, POWER);

      const BASES = powerBaseGetter(state.formula, POWER_SEARCH_RESULT);

      BASES.forEach((base) => {
        let toreplace = base + POWER;
        let replacement = "Math.pow(" + base + ",";

        formulaStr = formulaStr.replace(toreplace, replacement);
      });

      let result;
      try {
        result = eval(formulaStr);
      } catch (error) {
        if (error instanceof SyntaxError) {
          result = "Syntax Error!";
        }
        return { ...state, result };
      }
      return {
        ...state,
        result,
      };
    default:
      return state;
  }
};
