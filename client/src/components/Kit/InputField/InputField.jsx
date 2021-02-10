import { useField } from "formik";
import "./InputField.scss";

const InputField = ({ type, name, placeholder, ...rest }) => {
  const [field, meta] = useField(name);

  return (
    <fieldset className="input-field">
      <input
        {...field}
        type={type}
        name={name}
        autoComplete="off"
        placeholder={placeholder}
        className="input-field__input"
        {...rest}
      />
      {meta.touched && meta.error ? (
        <div
          className="input-field__error"
          data-testid={`${rest["data-testid"]}_error`}
        >
          <span>{meta.error}</span>
        </div>
      ) : null}
    </fieldset>
  );
};

InputField.defaultProps = {
  type: "text",
  placeholder: "",
};

export default InputField;
