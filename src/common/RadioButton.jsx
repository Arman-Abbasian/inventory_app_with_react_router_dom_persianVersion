const RadioButton = ({options,formik,name}) => {
    return ( 
        <div className="flex justify-center gap-6 w-full">
            {options.map(item=>{
                return <div className="flex gap-2 justify-between items-center" key={item.id}>
                            <input className="form-radio w-5 h-5 text-primary_cream" type="radio" id={item.value} name={name} value={item.value} checked={formik.values[name]===item.value} onChange={formik.handleChange} />
                            <label htmlFor={item.value}>{item.label}</label>
                        </div>
            })}
        {formik.errors[name] && formik.touched[name] && <p className="text-red-600">{formik.errors[name]}</p>}
        </div>
     );
}
 
export default RadioButton;