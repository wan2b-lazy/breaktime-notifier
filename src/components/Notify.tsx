import React, { useState } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import calculateInterval from "../lib/calculateInterval";

import { Container, Box, Typography, Stack, Button } from "@mui/material";
import {
  closingTimeState,
  dateOfNextTime,
  intervalState,
  timeoutIdState,
} from "../store";
import { ringAlarm, stopAlarm } from "../lib/ringAlarm";

const Notify: React.FC = () => {
  const [isStretching, setIsStretching] = useState(false);
  const navigate = useNavigate();

  const [timeoutId, setTimeoutId] = useRecoilState(timeoutIdState);
  const interval = useRecoilValue(intervalState);
  const closingTime = useRecoilValue(closingTimeState);
  const setDateOfNextTime = useSetRecoilState(dateOfNextTime);

  const handleStartClick = () => {
    stopAlarm();
    setIsStretching(!isStretching);
  };

  // アラームの再設定
  const handleCompleteClick = () => {
    const millisecondsForTimeout = calculateInterval(interval, closingTime);
    setDateOfNextTime(new Date(Date.now() + millisecondsForTimeout));

    const id = window.setTimeout(() => {
      ringAlarm();
      navigate("/notify");
    }, millisecondsForTimeout);

    setTimeoutId(id);
    navigate("/ongoing");
  };

  const handleStopClick = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
    navigate("/");
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          ストレッチの時間です
        </Typography>

        <Stack direction="row" spacing={10} sx={{ marginTop: 12 }}>
          {isStretching ? (
            <Button
              type="button"
              variant="contained"
              size="large"
              onClick={handleCompleteClick}
            >
              ストレッチ完了
            </Button>
          ) : (
            <Button
              type="button"
              variant="contained"
              size="large"
              onClick={handleStartClick}
            >
              ストレッチ開始
            </Button>
          )}

          <Button
            type="button"
            variant="contained"
            size="large"
            onClick={handleStopClick}
          >
            アラーム中断
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Notify;
