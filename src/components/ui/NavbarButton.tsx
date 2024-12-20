import { ReactNode } from 'react';

interface NavbarButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ children, onClick }) => {
  return (
    <li>
      <button
        className="text-white hover:cursor-pointer hover:text-indigo-100"
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
};

export default NavbarButton;
