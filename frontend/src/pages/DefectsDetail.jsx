// src/pages/DefectDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Chip, Container } from "@mui/material";
import Header from "../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// ВРЕМЕННО: копируем ТОТ ЖЕ список дефектов, что и в MainPage
const useDefectsData = () => {
  return [
    {
      id: 1,
      photoUrl:
        "https://s8.stc.all.kpcdn.net/russia/wp-content/uploads/2022/02/Stoit-li-pokupat-kvartiru-v-Moskve.jpg",
      description: "Трещина в несущей стене, блок А",
      status: "Новый",
      location: "Этаж 3, секция B",
    },
    {
      id: 2,
      photoUrl: "",
      description: "Протечка кровли над лифтовой шахтой",
      status: "В работе",
      location: "Крыша, зона 2",
    },
    {
      id: 3,
      photoUrl: "2",
      description: "Отслоение штукатурки в холле",
      status: "Исправлен",
      location: "1 этаж, входная группа",
    },
    {
      id: 4,
      photoUrl: "2",
      description: "Отслоение штукатурки в холле",
      status: "Исправлен",
      location: "1 этаж, входная группа",
    },
    {
      id: 5,
      photoUrl: "2",
      description: "Отслоение штукатурки в холле",
      status: "Исправлен",
      location: "1 этаж, входная группа",
    },
    {
      id: 6,
      photoUrl: "2",
      description: "Отслоение штукатурки в холле",
      status: "Исправлен",
      location: "1 этаж, входная группа",
    },
  ];
};

export default function DefectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const defects = useDefectsData();
  const defect = defects.find((d) => d.id === parseInt(id));

  if (!defect) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Дефект не найден</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Назад
        </Button>
      </Container>
    );
  }

  const getStatusColor = (status) => {
    if (status === "Исправлен") return "success";
    if (status === "Новый") return "warning";
    return "default";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Header />

      <Container sx={{ py: 3, flex: 1, overflow: "auto" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Назад к списку
        </Button>

        <Box sx={{ mb: 3, textAlign: "center" }}>
          {defect.photoUrl ? (
            <Box
              component="img"
              src={defect.photoUrl.trim()}
              alt="Дефект"
              sx={{
                width: "100%",
                maxWidth: 600,
                height: "auto",
                borderRadius: 2,
                boxShadow: 1,
                mx: "auto",
              }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                maxWidth: 600,
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f5f5f5",
                border: "1px dashed #ccc",
                mx: "auto",
              }}
            >
              Нет изображения
            </Box>
          )}
        </Box>

        <Typography variant="h5" gutterBottom>
          {defect.description}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
          <Chip
            label={`Статус: ${defect.status}`}
            color={getStatusColor(defect.status)}
          />
          <Chip
            label={`Местоположение: ${defect.location}`}
            variant="outlined"
          />
        </Box>
      </Container>
    </Box>
  );
}
