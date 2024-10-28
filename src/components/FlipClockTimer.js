// src/components/FlipClockTimer.js
import React from "react";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";

const FlipClockTimer = ({ durationInSeconds, onComplete }) => {
  return (
    <div className="flipClock">
      <FlipClockCountdown
        to={new Date().getTime() + durationInSeconds * 1000} // Convert seconds to milliseconds
        className="flipClock__item"
        digitBlockStyle={{
          background: "#2e2e2e",
          color: "#f8fafc",
          borderRadius: "8px",
        }}
        onComplete={onComplete}
      />
    </div>
  );
};

export default FlipClockTimer;
