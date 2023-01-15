const Textarea = ({ name, type = "text", formik, logo }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full relative">
      <label
        className="flex w-full text-primary_light_green"
        htmlFor={`${name}`}
      >{`${name}`}</label>
      <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2">
        <span>{logo}</span>
        <textarea
          className="form-input w-full rounded-md outline-none flex-1 bg-transparent text-primary_cream"
          type={type}
          id={`${name}`}
          name={`${name}`}
          {...formik.getFieldProps({ name })}
        ></textarea>
      </div>
    </div>
  );
};

export default Textarea;
