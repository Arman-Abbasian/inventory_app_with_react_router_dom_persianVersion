const Input = ({name,type="text",formik,logo}) => {
    return ( 
        <>
        <div className="flex flex-col gap-2 justify-center items-center w-full relative">
            <label className="flex w-full" htmlFor={`${name}`}>{`${name}`}</label>
            <div className="border rounded-sm focus:border-2 flex items-center w-full p-2 gap-2">
                <span>{logo}</span>
                <input className="form-input w-full rounded-md outline-none flex-1 bg-transparent" type={type} id={`${name}`}  name={`${name}`} {...formik.getFieldProps({name})} />
            </div>
        </div>
        
        <div>{formik.errors[name] && formik.touched[name] && <p className="text-primaty_red">{formik.errors[name]}</p>}</div>
        </>
     );
}
 
export default Input;