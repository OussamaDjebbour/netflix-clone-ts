import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { footerLinks, socialMediaLinks } from '../../constants';
import FooterLink from '../ui/FooterLink';

const Footer = () => {
  return (
    <footer className="w-full px-5 pb-6 text-sm text-gray-400 min-[600px]:px-20 min-[900px]:px-40 xl:px-64">
      <div className="mb-4 flex gap-3 text-white">
        {socialMediaLinks.map((link) => (
          <FontAwesomeIcon
            key={link.label}
            icon={link.icon}
            size="xl"
            className="cursor-pointer"
          />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-2 gap-2 min-[900px]:grid-cols-3">
        {footerLinks.map((link) => (
          <FooterLink key={link}>{link}</FooterLink>
        ))}
      </div>

      <button className="mb-3 cursor-pointer rounded-md border border-gray-400 bg-transparent px-1 capitalize md:text-base">
        service code
      </button>
      <p className="text-xs text-gray-500">
        <span className="mr-1 text-gray-400">&copy;</span>{' '}
        {new Date().getFullYear()} Netflix Clone, Inc. Made by Djebbour Oussama{' '}
      </p>
    </footer>
  );
};

export default Footer;
