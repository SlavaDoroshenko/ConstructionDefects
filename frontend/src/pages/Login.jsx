// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
} from "@mui/material";

// Валидатор email
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setGeneralError("");

    // Сброс ошибки email при новой попытке
    if (emailError) setEmailError(false);

    // Валидация email
    if (!isValidEmail(email)) {
      setEmailError(true);
      return;
    }

    setLoading(true);

    try {
      // === ЗАМЕНИ ЭТОТ БЛОК НА РЕАЛЬНЫЙ ЗАПРОС К ТВОЕМУ LARAVEL API ===
      // Пример:
      // const response = await fetch("http://localhost/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      //
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "Неверный email или пароль");
      // }
      //
      // const data = await response.json();
      // localStorage.setItem("token", data.token);
      // =================================================================

      // ⚠️ Имитация: только для демо! Удали в продакшене.
      if (password !== "123") {
        throw new Error("Неверный email или пароль");
      }
      const fakeToken = "fake-jwt-token-for-demo";
      localStorage.setItem("token", fakeToken);

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      setGeneralError(error.message || "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Вход в систему
        </Typography>

        {/* Общая ошибка (неверные данные) */}
        {generalError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {generalError}
          </Alert>
        )}

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError(false); // сброс ошибки при вводе
          }}
          error={emailError}
          helperText={emailError ? "Пожалуйста, введите корректный email" : ""}
          required
          fullWidth
        />

        <TextField
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: 1 }}
        >
          {loading ? "Вход..." : "Войти"}
        </Button>
      </Box>
    </Container>
  );
}
