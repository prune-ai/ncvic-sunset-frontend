interface FooterLinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function FooterLink({
  href = "#",
  children,
  className = "",
  onClick,
}: FooterLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-block px-2 py-1 -mx-2 -my-1 cursor-pointer ${className}`}
    >
      <span className="inline-block group-hover:opacity-0">{children}</span>
      <span
        className="absolute left-[3px] top-0 px-2 py-1 -mx-2 -my-1 opacity-0 group-hover:opacity-100 italic inline-block text-sm lg:text-lg"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        {children}
      </span>
    </a>
  );
}

