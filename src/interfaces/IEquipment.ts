import { ITelematicData } from "./ITelematicData";

export interface IEquipment {
  OEMName: string;
  Model: string;
  SerialNumber: string; //uniq key
  pic: any;
  telematicData: ITelematicData | null;
}
