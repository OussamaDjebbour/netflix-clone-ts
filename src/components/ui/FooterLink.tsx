interface FooterLinkProps {
  children: React.ReactNode;
}

function FooterLink({ children }: FooterLinkProps) {
  return <a className="cursor-pointer hover:underline">{children}</a>;
}

export default FooterLink;
