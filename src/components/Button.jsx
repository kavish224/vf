export const Button = ({
    onClick,
    label
}) => {
    return (
        <div>
            <button onClick={onClick} type="button" className=" w-full text-white bg-x focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                {label}
            </button>
        </div>
    )
}