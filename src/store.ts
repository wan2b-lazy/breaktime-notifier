import { atom, selector } from "recoil";

export const intervalState = atom({
  key: "intervalState",
  default: 60,
});

export const closingTimeState = atom({
  key: "closingTimeState",
  default: "00:00",
});

export const dateOfNextTime = selector({
  key: "dateOfNextTime",
  get: ({ get }) => {
    //intervalとclosingTImeを比較する
    const interval = get(intervalState);
    const timeArray = get(closingTimeState).split(":");
    const now = new Date();

    const nextTimeForInterval = new Date(now.getTime() + interval * 60000);
    const nextTimeForClosingTime = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      Number(timeArray[0]),
      Number(timeArray[1])
    );

    if (nextTimeForClosingTime < nextTimeForInterval) {
      return nextTimeForClosingTime;
    } else {
      return nextTimeForInterval;
    }
  },
});
