import React from 'react'
import moment from 'moment'
import 'moment/locale/es';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/sass/styles.scss';

import { TfiAgenda } from "react-icons/tfi";
import { FaCalendarCheck } from "react-icons/fa";



moment.locale("es-ES", {
	week: {
		dow: 1, // Monday is the first day of the week
	},
});

export default function MyCalendar(props) {
  const localizer = momentLocalizer(moment)

  const myEventsList = [
    {      
      title: 'Evento 1',
      content: 'Contenido del evento 1',
      start: moment("2024-08-26T00:00").toDate(),
      end: moment("2024-08-26T00:00").toDate(),
    },
    {
      title: 'Evento 2',
      start: moment("2024-08-01T00:00").toDate(),
      end: moment("2024-08-01T00:00").toDate(),
    },
    // ...
  ];
   
  const MyEventsFormat = {
    event: ({ event }) => {
      return (
        <div className="flex items-center">
          <TfiAgenda className="text-3xl text-white mr-2" />
          <div>
            <p className="text-white">{event.title}</p>
          </div>
        </div>
      );
    },
    agenda: ({ date }) => {
      return (
        <div className="flex items-center">
          <FaCalendarCheck className="text-3xl text-white mr-2" />
          <div>
            <p className="text-white">{date.toLocaleDateString()}</p>
          </div>
        </div>
      );
    },
  };

  return (
    <div className='text-2xl text-center mt-10'> 
      <Calendar         
        localizer={localizer}
        events={myEventsList}       
        style={{ height: "95vh", background : "black" }}
        defaultView="month"
        components={MyEventsFormat}
      />       
      </div>          
  );  
}
