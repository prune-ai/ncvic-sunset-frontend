import { useState } from "react";
import { FormContainer } from "../components/layout/FormContainer";
import { FormNavigation } from "../components/layout/FormNavigation";
import { ButtonGroup } from "../components/ui/ButtonGroup";
import { CheckboxOption } from "../components/ui/CheckboxOption";
import { RadioOption } from "../components/ui/RadioOption";
import { SelectDropdown } from "../components/ui/SelectDropdown";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { SectionHeader } from "../components/ui/SectionHeader";
import { useSetHandler } from "../hooks/useSetHandler";
import { US_STATES, COUNTRIES } from "../lib/constants";

interface ContactInfoPageProps {
  onBack: () => void;
  onNext: (pageData: Record<string, unknown>) => void;
  isLoading?: boolean;
  error?: string;
  initialData?: Record<string, unknown>;
}

export function ContactInfoPage({
  onBack,
  onNext,
  isLoading = false,
  error,
  initialData,
}: ContactInfoPageProps) {
  const savedUserLocation = (initialData?.user_location as {
    country?: string;
    state?: string;
    zipCode?: string;
  }) || {};
  const savedPerpetratorLocation = (initialData?.perpetrator_location as {
    country?: string;
    state?: string;
    zipCode?: string;
  }) || {};
  const savedContactInfo = (initialData?.contact_info as {
    email?: string;
    phone?: string;
  }) || {};

  const [userLocation, setUserLocation] = useState({
    country: savedUserLocation.country || "United States",
    state: savedUserLocation.state || "",
    zipCode: savedUserLocation.zipCode || "",
  });
  const [knowsPerpetratorLocation, setKnowsPerpetratorLocation] = useState<
    string | null
  >((initialData?.knows_perpetrator_location as string) || null);
  const [perpetratorLocation, setPerpetratorLocation] = useState({
    country: savedPerpetratorLocation.country || "United States",
    state: savedPerpetratorLocation.state || "",
    zipCode: savedPerpetratorLocation.zipCode || "",
  });

  const isUSCountry = (country: string) => country === "United States";
  const [contactInfo, setContactInfo] = useState({
    email: savedContactInfo.email || "",
    phone: savedContactInfo.phone || "",
  });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Email validation: check for @ and .
  const validateEmail = (email: string): boolean => {
    if (!email.trim()) return true; // Empty is valid (optional field)
    return email.includes("@") && email.includes(".");
  };

  // Phone validation: minimum 10 digits
  const validatePhone = (phone: string): boolean => {
    if (!phone.trim()) return true; // Empty is valid (optional field)
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length >= 10;
  };

  // Normalize phone: extract digits only, keep as string
  const normalizePhone = (phone: string): string => {
    return phone.replace(/\D/g, "");
  };
  const [notificationPreferences, setNotificationPreferences] = useState<
    Set<string>
  >(new Set((initialData?.notification_preferences as string[]) || []));
  const [identityPreference, setIdentityPreference] = useState<
    "anonymous" | "provideName" | null
  >((initialData?.identity_preference as "anonymous" | "provideName") || null);
  const [name, setName] = useState(
    (initialData?.name as string) || "",
  );
  const handleNotificationChange = useSetHandler(
    notificationPreferences,
    setNotificationPreferences,
  );

  return (
    <FormContainer title="Start your case" currentStep={4} totalSteps={5}>
      <div className="flex flex-col gap-4 lg:gap-[20px] w-full">
        {/* Where are you located? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <SectionHeader
            title="Where are you located?"
            description="This helps us understand which laws apply and which law enforcement agencies can assist."
          />
          <div className="flex flex-col lg:flex-row gap-2 w-full">
            <SelectDropdown
              options={COUNTRIES}
              value={userLocation.country}
              onChange={(country) =>
                setUserLocation({ ...userLocation, country, state: "", zipCode: "" })
              }
              placeholder="Countries and Regions"
              defaultValue="United States"
            />
            {isUSCountry(userLocation.country) && (
              <>
                <SelectDropdown
                  options={US_STATES}
                  value={userLocation.state}
                  onChange={(state) => setUserLocation({ ...userLocation, state })}
                  placeholder="State"
                />
                <input
                  type="text"
                  placeholder="Zip code"
                  value={userLocation.zipCode}
                  onChange={(e) =>
                    setUserLocation({ ...userLocation, zipCode: e.target.value })
                  }
                  className="flex-1 bg-gray-900/20 px-3 py-3 rounded-lg text-xs font-medium text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b894ee]"
                />
              </>
            )}
          </div>
        </div>

        {/* Do you know where the person posting the content is located? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <SectionHeader
            title="Do you know where the person posting the content is located?"
            description="This information could help us determine which law enforcement agencies can assist."
          />
          <ButtonGroup
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "notSure", label: "Not Sure" },
            ]}
            value={knowsPerpetratorLocation}
            onChange={setKnowsPerpetratorLocation}
          />

          {/* Conditional location fields */}
          {knowsPerpetratorLocation === "yes" && (
            <div className="flex flex-col lg:flex-row gap-2 w-full">
              <SelectDropdown
                options={COUNTRIES}
                value={perpetratorLocation.country}
                onChange={(country) =>
                  setPerpetratorLocation({
                    ...perpetratorLocation,
                    country,
                    state: "",
                    zipCode: "",
                  })
                }
                placeholder="Countries and Regions"
                defaultValue="United States"
              />
              {isUSCountry(perpetratorLocation.country) && (
                <>
                  <SelectDropdown
                    options={US_STATES}
                    value={perpetratorLocation.state}
                    onChange={(state) =>
                      setPerpetratorLocation({
                        ...perpetratorLocation,
                        state,
                      })
                    }
                    placeholder="State"
                  />
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
                </>
              )}
            </div>
          )}
        </div>

        {/* Contact information */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <SectionHeader
            title="Please provide at least one safe way for us to reach you about your case"
            description="You can choose email or phone — whichever feels safest for you."
          />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-1">
              <input
                type="email"
                placeholder="Email"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, email: e.target.value })
                }
                className="bg-gray-900/20 px-3 py-3 rounded-lg text-xs font-medium text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b894ee]"
              />
              {hasAttemptedSubmit && emailError && (
                <p className="text-red-400 text-xs font-normal px-2 py-1 rounded bg-black/50">
                  {emailError}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="tel"
                placeholder="Phone"
                value={contactInfo.phone}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, phone: e.target.value })
                }
                className="bg-gray-900/20 px-3 py-3 rounded-lg text-xs font-medium text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#b894ee]"
              />
              {hasAttemptedSubmit && phoneError && (
                <p className="text-red-400 text-xs font-normal px-2 py-1 rounded bg-black/50">
                  {phoneError}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Notification preferences */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <SectionHeader
            title="Notification preferences"
            description="You can change these preferences in your portal at any time."
          />
          <div className="flex flex-col gap-0 w-full">
            <CheckboxOption
              label="Email updates"
              checked={notificationPreferences.has("email")}
              onChange={handleNotificationChange("email")}
            />
            <CheckboxOption
              label="Text/SMS updates"
              checked={notificationPreferences.has("sms")}
              onChange={handleNotificationChange("sms")}
            />
          </div>
        </div>

        {/* Who are you? */}
        <div className="flex flex-col gap-3 lg:gap-[16px] w-full">
          <SectionHeader title="Who are you?" />
            <div className="flex flex-col gap-2 w-full">
              <RadioOption
                label="I prefer to remain anonymous for now."
                value="anonymous"
                selected={identityPreference === "anonymous"}
                onChange={(value) =>
                  setIdentityPreference(value as "anonymous" | "provideName")
                }
                name="identityPreference"
              />
              <RadioOption
                label="I am comfortable providing my name."
                value="provideName"
                selected={identityPreference === "provideName"}
                onChange={(value) =>
                  setIdentityPreference(value as "anonymous" | "provideName")
                }
                name="identityPreference"
                showInput={true}
                inputValue={name}
                onInputChange={setName}
                inputPlaceholder="Type here"
              />
            </div>
        </div>
      </div>

      <ErrorMessage message={error} />

      <FormNavigation
        onBack={onBack}
        onNext={() => {
          // Validate on submit attempt
          setHasAttemptedSubmit(true);
          
          const emailValid = validateEmail(contactInfo.email);
          const phoneValid = validatePhone(contactInfo.phone);
          
          // Set errors if validation fails
          if (contactInfo.email.trim() && !emailValid) {
            setEmailError("Please enter a valid email address");
          } else {
            setEmailError(null);
          }
          
          if (contactInfo.phone.trim() && !phoneValid) {
            setPhoneError("Phone number must be at least 10 digits");
          } else {
            setPhoneError(null);
          }
          
          // Don't proceed if validation fails
          if (
            (contactInfo.email.trim() && !emailValid) ||
            (contactInfo.phone.trim() && !phoneValid)
          ) {
            return;
          }
          
          // Normalize phone number before sending
          const normalizedContactInfo = {
            ...contactInfo,
            phone: contactInfo.phone ? normalizePhone(contactInfo.phone) : "",
          };
          onNext({
            user_location: userLocation,
            knows_perpetrator_location: knowsPerpetratorLocation,
            perpetrator_location:
              knowsPerpetratorLocation === "yes" ? perpetratorLocation : null,
            contact_info: normalizedContactInfo,
            notification_preferences: Array.from(notificationPreferences),
            identity_preference: identityPreference,
            name: identityPreference === "provideName" ? name : null,
          });
        }}
        isLoading={isLoading}
      />
    </FormContainer>
  );
}
