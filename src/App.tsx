import SequenceGame from "./components/Game/SequenceGame";
import Button from "./components/Button/Button";
import { sonechko, ornaments } from "./data/ornaments";
import { CSSProperties, useState } from "react";
import classes from "./components/Button/Button.module.css";
import { useFunctionArray } from "./hooks/useFunctionArray";

// interface MyAction {
//   action: string;
//   f: () => void;
// }

//function reducer(state: (() => void)[], data: MyAction) {}

function App() {
  const [answers, setAnswers] = useState<Set<string>>(new Set<string>());
  const [ornamentList, setOrnamentList] = useState(Object.entries(ornaments));
  const { functionArray, pushFunction, clearFunctionArray, popFunction } =
    useFunctionArray();
  //const { functions, dispatcher } = useReducer();
  const [message, setMessage] = useState("Вибери сонечко");
  const [level, setLevel] = useState(1);
  //const rerender = useRerender();

  //const rerender = useRerender();
  const ostyle: CSSProperties = {
    position: "relative",
    bottom: "0",
    transition: "bottom 0.4s ease-out",
  };

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
    }

    if (answers.size === 2 && correctAnswer.difference(answers).size > 0) {
      //console.log("You lose!");
      setMessage("Ти програв!");
      // clearFunctions();
      setAnswers((prev) => {
        prev.clear();
        return prev;
      });
    }

    if (correctAnswer.has(ans)) return true;
    return false;
  };
  return (
    <SequenceGame value={level}>
      {ornamentList.map(([key, ornament]) => (
        <Button
          pushFunction={pushFunction as (arg: () => void) => void}
          btnClass={classes.button}
          style={ostyle}
          handleClick={() => handleAnswer(key)}
          key={key}
          imagePath={ornament}
        />
      ))}

      <div>
        <button
          onClick={() => {
            //rerender();
            functionArray.forEach((f) => f());
            setMessage("Вибери сонечко");
            clearFunctionArray();
            setLevel((prev) => prev + 1);
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
