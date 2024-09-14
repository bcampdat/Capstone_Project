import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/sass/styles.scss";
import { TfiAgenda } from "react-icons/tfi";
import { FaCalendarCheck } from "react-icons/fa";
import axios from "axios";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { UserContext } from "./auth/userContext";

moment.locale("es-ES", {
  week: {
    dow: 1, // Monday is the first day of the week
  },
});

const API_URL = "http://localhost:3001/api/events"; 

export default function MyCalendar() {
  const { user } = React.useContext(UserContext);
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    start: "",
    end: "",
    usuario_id: user.id_users
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Cargar eventos desde la API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const fetchedEvents = response.data.map((event) => ({
          id: event.id,
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(fetchedEvents);
      })
      .catch((error) => console.error("Error al cargar eventos:", error));
  }, []);

  const handleSelectSlot = ({ start }) => {
    setSelectedEvent(null);
    setFormData({
      title: "",
      content: "",
      start: moment(start).format("YYYY-MM-DDTHH:mm"),
      end: moment(start).add(1, 'hour').format("YYYY-MM-DDTHH:mm"),
    });
    setDrawerOpen(true);
  };

  const handleCreateEvent = (eventData) => {
    axios
      .post(API_URL, eventData)
      .then((response) => {
        console.log("Evento creado:", response.data);
        setEvents([
          ...events,
          {
            ...eventData,
            id: response.data.id
          },
        ]);
        setDrawerOpen(false);
        setFormData({
          title: "",
          content: "",
          start: "",
          end: "",
        });
      })
      .catch((error) => console.error("Error al crear evento:", error));
  };

  const handleUpdateEvent = (eventData) => {
    axios
      .put(`${API_URL}/${selectedEvent.id}`, eventData)
      .then((response) => {
        console.log("Evento actualizado:", response.data);
        setEvents(events.map(event => event.id === selectedEvent.id ? { ...eventData, id: selectedEvent.id } : event));
        setModalOpen(false);
        setSelectedEvent(null);
      })
      .catch((error) => console.error("Error al actualizar evento:", error));
  };

  const handleDeleteEvent = () => {
    axios
      .delete(`${API_URL}/${selectedEvent.id}`)
      .then(() => {
        setEvents(events.filter(event => event.id !== selectedEvent.id));
        setModalOpen(false);
        setSelectedEvent(null);
      })
      .catch((error) => console.error("Error al eliminar evento:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      title: formData.title,
      content: formData.content,
      start: new Date(formData.start).toISOString(),
      end: new Date(formData.end).toISOString(),
      usuario_id: user.id_users// Asumiendo que el ID del usuario es 1; cambiar según sea necesario
    };
    handleCreateEvent(eventData);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      content: event.content || "",
      start: moment(event.start).format("YYYY-MM-DDTHH:mm"),
      end: moment(event.end).format("YYYY-MM-DDTHH:mm"),
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="text-2xl text-center mt-10">
      <Calendar
        localizer={localizer}
        events={events}
        style={{ height: "95vh", background: "black" }}
        defaultView="month"
        components={{
          event: ({ event }) => (
            <div className="flex items-center">
              <TfiAgenda className="text-3xl text-white mr-2" />
              <div>
                <p className="text-white">{event.title}</p>
              </div>
            </div>
          ),
          agenda: ({ date }) => (
            <div className="flex items-center">
              <FaCalendarCheck className="text-3xl text-white mr-2" />
              <div>
                <p className="text-white">{date.toLocaleDateString()}</p>
              </div>
            </div>
          ),
        }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventClick}
      />
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ style: { width: 300 } }} // Ancho del panel
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
              onClick={() => setDrawerOpen(false)}
              sx={{ mt: 2 }}
            >
              Cancelar
            </Button>
          </form>
        </Box>
      </Drawer>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
      >
        <Box sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}>
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
              onClick={() => handleUpdateEvent({
                title: formData.title,
                content: formData.content,
                start: new Date(formData.start).toISOString(),
                end: new Date(formData.end).toISOString(),
              })}
              sx={{ mr: 1 }}
            >
              Actualizar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteEvent}
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
