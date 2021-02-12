import ERROR from "../../images/fail.png";
import "./Error.scss";

const Error = ({ heading, message }) => {
  return (
    <article className="error">
      <img src={ERROR} alt="failed" />
      <h3>{heading || "Failed to get data!"}</h3>
      <p>
        {message ||
          "You can try again after making sure that all docker services is up by <code>docker ps</code> command."}
      </p>
    </article>
  );
};

export default Error;
