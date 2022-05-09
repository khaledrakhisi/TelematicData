import React, { useContext, useEffect } from "react";

import { SettingsForm } from "../components/SettingsForm";
import TelematicDataContext from "../store/telematicDataContext";

const Settings = () => {
  const { setTelematicData } = useContext(TelematicDataContext);

  return (
    <section>
      <SettingsForm />
    </section>
  );
};

export default Settings;
