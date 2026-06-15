-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: laboratorio_game
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `ajudas_utilizadas`
--

DROP TABLE IF EXISTS `ajudas_utilizadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ajudas_utilizadas` (
  `id_ajuda_utilizada` int NOT NULL AUTO_INCREMENT,
  `id_partida` int NOT NULL,
  `id_pergunta` int NOT NULL,
  `tipo_ajuda` enum('dica','eliminar_alternativas') COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_uso` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_ajuda_utilizada`),
  KEY `fk_ajuda_partida` (`id_partida`),
  KEY `fk_ajuda_pergunta` (`id_pergunta`),
  CONSTRAINT `fk_ajuda_partida` FOREIGN KEY (`id_partida`) REFERENCES `partidas` (`id_partida`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ajuda_pergunta` FOREIGN KEY (`id_pergunta`) REFERENCES `perguntas` (`id_pergunta`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ajudas_utilizadas`
--

LOCK TABLES `ajudas_utilizadas` WRITE;
/*!40000 ALTER TABLE `ajudas_utilizadas` DISABLE KEYS */;
/*!40000 ALTER TABLE `ajudas_utilizadas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alternativas`
--

DROP TABLE IF EXISTS `alternativas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alternativas` (
  `id_alternativa` int NOT NULL AUTO_INCREMENT,
  `id_pergunta` int NOT NULL,
  `texto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagem_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `correta` tinyint(1) DEFAULT '0',
  `ordem` int DEFAULT '1',
  PRIMARY KEY (`id_alternativa`),
  KEY `fk_alternativa_pergunta` (`id_pergunta`),
  CONSTRAINT `fk_alternativa_pergunta` FOREIGN KEY (`id_pergunta`) REFERENCES `perguntas` (`id_pergunta`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alternativas`
--

LOCK TABLES `alternativas` WRITE;
/*!40000 ALTER TABLE `alternativas` DISABLE KEYS */;
/*!40000 ALTER TABLE `alternativas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dicas`
--

DROP TABLE IF EXISTS `dicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dicas` (
  `id_dica` int NOT NULL AUTO_INCREMENT,
  `id_pergunta` int NOT NULL,
  `texto_dica` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_dica`),
  KEY `fk_dica_pergunta` (`id_pergunta`),
  CONSTRAINT `fk_dica_pergunta` FOREIGN KEY (`id_pergunta`) REFERENCES `perguntas` (`id_pergunta`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dicas`
--

LOCK TABLES `dicas` WRITE;
/*!40000 ALTER TABLE `dicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `dicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modos_jogo`
--

DROP TABLE IF EXISTS `modos_jogo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modos_jogo` (
  `id_modo` int NOT NULL AUTO_INCREMENT,
  `nome_modo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nivel` int NOT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_modo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modos_jogo`
--

LOCK TABLES `modos_jogo` WRITE;
/*!40000 ALTER TABLE `modos_jogo` DISABLE KEYS */;
INSERT INTO `modos_jogo` VALUES (1,'Modo 1 - Fácil','Identificação de materiais de laboratório',1,1),(2,'Modo 2 - Médio','Associação de materiais e sistemas experimentais',2,1);
/*!40000 ALTER TABLE `modos_jogo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partidas`
--

DROP TABLE IF EXISTS `partidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partidas` (
  `id_partida` int NOT NULL AUTO_INCREMENT,
  `id_aluno` int NOT NULL,
  `id_modo` int NOT NULL,
  `pontuacao_total` int DEFAULT '0',
  `quantidade_acertos` int DEFAULT '0',
  `quantidade_erros` int DEFAULT '0',
  `total_perguntas` int DEFAULT '0',
  `data_inicio` datetime DEFAULT CURRENT_TIMESTAMP,
  `data_fim` datetime DEFAULT NULL,
  `status_partida` enum('em_andamento','finalizada','cancelada') COLLATE utf8mb4_unicode_ci DEFAULT 'em_andamento',
  PRIMARY KEY (`id_partida`),
  KEY `idx_partidas_aluno` (`id_aluno`),
  KEY `idx_partidas_modo` (`id_modo`),
  CONSTRAINT `fk_partida_aluno` FOREIGN KEY (`id_aluno`) REFERENCES `usuarios` (`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_partida_modo` FOREIGN KEY (`id_modo`) REFERENCES `modos_jogo` (`id_modo`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partidas`
--

LOCK TABLES `partidas` WRITE;
/*!40000 ALTER TABLE `partidas` DISABLE KEYS */;
/*!40000 ALTER TABLE `partidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perguntas`
--

DROP TABLE IF EXISTS `perguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perguntas` (
  `id_pergunta` int NOT NULL AUTO_INCREMENT,
  `id_modo` int NOT NULL,
  `id_professor_criador` int DEFAULT NULL,
  `enunciado` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagem_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_pergunta` enum('identificacao','multipla_escolha','associacao') COLLATE utf8mb4_unicode_ci DEFAULT 'multipla_escolha',
  `resposta_correta_texto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pontuacao` int DEFAULT '10',
  `ativa` tinyint(1) DEFAULT '1',
  `data_criacao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pergunta`),
  KEY `fk_pergunta_professor` (`id_professor_criador`),
  KEY `idx_perguntas_modo` (`id_modo`),
  CONSTRAINT `fk_pergunta_modo` FOREIGN KEY (`id_modo`) REFERENCES `modos_jogo` (`id_modo`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_pergunta_professor` FOREIGN KEY (`id_professor_criador`) REFERENCES `usuarios` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perguntas`
--

LOCK TABLES `perguntas` WRITE;
/*!40000 ALTER TABLE `perguntas` DISABLE KEYS */;
/*!40000 ALTER TABLE `perguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respostas_partida`
--

DROP TABLE IF EXISTS `respostas_partida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respostas_partida` (
  `id_resposta_partida` int NOT NULL AUTO_INCREMENT,
  `id_partida` int NOT NULL,
  `id_pergunta` int NOT NULL,
  `id_alternativa` int DEFAULT NULL,
  `resposta_texto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `correta` tinyint(1) NOT NULL,
  `pontos_obtidos` int DEFAULT '0',
  `data_resposta` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_resposta_partida`),
  KEY `fk_resposta_pergunta` (`id_pergunta`),
  KEY `fk_resposta_alternativa` (`id_alternativa`),
  KEY `idx_respostas_partida` (`id_partida`),
  CONSTRAINT `fk_resposta_alternativa` FOREIGN KEY (`id_alternativa`) REFERENCES `alternativas` (`id_alternativa`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_resposta_partida` FOREIGN KEY (`id_partida`) REFERENCES `partidas` (`id_partida`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_resposta_pergunta` FOREIGN KEY (`id_pergunta`) REFERENCES `perguntas` (`id_pergunta`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respostas_partida`
--

LOCK TABLES `respostas_partida` WRITE;
/*!40000 ALTER TABLE `respostas_partida` DISABLE KEYS */;
/*!40000 ALTER TABLE `respostas_partida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turmas`
--

DROP TABLE IF EXISTS `turmas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turmas` (
  `id_turma` int NOT NULL AUTO_INCREMENT,
  `nome_turma` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ano_letivo` year NOT NULL,
  `ativa` tinyint(1) DEFAULT '1',
  `data_criacao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_turma`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turmas`
--

LOCK TABLES `turmas` WRITE;
/*!40000 ALTER TABLE `turmas` DISABLE KEYS */;
INSERT INTO `turmas` VALUES (1,'1º Química A',2026,1,'2026-06-11 19:34:41');
/*!40000 ALTER TABLE `turmas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_usuario` enum('aluno','professor') COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_turma` int DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT '1',
  `data_criacao` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_usuario_turma` (`id_turma`),
  KEY `idx_usuarios_tipo` (`tipo_usuario`),
  CONSTRAINT `fk_usuario_turma` FOREIGN KEY (`id_turma`) REFERENCES `turmas` (`id_turma`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Professor Teste','professor.teste@cps.sp.gov.br','123456','professor',NULL,1,'2026-06-11 19:34:41'),(2,'Aluno Teste','aluno.teste@aluno.cps.sp.gov.br','123456','aluno',1,1,'2026-06-11 19:34:41');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-11 19:41:47
