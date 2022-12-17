const SearchSelect = ({name,type="text",formik,logo}) => {
    return ( 
        <>
        <div className="flex flex-col gap-2 justify-center items-center w-full relative">
            <label className="flex w-full" htmlFor={`${name}`}>{`${name}`}</label>
            <datalist id={name}>
                <option value="Internet Explorer"></option>
                <option value="Firefox"></option>
                <option value="Chrome"></option>
                <option value="Opera"></option>
                <option value="Safari"></option>
            </datalist>  
            {logo}
        </div>       
        <div>{formik.errors[name] && formik.touched[name] && <p className="text-red-600">{formik.errors[name]}</p>}</div>
        </>
     );
}
 
export default SearchSelect;