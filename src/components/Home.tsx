import { memo, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Button,
  TextField,
} from "@mui/material";

import {
  intervalState,
  closingTimeState,
  timeoutIdState,
  dateOfNextTime,
} from "../store";
import { ringAlarm } from "../lib/ringAlarm";
import calculateInterval from "../lib/calculateInterval";

export type FormValues = {
  interval: number;
  closingTime: string;
};

const Home: React.FC = memo(() => {
  const { handleSubmit, control } = useForm<FormValues>();
  const setInterval = useSetRecoilState(intervalState);
  const setClosingTime = useSetRecoilState(closingTimeState);
  const [timeoutId, setTimeoutId] = useRecoilState(timeoutIdState);
  const setDateOfNextTime = useSetRecoilState(dateOfNextTime);
  const navigate = useNavigate();

  const validationRules = {
    interval: {
      required: "interval is required",
      min: {
        value: 1,
        message: "1以上の数値を入力してください",
      },
      max: {
        value: 300,
        message: "300以下の数値を入力してください",
      },
      pattern: {
        value: /^[0-9]+$/,
        message: "半角数字で入力してください",
      },
    },
    closingTime: {
      required: "closing-time is required",
    },
  };

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    // 初回のアラーム設定はuseRecoilValueが使えないため、formとってきたintervalとclosingTimeを使って直接アラームを設定する
    const interval = data.interval;
    const closingTimeStr = data.closingTime;

    const millisecondsForTimeout = calculateInterval(interval, closingTimeStr);
    setDateOfNextTime(new Date(Date.now() + millisecondsForTimeout));

    const id = window.setTimeout(() => {
      ringAlarm();
      navigate("/notify");
    }, millisecondsForTimeout);

    setTimeoutId(id);
    setInterval(interval);
    setClosingTime(closingTimeStr);
    navigate("/ongoing");
  };

  // Homeに戻ってきた際に、実行中のアラームが存在した場合、clearTimeoutする
  useEffect(() => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  }, [timeoutId]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          アラーム設定
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }}>
          {/* interval input */}
          <Controller
            name="interval"
            control={control}
            defaultValue={60}
            rules={validationRules.interval}
            render={({
              field: { onChange, value },
              fieldState: { error },
              formState,
            }) => (
              <TextField
                margin="normal"
                fullWidth
                variant="outlined"
                required={true}
                type="number"
                id="interval"
                label="アラームの間隔(分)"
                name="interval"
                autoComplete="off"
                autoFocus={true}
                error={!!error} //booleanに変換してる？
                onChange={onChange}
                value={value}
                helperText={error ? error.message : null}
              />
            )}
          />

          {/* closing-time input */}
          <Controller
            name="closingTime"
            control={control}
            defaultValue=""
            rules={validationRules.closingTime}
            render={({
              field: { onChange, value },
              fieldState: { error },
              formState,
            }) => (
              <TextField
                margin="normal"
                fullWidth
                variant="outlined"
                required={true}
                type="time"
                id="closingTime"
                label="終了予定時刻"
                name="closingTime"
                autoComplete="off"
                autoFocus={true}
                error={!!error}
                onChange={onChange}
                value={value}
                helperText={error ? error.message : null}
              />
            )}
          />

          {/* submit button */}
          <Button
            onClick={handleSubmit(onSubmit)}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            作業開始
          </Button>
        </Box>
      </Box>
    </Container>
  );
});

export default Home;
