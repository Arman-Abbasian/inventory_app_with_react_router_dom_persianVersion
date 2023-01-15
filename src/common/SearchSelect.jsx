const SearchSelect = ({options,name,type="text",formik,logo,label}) => {
    return ( 
        <>
            <div className="flex flex-col gap-2 justify-center items-center w-full relative">
                <label className="flex w-full text-primary_light_green" htmlFor={`${name}`}>{label}</label>
                <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2" >
                    <span>{logo}</span>
                    <input list={name} name={name}  className="w-full bg-transparent outline-none text-primary_cream" value={formik.values[name]} onChange={formik.handleChange} />
                </div>
                <datalist id={name} name={`${name}`} {...formik.getFieldProps({name})}  className="bg-primary_cream">
                {options.map(item=>{
                        return <option key={item.id} value={item[name]} className="bg-primary_cream text-primary_dark_green">{item[name]}</option>
                    })}
                </datalist>  
            </div>       
            <div>{formik.errors[name] && formik.touched[name] && <p className="text-primary_cream">{formik.errors[name]}</p>}</div>
        </>
     );
}
export default SearchSelect;