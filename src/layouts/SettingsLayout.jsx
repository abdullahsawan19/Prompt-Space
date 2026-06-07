import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

const Settings = ({ children, defaultTab = "profile" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <SettingsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {children}
      </div>
    </SettingsContext.Provider>
  );
};

const Sidebar = ({ children, title = "Settings" }) => {
  return (
    <div className="w-full md:w-64 shrink-0">
      <h1 className="text-2xl font-bold text-[var(--color-grey-900)] mb-6">
        {title}
      </h1>
      <nav className="flex flex-col gap-2">{children}</nav>
    </div>
  );
};

const Tab = ({ id, icon, children }) => {
  const { activeTab, setActiveTab } = useContext(SettingsContext);
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors outline-none ${
        isActive
          ? "bg-[var(--color-brand-50)] text-[var(--color-brand-600)]"
          : "text-[var(--color-grey-600)] hover:bg-[var(--color-grey-50)] hover:text-[var(--color-grey-900)]"
      }`}
    >
      {icon}
      {children}
    </button>
  );
};

const ContentWrapper = ({ children }) => {
  return (
    <div className="flex-1 bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl shadow-sm p-6 sm:p-8 min-h-[500px]">
      {children}
    </div>
  );
};

const Panel = ({ id, children }) => {
  const { activeTab } = useContext(SettingsContext);

  if (activeTab !== id) return null;

  return <div>{children}</div>;
};

Settings.Sidebar = Sidebar;
Settings.Tab = Tab;
Settings.ContentWrapper = ContentWrapper;
Settings.Panel = Panel;

export default Settings;
