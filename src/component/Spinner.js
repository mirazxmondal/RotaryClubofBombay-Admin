import React from "react";
import spin from "../assets/svg/Spinner.svg";

function Spinner() {
  return (
    <div className="bg-black bg-opacity-50 h-screen flex items-center justify-center z-20 ">
      <div>
        <img src={spin} alt="Loading ..." className="h-20" />
      </div>
    </div>
  );
}

export default Spinner;
