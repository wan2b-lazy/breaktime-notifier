import { atom } from "recoil";

// アラームの間隔をminitesで保存する
export const intervalState = atom({
  key: "intervalState",
  default: 60,
});

// アラームループの終了予定時刻を"XX:XX"形式の文字列で保存する
export const closingTimeState = atom({
  key: "closingTimeState",
  default: "00:00",
});

// アラームをリセットするために、セットするたびにtimeoutIdを保存する
export const timeoutIdState = atom<number | null>({
  key: "timeoutIdState",
  default: null,
});

// アラームをセットする際に、calculateIntervalから返されたミリ秒を使ったDateを保存する
export const dateOfNextTime = atom<Date>({
  key: "dateOfNextTime",
  default: new Date(),
});
