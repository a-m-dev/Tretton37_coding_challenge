import React from "react";

import "./Loading.scss";

const Loading = () => {
  return (
    <section className="loading-container">
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="desc">
        Computing the result in a non-blocking way in other thread
        <strong> with help of web worker.</strong> <br />
        <br /> You can see that the UI is not freezing like in the first
        solution, and you still can interact with UI.
      </p>
    </section>
  );
};

export default Loading;
