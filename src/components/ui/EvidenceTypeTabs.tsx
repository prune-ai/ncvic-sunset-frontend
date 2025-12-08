interface EvidenceTypeTabsProps {
  activeTab: "images" | "urls" | "text";
  onTabChange: (tab: "images" | "urls" | "text") => void;
}

export function EvidenceTypeTabs({
  activeTab,
  onTabChange,
}: EvidenceTypeTabsProps) {
  const handleInteraction = (
    e: React.MouseEvent | React.KeyboardEvent,
    tab: "images" | "urls" | "text",
  ) => {
    if (e.type === "mousedown") {
      e.preventDefault();
    }
    if (e.type === "keydown") {
      const keyEvent = e as React.KeyboardEvent;
      if (keyEvent.key !== "Enter" && keyEvent.key !== " ") {
        return;
      }
      e.preventDefault();
    }
    onTabChange(tab);
  };

  const tabs = [
    { value: "images" as const, label: "Upload images" },
    { value: "urls" as const, label: "Upload URLs" },
    { value: "text" as const, label: "Upload text" },
  ];

  return (
    <div className="flex gap-2 w-full">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onMouseDown={(e) => handleInteraction(e, tab.value)}
          onKeyDown={(e) => handleInteraction(e, tab.value)}
          className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold leading-[1.25] text-white whitespace-nowrap min-h-[44px] transition-colors focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
            activeTab === tab.value
              ? "bg-[#b894ee] border border-[#b894ee]"
              : "bg-gray-900/20 hover:bg-gray-900/30 active:opacity-75 border-none"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

