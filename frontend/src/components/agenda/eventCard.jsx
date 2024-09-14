import React from "react";
import PropTypes from "prop-types"; // Importar PropTypes
import { TfiAgenda } from "react-icons/tfi";

const EventCard = ({ event }) => {
  return (
    <div className="flex items-center">
      <TfiAgenda className="text-3xl text-white mr-2" />
      <div>
        <p className="text-white">{event.title}</p>
      </div>
    </div>
  );
};

// Definir PropTypes para validar las props
EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired, // 'title' es obligatorio y debe ser una cadena de texto
  }).isRequired,
};

export default EventCard;
