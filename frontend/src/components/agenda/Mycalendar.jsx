import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import "moment/locale/es";
import { localizerMoment, messages } from "./locale";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/sass/styles.scss";
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import axios from "axios";
import { UserContext } from "../auth/userContext";
import EventModal from "../modals/event-Modal";
import EventDrawer from "./EventDrawer";
import EventCard from "./eventCard";

const API_URL = "http://localhost:3001/api/events";

export default function MyCalendar() {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    start: "",
    end: "",
    usuario_id: user.id_users,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Cargar eventos desde la API
  useEffect(() => {
    axios
      .get(`${API_URL}?usuario_id=${user.id_users}`)
      .then((response) => {
        const fetchedEvents = response.data.map((event) => ({
          id: event.id_events,
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(fetchedEvents);
      })
      .catch((error) => console.error("Error al cargar eventos:", error));
  }, [user.id_users]);

  // Manejar creación de evento
  const handleCreateEvent = (eventData) => {
    axios
      .post(`${API_URL}/create`, { ...eventData, usuario_id: user.id_users })
      .then((response) => {
        setEvents([...events, { ...eventData, id: response.data.eventId }]);
        setDrawerOpen(false);
      })
      .catch((error) => console.error("Error al crear evento:", error));
  };

  // Actualizar evento
  const handleUpdateEvent = (eventData) => {
    axios
      .put(`${API_URL}/update/${selectedEvent.id}`, { ...eventData, usuario_id: user.id_users })
      .then(() => {
        setEvents(events.map(event => event.id === selectedEvent.id ? { ...eventData, id: selectedEvent.id } : event));
        setModalOpen(false);
      })
      .catch((error) => console.error("Error al actualizar evento:", error));
  };

  // Eliminar evento
  const handleDeleteEvent = () => {
    axios
      .delete(`${API_URL}/delete/${selectedEvent.id}?usuario_id=${user.id_users}`)
      .then(() => {
        setEvents(events.filter((event) => event.id !== selectedEvent.id));
        setModalOpen(false);
      })
      .catch((error) => console.error("Error al eliminar evento:", error));
  };

  const handleSelectSlot = ({ start }) => {
    setSelectedEvent(null);
    setFormData({
      title: "",
      content: "",
      start: moment(start).format("YYYY-MM-DDTHH:mm"),
      end: moment(start).add(1, "hour").format("YYYY-MM-DDTHH:mm"),
      usuario_id: user.id_users,
    });
    setDrawerOpen(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      content: event.content || "",
      start: moment(event.start).format("YYYY-MM-DDTHH:mm"),
      end: moment(event.end).format("YYYY-MM-DDTHH:mm"),
      usuario_id: user.id_users,
    });
    setModalOpen(true);
  };

  const handleCloseDrawer = () => setDrawerOpen(false);
  const handleCloseModal = () => setModalOpen(false);

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
      usuario_id: user.id_users,
    };
    handleCreateEvent(eventData);
  };

  return (
    <div className="text-2xl text-center m-5 px-2">
      <Calendar
        localizer={localizerMoment}
        events={events}
        style={{ height: "95vh", background: "smoke" }}
        defaultView="month"
        messages={messages} 
        components={{
          event: EventCard,
        }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventClick}
        min={new Date(1970, 1, 1, 6)}  // Comienza a las 6:00 AM
      />
      <EventDrawer
        drawerOpen={drawerOpen}
        handleCloseDrawer={handleCloseDrawer}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <EventModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleUpdateEvent={handleUpdateEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
}
