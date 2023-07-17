import React from "react";
import { Container, Box, Typography, Stack, Button } from "@mui/material";

const Notify: React.FC = () => {
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
          <Button type="button" variant="contained" size="large">
            ストレッチ開始
          </Button>
          <Button type="button" variant="contained" size="large">
            アラーム中断
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Notify;
