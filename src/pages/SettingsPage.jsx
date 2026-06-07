import {
  HiOutlineUser,
  HiOutlineShieldCheck,
  HiOutlineAdjustments,
} from "react-icons/hi";
import Settings from "../layouts/SettingsLayout";
import ProfileSettings from "../features/Settings/ProfileSettings";
import PreferencesSettings from "../features/Settings/PreferencesSettings";

const SettingsPage = () => {
  return (
    <Settings defaultTab="profile">
      <Settings.Sidebar title="Settings">
        <Settings.Tab id="profile" icon={<HiOutlineUser size={20} />}>
          Account Profile
        </Settings.Tab>
        <Settings.Tab id="security" icon={<HiOutlineShieldCheck size={20} />}>
          Security
        </Settings.Tab>
        <Settings.Tab
          id="preferences"
          icon={<HiOutlineAdjustments size={20} />}
        >
          Preferences
        </Settings.Tab>
      </Settings.Sidebar>

      <Settings.ContentWrapper>
        <Settings.Panel id="profile">
          <ProfileSettings />
        </Settings.Panel>
        <Settings.Panel id="preferences">
          <PreferencesSettings />
        </Settings.Panel>
      </Settings.ContentWrapper>
    </Settings>
  );
};

export default SettingsPage;
