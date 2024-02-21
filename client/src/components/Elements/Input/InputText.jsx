const InputText = ({ index, type, label, name, value, placeholder, onChange }) => {
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
