CREATE DATABASE  IF NOT EXISTS `mycap_stone` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `mycap_stone`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mycap_stone
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_users`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (2,'Eneritz urtebetxea','zorionak','2024-09-22 04:00:00','2024-09-22 19:00:00',1);
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` Longtext NOT NULL,
  `featured_image` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id_users`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'prueba 1','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus et leo eu ullamcorper. Aliquam quis neque eget lectus vestibulum posuere consequat eget nibh. Morbi feugiat quam justo, a sagittis turpis facilisis vitae. Etiam interdum, leo et faucibus convallis, dolor eros fringilla diam, posuere euismod ex nulla quis turpis. Ut sed neque arcu. Nulla leo nibh, dapibus ac commodo id, blandit eget justo. Vestibulum laoreet sem ipsum, iaculis vestibulum orci convallis ut.','https://picsum.photos/200/300',1),(2,'prueba 2','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus et leo eu ullamcorper. Aliquam quis neque eget lectus vestibulum posuere consequat eget nibh. Morbi feugiat quam justo, a sagittis turpis facilisis vitae. Etiam interdum, leo et faucibus convallis, dolor eros fringilla diam, posuere euismod ex nulla quis turpis. Ut sed neque arcu. Nulla leo nibh, dapibus ac commodo id, blandit eget justo. Vestibulum laoreet sem ipsum, iaculis vestibulum orci convallis ut.','https://picsum.photos/200/300',1),(3,'prueba 3','klmdsfnlsd vlsnfofsjanlc ln lspjodfu9aheofncl l','https://picsum.photos/200/300',1),(4,'prueba 4','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus et leo eu ullamcorper. Aliquam quis neque eget lectus vestibulum posuere consequat eget nibh. Morbi feugiat quam justo, a sagittis turpis facilisis vitae. Etiam interdum, leo et faucibus convallis, dolor eros fringilla diam, posuere euismod ex nulla quis turpis. Ut sed neque arcu. Nulla leo nibh, dapibus ac commodo id, blandit eget justo. Vestibulum laoreet sem ipsum, iaculis vestibulum orci convallis ut.','https://picsum.photos/200/300',1),(5,'prueba 5','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus et leo eu ullamcorper. Aliquam quis neque eget lectus vestibulum posuere consequat eget nibh. Morbi feugiat quam justo, a sagittis turpis facilisis vitae. Etiam interdum, leo et faucibus convallis, dolor eros fringilla diam, posuere euismod ex nulla quis turpis. Ut sed neque arcu. Nulla leo nibh, dapibus ac commodo id, blandit eget justo. Vestibulum laoreet sem ipsum, iaculis vestibulum orci convallis ut.',NULL,1),(6,'prueba 6','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus et leo eu ullamcorper. Aliquam quis neque eget lectus vestibulum posuere consequat eget nibh. Morbi feugiat quam justo, a sagittis turpis facilisis vitae. Etiam interdum, leo et faucibus convallis, dolor eros fringilla diam, posuere euismod ex nulla quis turpis. Ut sed neque arcu. Nulla leo nibh, dapibus ac commodo id, blandit eget justo. Vestibulum laoreet sem ipsum, iaculis vestibulum orci convallis ut.',NULL,1),(7,'prueba 7','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus et leo eu ullamcorper. Aliquam quis neque eget lectus vestibulum posuere consequat eget nibh. Morbi feugiat quam justo, a sagittis turpis facilisis vitae. Etiam interdum, leo et faucibus convallis, dolor eros fringilla diam, posuere euismod ex nulla quis turpis. Ut sed neque arcu. Nulla leo nibh, dapibus ac commodo id, blandit eget justo. Vestibulum laoreet sem ipsum, iaculis vestibulum orci convallis ut.',NULL,1),(8,'prueba 8','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus et leo eu ullamcorper. Aliquam quis neque eget lectus vestibulum posuere consequat eget nibh. Morbi feugiat quam justo, a sagittis turpis facilisis vitae. Etiam interdum, leo et faucibus convallis, dolor eros fringilla diam, posuere euismod ex nulla quis turpis. Ut sed neque arcu. Nulla leo nibh, dapibus ac commodo id, blandit eget justo. Vestibulum laoreet sem ipsum, iaculis vestibulum orci convallis ut.',NULL,1),(9,'prueba 9','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus et leo eu ullamcorper. Aliquam quis neque eget lectus vestibulum posuere consequat eget nibh. Morbi feugiat quam justo, a sagittis turpis facilisis vitae. Etiam interdum, leo et faucibus convallis, dolor eros fringilla diam, posuere euismod ex nulla quis turpis. Ut sed neque arcu. Nulla leo nibh, dapibus ac commodo id, blandit eget justo. Vestibulum laoreet sem ipsum, iaculis vestibulum orci convallis ut.',NULL,1),(10,'prueba 10','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus et leo eu ullamcorper. Aliquam quis neque eget lectus vestibulum posuere consequat eget nibh. Morbi feugiat quam justo, a sagittis turpis facilisis vitae. Etiam interdum, leo et faucibus convallis, dolor eros fringilla diam, posuere euismod ex nulla quis turpis. Ut sed neque arcu. Nulla leo nibh, dapibus ac commodo id, blandit eget justo. Vestibulum laoreet sem ipsum, iaculis vestibulum orci convallis ut.','https://picsum.photos/200/300',1),(11,'prueba 11','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus et leo eu ullamcorper. Aliquam quis neque eget lectus vestibulum posuere consequat eget nibh. Morbi feugiat quam justo, a sagittis turpis facilisis vitae. Etiam interdum, leo et faucibus convallis, dolor eros fringilla diam, posuere euismod ex nulla quis turpis. Ut sed neque arcu. Nulla leo nibh, dapibus ac commodo id, blandit eget justo. Vestibulum laoreet sem ipsum, iaculis vestibulum orci convallis ut.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus et leo eu ullamcorper. Aliquam quis neque eget lectus vestibulum posuere consequat eget nibh. Morbi feugiat quam justo, a sagittis turpis facilisis vitae. Etiam interdum, leo et faucibus convallis, dolor eros fringilla diam, posuere euismod ex nulla quis turpis. Ut sed neque arcu. Nulla leo nibh, dapibus ac commodo id, blandit eget justo. Vestibulum laoreet sem ipsum, iaculis vestibulum orci convallis ut.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus et leo eu ullamcorper. Aliquam quis neque eget lectus vestibulum posuere consequat eget nibh. Morbi feugiat quam justo, a sagittis turpis facilisis vitae. Etiam interdum, leo et faucibus convallis, dolor eros fringilla diam, posuere euismod ex nulla quis turpis. Ut sed neque arcu. Nulla leo nibh, dapibus ac commodo id, blandit eget justo. Vestibulum laoreet sem ipsum, iaculis vestibulum orci convallis ut.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus et leo eu ullamcorper. Aliquam quis neque eget lectus vestibulum posuere consequat eget nibh. Morbi feugiat quam justo, a sagittis turpis facilisis vitae. Etiam interdum, leo et faucibus convallis, dolor eros fringilla diam, posuere euismod ex nulla quis turpis. Ut sed neque arcu. Nulla leo nibh, dapibus ac commodo id, blandit eget justo. Vestibulum laoreet sem ipsum, iaculis vestibulum orci convallis ut.','https://picsum.photos/200/300',1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_users` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `foto_users` varchar(255) DEFAULT NULL,
  `role` enum('guest','admin') DEFAULT 'guest',
  PRIMARY KEY (`id_users`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'dev','dev@camp','$2a$12$kspV4oDvKLFUOr4OPWatGeuZUEd.NkXQpoI14Mk5KSUexsdlevxv.','','admin'),(2,'user','user@name','contra',NULL,'guest'),(3,'dev','camp@camp','$2b$12$sD2pEy/zyJxqKzk9SL.WleEXO4FATUyEWOcktgKC0nfljplJmZ3rS','','guest'),(4,'dev','camp@camp','$2b$12$vf4lgs1T/FxcX65JqimkxuoxkWu08Tkp5FUNr0403EBHJPM4lC11W','','guest'),(5,'user','user@contra.es','$2b$12$H0RnOCnPwAxl53lYxtE83utbH3xnAEaWNWN.tr0BoLVBuHnYAXZgu','','guest'),(6,'hola','hola@gmail.com','$2b$12$kbr.BHbvSxJel9dC2TM6hONnAqBTtKMjTUckDa/YyZ5.SZoB/j4zK','','guest');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'mycap_stone'
--

--
-- Dumping routines for database 'mycap_stone'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-06 17:27:06
