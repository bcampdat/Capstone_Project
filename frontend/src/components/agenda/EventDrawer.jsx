import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography, TextField, Drawer } from "@mui/material";
import { amber, cyan } from "@mui/material/colors"; // Colores personalizados
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Crear un tema oscuro
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: amber[500],  
    },
    secondary: {
      main: cyan[500],   
    },
    background: {
      default: "#242424", 
      paper: "#1E1E1E",   
    },
    text: {
      primary: "#ffffff", // Texto blanco
    },
  },
});

const EventDrawer = ({
  drawerOpen,
  handleCloseDrawer,
  formData,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            width: 300,
            backgroundColor: "background.paper", 
            color: "text.primary", 
          },
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" color="textPrimary">
            Crear Evento
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Título"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              sx={{
                input: { color: 'text.primary' },  // Color del texto de entrada
                label: { color: 'text.primary' },  // Color del label
              }}
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
              sx={{
                input: { color: 'text.primary' },  // Color del texto de entrada
                label: { color: 'text.primary' },  // Color del label
              }}
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
              sx={{
                input: { color: 'text.primary' },  // Color del texto de entrada
                label: { color: 'text.primary' },  // Color del label
              }}
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
              sx={{
                input: { color: 'text.primary' },  // Color del texto de entrada
                label: { color: 'text.primary' },  // Color del label
              }}
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
    </ThemeProvider>
  );
};

// Definir PropTypes para validar las props
EventDrawer.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  handleCloseDrawer: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EventDrawer;
