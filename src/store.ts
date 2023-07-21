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

// dateOfNextTimeを更新するためのstate
/* export const incrementState = atom({
  key: "incrementState",
  default: 0,
}); */

// intervalStateで作ったDateオブジェクトとclosingTimeStateで作ったDateオブジェクトを比較して、期限が早いほうを返す

// アラームを設定するたびにdateOfNextTimeを更新したいが、intervalStateとclosingTimeStateは変更できないため、更新するためだけにインクリメントstateを追加する？
/* export const dateOfNextTime = selector({
  key: "dateOfNextTime",
  get: ({ get }) => {
    const interval = get(intervalState);
    const closingTimeArray = get(closingTimeState).split(":");
    const increment = get(incrementState);
    const now = new Date();

    const nextTimeForInterval = new Date(now.getTime() + interval * 60000);

    // 終了予定時刻のHourがnowのHourより小さかった場合、終了予定時刻は日付をまたいでいると判断し、Dateコンストラクタに渡すnow.getDateに1を足す
    let nextTimeForClosingTime: Date;
    if (Number(closingTimeArray[0]) < now.getHours()) {
      nextTimeForClosingTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        Number(closingTimeArray[0]),
        Number(closingTimeArray[1])
      );
    } else {
      nextTimeForClosingTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        Number(closingTimeArray[0]),
        Number(closingTimeArray[1])
      );
    }

    if (nextTimeForClosingTime < nextTimeForInterval) {
      return nextTimeForClosingTime;
    } else {
      return nextTimeForInterval;
    }
  },
});

export const millisecondsForNextTime = selector({
  key: "millisecondsForNextTime",
  get: ({ get }) => {
    const nextTime = get(dateOfNextTime);
    const now = new Date();

    return nextTime.getTime() - now.getTime();
  },
}); */
