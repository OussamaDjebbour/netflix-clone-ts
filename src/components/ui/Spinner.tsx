import React from 'react';

const Spinner: React.FC = () => {
  return (
    // <div className="z-[1000000000] flex h-[500px] w-[900px] items-center justify-center bg-red-700">
    <div className="flex h-[500px] w-full basis-full items-center justify-center">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-transparent border-b-blue-500 border-t-blue-500"></div>
        <div className="absolute left-0 top-0 h-16 w-16 rounded-full border-4 border-blue-300 opacity-50"></div>
      </div>
    </div>

    // <div className="flex items-center justify-center">
    //   <div className="h-16 w-16 animate-spin rounded-full border-4 border-dotted border-blue-500"></div>
    // </div>

    // <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transform">
    //   <div className="h-16 w-16 animate-spin rounded-full border-8 border-solid border-[#4f46e5] border-t-transparent"></div>
    // </div>

    // <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transform">
    // <div className="animate-spin rounded-full bg-gradient-to-tr from-green-500 via-purple-500 to-blue-500">
    //   <div className="rounded-full bg-white">
    //     <div className="h-16 w-16 rounded-full"></div>
    //   </div>
    // </div>
    //  </div>

    // <div className="h-20 w-20 animate-spin rounded-full border-8 border-gray-300 border-t-[#4f46e5]" />
    // <div
    //   className="z-50 mx-auto my-20 w-28 animate-spinner rounded-full bg-red-700"
    //   style={{
    //     aspectRatio: '1',
    //     background:
    //       'radial-gradient(farthest-side, #4f46e5 94%, #0000) top/10px 10px no-repeat, conic-gradient(#0000 30%, #4f46e5)',
    //     WebkitMask:
    //       'radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)',
    //     //     background: radial-gradient(farthest-side, #4f46e5 94%, #0000) top/10px 10px no-repeat,
    //     // conic-gradient(#0000 30%, #4f46e5),
    //   }}
    // ></div>

    // <div className="bg-gradient-[radial-gradient(farthest-side,#4f46e5_94%,#0000)_top/10px_10px_no-repeat,conic-gradient(#0000_30%,#4f46e5)] mx-auto my-20 aspect-[1] w-28 animate-[rotate(1turn)_1.5s_infinite_linear] rounded-[50%]">
    //   Loading...
    // </div>
  );
};

export default Spinner;

// const Spinner: React.FC = () => {
//   return (
//     <div className="absolute inset-0 h-full w-full">
//       <div className="relative flex items-center justify-center bg-yellow-500">
//         <div className="absolute left-1/2 top-1/2 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-b-blue-500 border-t-blue-500"></div>
//         {/* <div className="absolute left-1/2 top-1/2 h-16 w-16 rounded-full border-4 border-blue-300 opacity-50"></div> */}
//       </div>
//     </div>

//     // <div className="absolute inset-0 flex items-center justify-center bg-yellow-500">
//     //   <div className="relative">
//     //     <div className="h-16 w-16 animate-spin rounded-full border-4 border-transparent border-b-blue-500 border-t-blue-500"></div>
//     //     <div className="absolute left-0 top-0 h-16 w-16 rounded-full border-4 border-blue-300 opacity-50"></div>
//     //   </div>
//     // </div>
//   );
// };

// export default Spinner;
