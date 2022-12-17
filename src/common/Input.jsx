const Input = ({name,type="text",formik,logo}) => {
    return ( 
        <>
        <div className="flex flex-col gap-2 justify-center items-center w-full relative">
            <label className="flex w-full" htmlFor={`${name}`}>{`${name}`}</label>
            <input className="form-input px-10 py-3 w-full rounded-md" type={type} id={`${name}`}  name={`${name}`} {...formik.getFieldProps({name})} />
            {logo}
        </div>
        
        <div>{formik.errors[name] && formik.touched[name] && <p className="text-red-600">{formik.errors[name]}</p>}</div>
        </>
     );
}
 
export default Input;