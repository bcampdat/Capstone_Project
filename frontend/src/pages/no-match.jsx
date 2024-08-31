import React from "react";
import { Link } from "react-router-dom";

export default  function NoMatch () {
  return (
    <div>
      <h2>We couldn't find that page</h2>
      <h1><i class="pi pi-spin pi-spinner" style="font-size: 2rem" ></i> Upps! Pagina no encontrada....</h1>
      <img src="https://klizos.com/wp-content/uploads/funny-404-error-page-GIF-klizo-solutions.gif" class="img-fluid"
      alt="No encontrado" width="100%" />
      <Link to="/">Return to homepage</Link>
    </div>
  );
}