-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2026 at 04:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `otp` int(11) DEFAULT NULL,
  `otp_expire_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `otp`, `otp_expire_time`) VALUES
(1, 'Vidul', '$2b$10$Dt1fo24EQhab4R9S1QzlTu0b/YJ9Z6NURRLBWZ4qbV9Svh7zkicyW', 'vidul@gmail.com', 619628, '2026-03-17 03:33:36'),
(2, 'kamal', '$2b$10$rpzfKa.7Jdt3eB9A9WDlueF.FC2uroN9eAEpJJSp3a7.NfhClyTnC', 'kamal@example.com', NULL, NULL),
(3, 'pasindu', '$2b$10$K/uG89rX.kuTYYl0nZs0Ye/cOsY7XAXWgbFiDK7Hcme5uSJbweLDq', 'pasindu@gmail.com', 729390, '2026-03-13 05:33:41'),
(4, 'Pasi', '$2b$10$WcD4ekW9/42bnOS95Bx6LehJFTJXp0rRTQ9z5BbKozD/TR3MAr5YG', 'pasindu@example.com', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
