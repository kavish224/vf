export const Input = ({
    label,
    onChange,
    placeholder,
    type
}) => {
    return(
        <div className="w-full mb-4">
            <div className="block text-sm font-medium text-left py-2 mb-1">
                {label}
            </div>
            <input onChange={onChange} placeholder={placeholder} type={type} className="w-full px-4 py-2 bg-black text-white border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-grey-100 transition-colors duration-200" />
        </div>
    )
}