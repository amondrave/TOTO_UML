-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-07-2020 a las 22:38:44
-- Versión del servidor: 5.6.17
-- Versión de PHP: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `diagramasclases`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atributo`
--

CREATE TABLE IF NOT EXISTS `atributo` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `id_clase` int(2) NOT NULL,
  `id_tipo` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tipo` (`id_tipo`),
  KEY `FK_clase` (`id_clase`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clase`
--

CREATE TABLE IF NOT EXISTS `clase` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `id_diagrama` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_diagrama` (`id_diagrama`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagrama`
--

CREATE TABLE IF NOT EXISTS `diagrama` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multiplicidad`
--

CREATE TABLE IF NOT EXISTS `multiplicidad` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `desc` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `relaciones`
--

CREATE TABLE IF NOT EXISTS `relaciones` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `clase_origen` int(2) NOT NULL,
  `clase_destino` int(2) NOT NULL,
  `id_multiplicidad` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_origen` (`clase_origen`),
  KEY `FK_destino` (`clase_destino`),
  KEY `fk_m` (`id_multiplicidad`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_dato`
--

CREATE TABLE IF NOT EXISTS `tipo_dato` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `atributo`
--
ALTER TABLE `atributo`
  ADD CONSTRAINT `atributo_ibfk_2` FOREIGN KEY (`id_clase`) REFERENCES `clase` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `atributo_ibfk_1` FOREIGN KEY (`id_tipo`) REFERENCES `tipo_dato` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `clase`
--
ALTER TABLE `clase`
  ADD CONSTRAINT `clase_ibfk_1` FOREIGN KEY (`id_diagrama`) REFERENCES `diagrama` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `relaciones`
--
ALTER TABLE `relaciones`
  ADD CONSTRAINT `relaciones_ibfk_3` FOREIGN KEY (`id_multiplicidad`) REFERENCES `multiplicidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relaciones_ibfk_1` FOREIGN KEY (`clase_origen`) REFERENCES `clase` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relaciones_ibfk_2` FOREIGN KEY (`clase_destino`) REFERENCES `clase` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
