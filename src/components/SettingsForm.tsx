import React, { useCallback, useContext, useRef } from "react";

import TelematicDataContext from "../store/telematicDataContext";

import Button from "./ui/Button";
import Input from "./ui/Input";

import classes from "./SettingsForm.module.scss";

export const SettingsForm = () => {
  const fuelThresholdRef = useRef<HTMLInputElement>(null);
  const operatedOutOfHoursRef = useRef<HTMLInputElement>(null);
  const distanceThresholdRef = useRef<HTMLInputElement>(null);
  const fetchIntervalRef = useRef<HTMLInputElement>(null);
  const { settings, setSettings } = useContext(TelematicDataContext);

  const formSubmitHandle = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      setSettings({
        fuelThreshold: Number(fuelThresholdRef.current?.value || 10),
        operatedOutOfHours: operatedOutOfHoursRef
          .current!.value.split(",")
          .map((item) => Number(item)),
        distanceThreshold: Number(distanceThresholdRef.current?.value || 5),
        fetchTimerInterval: Number(fetchIntervalRef.current?.value || 10e3),
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
        required
      />
      <Input
        ref={operatedOutOfHoursRef}
        type={"text"}
        id={"operatedOutOfHours"}
        placeholder={"Enter day number devided by comma (0,1,...)"}
        label="Days off"
        value={(settings?.operatedOutOfHours || 0).toString()}
        required
      />
      <Input
        ref={distanceThresholdRef}
        type={"text"}
        id={"distanceThreshold"}
        placeholder={"Max distance it can travel (Kilometer)"}
        label="Distance thresholds"
        value={(settings?.distanceThreshold || 0).toString()}
        required
      />

      <Input
        ref={fetchIntervalRef}
        type={"text"}
        id={"fetchInterval"}
        placeholder={"Enter Fetch Interval (miliseconds)"}
        label="Fetch Interval"
        value={(settings?.fetchTimerInterval || 10).toString()}
        required
      />

      <Button type="submit">Save</Button>
    </form>
  );
};
