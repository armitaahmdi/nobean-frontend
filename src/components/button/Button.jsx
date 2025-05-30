const SIZES = {
  small: 'w-[110px] h-[48px] rounded-[10px] py-[12px] text-[16px] leading-[1.2] tracking-[-0.02em] text-center align-middle font-bold',
  medium: 'w-[130px] h-[48px] rounded-[10px] py-[12px] text-[18px] leading-[1.2] tracking-[-0.02em] text-center align-middle font-bold',
  large: 'w-[250px] h-[48px] rounded-[10px] py-[12px] text-[18px] gap-[10px] leading-[1.2] tracking-[-0.02em] text-center align-middle font-bold',
};

const COLORS = {
  blue: 'bg-lightBlue text-white hover:bg-darkBlue',
  yellow: 'bg-lightYellow hover:bg-darkYellow text-white',
  whiteBlue: 'bg-white border-2 border-secondaryBlue text-black hover:bg-secondaryBlue',
  whiteYellow: 'bg-white border-2 border-lightYellow text-black hover:bg-lightYellow',
  white: "bg-white text-black border-2 border-black"
};

export default function Button({
  size = 'medium',
  color = 'blue',
  children,
  onClick,
  disabled = false,
  ...rest
}) {

  return (
    <button
      className={`${SIZES[size]} ${COLORS[color]} transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-[10px]`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
