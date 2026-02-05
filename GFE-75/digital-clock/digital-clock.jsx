import { useState, useEffect, memo } from "react";

const format = (value) => String(value).padStart(2, "0");

const Separator = memo(() => {
  return (
    <div className="separator">
      <div className="separator-dot" />
      <div className="separator-dot" />
    </div>
  );
});

const Digit = memo(function Digit({ value }) {
  return <span className="digit">{format(value)}</span>;
});

export default function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <time className="clock">
      <Digit value={date.getHours()} />
      <Separator />
      <Digit value={date.getMinutes()} />
      <Separator />
      <Digit value={date.getSeconds()} />
    </time>
  );
}
