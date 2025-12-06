import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  backgroundImage?: string;
}

export function PageLayout({ children, backgroundImage }: PageLayoutProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0 -left-[596px] w-[2632px] h-[1755px]">
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        </div>
      )}
      <div className="relative z-10 flex items-center justify-center h-screen p-4 pb-[100px]">
        <div className="w-full max-w-[500px] py-8">{children}</div>
      </div>
      <footer className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center pt-[10px] pb-[30px]">
        <div className="flex gap-[50px] items-center text-white text-[14px] font-medium leading-[1.25] whitespace-nowrap">
          <a
            href="#"
            className="hover:text-[#8be784] transition-colors cursor-pointer"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-[#8be784] transition-colors cursor-pointer"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-[#8be784] transition-colors cursor-pointer"
          >
            Main Site
          </a>
        </div>
      </footer>
    </div>
  );
}
