import "./InputField.scss";

const InputField = ({ type, onChange }) => {
  return (
    <article className="input-field">
      <input type={type} onChange={onChange} className="input-field__input" />
    </article>
  );
};

InputField.defaultProps = {
  type: "text",
  onChange: (evt) => console.log(">>> INPUT CHANGES", evt.target.value),
};

export default InputField;
