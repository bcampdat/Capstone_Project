import React from "react";
import { FaBlog, FaCalendarAlt, FaMapMarkedAlt } from "react-icons/fa"; 

export default function About() {
  return (
    <div className="container mt-20 mb-20 mx-auto p-30">
      <h1 className="text-4xl font-bold mb-6 text-amber-300">
        Descubre "MyLifeMap"
      </h1>
      <p className="text-lg mb-6 text-justify">
        MyLifeMap es la app que organiza tu vida con un solo clic.
        <br />
        Bienvenido a MyLifeMap, una aplicación diseñada para aquellos que desean llevar el
        control total de su día a día de una manera sencilla, dinámica y
        personal. Nuestro objetivo es darte las herramientas para que puedas
        gestionar tu tiempo, explorar el mundo y compartir tus ideas, todo
        desde un solo lugar.
        <br />
      </p>
      <h2 className="text-3xl font-semibold mb-4 text-sky-300">
        ¿Qué puedes hacer con MyLifeMap?
      </h2>
      <ul className="list-disc list-inside space-y-4">
        <li className="flex items-start">
          <FaBlog className="text-4xl text-amber-300 mr-3" />
          <div>
            <strong>Crea tu Blog Personal:</strong>
            <br />
            Comparte tus pensamientos, experiencias y reflexiones a través de un blog totalmente
            personalizable. Después de iniciar sesión, puedes crear entradas,
            editarlas y publicarlas para compartir con el mundo o mantenerlas
            privadas.
          </div>
        </li>
        <li className="flex items-start">
          <FaCalendarAlt className="text-4xl text-sky-300 mr-3" />
          <div>
            <strong>Calendario y Gestión de Eventos:</strong>
            <br />
            Accede a tu propio espacio privado donde podrás gestionar tus tareas, citas y eventos de
            una manera rápida y eficiente. Organiza tu día a día y sincroniza tus
            actividades para que nunca te pierdas nada importante. Con nuestra
            agenda inteligente, tu tiempo estará siempre bajo control.
          </div>
        </li>
        <li className="flex items-start">
          <FaMapMarkedAlt className="text-4xl text-blue-800 mr-3" />
          <div>
            <strong>Navegación GPS en Tiempo Real:</strong>
            <br />
            Explora el mundo con precisión. Con MyLifeMap, puedes ver tu ubicación en tiempo real,
            explorar tu entorno y buscar direcciones con facilidad. ¿Tienes una
            reunión o evento en un lugar nuevo? Encuentra la mejor ruta con
            nuestra integración de navegación GPS.
          </div>
        </li>
      </ul>
      <p className="text-lg mt-6">
        En MyLifeMap, creemos que cada persona merece un espacio digital único
        para gestionar su tiempo, sus recuerdos y su camino. Ya sea que estés
        escribiendo sobre tus últimas aventuras o buscando la dirección para tu
        próximo evento, todo está al alcance de tu mano.
      </p>
    </div>
  );
}
