import { TMDBBASEURL } from '../constants';
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchTMDBResults(query: string, page: number) {
  const response = await fetch(
    `${TMDBBASEURL}/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=${page}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
// const fetchPage = async (page: number) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=${page}`,
//   );
//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }
//   return response.json();
// };
