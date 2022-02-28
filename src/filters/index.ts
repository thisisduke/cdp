export const getRealName = (name: string): string => {
  return name.substr(0, 4);
};

export const formatDate = (value: string): string => {
  let time: Date = new Date(value);
  let y: string = time.getFullYear().toString();
  let m: string = (time.getMonth() + 1).toString();
  let d: string = time.getDate().toString();
  let hh: string = time.getHours().toString();
  let mm: string = time.getMinutes().toString();
  let ss: string = time.getSeconds().toString();

  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")} ${hh.padStart(2, "0")}:${mm.padStart(2, "0")}:${ss.padStart(2, "0")}`;
};
