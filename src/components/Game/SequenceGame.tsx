import { useEffect, useRef, useState } from "react";
import { useFunctionArray } from "../../hooks/useFunctionArray";
import { kosicya, sonechko, vinochok } from "../../data/ornaments";
import { vitriachok } from "../../data/ornaments";
import OrnamentList from "../OrnamentList/OrnamentList";
import classes from "./Game.module.css";
import Button from "../Button/Button";

const SequenceGame = () => {
  const [answers, setAnswers] = useState<Set<string>>(new Set<string>());
  const { functionArray, pushFunction, clearFunctionArray, popFunction } =
    useFunctionArray();

  const level = useRef(1);
  const [message, setMessage] = useState("Рівень: " + level.current);
  const [header, setHeader] = useState("");
  const [active, setActive] = useState(true);
  const [hideStyle, setHideStyle] = useState({ display: "none" });
  const [nextMessage, setNextMessage] = useState("Наступний рівень");

  const [isCorrect, setIsCorrect] = useState(true);
  const [wrongAnswer, setWrongAnswer] = useState(0);

  useEffect(() => {
    if (!isCorrect) {
      setTimeout(() => {
        functionArray.forEach((f) => f());
        setIsCorrect(true);
      }, 700);
    }
  }, [isCorrect, functionArray]);

  const correctAnswers = [
    { name: "сонечко", answer: sonechko },
    { name: "вітрячок", answer: vitriachok },
    { name: "косиця", answer: kosicya },
    { name: "віночок", answer: vinochok },
  ];

  const correctAnswer = new Set(correctAnswers[level.current - 1].answer);
  let gameName = correctAnswers[level.current - 1].name;
  useEffect(() => {
    setHeader(`Вибери  ${gameName} `);
  }, []);

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
      if (answers.size === correctAnswers[level.current - 1].answer.length) {
        setMessage("Молодець, правильно!");
        setHeader(`Рівень ${level.current} пройдено`);

        setIsCorrect(true);

        if (level.current < correctAnswers.length) {
          setNextMessage("Йдемо далі");
          level.current += 1;
          setMessage("Рівень: " + level.current);
        } else {
          setNextMessage("Почати спочатку?");
          setHeader(`Молодець, ти виграв гру з рахунком ${100 - wrongAnswer}`);
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
        setTimeout(() => {
          setMessage("Рівень: " + level.current);
        }, 1000);
        setNextMessage("Спробуй ще раз");
        setIsCorrect(false);
        setWrongAnswer((prev) => prev + 1);

        setAnswers((prev) => {
          prev.clear();
          return prev;
        });
        // setActive(false);
        // setHideStyle({ display: "inline-block" });
        //setTimeout(handleClick, 2000);
      }
    }

    if (correctAnswer.has(currentAnswer)) return true;
    return false;
  };

  const handleNextMessage = () => {
    functionArray.forEach((f) => f());

    if (nextMessage == "Почати спочатку?") {
      level.current = 1;
      gameName = correctAnswers[0].name;
      setWrongAnswer(0);
      setMessage("Рівень: " + 1);
    }
    clearFunctionArray();
    setActive(true);
    setHideStyle({ display: "none" });
    setHeader(`Вибери  ${gameName} `);
  };

  return (
    <div className={classes.game}>
      <Button buttonClass={classes.info}>{header}</Button>
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
          handleClick={handleNextMessage}
        >
          {nextMessage}
        </Button>
      </div>
      <span>{wrongAnswer}</span>
    </div>
  );
};

export default SequenceGame;
