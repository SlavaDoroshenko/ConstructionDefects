import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import Header from "../components/Header";
import DefectTable from "../components/DefectTable";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function MainPage() {
  const [previewImage, setPreviewImage] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  // Форма нового дефекта
  const [newDefect, setNewDefect] = useState({
    description: "",
    location: "",
    photoUrl: "",
  });

  const [defects, setDefects] = useState([
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
  ]);

  const handleImageClick = (url) => {
    if (url) {
      setPreviewImage(url);
    }
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  const handleOpenAdd = () => setOpenAddModal(true);
  const handleCloseAdd = () => {
    setOpenAddModal(false);
    // Сброс формы
    setNewDefect({
      description: "",
      location: "",
      photoUrl: "",
    });
  };

  // Изменение полей формы
  const handleInputChange = (field) => (e) => {
    setNewDefect({ ...newDefect, [field]: e.target.value });
  };

  // Добавление дефекта
  const handleAddDefect = () => {
    const defectToAdd = {
      ...newDefect,
      id: Math.max(...defects.map((d) => d.id), 0) + 1, // уникальный ID
      detectedAt: new Date().toISOString(),
    };
    setDefects([...defects, defectToAdd]);
    handleCloseAdd();
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
          onClick={handleOpenAdd} // ← открытие модалки
        >
          Добавить объект
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        <DefectTable defects={defects} onImageClick={handleImageClick} />
      </Box>

      {/* Модалка добавления */}
      <Modal open={openAddModal} onClose={handleCloseAdd}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Добавить дефект
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Описание"
              value={newDefect.description}
              onChange={handleInputChange("description")}
              multiline
              rows={3}
              required
            />
            <TextField
              label="Местоположение"
              value={newDefect.location}
              onChange={handleInputChange("location")}
              required
            />
            <TextField
              label="URL фото (опционально)"
              value={newDefect.photoUrl}
              onChange={handleInputChange("photoUrl")}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={handleCloseAdd}>Отмена</Button>
              <Button
                variant="contained"
                onClick={handleAddDefect}
                disabled={!newDefect.description || !newDefect.location}
              >
                Добавить
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>

      {/* Модалка просмотра фото */}
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
