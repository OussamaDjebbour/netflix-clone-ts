interface OverlayProps {
  setIsSearchbarOpen: (isSearchbarOpen: boolean) => void;
}

const Overlay: React.FC<OverlayProps> = ({ setIsSearchbarOpen }) => {
  return (
    // isOverlayVisible &&
    <div onClick={() => setIsSearchbarOpen(false)}>
      {
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          {/* <div className="text-white">Overlay is visible!</div> */}
        </div>
      }
    </div>
  );
};

export default Overlay;
