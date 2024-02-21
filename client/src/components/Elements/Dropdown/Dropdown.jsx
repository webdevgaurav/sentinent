const Dropdown = ({ id, options, title, value, placeholder }) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {title}
      </label>
      <select
        id={id}
        className="form-select"
        aria-label="Default select example"
      >
        <option selected id={id}>Open this select menu</option>
        {options && options.map((item, index) => (
          <option id={id} key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
