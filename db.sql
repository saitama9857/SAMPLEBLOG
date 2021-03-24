SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `ablog`
--
CREATE DATABASE IF NOT EXISTS `ablog` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `ablog`;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `body` text NOT NULL,
  `time` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post`
--

INSERT INTO `post` VALUES
(1, 'fawefrwafcwdesrf', 'awergfg', 1578669480570),
(2, 'fwsaerg', 'gserges', 1578670913269),
(9, 'fwsaerg', '                                                                                    gserges\r\n                        aefwadqwad\r\n                        \r\n                        ', 1578730193),
(11, 'fwaefrwa', 'fwaefwa', 1578730612),
(12, 'ewsafwaf', 'awfefa', 1578730651),
(13, 'fwaefwafe', 'wafewafe', 1578730658),
(14, 'dfwaefwa', 'fwaefwaf', 1578730673),
(15, 'gsergs', 'ewgesrges', 1578730749),
(16, 'awergweasg', 'aewgrweage', 1578730754),
(17, 'gawrgg', 'wagrwag', 1578730760),
(18, 'awgeragrwa', 'gwagwar', 1578730765);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `password` text NOT NULL,
  `privilege` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` VALUES
(1, '123', '123', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;