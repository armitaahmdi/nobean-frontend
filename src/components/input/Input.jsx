import { HiExclamationCircle } from "react-icons/hi";

export default function Input({
    label,
    placeholder,
    type = "text",
    name,
    value,
    onChange,
    onBlur,
    error,
    containerClassName = "",
    borderColor = "border border-black",
    icon,
    ...rest
}) {
    return (
        <div className={`flex flex-col gap-2 ${containerClassName}`}>
            {label && (
                <label htmlFor={name} className="text-[20px] font-bold leading-[1.2] text-black">
                    {label}
                </label>
            )}

            <div className="relative w-full">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    {...rest}
                    className={`w-full placeholder-[#575757 text-[20px] font leading-[1.2] py-[15px] pl-[45px] pr-[15px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${error ? 'border-red-500 border' : borderColor}`}
                />
            </div>

            {error && (
                <p className="font-medium text-[#EA4235] text-[15px] leading-[1.2] flex">
                    <HiExclamationCircle className="ml-1" />
                    {error}
                </p>
            )}
        </div>
    );
}
