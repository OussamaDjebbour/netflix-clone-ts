import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

const Footer: FC = () => {
  return (
    <footer className="w-full px-5 pb-6 text-sm text-gray-400 min-[600px]:px-20 min-[900px]:px-40 xl:px-64">
      <div className="mb-4 flex gap-3 text-white">
        <FontAwesomeIcon
          icon={faFacebook}
          size="xl"
          className="cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faInstagram}
          size="xl"
          className="cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faTwitter}
          size="xl"
          className="cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faYoutube}
          size="xl"
          className="cursor-pointer"
        />
      </div>
      <div className="mb-6 grid grid-cols-2 gap-2 min-[900px]:grid-cols-3">
        <a href="#" className="cursor-pointer hover:underline">
          Audio Description
        </a>
        <a className="cursor-pointer hover:underline">Help Center</a>
        <a className="cursor-pointer hover:underline">Gift Cards</a>
        <a className="cursor-pointer hover:underline">Media Center</a>
        <a className="cursor-pointer hover:underline">Investor Relations</a>
        <a className="cursor-pointer hover:underline">Jobs</a>
        <a className="cursor-pointer hover:underline">Terms of Use</a>
        <a className="cursor-pointer hover:underline">Privacy</a>
        <a className="cursor-pointer hover:underline">Legal Notices</a>
        <a className="cursor-pointer hover:underline">Cookie Preferences</a>
        <a className="cursor-pointer hover:underline">Corporate Information</a>
        <a className="cursor-pointer hover:underline">Contact Us</a>
      </div>

      <button className="mb-3 cursor-pointer rounded-md border border-gray-400 bg-transparent px-1 capitalize md:text-base">
        service code
      </button>
      <p className="text-xs text-gray-500">
        <span className="mr-1 text-gray-400">&copy;</span>{' '}
        {new Date().getFullYear()} Netflix, Inc. Made by Djebbour Oussama{' '}
      </p>
    </footer>
  );
};

export default Footer;
