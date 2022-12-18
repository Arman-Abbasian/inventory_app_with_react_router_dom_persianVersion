const SearchSelect = ({options,name,type="text",formik}) => {
    return ( 
        <>
        <div className="flex flex-col gap-2 justify-center items-center w-full relative">
            <label className="flex w-full" htmlFor={`${name}`}>{`${name}`}</label>
            <input list={name} type={type} />
            <datalist id={name}>
            {options.map(item=>{
                    return <option key={item.id} value={item.name}>{item.name}</option>
                })}
            </datalist>  
        </div>       
        <div>{formik.errors[name] && formik.touched[name] && <p className="text-red-600">{formik.errors[name]}</p>}</div>
        </>
     );
}
 
export default SearchSelect;