import React, { useCallback, useContext, useRef } from "react";

import TelematicDataContext from "../store/telematicDataContext";

import Button from "./ui/Button";
import Input from "./ui/Input";

import classes from "./SettingsForm.module.scss";

export const SettingsForm = () => {
  const fuelThresholdRef = useRef<HTMLInputElement>(null);
  const operatedOutOfHoursRef = useRef<HTMLInputElement>(null);
  const underutilizationRef = useRef<HTMLInputElement>(null);
  const distanceThresholdRef = useRef<HTMLInputElement>(null);
  const { settings, setSettings } = useContext(TelematicDataContext);

  const formSubmitHandle = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      setSettings({
        fuelThreshold: Number(fuelThresholdRef.current?.value || 10),
        operatedOutOfHours: operatedOutOfHoursRef
          .current!.value.split(",")
          .map((item) => Number(item)),
        underutilization: Number(underutilizationRef.current?.value || 3),
        distanceThreshold: Number(distanceThresholdRef.current?.value || 5),
      });
    },
    [setSettings]
  );

  return (
    <form className={classes.settings_form} onSubmit={formSubmitHandle}>
      <Input
        ref={fuelThresholdRef}
        type={"text"}
        id={"fuelThreshold"}
        placeholder={"Fuel percent threshold"}
        label="Fuel threshold"
        value={(settings?.fuelThreshold || 0).toString()}
      />
      <Input
        ref={operatedOutOfHoursRef}
        type={"text"}
        id={"operatedOutOfHours"}
        placeholder={"Enter day number devided by comma (0,1,...)"}
        label="Days off"
        value={(settings?.operatedOutOfHours || 0).toString()}
      />
      <Input
        ref={underutilizationRef}
        type={"text"}
        id={"underutilization"}
        placeholder={"underutilization "}
        label="Underutilization thresholds"
        value={(settings?.underutilization || 0).toString()}
      />
      <Input
        ref={distanceThresholdRef}
        type={"text"}
        id={"distanceThreshold"}
        placeholder={"Max distance it can travel (Kilometer)"}
        label="Distance thresholds"
        value={(settings?.distanceThreshold || 0).toString()}
      />

      <Button type="submit">Save</Button>
    </form>
  );
};
