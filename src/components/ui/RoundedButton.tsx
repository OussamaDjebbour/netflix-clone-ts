import { FC, JSXElementConstructor, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  // icon: ReactNode;
}

const RoundedButton: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-[#999] bg-[#141414] text-white hover:border-white">
      {/* <img className="w-4" src={icon} alt="icon" /> */}

      <div className="ml-[2px]">{children}</div>

      {/* {children} */}
    </button>
  );
};

export default RoundedButton;
