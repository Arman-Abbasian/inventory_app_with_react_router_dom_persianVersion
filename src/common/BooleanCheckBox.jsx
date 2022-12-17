const BooleanCheckBox = ({name,formik,label}) => {
    return (
            <div className="flex justify-center items-center w-full gap-2">
                    <input type="checkbox" className="rounded-sm" id={name} name={name} value={true} checked={formik.values[name]===true} onChange={formik.handleChange} />
                    <label htmlFor={name}>{label}</label>
                {formik.errors[name] && formik.touched[name] && <p className="text-red-600">{formik.errors[name]}</p>}
            </div>
     );
}
 
export default BooleanCheckBox;