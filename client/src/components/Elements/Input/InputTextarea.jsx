const InputTextarea = ({ fields, onChange }) => {
  const { index, label, value } = fields;
  return (
    <div className="form-floating">
      <label htmlFor={index} className="form-label">
        {label}
      </label>
      <textarea
        className="form-control"
        id={index}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default InputTextarea;
