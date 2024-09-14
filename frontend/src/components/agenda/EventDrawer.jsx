// src/components/EventDrawer.js
import React from "react";
import { Box, Button, Typography, TextField, Drawer } from "@mui/material";

const EventDrawer = ({
  drawerOpen,
  handleCloseDrawer,
  formData,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={handleCloseDrawer}
      PaperProps={{ style: { width: 300 } }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6">Crear Evento</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Contenido"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Inicio"
            name="start"
            type="datetime-local"
            value={formData.start}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Fin"
            name="end"
            type="datetime-local"
            value={formData.end}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Crear Evento
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleCloseDrawer}
            sx={{ mt: 2 }}
          >
            Cancelar
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default EventDrawer;
