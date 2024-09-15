import React from "react";
import PropTypes from "prop-types";
import { TfiAgenda } from "react-icons/tfi";

const EventCard = ({ event }) => {
  return (
    <div className="flex w-full bg-amber-400 rounded-lg items-center">
      <TfiAgenda className="text-2xl text-white bg-sky-400 mx-3" />
      <div
        style={{
          maxWidth: "150px",
          wordWrap: "break-word",
          textAlign: "center",
        }}
      >
        <p className="text-black">{event.title}</p>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
