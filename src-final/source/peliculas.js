var express = require("express");
var router = express.Router();

//---IMPORTACIÓN DE LAS 405 PELICULAS
var peliculas = require("./listado_peliculas");
const misPeliculas = new peliculas();

router.get("/peliculas", function (req, res, next) {
  try {
    //Impresión de las peliculas en consola
    console.log(misPeliculas.peliculas);
    res.status(200).send({ mensaje: "Estoy en el get de peliculas" });
  } catch (error) {
    res.status(400).send({ mensaje: "Ha ocurrido un error!" });
  }
});

router.delete("/peliculas/eliminar", function (req, res, next) {
  try {
    let respuesta = {};
    respuesta.informacion = misPeliculas.eliminarPeliculasSinGenero();
    respuesta.cantidad = respuesta.informacion.length;
    respuesta.mensaje = "Eliminó peliculas sin genero";    
    res.status(200).send(respuesta)
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ mensaje: "Ha ocurrido un error!" });
  }
});

router.get("/peliculas/listar", function (req, res, next) {
  try {
    let respuesta = {};
    respuesta.informacion = misPeliculas.listarPeliculasComedia();
    respuesta.cantidad = respuesta.informacion.length;
    respuesta.mensaje = "Lista peliculas de comedia";
    res.status(200).send(respuesta)
  } catch (error) {
    console.log(error);
    
    res.status(400).send({ mensaje: "Ha ocurrido un error!" });
  }
});

router.get("/peliculas/:ubicacion", function (req, res, next) {
  try {
    let ubicacion = req.params.ubicacion;
    let respuesta = {};
    respuesta.informacion = misPeliculas.listarPeliculasUbicacion(ubicacion);
    respuesta.cantidad = respuesta.informacion.length;
    respuesta.mensaje = "listar por ubicacion";
    res.status(200).send(respuesta)
  } catch (error) {
    console.log(error);
    res.status(400).send({ mensaje: "Ha ocurrido un error!" });
  }
});

router.get("/peliculas/buscar/:nombre", function (req, res, next) {
  try {
    let nombre = req.params.nombre;
    let respuesta = {};
    respuesta.informacion = misPeliculas.buscarPelicula(nombre);
    respuesta.cantidad = respuesta.informacion.length;
    respuesta.mensaje = "buscar por nombre";
    res.status(200).send(respuesta)
  } catch (error) {
    console.log(error);
    res.status(400).send({ mensaje: "Ha ocurrido un error!" });
  }
});

router.get("/peliculas/listar/:anio1/:anio2", function (req, res, next) {
  try {
    let anio1 = req.params.anio1;
    let anio2 = req.params.anio2;
    let respuesta = {};
    respuesta.informacion = misPeliculas.listarPeliculasAnio(anio1, anio2);
    respuesta.cantidad = respuesta.informacion.length;
    respuesta.mensaje = "Listar por año";
    res.status(200).send(respuesta)
  } catch (error) {
    console.log(error);
    res.status(400).send({ mensaje: "Ha ocurrido un error!" });
  }
});

module.exports = router;
