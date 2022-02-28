export interface userState {
  dataSource: Array<any>;
  columns: Array<any>;
  pagination: pages;
  query: query;
}

interface pages {
  total: number;
  showTotal: (value: number) => string;
}

interface query {
  page: number;
  size: number;
  phone: string;
  id: number | string;
  nickName: string;
  startCreateTime: string;
  endCreateTime: string;
}
