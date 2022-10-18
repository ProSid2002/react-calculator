import { useReducer, useState, useEffect } from "react";
import Button from "./Button";
import { buttons, normalCalcButtons } from "../assets/buttons";
import { reducer } from "../assets/reducer";
import { powerBaseGetter } from "../assets/functions";
import History from "./History";

const Calculator = () => {
  const [{ operation, formula, result, rad }, dispatch] = useReducer(reducer, {
    operation: [],
    formula: [],
    result: "",
    rad: true,
  });
  const [data, setData] = useState([]);
  const [scientific, setScientific] = useState(true);

  useEffect(() => {
    if (operation === "" || result === undefined || result === "") {
      return;
    }
    setData(() => [{ operation: operation.join(""), result }, ...data]);
  }, [result]);

  function trigo(callback, angle) {
    if (!rad) {
      angle = (angle * Math.PI) / 180;
    }
    return callback(angle);
  }
  function inv_trigo(callback, value) {
    let angle = callback(value);
    if (!rad) {
      angle = (angle * 180) / Math.PI;
    }
    return angle;
  }
  function handleClick() {
    setScientific(!scientific);
    setData([]);
    dispatch({
      type: "key",
      payload: {
        symbol: "C",
        formula: false,
        inv_trigo,
        trigo,
        powerBaseGetter,
      },
    });
  }

  return (
    <>
      <div className="top-btn">
        <button onClick={handleClick}>
          {scientific
            ? "Switch to Basic Calculator"
            : "Switch to Scientific Calculator"}
        </button>
      </div>

      <div className="container">
        {scientific ? (
          <div className="calculator">
            <div className="display">
              <div className="operation">{operation.join("") || 0}</div>
              <div className="result">{result}</div>
            </div>
            <div className="buttons-grid">
              {buttons.map((item, index) => {
                let bgColor, color;
                if (item.symbol === "Rad" && rad) {
                  bgColor = "#70c1b3";
                  color = "#101116";
                }
                if (item.symbol === "Deg" && !rad) {
                  bgColor = "#70c1b3";
                  color = "#101116";
                }
                if (
                  item.symbol === "C" ||
                  item.symbol === "=" ||
                  item.symbol === "⌫"
                ) {
                  bgColor = "#f25f5c";
                }
                if (
                  item.symbol === "×" ||
                  item.symbol === "–" ||
                  item.symbol === "+" ||
                  item.symbol === "÷"
                ) {
                  bgColor = "#ffe066";
                  color = "#101116";
                }
                return (
                  <Button
                    key={index}
                    bgColor={bgColor}
                    color={color}
                    content={item.symbol}
                    onClick={() =>
                      dispatch({
                        type: item.type,
                        payload: {
                          symbol: item.symbol,
                          formula: item.formula,
                          inv_trigo,
                          trigo,
                          powerBaseGetter,
                        },
                      })
                    }
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="normal-container">
            <div className="normal-calculator">
              <div className="display">
                <div className="operation">{operation.join("") || 0}</div>
                <div className="result">{result}</div>
              </div>
              <div className="normal-buttons-grid">
                {normalCalcButtons.map((item, index) => {
                  let bgColor, color;
                  if (item.symbol === "Rad" && rad) {
                    bgColor = "#70c1b3";
                    color = "#101116";
                  }
                  if (item.symbol === "Deg" && !rad) {
                    bgColor = "#70c1b3";
                    color = "#101116";
                  }
                  if (
                    item.symbol === "C" ||
                    item.symbol === "=" ||
                    item.symbol === "⌫"
                  ) {
                    bgColor = "#f25f5c";
                  }
                  if (
                    item.symbol === "×" ||
                    item.symbol === "–" ||
                    item.symbol === "+" ||
                    item.symbol === "÷"
                  ) {
                    bgColor = "#ffe066";
                    color = "#101116";
                  }
                  return (
                    <Button
                      key={index}
                      bgColor={bgColor}
                      color={color}
                      content={item.symbol}
                      onClick={() =>
                        dispatch({
                          type: item.type,
                          payload: {
                            symbol: item.symbol,
                            formula: item.formula,
                            inv_trigo,
                            trigo,
                            powerBaseGetter,
                          },
                        })
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <History data={data} />
      </div>
    </>
  );
};

export default Calculator;
