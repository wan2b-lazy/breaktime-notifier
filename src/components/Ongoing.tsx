import React from "react";
import { Container, Stack, Typography, Button } from "@mui/material";

const Ongoing: React.FC = () => {
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
          {`00 : 00`}
        </Typography>

        <Button type="button" variant="contained" size="large">
          中断
        </Button>
      </Stack>
    </Container>
  );
};

export default Ongoing;
