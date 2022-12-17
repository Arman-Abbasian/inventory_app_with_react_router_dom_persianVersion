const CheckBox = ({options,name,formik}) => {
    return ( 
        <div className="flex justify-center items-center gap-6 w-full">
            {options.map(item=>{
                return <div key={item.id} className="flex justify-center items-center gap-2">
                        <input className="form-checkbox rounded-sm" type="checkbox" id={item.value} name={name} value={item.value} checked={formik.values[name].includes(item.value)} onChange={formik.handleChange} />
                        <label htmlFor={item.value}>{item.label}</label>
                    </div>
        })}
        {formik.errors[name] && formik.touched[name] && <p className="text-red-600">{formik.errors[name]}</p>}
        </div>
     );
}
 
export default CheckBox;