export interface IEquipment {
  OEMName: string;
  Model: string;
  SerialNumber: string; //uniq key
  SnapshotTime: Date;
  pic?: any;
}
