import { requireData,responseData } from "./global";

export interface stateData {
  info: userInfo;
  tableList: Array<tableItem>;
}

interface userInfo {
  userName?: string;
  password?: string;
  age?: number;
  sex?: string;
}

interface tableItem extends responseData.resultItem {
  name: string;
  age: number;
  sex: string;
  status: boolean;
  isExit: boolean;
}

interface reqInfo extends requireData.reqInfo {
  id: number;
}
