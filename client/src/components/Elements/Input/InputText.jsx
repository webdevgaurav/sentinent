const InputText = ({ fields, onChange }) => {
  const { index, type, label, name, value, placeholder } = fields;
  return (
    <>
      <label htmlFor={index} className="form-label">
        {label}
      </label>
      <input
        type={type ?? "text"}
        className="form-control"
        id={index}
        placeholder={placeholder ?? ""}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default InputText;
