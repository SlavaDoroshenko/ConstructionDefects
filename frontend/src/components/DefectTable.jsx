import { DataGrid } from "@mui/x-data-grid";
import { Chip, Box } from "@mui/material";

const columns = ({ onImageClick }) => [
  { field: "id", headerName: "ID", width: 10 },
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
          onClick={() => onImageClick(url)}
        />
      );
    },
  },
  { field: "description", headerName: "Описание", flex: 1 },
  { field: "location", headerName: "Местоположение", flex: 1 },
  {
    field: "status",
    headerName: "Статус",
    width: 120,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={
          params.value === "Исправлен"
            ? "success"
            : params.value === "Новый"
            ? "warning"
            : "default"
        }
      />
    ),
  },
];

export default function DefectTable({ defects, onImageClick }) {
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
        disableRowSelectionOnClick
      />
    </Box>
  );
}
