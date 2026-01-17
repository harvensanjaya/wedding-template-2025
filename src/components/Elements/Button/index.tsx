import type { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  classname?: string;
  logout?: boolean;
}

const Button: FC<ButtonProps> = ({
  className = "bg-black text-white",
  children = "...",
  onClick = () => {},
  type = "button",
  logout = false,
  ...rest
}) => {
  return (
    <button
      className={`font-inter font-extralight transition-all transition-discrete text-xs sm:text-sm md:text-base rounded-md h-10 px-3  hover:bg-slate-700 hover:text-white cursor-pointer ${
        logout ? "hover:bg-red-600" : "hover:bg-slate-700"
      } ${className}`}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
