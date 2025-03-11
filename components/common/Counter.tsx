import React, { useEffect, useState } from "react";

export default function Counter({
  initialValue,
  targetValue,
}: {
  initialValue: number;
  targetValue: number;
}) {
  const [count, setCount] = useState(initialValue);
  const duration = 1500;

  useEffect(() => {
    let startValue = initialValue;
    const interval = Math.floor(duration / (targetValue - initialValue));

    const counter = setInterval(() => {
      startValue += 1;
      setCount(startValue);
      if (startValue >= targetValue) {
        clearInterval(counter);
      }
    }, interval);

    return () => {
      clearInterval(counter);
    };
  }, [targetValue, initialValue]);

  return <>{count}</>;
}
