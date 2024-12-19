import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const RoundedButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-[#999] bg-[#141414] text-white hover:border-white"
      onClick={onClick}
    >
      <div className="ml-[2px]">{children}</div>
    </button>
  );
};

export default RoundedButton;
