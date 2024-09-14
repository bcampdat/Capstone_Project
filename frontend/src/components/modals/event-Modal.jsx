import React from "react";
import PropTypes from "prop-types"; 
import { Box, Button, Typography, TextField, Modal } from "@mui/material";

const EventModal = ({
  modalOpen,
  handleCloseModal,
  formData,
  handleInputChange,
  handleUpdateEvent,
  handleDeleteEvent,
}) => {
  return (
    <Modal open={modalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
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
        />
        <TextField
          fullWidth
          margin="normal"
          label="Inicio"
          name="start"
          type="datetime-local"
          value={formData.start}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Fin"
          name="end"
          type="datetime-local"
          value={formData.end}
          onChange={handleInputChange}
        />
        <Box mt={2}>
          <Button
            variant="contained"
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
          <Button variant="outlined" color="error" onClick={handleDeleteEvent}>
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Definir PropTypes para validar las props
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
