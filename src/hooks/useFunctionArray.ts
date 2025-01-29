import { useState } from "react";
type Setter = () => void;
export function useFunctionArray() {
  const [functionArray, setFunctionArray] = useState<Setter[]>([]);
  const clearFunctionArray = () => setFunctionArray([]);

  const pushFunction = (f: () => void): void => {
    setFunctionArray((prev) => [...prev, f]);
  };

  const popFunction = (): void => {
    setFunctionArray((prev) => {
      const copy = [...prev];
      copy.pop();
      if (copy.length == 0) return copy;
      copy.pop();

      return copy;
    });
  };

  return { functionArray, pushFunction, clearFunctionArray, popFunction };
}
