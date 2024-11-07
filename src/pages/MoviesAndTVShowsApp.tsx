// Layout.js

import { Outlet } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';

const MoviesAndTVShowsApp = () => (
  <>
    <Navbar setIsShow={setIsShow} setImageLoaded={setImageLoaded} />
    <Outlet /> {/* This will render the matched route component */}
  </>
);

export default MoviesAndTVShowsApp;
