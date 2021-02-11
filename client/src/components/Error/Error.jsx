import ERROR from "../../images/fail.png";
import "./Error.scss";

const Error = () => {
  return (
    <article className="error">
      <img src={ERROR} alt="failed" />
      <h3>Failed to get data!</h3>
      <p>
        You can try again after making sure that all docker services is up by{" "}
        <code>docker ps</code> command.
      </p>
    </article>
  );
};

export default Error;
