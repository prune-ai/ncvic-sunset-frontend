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

      {/* Header with hamburger menu */}
      <header className="absolute top-0 left-0 right-0 z-20 backdrop-blur-sm backdrop-filter flex items-center justify-end px-4 lg:px-[150px] py-[10px]">
        {/* Hamburger menu icon - mobile only */}
        <button
          className="lg:hidden w-6 h-6 flex items-center justify-center"
          aria-label="Menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center pt-[10px] pb-[30px]">
        <div className="flex gap-4 lg:gap-[50px] items-center text-white text-[14px] font-medium leading-[1.25] whitespace-nowrap">
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

      {/* Main content - centered on mobile, left-aligned on desktop */}
      <div className="absolute left-1/2 lg:left-[20%] top-1/2 -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 z-10 w-full max-w-[390px] lg:max-w-none px-4 lg:px-0">
        <div className="flex flex-col gap-12 lg:gap-[48px] items-center lg:items-start w-full lg:w-[882px]">
          {/* Title and description */}
          <div className="flex flex-col gap-6 lg:gap-[24px] items-center lg:items-start text-white w-full">
            <h1 className="text-[60px] lg:text-[80px] font-semibold leading-[1.05] whitespace-pre-wrap landing-title-shadow w-full lg:w-[461px] text-center lg:text-left">
              Welcome to Sunset.
            </h1>
            <p className="text-[16px] lg:text-[20px] font-normal leading-[1.5] whitespace-pre-wrap w-full lg:w-[882px] text-center lg:text-left">
              We help remove sexual images shared without consent. Our team
              provides free content-removal services, evidence preservation,
              legal referrals, and escalation to law enforcement. Start a case
              or sign in to view your status.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-6 lg:gap-[24px] items-center w-full">
            <Button
              onClick={onStartCase}
              variant="primary"
              className="flex-1 lg:flex-none shadow-[6px_6px_0px_0px_#d09fba]"
            >
              Start My Case
            </Button>
            <Button
              onClick={onLearnMore}
              className="flex-1 lg:flex-none bg-[#b894ee] shadow-[6px_6px_0px_0px_#8be784]"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
