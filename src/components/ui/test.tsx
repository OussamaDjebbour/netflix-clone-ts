const HoverImageReveal = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="group relative">
        {/* Image */}
        <img
          src="https://via.placeholder.com/300"
          alt="Sample Image"
          className="h-72 w-72 rounded-lg object-cover"
        />

        {/* Content to reveal on hover */}
        <div className="absolute inset-0 flex items-center justify-end space-x-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
          <div className="rounded-lg bg-white p-4 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">Image Title</h2>
            <p className="text-gray-600">
              Some additional content displayed on hover.
            </p>
            <button className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white">
              Action Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverImageReveal;
