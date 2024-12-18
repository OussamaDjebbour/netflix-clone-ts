interface OverlayProps {
  setIsSearchbarOpen: (isSearchbarOpen: boolean) => void;
  setSearchTerm: (searchTerm: string) => void;
}

const Overlay: React.FC<OverlayProps> = ({
  setIsSearchbarOpen,
  setSearchTerm,
}) => {
  const handleClick = () => {
    setSearchTerm('');
    setIsSearchbarOpen(false);
  };
  return (
    <div onClick={handleClick}>
      {
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"></div>
      }
    </div>
  );
};

export default Overlay;
