import React from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router";
import { Container, Stack, Typography, Button } from "@mui/material";

import { dateOfNextTime, timeoutIdState } from "../store";

const Ongoing: React.FC = () => {
  const navigate = useNavigate();

  const timeoutId = useRecoilValue(timeoutIdState);
  const nextTimeDate = useRecoilValue(dateOfNextTime);
  const hoursOfNextTime = `0${nextTimeDate.getHours()}`.slice(-2);
  const minitesOfNextTime = `0${nextTimeDate.getMinutes()}`.slice(-2);

  const handleClick = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
    navigate("/");
  };

  return (
    <Container maxWidth="md">
      <Stack
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        spacing={5}
      >
        <Typography component="h1" variant="h4">
          次回のアラーム予定時刻は
        </Typography>

        <Typography component="h2" variant="h4">
          {`${hoursOfNextTime} : ${minitesOfNextTime}`}
        </Typography>

        <Button
          type="button"
          onClick={handleClick}
          variant="contained"
          size="large"
        >
          中断
        </Button>
      </Stack>
    </Container>
  );
};

export default Ongoing;
