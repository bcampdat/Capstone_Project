import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography, TextField, Modal } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { amber, cyan } from "@mui/material/colors";

// Crear un tema oscuro
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: amber[500],  // Usar amber para botones primarios
    },
    secondary: {
      main: cyan[500],   // Usar cyan para botones secundarios
    },
    background: {
      default: "#121212", // Fondo oscuro por defecto
      paper: "#1E1E1E",   // Fondo para Paper (como Modal)
    },
    text: {
      primary: "#ffffff", // Texto blanco
    },
  },
});

const EventModal = ({
  modalOpen,
  handleCloseModal,
  formData,
  handleInputChange,
  handleUpdateEvent,
  handleDeleteEvent,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper", // Usar el fondo oscuro
            color: "text.primary", // Texto blanco
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Editar Evento
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            sx={{ // Estilos para el texto y el label
              input: { color: 'text.primary' }, // Color del texto de entrada
              label: { color: 'text.primary' }, // Color del label
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contenido"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            multiline
            rows={4}
            sx={{
              input: { color: 'text.primary' },
              label: { color: 'text.primary' },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Inicio"
            name="start"
            type="datetime-local"
            value={formData.start}
            onChange={handleInputChange}
            sx={{
              input: { color: 'text.primary' },
              label: { color: 'text.primary' },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Fin"
            name="end"
            type="datetime-local"
            value={formData.end}
            onChange={handleInputChange}
            sx={{
              input: { color: 'text.primary' },
              label: { color: 'text.primary' },
            }}
          />
          <Box mt={2}>
            <Button
              variant="outlined" 
              color="primary"
              onClick={() =>
                handleUpdateEvent({
                  title: formData.title,
                  content: formData.content,
                  start: new Date(formData.start).toISOString(),
                  end: new Date(formData.end).toISOString(),
                })
              }
              sx={{ mr: 1 }}
            >
              Actualizar
            </Button>
            <Button variant="outlined" color="secondary"  onClick={handleDeleteEvent}>
              Eliminar
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

EventModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleUpdateEvent: PropTypes.func.isRequired,
  handleDeleteEvent: PropTypes.func.isRequired,
};

export default EventModal;
