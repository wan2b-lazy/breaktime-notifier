import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";

const Home: React.FC = () => {
  return (
    <Container maxWidth="xs">
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

        <Box
          component="form"
          sx={{
            mt: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* TODO 半角英数字、1以上300以下に制限するバリデーションを追加する */}
          <TextField
            id="interval"
            label="間隔"
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: <InputAdornment position="end">分</InputAdornment>,
              defaultValue: 60,
            }}
          />
          <TextField
            id="closingTime"
            label="終了予定時刻"
            type="time"
            fullWidth
            margin="normal"
          />
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            size="large"
          >
            作業開始
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
