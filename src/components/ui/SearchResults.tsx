// function SearchResults() {
//   return (
//     <div>
//       {/* Search Results */}
//       {searchResults && (
//         <div
//           ref={resultsRef}
//           className="absolute left-0 right-0 flex flex-col items-center gap-2.5 overflow-y-auto bg-[rgb(31,31,31)] text-white"
//           style={{
//             top: `${navbarHeight}px`,
//             maxHeight: `calc(100vh - ${navbarHeight}px)`, // Prevent overlapping viewport
//           }}
//         >
//           {searchResults.map((result) => (
//             <div key={result.id} className="w-full p-2.5">
//               <h3>{result.title || result.name}</h3>
//               {result.poster_path && (
//                 <img
//                   src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
//                   alt={result.title || result.name}
//                   className="max-w-24 rounded-md"
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchResults;
