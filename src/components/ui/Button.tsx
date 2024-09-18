import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="cursor-pointer rounded-md bg-buttonColor px-6 py-1 capitalize text-white md:text-xl lg:text-2xl">
      {children}
    </button>
  );
};

export default Button;
