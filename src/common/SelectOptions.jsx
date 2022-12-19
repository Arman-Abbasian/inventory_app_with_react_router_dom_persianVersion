const SelectOptions = ({options,name,formik,logo}) => {
    return ( 
        <div className="flex flex-col gap-2 justify-center items-center w-full">
            <label className="flex w-full" htmlFor={`${name}`}>{`${name}`}</label>
            <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2">
                <span>{logo}</span>
                <select className="w-full rounded-md bg-transparent outline-none" name={name} id={name} {...formik.getFieldProps({name})}>
                    <option value="">select a {name}</option>
                    {options.map(item=>{
                        console.log(options)
                        return <option key={item.id} value={item.id}>{item[name]}</option>
                    })}
                </select>
            </div>
            {formik.errors[name] && formik.touched[name] && <p className="text-primaty_red">{formik.errors[name]}</p>}
        </div>
     );
}
 
export default SelectOptions;