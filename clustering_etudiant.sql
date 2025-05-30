-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 30 mai 2025 à 16:30
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `clustering_etudiant`
--

-- --------------------------------------------------------

--
-- Structure de la table `affinite`
--

DROP TABLE IF EXISTS `affinite`;
CREATE TABLE IF NOT EXISTS `affinite` (
  `id_affinite` int NOT NULL AUTO_INCREMENT,
  `valeur_affinite` int NOT NULL,
  `etudiant_1` int NOT NULL,
  `etudiant_2` int NOT NULL,
  PRIMARY KEY (`id_affinite`),
  KEY `cle` (`etudiant_1`),
  KEY `cle_2` (`etudiant_2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `form`
--

DROP TABLE IF EXISTS `form`;
CREATE TABLE IF NOT EXISTS `form` (
  `id_form` int NOT NULL AUTO_INCREMENT,
  `date_d` date NOT NULL,
  `date_f` date NOT NULL,
  `nb_choix` int NOT NULL,
  `etat` varchar(30) NOT NULL,
  PRIMARY KEY (`id_form`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `group`
--

DROP TABLE IF EXISTS `group`;
CREATE TABLE IF NOT EXISTS `group` (
  `id_group` int NOT NULL AUTO_INCREMENT,
  `name_group` varchar(30) NOT NULL,
  `student_nb` int NOT NULL,
  PRIMARY KEY (`id_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(30) NOT NULL DEFAULT 'student',
  `id_group` int NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `cle` (`id_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `vote`
--

DROP TABLE IF EXISTS `vote`;
CREATE TABLE IF NOT EXISTS `vote` (
  `id_vote` int NOT NULL AUTO_INCREMENT,
  `votant` int NOT NULL,
  `candidat` int NOT NULL,
  PRIMARY KEY (`id_vote`),
  KEY `votant` (`votant`),
  KEY `candidat` (`candidat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `vote_form`
--

DROP TABLE IF EXISTS `vote_form`;
CREATE TABLE IF NOT EXISTS `vote_form` (
  `id_vote` int NOT NULL,
  `id_form` int NOT NULL,
  PRIMARY KEY (`id_vote`,`id_form`),
  KEY `id_form` (`id_form`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `affinite`
--
ALTER TABLE `affinite`
  ADD CONSTRAINT `affinite_ibfk_1` FOREIGN KEY (`etudiant_1`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `affinite_ibfk_2` FOREIGN KEY (`etudiant_2`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_group`) REFERENCES `group` (`id_group`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `vote`
--
ALTER TABLE `vote`
  ADD CONSTRAINT `vote_ibfk_1` FOREIGN KEY (`votant`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vote_ibfk_2` FOREIGN KEY (`candidat`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `vote_form`
--
ALTER TABLE `vote_form`
  ADD CONSTRAINT `vote_form_ibfk_1` FOREIGN KEY (`id_vote`) REFERENCES `vote` (`id_vote`),
  ADD CONSTRAINT `vote_form_ibfk_2` FOREIGN KEY (`id_form`) REFERENCES `form` (`id_form`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
