import "./Checkbox.scss";

const Checkbox = ({ id, label, isChecked, onChange }) => {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        onChange={() => onChange(id)}
        checked={isChecked}
      />
      <span className="checkbox__checkmark" />
      <span className="checkbox__label">{label}</span>
    </label>
  );
};

export default Checkbox;
