export const Input = ({
    label,
    onChange,
    value,
    placeholder,
    type = "text"
}) => {
    return(
        <div className="w-full">
            <div className="block text-sm font-medium text-left">
                {label}
            </div>
            <input onChange={onChange} placeholder={placeholder} value={value} type={type} className="w-full px-4 py-2 bg-black text-white border border-x rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent placeholder-darkGray transition-colors duration-200" />
        </div>
    )
}