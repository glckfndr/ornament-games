import { useState } from "react";
import { useFunctionArray } from "../../hooks/useFunctionArray";
import { sonechko } from "../../data/ornaments";
import OrnamentList from "../OrnamentList/OrnamentList";
import classes from "./Game.module.css";
import Button from "../Button/Button";

const SequenceGame = () => {
  const [answers, setAnswers] = useState<Set<string>>(new Set<string>());
  const { functionArray, pushFunction, clearFunctionArray, popFunction } =
    useFunctionArray();

  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState("Рівень: " + level);
  const [active, setActive] = useState(true);
  const [hideStyle, setHideStyle] = useState({ display: "none" });
  const [nextMessage, setNextMessage] = useState("Наступний рівень");

  const correctAnswers = [{ name: "Сонечко", answer: sonechko }];
  const correctAnswer = new Set(correctAnswers[level - 1].answer);
  const gameName = correctAnswers[level - 1].name;

  const handleAnswer = (currentAnswer: string) => {
    if (answers.has(currentAnswer)) {
      setAnswers((prev) => {
        const copy = new Set([...prev]);
        copy.delete(currentAnswer);
        return copy;
      });
      popFunction();
    } else setAnswers(answers.add(currentAnswer));

    if ([...answers].every((answer) => correctAnswer.has(answer))) {
      if (answers.size === sonechko.length) {
        setMessage("Молодець, правильно!");
        setNextMessage("Йдемо далі");

        if (level < correctAnswers.length) {
          setLevel((prevLevel) => prevLevel + 1);
        }
        setHideStyle({ display: "inline-block" });

        setAnswers((prev) => {
          prev.clear();
          return prev;
        });
        setActive(false);
      }
    } else {
      if (![...answers].every((answer) => correctAnswer.has(answer))) {
        setMessage("Неправильно!");
        setNextMessage("Спробуй ще раз");
        setAnswers((prev) => {
          prev.clear();
          return prev;
        });
        setActive(false);
        setHideStyle({ display: "inline-block" });
      }
    }

    if (correctAnswer.has(currentAnswer)) return true;
    return false;
  };

  const handleClick = () => {
    functionArray.forEach((f) => f());
    setMessage("Рівень: " + level);
    clearFunctionArray();
    setActive(true);
    setHideStyle({ display: "none" });
  };

  return (
    <div className={classes.game}>
      <Button buttonClass={classes.info}>{`Вибери  ${gameName} `}</Button>
      <OrnamentList
        active={active}
        handleAnswer={handleAnswer}
        pushFunction={pushFunction}
      />
      <div style={{ display: "flex" }}>
        <Button buttonClass={classes.info}>{message}</Button>
        <Button
          buttonClass={classes.info}
          style={hideStyle}
          handleClick={handleClick}
        >
          {nextMessage}
        </Button>
      </div>
    </div>
  );
};

export default SequenceGame;
