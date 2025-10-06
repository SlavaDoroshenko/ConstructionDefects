import { Box, Button, Modal } from "@mui/material";
import Header from "../components/Header";
import DefectTable from "../components/DefectTable";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function MainPage() {
  const [previewImage, setPreviewImage] = useState(null);
  const defects = [
    {
      id: 1,
      photoUrl:
        "https://s8.stc.all.kpcdn.net/russia/wp-content/uploads/2022/02/Stoit-li-pokupat-kvartiru-v-Moskve.jpg",
      description: "Трещина в несущей стене, блок А",
      status: "Новый",
      location: "Этаж 3, секция B",
      detectedAt: "2024-05-10T10:30:00Z",
      priority: "Высокий",
    },
    {
      id: 2,
      photoUrl: "",
      description: "Протечка кровли над лифтовой шахтой",
      status: "В работе",
      location: "Крыша, зона 2",
      detectedAt: "2024-05-08T14:15:00Z",
      priority: "Критический",
    },
    {
      id: 3,
      photoUrl: "2",
      description: "Отслоение штукатурки в холле",
      status: "Исправлен",
      location: "1 этаж, входная группа",
      detectedAt: "2024-05-01T09:00:00Z",
      priority: "Средний",
    },
    {
      id: 4,
      photoUrl: "2",
      description: "Отслоение штукатурки в холле",
      status: "Исправлен",
      location: "1 этаж, входная группа",
      detectedAt: "2024-05-01T09:00:00Z",
      priority: "Средний",
    },
    {
      id: 5,
      photoUrl: "2",
      description: "Отслоение штукатурки в холле",
      status: "Исправлен",
      location: "1 этаж, входная группа",
      detectedAt: "2024-05-01T09:00:00Z",
      priority: "Средний",
    },
    {
      id: 6,
      photoUrl: "2",
      description: "Отслоение штукатурки в холле",
      status: "Исправлен",
      location: "1 этаж, входная группа",
      detectedAt: "2024-05-01T09:00:00Z",
      priority: "Средний",
    },
  ];

  const handleImageClick = (url) => {
    if (url) {
      setPreviewImage(url);
    }
  };

  const closePreview = () => {
    setPreviewImage(null);
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
      <Box sx={{ p: 2 }}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ px: 3, py: 1.5 }}
        >
          Добавить объект
        </Button>
      </Box>

      <Box sx={{ flexGrow: 800, minHeight: 0 }}>
        <DefectTable defects={defects} onImageClick={handleImageClick} />
      </Box>

      <Modal
        open={!!previewImage}
        onClose={closePreview}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          component="img"
          src={previewImage}
          alt="Просмотр"
          sx={{
            maxWidth: "95vw",
            maxHeight: "95vh",
            objectFit: "contain",
            borderRadius: 2,
            boxShadow: 24,
            bgcolor: "background.paper",
            outline: "none",
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </Modal>
    </Box>
  );
}
