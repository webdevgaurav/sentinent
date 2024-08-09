import { useState } from "react";
import Credentials from "./inc/Credentials/Credentials";

type SettingsTab = {
  label: string;
  value: string;
  active: boolean;
};

const Setting = () => {
  const [tabs, setTabs] = useState<SettingsTab[]>([
    { label: "Credentials", value: "credentials", active: true },
    { label: "Members", value: "members", active: false },
  ]);
  const [currentTab, setcurrentTab] = useState<String>("credentials");

  const handleTabClick = (value: string) => {
    setTabs((prevTabs): SettingsTab[] =>
      prevTabs.map((tab) =>
        tab.value === value
          ? { ...tab, active: true }
          : { ...tab, active: false }
      )
    );
    setcurrentTab(value);
  };
  return (
    <div>
      <ul className="nav nav-underline">
        {tabs.map((item) => (
          <li className="nav-item" key={item.value}>
            <a
              className={`nav-link ${item.active ? "active" : ""}`}
              aria-current={item.active ? "page" : undefined}
              onClick={() => handleTabClick(item.value)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      {currentTab === "credentials" && <Credentials />}
    </div>
  );
};

export default Setting;
