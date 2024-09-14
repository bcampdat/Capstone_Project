// src/components/EventCard.js
import React from "react";
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

export default EventCard;
