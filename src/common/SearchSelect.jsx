const SearchSelect = ({options,name,type="text",formik,logo}) => {
    return ( 
        <>
            <div className="flex flex-col gap-2 justify-center items-center w-full relative">
                <label className="flex w-full" htmlFor={`${name}`}>{`${name}`}</label>
                <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2" >
                    <span>{logo}</span>
                    <input list={name} name={name}  className="w-full bg-transparent outline-none" value={formik.values[name]} onChange={formik.handleChange} />
                </div>
                <datalist id={name} name={`${name}`} {...formik.getFieldProps({name})} >
                {options.map(item=>{
                        return <option key={item.id} value={item.name}>{item[name]}</option>
                    })}
                </datalist>  
            </div>       
            <div>{formik.errors[name] && formik.touched[name] && <p className="text-primaty_red">{formik.errors[name]}</p>}</div>
        </>
     );
}
export default SearchSelect;