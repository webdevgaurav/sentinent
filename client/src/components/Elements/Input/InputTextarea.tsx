const InputTextarea = ({ fields, onChange }) => {
  const { index, label, value } = fields;
  return (
    <>
      <label htmlFor={index}>
        {label}
      </label>
      <textarea
        className="form-control"
        id={index}
        value={value}
        onChange={onChange}
      ></textarea>
    </>
  );
};

export default InputTextarea;
