import type { ReactNode } from "react";
import { FooterLink } from "../ui/FooterLink";
import { VideoBackground } from "../ui/VideoBackground";

interface PageLayoutProps {
  children: ReactNode;
  backgroundImage?: string;
  backgroundVideo?: string;
  onStartOver?: () => void;
}

export function PageLayout({
  children,
  backgroundImage,
  backgroundVideo,
  onStartOver,
}: PageLayoutProps) {
  return (
    <div className="relative w-full min-h-screen">
      {(backgroundVideo || backgroundImage) && (
        <div className="fixed inset-0 -left-[596px] w-[2632px] h-[1755px]">
          {backgroundVideo ? (
            <VideoBackground
              videoSrc={backgroundVideo}
              posterSrc={backgroundImage}
            />
          ) : backgroundImage ? (
            <img
              src={backgroundImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          ) : null}
        </div>
      )}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pb-20 lg:pb-[100px]">
        <div className="w-full max-w-[500px] py-4 lg:py-8">{children}</div>
      </div>
      <footer className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center pt-[10px] pb-[30px]">
        <div className="flex gap-4 lg:gap-[50px] items-center text-white text-xs lg:text-[14px] font-medium leading-[1.25] whitespace-nowrap px-4">
          <FooterLink>Privacy Policy</FooterLink>
          <FooterLink>Terms</FooterLink>
          <FooterLink>Main Site</FooterLink>
          {onStartOver && (
            <FooterLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onStartOver();
              }}
            >
              Start Over
            </FooterLink>
          )}
        </div>
      </footer>
    </div>
  );
}
