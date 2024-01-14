import React from "react";
import css from "./loading.css";

const Loading = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <div className="spinner-div">
        <div className="loader">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
