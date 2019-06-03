import React from 'react';

import { TabNavigation, Tab } from 'evergreen-ui';

export default function SideMenu({ pathname }) {
  return (
    <TabNavigation margin={24}>
      <Tab key="signin" is="a" href="#/signin" id="signin_tab" isSelected={pathname === "/signin"}>
        Signin
      </Tab>

      <Tab key="settings" is="a" href="#/settings" id="settings_tab" isSelected={pathname === "/settings"}>
        Settings
      </Tab>      
    </TabNavigation>
  );
}
