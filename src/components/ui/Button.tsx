import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="z-10 m-0 cursor-pointer rounded-md bg-buttonColor px-6 py-1 capitalize text-white md:text-xl lg:py-1.5 lg:text-2xl"
    >
      {children}
    </button>
  );
};

export default Button;
