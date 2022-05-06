import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { mocked_telematicData } from "../apis/data";
// import CustomTable from "../components/CustomTable";
import LoadingSpinner from "../components/LoadingSpinner";
import { machinesHeader } from "../constants/tables";
import useFetch from "../hooks/useFetch";
import { IMachine } from "../interfaces/IMachine";
import { ITelematicData } from "../interfaces/ITelematicData";

const url =
  "https://admin-panel-79c71-default-rtdb.europe-west1.firebasedatabase.app/products.json";

const dropdownOptions = [
  { label: "all", value: "all" },
  { label: "digital", value: "digital" },
  { label: "clothing", value: "clothing" },
  { label: "beauty", value: "beauty" },
];
export const Machines = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(dropdownOptions[0].value);
  const { data, error, status } = useFetch<ITelematicData[]>(url);
  let productsTable;
  let tableData: ITelematicData[] | undefined;

  function selectedChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelected(() => e.target.value);
  }

  if (status === "loading") {
    productsTable = <LoadingSpinner asOverlay />;
  }

  switch (selected) {
    case "digital":
      tableData = mocked_telematicData?.filter(
        (item) => item.EquipmentHeader.OEMName === selected
      );
      break;
    case "clothing":
      tableData = mocked_telematicData?.filter(
        (item) => item.EquipmentHeader.SerialNumber === selected
      );
      break;
    case "beauty":
      tableData = mocked_telematicData?.filter(
        (item) => item.EquipmentHeader.Model === selected
      );
      break;
    default:
      tableData = mocked_telematicData;
  }

  // productsTable = (
  //   <CustomTable headData={machinesHeader} bodyData={tableData} limit={10} />
  // );

  // productsTable = (
  //   <CustomTable
  //     selectedCategory={selected}
  //     headData={machinesHeader}
  //     bodyData={tableData}
  //     limit={10}
  //   />
  // );

  return (
    <section>
      <h2 className="title">{t("products")}</h2>
      {/* <Dropdown
        dropdownData={dropdownOptions}
        onChange={selectedChangeHandler}
      /> */}
      {productsTable}
    </section>
  );
};
