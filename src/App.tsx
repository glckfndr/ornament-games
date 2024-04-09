import SequenceGame from "./components/Game/SequenceGame";
import Button from "./components/Button/Button";
import { sonechko, ornaments } from "./data/ornaments";
import { useState } from "react";
import classes from "./components/Button/Button.module.css";
import { useFunctionArray } from "./hooks/useFunctionArray";

const infoStyle = { width: "100%", height: "2rem", borderRadius: "7px" };

function App() {
  const [answers, setAnswers] = useState<Set<string>>(new Set<string>());
  const { functionArray, pushFunction, clearFunctionArray, popFunction } =
    useFunctionArray();
  const [message, setMessage] = useState("Вибери сонечко");
  const [level, setLevel] = useState(1);
  const [active, setActive] = useState(true);
  const ornamentList = Object.entries(ornaments);
  const correctAnswer = new Set(sonechko);

  const handleAnswer = (ans: string) => {
    if (answers.has(ans)) {
      setAnswers((prev) => {
        console.log(prev, ans, functionArray.length);
        const copy = new Set([...prev]);
        copy.delete(ans);
        return copy;
      });
      popFunction();
    } else setAnswers(answers.add(ans));
    if (answers.size === 2 && correctAnswer.difference(answers).size === 0) {
      setMessage("Ти виграв!");
      setAnswers((prev) => {
        prev.clear();
        return prev;
      });
      setActive(false);
    }

    if (answers.size === 2 && correctAnswer.difference(answers).size > 0) {
      setMessage("Ти програв!");
      setAnswers((prev) => {
        prev.clear();
        return prev;
      });
      setActive(false);
    }

    if (correctAnswer.has(ans)) return true;
    return false;
  };
  console.log("App render!");
  return (
    <SequenceGame>
      <button style={infoStyle}>{"Вибери орнамент. Рівень: " + level}</button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          maxWidth: "30rem",
          flexWrap: "wrap",
        }}
      >
        {ornamentList.map(([key, ornament]) => (
          <Button
            disabled={!active}
            pushFunction={pushFunction as (arg: () => void) => void}
            btnClass={classes.button}
            handleClick={() => handleAnswer(key)}
            key={key}
            imagePath={ornament}
          />
        ))}
      </div>
      <div>
        <button
          style={infoStyle}
          onClick={() => {
            functionArray.forEach((f) => f());
            setMessage("Вибери сонечко");
            clearFunctionArray();
            setLevel((prev) => prev + 1);
            setActive(true);
            console.log(functionArray);
          }}
        >
          {message}
        </button>
      </div>
    </SequenceGame>
  );
}

export default App;
