// src/components/DefectTable.jsx
import { DataGrid } from "@mui/x-data-grid";
import { Chip, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ← добавь это

const columns = ({ onImageClick }) => [
  { field: "id", headerName: "ID", width: 80 },
  {
    field: "photoUrl",
    headerName: "Фото",
    width: 260,
    renderCell: (params) => {
      const url = (params.value || "").trim();
      if (!url) {
        return (
          <Box
            sx={{
              width: 260,
              height: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#f5f5f5",
              border: "1px dashed #ccc",
              color: "#999",
            }}
          >
            Нет фото
          </Box>
        );
      }

      return (
        <img
          src={url}
          alt="Дефект"
          style={{
            width: 260,
            height: 120,
            objectFit: "cover",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          onClick={(e) => {
            e.stopPropagation(); // не срабатывал клик по строке
            onImageClick(url);
          }}
        />
      );
    },
  },
  { field: "description", headerName: "Описание", flex: 1 },
  { field: "location", headerName: "Местоположение", flex: 1 },
];

export default function DefectTable({ defects, onImageClick }) {
  const navigate = useNavigate(); // ← хук навигации

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={defects}
        columns={columns({ onImageClick })}
        rowHeight={120}
        pagination
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        onRowClick={(params) => {
          navigate(`/defects/${params.id}`);
        }}
        disableRowSelectionOnClick
        sx={{ cursor: "pointer" }} // курсор "рука" при наведении на строку
      />
    </Box>
  );
}
