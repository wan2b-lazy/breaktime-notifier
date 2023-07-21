const audio = new Audio("/Morning_2.mp3");

export const ringAlarm = () => {
  audio.currentTime = 0;
  audio.volume = 0.3;
  audio.play();
};

export const stopAlarm = () => {
  audio.pause();
};
