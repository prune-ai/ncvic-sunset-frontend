import { Button } from "../components/ui/Button";

interface LandingPageProps {
  onStartCase: () => void;
  onLearnMore?: () => void;
}

export function LandingPage({ onStartCase, onLearnMore }: LandingPageProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -left-[596px] w-[2632px] h-[1755px]">
        <img
          src="/clouds.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* Header with logo */}
      <header className="absolute top-0 left-0 right-0 z-20 backdrop-blur-sm backdrop-filter flex items-center justify-between px-[150px] py-[10px]">
        <div className="h-[40px] w-[140px] flex items-center">
          {/* Logo placeholder - replace with actual logo image */}
          <div className="h-[35px] w-[70px] bg-white/20 rounded flex items-center justify-center">
            <span className="text-white text-xs font-semibold">NCMEC</span>
          </div>
        </div>
      </header>

      {/* Footer */}
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

      {/* Main content - positioned 1/5 from left, vertically centered */}
      <div className="absolute left-[20%] top-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col gap-[48px] items-start w-[882px]">
          {/* Title and description */}
          <div className="flex flex-col gap-[24px] items-start text-white w-full">
            <h1 className="text-[80px] font-semibold leading-[1.05] whitespace-pre-wrap landing-title-shadow w-[461px]">
              Welcome to Sunset.
            </h1>
            <p className="text-[20px] font-normal leading-[1.5] whitespace-pre-wrap w-[882px]">
              We help remove sexual images shared without consent. Our team
              provides free content-removal services, evidence preservation,
              legal referrals, and escalation to law enforcement. Start a case
              or sign in to view your status.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-[24px] items-center">
            <button
              onClick={onStartCase}
              className="bg-[#8be784] flex gap-[8px] items-center justify-center px-[32px] py-[16px] rounded-[12px] shadow-[6px_6px_0px_0px_#d09fba] hover:opacity-90 transition-opacity cursor-pointer"
            >
              <span className="text-[14px] font-semibold leading-[1.25] text-center text-gray-900 whitespace-nowrap">
                Start My Case
              </span>
            </button>
            <button
              onClick={onLearnMore}
              className="bg-[#b894ee] flex gap-[8px] items-center justify-center px-[32px] py-[16px] rounded-[12px] shadow-[6px_6px_0px_0px_#8be784] hover:opacity-90 transition-opacity cursor-pointer"
            >
              <span className="text-[14px] font-semibold leading-[1.25] text-center text-white whitespace-nowrap">
                Learn More
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
