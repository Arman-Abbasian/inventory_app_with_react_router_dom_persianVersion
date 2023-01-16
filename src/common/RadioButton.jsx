const RadioButton = ({ options, formik, name, label }) => {
  return (
    <div className="w-full">
      <label
        className="flex w-full text-primary_light_green mb-2"
        htmlFor={name}
      >
        {label}
      </label>

      <div className="flex justify-center gap-6 w-full border p-3 rounded-sm">
        {options.map((item) => {
          return (
            <div
              className={`flex flex-1 gap-2  items-center border-red-400 ${item.borderColor}`}
              key={item.id}
            >
              <input
                className="form-radio w-5 h-5 text-primary_cream bg-primary_cream"
                type="radio"
                id={item.value}
                name={name}
                value={item.value}
                checked={formik.values[name] === item.value}
                onChange={formik.handleChange}
              />
              <label className={`${item.textColor}`} htmlFor={item.value}>
                {item.label}
              </label>
            </div>
          );
        })}
        {formik.errors[name] && formik.touched[name] && (
          <p className="text-primary_cream">{formik.errors[name]}</p>
        )}
      </div>
    </div>
  );
};

export default RadioButton;
