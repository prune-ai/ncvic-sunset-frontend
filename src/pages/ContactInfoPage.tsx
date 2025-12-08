import { useState, useEffect, useRef } from "react";
import { FormContainer } from "../components/layout/FormContainer";
import { Button } from "../components/ui/Button";

interface ContactInfoPageProps {
  onBack: () => void;
  onNext: (pageData: Record<string, unknown>) => void;
  isLoading?: boolean;
  error?: string;
}

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6667 3.5L5.25 9.91667L2.33333 7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DropdownArrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "Other US Territory",
];

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export function ContactInfoPage({
  onBack,
  onNext,
  isLoading = false,
  error,
}: ContactInfoPageProps) {
  const [userLocation, setUserLocation] = useState({
    country: "",
    state: "",
    zipCode: "",
  });
  const [knowsPerpetratorLocation, setKnowsPerpetratorLocation] = useState<
    string | null
  >(null);
  const [perpetratorLocation, setPerpetratorLocation] = useState({
    country: "",
    state: "",
    zipCode: "",
  });
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
  });
  const [notificationPreferences, setNotificationPreferences] = useState<
    Set<string>
  >(new Set());
  const [identityPreference, setIdentityPreference] = useState<
    "anonymous" | "provideName" | null
  >(null);
  const [name, setName] = useState("");
  const [showUserStateDropdown, setShowUserStateDropdown] = useState(false);
  const [showPerpetratorStateDropdown, setShowPerpetratorStateDropdown] =
    useState(false);
  const [showUserCountryDropdown, setShowUserCountryDropdown] = useState(false);
  const [showPerpetratorCountryDropdown, setShowPerpetratorCountryDropdown] =
    useState(false);
  const userStateDropdownRef = useRef<HTMLDivElement>(null);
  const perpetratorStateDropdownRef = useRef<HTMLDivElement>(null);
  const userCountryDropdownRef = useRef<HTMLDivElement>(null);
  const perpetratorCountryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userStateDropdownRef.current &&
        !userStateDropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserStateDropdown(false);
      }
      if (
        perpetratorStateDropdownRef.current &&
        !perpetratorStateDropdownRef.current.contains(event.target as Node)
      ) {
        setShowPerpetratorStateDropdown(false);
      }
      if (
        userCountryDropdownRef.current &&
        !userCountryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserCountryDropdown(false);
      }
      if (
        perpetratorCountryDropdownRef.current &&
        !perpetratorCountryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowPerpetratorCountryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotificationChange = (value: string) => {
    const newSet = new Set(notificationPreferences);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setNotificationPreferences(newSet);
  };

  return (
    <FormContainer title="Start your case" currentStep={4} totalSteps={5}>
      <div className="flex flex-col gap-4 lg:gap-[20px] w-full">
        {/* Where are you located? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-white text-base lg:text-lg font-semibold leading-[1.25]">
              Where are you located?
            </h2>
            <p className="text-white/80 text-xs font-medium leading-[1.25]">
              This helps us understand which laws apply and which law
              enforcement agencies can assist.
            </p>
          </div>
          <div className="flex gap-2 w-full">
            <div className="flex-1 relative" ref={userCountryDropdownRef}>
              <button
                type="button"
                onClick={() =>
                  setShowUserCountryDropdown(!showUserCountryDropdown)
                }
                className="w-full bg-gray-900/20 flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-900/30 transition-colors"
              >
                <span className="text-xs font-medium text-white">
                  {userLocation.country || "Countries and Regions"}
                </span>
                <DropdownArrow />
              </button>
              {showUserCountryDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-gray-900/95 border border-white/20 rounded-lg max-h-[200px] overflow-y-auto custom-scrollbar">
                  {COUNTRIES.map((country) => (
                    <button
                      key={country}
                      type="button"
                      onClick={() => {
                        setUserLocation({ ...userLocation, country });
                        setShowUserCountryDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 relative" ref={userStateDropdownRef}>
              <button
                type="button"
                onClick={() => setShowUserStateDropdown(!showUserStateDropdown)}
                className="w-full bg-gray-900/20 flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-900/30 transition-colors"
              >
                <span className="text-xs font-medium text-white">
                  {userLocation.state || "State"}
                </span>
                <DropdownArrow />
              </button>
              {showUserStateDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-gray-900/95 border border-white/20 rounded-lg max-h-[200px] overflow-y-auto custom-scrollbar">
                  {US_STATES.map((state) => (
                    <button
                      key={state}
                      type="button"
                      onClick={() => {
                        setUserLocation({ ...userLocation, state });
                        setShowUserStateDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
                    >
                      {state}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="Zip code"
              value={userLocation.zipCode}
              onChange={(e) =>
                setUserLocation({ ...userLocation, zipCode: e.target.value })
              }
              className="flex-1 bg-gray-900/20 px-3 py-3 rounded-lg text-xs font-medium text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b894ee]"
            />
          </div>
        </div>

        {/* Do you know where the person posting the content is located? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-white text-lg font-semibold leading-[1.25] whitespace-pre-wrap">
              Do you know where the person posting the content is located?
            </h2>
            <p className="text-white/80 text-xs font-medium leading-[1.25] whitespace-pre-wrap">
              This information could help us determine which law enforcement
              agencies can assist.
            </p>
          </div>
          <div className="flex gap-2 w-full">
            <button
              type="button"
              onClick={() => setKnowsPerpetratorLocation("yes")}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg text-xs font-medium leading-[1.25] text-white transition-colors ${
                knowsPerpetratorLocation === "yes"
                  ? "bg-[#8be784]"
                  : "bg-gray-900/20 hover:bg-gray-900/30"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setKnowsPerpetratorLocation("no")}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg text-xs font-medium leading-[1.25] text-white transition-colors ${
                knowsPerpetratorLocation === "no"
                  ? "bg-[#8be784]"
                  : "bg-gray-900/20 hover:bg-gray-900/30"
              }`}
            >
              No
            </button>
            <button
              type="button"
              onClick={() => setKnowsPerpetratorLocation("notSure")}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg text-xs font-medium leading-[1.25] text-white transition-colors ${
                knowsPerpetratorLocation === "notSure"
                  ? "bg-[#8be784]"
                  : "bg-gray-900/20 hover:bg-gray-900/30"
              }`}
            >
              Not Sure
            </button>
          </div>

          {/* Conditional location fields */}
          {knowsPerpetratorLocation === "yes" && (
            <div className="flex gap-2 w-full">
              <div
                className="flex-1 relative"
                ref={perpetratorCountryDropdownRef}
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowPerpetratorCountryDropdown(
                      !showPerpetratorCountryDropdown,
                    )
                  }
                  className="w-full bg-gray-900/20 flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-900/30 transition-colors"
                >
                  <span className="text-xs font-medium text-white">
                    {perpetratorLocation.country || "Countries and Regions"}
                  </span>
                  <DropdownArrow />
                </button>
                {showPerpetratorCountryDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-900/95 border border-white/20 rounded-lg max-h-[200px] overflow-y-auto custom-scrollbar">
                    {COUNTRIES.map((country) => (
                      <button
                        key={country}
                        type="button"
                        onClick={() => {
                          setPerpetratorLocation({
                            ...perpetratorLocation,
                            country,
                          });
                          setShowPerpetratorCountryDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div
                className="flex-1 relative"
                ref={perpetratorStateDropdownRef}
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowPerpetratorStateDropdown(
                      !showPerpetratorStateDropdown,
                    )
                  }
                  className="w-full bg-gray-900/20 flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-900/30 transition-colors"
                >
                  <span className="text-xs font-medium text-white">
                    {perpetratorLocation.state || "State"}
                  </span>
                  <DropdownArrow />
                </button>
                {showPerpetratorStateDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-900/95 border border-white/20 rounded-lg max-h-[200px] overflow-y-auto custom-scrollbar">
                    {US_STATES.map((state) => (
                      <button
                        key={state}
                        type="button"
                        onClick={() => {
                          setPerpetratorLocation({
                            ...perpetratorLocation,
                            state,
                          });
                          setShowPerpetratorStateDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="text"
                placeholder="Zip code"
                value={perpetratorLocation.zipCode}
                onChange={(e) =>
                  setPerpetratorLocation({
                    ...perpetratorLocation,
                    zipCode: e.target.value,
                  })
                }
                className="flex-1 bg-gray-900/20 px-3 py-3 rounded-lg text-xs font-medium text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b894ee]"
              />
            </div>
          )}
        </div>

        {/* Contact information */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-white text-lg font-semibold leading-[1.25] whitespace-pre-wrap">
              Please provide at least one safe way for us to reach you about
              your case
            </h2>
            <p className="text-white/80 text-xs font-medium leading-[1.25] whitespace-pre-wrap">
              You can choose email or phone — whichever feels safest for you.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <input
              type="email"
              placeholder="Email"
              value={contactInfo.email}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, email: e.target.value })
              }
              className="bg-gray-900/20 px-3 py-3 rounded-lg text-xs font-medium text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b894ee]"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={contactInfo.phone}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, phone: e.target.value })
              }
              className="bg-gray-900/20 px-3 py-3 rounded-lg text-xs font-medium text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b894ee]"
            />
          </div>
        </div>

        {/* Notification preferences */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-white text-lg font-semibold leading-[1.25] whitespace-pre-wrap">
              Notification preferences
            </h2>
            <p className="text-white/80 text-xs font-medium leading-[1.25] whitespace-pre-wrap">
              You can change these preferences in your portal at any time.
            </p>
          </div>
          <div className="flex flex-col gap-3.5 w-full">
            <div
              onClick={() => handleNotificationChange("email")}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-900/20 p-2 -m-2 rounded-lg transition-colors"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNotificationChange("email");
                }}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none pointer-events-none ${
                  notificationPreferences.has("email")
                    ? "bg-[#b894ee]"
                    : "bg-white/10"
                }`}
                aria-checked={notificationPreferences.has("email")}
                role="checkbox"
              >
                {notificationPreferences.has("email") && <CheckIcon />}
              </button>
              <span className="text-sm font-medium leading-[1.25] text-white">
                Email updates
              </span>
            </div>
            <div
              onClick={() => handleNotificationChange("sms")}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-900/20 p-2 -m-2 rounded-lg transition-colors"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNotificationChange("sms");
                }}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none pointer-events-none ${
                  notificationPreferences.has("sms")
                    ? "bg-[#b894ee]"
                    : "bg-white/10"
                }`}
                aria-checked={notificationPreferences.has("sms")}
                role="checkbox"
              >
                {notificationPreferences.has("sms") && <CheckIcon />}
              </button>
              <span className="text-sm font-medium leading-[1.25] text-white">
                Text/SMS updates
              </span>
            </div>
          </div>
        </div>

        {/* Who are you? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <h2 className="text-white text-lg font-semibold leading-[1.25] whitespace-pre-wrap">
            Who are you?
          </h2>
          <div className="flex flex-col gap-3.5 w-full">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIdentityPreference("anonymous")}
                className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none ${
                  identityPreference === "anonymous"
                    ? "bg-[#b894ee]"
                    : "bg-white/10 hover:bg-white/20"
                }`}
                aria-checked={identityPreference === "anonymous"}
                role="radio"
              >
                {identityPreference === "anonymous" && <CheckIcon />}
              </button>
              <span className="text-sm font-medium leading-[1.25] text-white">
                I prefer to remain anonymous for now.
              </span>
            </div>
            <div className="flex flex-col gap-2.5 w-full">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIdentityPreference("provideName")}
                  className={`flex items-center justify-center rounded-md shrink-0 w-5 h-5 transition-colors focus:outline-none ${
                    identityPreference === "provideName"
                      ? "bg-[#b894ee]"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  aria-checked={identityPreference === "provideName"}
                  role="radio"
                >
                  {identityPreference === "provideName" && <CheckIcon />}
                </button>
                <span className="text-sm font-medium leading-[1.25] text-white">
                  I am comfortable providing my name.
                </span>
              </div>
              {identityPreference === "provideName" && (
                <input
                  type="text"
                  placeholder="Type here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-900/20 px-3 py-3 rounded-lg text-xs font-medium text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b894ee]"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && <div className="text-red-400 text-sm mt-4">{error}</div>}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between gap-2 w-full mt-4">
        <Button
          onClick={onBack}
          className="flex-1 lg:flex-none"
          disabled={isLoading}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            onNext({
              user_location: userLocation,
              knows_perpetrator_location: knowsPerpetratorLocation,
              perpetrator_location:
                knowsPerpetratorLocation === "yes" ? perpetratorLocation : null,
              contact_info: contactInfo,
              notification_preferences: Array.from(notificationPreferences),
              identity_preference: identityPreference,
              name: identityPreference === "provideName" ? name : null,
            });
          }}
          className="flex-1 lg:flex-none"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Next"}
        </Button>
      </div>
    </FormContainer>
  );
}
