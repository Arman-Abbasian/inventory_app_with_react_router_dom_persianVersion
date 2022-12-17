const CheckboxToggle = ({name,formik,label}) => {
    return ( 
        <div>
            <label for={name} className="inline-flex relative items-center mr-5 cursor-pointer">
            <input type="checkbox" value={formik.values[name]} id={name} className="sr-only peer" checked={formik.values[name]} onChange={formik.handleChange} />
            <div className="w-11 h-6 bg-gray-400 rounded-full peer dark:bg-gray-700  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
            </label>
        </div>
     );
}
 
export default CheckboxToggle;