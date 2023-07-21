// アラーム間隔と終了予定時刻を受け取り、期限が近いほうを使ってインターバルを計算する

const calculateInterval = (interval: number, closingTime: string): number => {
  const closingTimeArray = closingTime.split(":");
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

  let nextTime =
    nextTimeForClosingTime < nextTimeForInterval
      ? nextTimeForClosingTime
      : nextTimeForInterval;

  const millisecondsForTimeout = nextTime.getTime() - now.getTime();

  return millisecondsForTimeout;
};

export default calculateInterval;
