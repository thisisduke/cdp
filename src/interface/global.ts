export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export namespace requireData {
  export interface reqInfo {
    pages: number;
    size: number;
    startTime?: string;
    endTime?: string;
  }
}

export namespace responseData {
  export interface resInfo {
    success: boolean;
    result?: any;
    results?: any;
  }

  export interface resultItem {
    id: number;
  }
}

