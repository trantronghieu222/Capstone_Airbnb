/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `BinhLuan` (
  `ma_binh_luan` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int DEFAULT NULL,
  `ma_nguoi_binh_luan` int DEFAULT NULL,
  `ngay_binh_luan` varchar(20) DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  PRIMARY KEY (`ma_binh_luan`),
  KEY `ma_phong` (`ma_phong`),
  KEY `ma_nguoi_binh_luan` (`ma_nguoi_binh_luan`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`ma_phong`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `NguoiDung` (`ma_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DatPhong` (
  `ma_dat_phong` int NOT NULL AUTO_INCREMENT,
  `ma_phong` int DEFAULT NULL,
  `ngay_den` varchar(20) DEFAULT NULL,
  `ngay_di` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `so_luong_khach` int DEFAULT NULL,
  `ma_nguoi_dat` int DEFAULT NULL,
  PRIMARY KEY (`ma_dat_phong`),
  KEY `ma_phong` (`ma_phong`),
  KEY `ma_nguoi_dat` (`ma_nguoi_dat`),
  CONSTRAINT `dat_phong_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `Phong` (`ma_phong`),
  CONSTRAINT `dat_phong_ibfk_2` FOREIGN KEY (`ma_nguoi_dat`) REFERENCES `NguoiDung` (`ma_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `ma_nguoi_dung` int NOT NULL AUTO_INCREMENT,
  `ten_nguoi_dung` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `so_dt` varchar(20) DEFAULT NULL,
  `ngay_sinh` varchar(20) DEFAULT NULL,
  `gioi_tinh` tinyint(1) DEFAULT NULL,
  `vai_tro` varchar(10) DEFAULT NULL,
  `da_xoa` tinyint(1) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_nguoi_dung`)
) ENGINE=InnoDB AUTO_INCREMENT=123130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Phong` (
  `ma_phong` int NOT NULL AUTO_INCREMENT,
  `ten_phong` varchar(255) DEFAULT NULL,
  `khach` int DEFAULT NULL,
  `phong_ngu` int DEFAULT NULL,
  `giuong` int DEFAULT NULL,
  `phong_tam` int DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `may_giat` tinyint(1) DEFAULT NULL,
  `ban_la` tinyint(1) DEFAULT NULL,
  `tivi` tinyint(1) DEFAULT NULL,
  `dieu_hoa` tinyint(1) DEFAULT NULL,
  `bep` tinyint(1) DEFAULT NULL,
  `do_xe` tinyint(1) DEFAULT NULL,
  `ho_boi` tinyint(1) DEFAULT NULL,
  `ban_ui` tinyint(1) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `ma_vi_tri` int DEFAULT NULL,
  `da_xoa` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ma_phong`),
  KEY `ma_vi_tri` (`ma_vi_tri`),
  CONSTRAINT `phong_ibfk_1` FOREIGN KEY (`ma_vi_tri`) REFERENCES `ViTri` (`ma_vi_tri`)
) ENGINE=InnoDB AUTO_INCREMENT=123125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ViTri` (
  `ma_vi_tri` int NOT NULL AUTO_INCREMENT,
  `ten_vi_tri` varchar(255) DEFAULT NULL,
  `tinh_thanh` varchar(255) DEFAULT NULL,
  `quoc_gia` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `da_xoa` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ma_vi_tri`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`ma_binh_luan`, `ma_phong`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(1, 1, 1, '11/09/2024', 'Phòng đẹp, dịch vụ tốt', 4);


INSERT INTO `DatPhong` (`ma_dat_phong`, `ma_phong`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_nguoi_dat`) VALUES
(1, 1, '11/09/2024', '15/09/2024', 5, 1);
INSERT INTO `DatPhong` (`ma_dat_phong`, `ma_phong`, `ngay_den`, `ngay_di`, `so_luong_khach`, `ma_nguoi_dat`) VALUES
(2, 2, '20/09/2024', '22/09/2024', 3, 2);


INSERT INTO `NguoiDung` (`ma_nguoi_dung`, `ten_nguoi_dung`, `email`, `mat_khau`, `so_dt`, `ngay_sinh`, `gioi_tinh`, `vai_tro`, `da_xoa`, `avatar`) VALUES
(1, 'Trần Trọng Hiếu', 'tranhieu123@gmail.com', '$2b$10$IZL/NPFzLthHS6touchl/ubT9A92EbSksFdfhCmaTF1GvNvwjUYTi', '0986756453', '12/08/2003', 0, 'admin', 0, '1727683357151_avatar.jpg');
INSERT INTO `NguoiDung` (`ma_nguoi_dung`, `ten_nguoi_dung`, `email`, `mat_khau`, `so_dt`, `ngay_sinh`, `gioi_tinh`, `vai_tro`, `da_xoa`, `avatar`) VALUES
(2, 'Nguyễn Văn A', 'vana123@gmail.com', '$2b$10$tNnTMQvwKikFHShxPvha0.XAljA2kWR74b6LpLY/5Yu/aFZ4OUSeq', '0987564534', '06/12/2000', 0, 'user', 0, NULL);
INSERT INTO `NguoiDung` (`ma_nguoi_dung`, `ten_nguoi_dung`, `email`, `mat_khau`, `so_dt`, `ngay_sinh`, `gioi_tinh`, `vai_tro`, `da_xoa`, `avatar`) VALUES
(3, 'Lê Văn Bình', 'vanbinh009@gmail.com', '$2b$10$tNnTMQvwKikFHShxPvha0.XAljA2kWR74b6LpLY/5Yu/aFZ4OUSeq', '0987563599', '21/12/2005', 0, 'admin', 0, NULL);
INSERT INTO `NguoiDung` (`ma_nguoi_dung`, `ten_nguoi_dung`, `email`, `mat_khau`, `so_dt`, `ngay_sinh`, `gioi_tinh`, `vai_tro`, `da_xoa`, `avatar`) VALUES
(123, 'Nguyễn Thị C', 'nguyenthic121@gmail.com', '$2b$10$tNnTMQvwKikFHShxPvha0.XAljA2kWR74b6LpLY/5Yu/aFZ4OUSeq', '098653753', '12/02/1998', 1, 'user', 0, NULL),
(124, 'Trần Văn C', 'tranvanc1@gmail.com', '$2b$10$tNnTMQvwKikFHShxPvha0.XAljA2kWR74b6LpLY/5Yu/aFZ4OUSeq', '0987463521', '12/08/2001', 0, 'user', 0, NULL),
(125, 'Nguyễn Ngọc Bích Trâm', 'bichtram123@gmail.com', '$2b$10$tNnTMQvwKikFHShxPvha0.XAljA2kWR74b6LpLY/5Yu/aFZ4OUSeq', '0987262121', '13/01/2000', 1, 'user', 0, NULL),
(128, 'Tester 1', 'tester001@gmail.com', '$2b$10$tNnTMQvwKikFHShxPvha0.XAljA2kWR74b6LpLY/5Yu/aFZ4OUSeq', '012329271', '12/08/2000', 1, 'user', 0, NULL),
(129, 'Tester 2 ddaay ne', 'tester2@gmail.com', '$2b$10$tNnTMQvwKikFHShxPvha0.XAljA2kWR74b6LpLY/5Yu/aFZ4OUSeq', '0987675312', '06/12/2020', 1, 'user', 0, NULL),
(130, 'Trần Trọng Hiếu', 'tranhieu001@gmail.com', '$2b$10$VusTDyiQBQyDvx3BcrOZxuloqFdKNK7TO6k7dNlNJK46qbBGVMXKu', '09141241', '12/08/2003', 1, 'user', 0, NULL),
(131, 'user001', 'user001@gmail.com', '$2b$10$YMfIRtCzjdd0ey/b378.oOIqw/tlz5y1ovqtzO9qEZReP.dB4CJbq', '09124987', '22/08/2000', 1, 'user', 0, '1727791984489_avatar.png'),
(123123, 'string', 'string@gmail.com', '$2b$10$fghohSlnLiqA1NQmEpEOauFbfKSsNOQ4i1yyv6os7jMnpP4m/A5Qq', '12312312', '12/08/2001', 1, 'admin', 0, NULL),
(123124, 'user002', 'user002@gmail.com', '$2b$10$rorHEMeLlUpwFhj3co9hLOOQWpchZF6JSCYJX6ZyZXMs7Nt.aJJRC', '0987656789', '12/08/2000', 1, 'user', 0, NULL),
(123125, 'user005', 'user005@gmail.com', '$2b$10$GqB9BYC6Or3ZVs/ik1irNe9.CohGsBRyLSNrSgyL7Q7jBI6Ew3jCS', '09009941', '10/04/1992', 0, 'user', 1, '1728051100545_avt.jpg'),
(123126, 'tester100', 'tester100@gmail.com', '$2b$10$iNUFKe8MRiLDdhSEKKVhdeeKveTKKZSmuzzL5ZC14/YREb5.l99b.', '123', '12/08/1999', 1, 'user', 0, NULL),
(123128, 'test001', 'test001@gmail.com', '$2b$10$.LXImEBRSQloEfOzgwH9MOxlacZbpbehY13wVxVnpnkEfRsQRBvta', '09712412', '12/07/1999', 0, 'user', 0, NULL),
(123129, 'test003', 'test002@gmail.com', '$2b$10$DA5DqvCo4ONP2GfWE82NxuIIcJ4yKt18gbH57N1Y0sN2DQZiSUZA.', '1234121', '10/02/2000', 1, 'user', 0, '1728131899283_avatar_test003.jpg');

INSERT INTO `Phong` (`ma_phong`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `da_xoa`) VALUES
(1, 'Phòng Standard', 3, 2, 2, 1, 'Phòng giá rê', 20, 1, 1, 1, 1, 1, 1, 0, 1, '1726579313943_anh-dep-44.jpg', 1, 1);
INSERT INTO `Phong` (`ma_phong`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `da_xoa`) VALUES
(2, 'Deluxe', 3, 2, 2, 2, 'Phòng Deluxe Cao Cấp', 90, 1, 1, 1, 1, 1, 1, 1, 1, '1728130848889_anhphong2.jpg', 1, 0);
INSERT INTO `Phong` (`ma_phong`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `da_xoa`) VALUES
(4, 'Phòng Superior', 2, 1, 1, 1, 'Phòng rộng rãi, có ban công nhìn ra biển', 35, 1, 1, 1, 1, 1, 1, 1, 1, 'phong_superior.jpg', 1, 1);
INSERT INTO `Phong` (`ma_phong`, `ten_phong`, `khach`, `phong_ngu`, `giuong`, `phong_tam`, `mo_ta`, `gia_tien`, `may_giat`, `ban_la`, `tivi`, `dieu_hoa`, `bep`, `do_xe`, `ho_boi`, `ban_ui`, `hinh_anh`, `ma_vi_tri`, `da_xoa`) VALUES
(5, 'Phòng Superior với ban công', 3, 1, 1, 1, 'Phòng tiện nghi với ban công riêng, nội thất hiện đại, có bếp nhỏ và điều hòa.', 20, 0, 1, 1, 1, 1, 1, 1, 0, 'https://example.com/images/phong-superior-ban-cong.jpg', 3, 0),
(6, 'Phòng Standard giá rẻ', 2, 1, 1, 1, 'Phòng nhỏ gọn, phù hợp cho 2 người, có đầy đủ các tiện ích cơ bản với giá cả hợp lý.', 40, 0, 0, 1, 1, 0, 1, 0, 0, '1728050147507_anhphong6.jpg', 1, 0),
(7, 'Phòng Suite với phòng khách riêng', 6, 3, 3, 3, 'Phòng Suite cao cấp với phòng khách riêng biệt, trang bị đầy đủ các tiện nghi cao cấp như hồ bơi, bếp và phòng tắm riêng.', 35, 1, 1, 1, 1, 1, 1, 1, 1, 'https://example.com/images/phong-suite-phong-khach-rieng.jpg', 6, 0),
(8, 'Phòng Penthouse sang trọng', 8, 4, 4, 4, 'Phòng Penthouse với không gian rộng lớn, view toàn cảnh thành phố và bãi biển, trang bị đầy đủ các tiện nghi cao cấp nhất.', 87, 1, 1, 1, 1, 1, 1, 1, 1, 'https://example.com/images/phong-penthouse-sang-trong.jpg', 4, 0),
(9, 'Phòng Studio Hiện Đại', 2, 1, 1, 1, 'Phòng studio nhỏ gọn với thiết kế hiện đại, đầy đủ tiện nghi cho cặp đôi hoặc du khách một mình.', 50, 0, 1, 1, 1, 0, 1, 0, 1, 'https://example.com/images/phong-studio-hien-dai.jpg', 4, 0),
(10, 'Phòng Suite Cao Cấp', 6, 3, 3, 2, 'Phòng suite rộng rãi với nội thất sang trọng, trang bị đầy đủ các tiện nghi cao cấp, lý tưởng cho gia đình hoặc nhóm bạn.', 80, 1, 1, 1, 1, 1, 1, 1, 1, 'https://example.com/images/phong-suite-cao-cap.jpg', 6, 0),
(11, 'Phòng Deluxe View Biển', 4, 2, 2, 2, 'Phòng rộng rãi với view biển, trang bị đầy đủ tiện nghi hiện đại.', 60, 1, 1, 1, 1, 1, 1, 1, 1, 'https://example.com/images/phong-deluxe-view-bien.jpg', 3, 1),
(12, 'phòng vip 12', 3, 2, 2, 2, 'phòng vip 12', 45, 1, 1, 1, 1, 1, 1, 1, 0, 'string', 2, 1),
(101, 'Phòng Deluxe với view biển', 4, 2, 2, 2, 'Phòng rộng rãi với view biển tuyệt đẹp, đầy đủ tiện nghi hiện đại như máy giặt, tivi, điều hòa và bếp.', 70, 1, 0, 1, 1, 1, 1, 0, 1, 'phong-deluxe-view-bien.jpg', 2, 0),
(123, 'Phòng view rộng', 1, 2, 1, 2, 'sdfs', 35, 1, 1, 1, 1, 1, 1, 1, 1, NULL, 2, 1),
(124, 'phòng vip 2', 0, 0, 0, 0, 'string', 50, 1, 1, 1, 1, 1, 1, 1, 1, 'string', 1, 1),
(123123, 'phòng vip 2', 4, 2, 2, 2, 'phòng vip 1 đổi sang phòng vip 2', 28, 1, 1, 1, 1, 1, 1, 1, 1, 'string', 2, 1),
(123124, 'Phòng vip 10', 4, 2, 2, 2, 'Phòng vip 1', 27, 1, 1, 1, 1, 1, 1, 1, 1, 'string', 10, 0);

INSERT INTO `ViTri` (`ma_vi_tri`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `da_xoa`) VALUES
(1, 'Quận 1', 'Hồ Chí Minh', 'Việt Nam', 'https://airbnbnew.cybersoft.edu.vn/images/vt1.jpg', 0);
INSERT INTO `ViTri` (`ma_vi_tri`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `da_xoa`) VALUES
(2, 'Cái Răng', 'Cần Thơ', 'Việt Nam', 'https://airbnbnew.cybersoft.edu.vn/images/vt2.jpg', 0);
INSERT INTO `ViTri` (`ma_vi_tri`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `da_xoa`) VALUES
(3, 'Hòn Rùa', 'Nha Trang', 'Việt Nam', 'https://airbnbnew.cybersoft.edu.vn/images/vt3.jpg', 0);
INSERT INTO `ViTri` (`ma_vi_tri`, `ten_vi_tri`, `tinh_thanh`, `quoc_gia`, `hinh_anh`, `da_xoa`) VALUES
(4, 'Hoàn Kiếm', 'Hà Nội', 'Việt Nam', 'https://airbnbnew.cybersoft.edu.vn/images/vt4.jpg', 0),
(5, 'Hòn Tằm', 'Phú Quốc', 'Việt Nam', 'https://airbnbnew.cybersoft.edu.vn/images/vt5.jpg', 0),
(6, 'Hải Châu', 'Đà Nẵng', 'Việt Nam', 'https://airbnbnew.cybersoft.edu.vn/images/vt6.jpg', 0),
(7, 'Langbiang', 'Đà Lạt', 'Việt Nam', 'https://airbnbnew.cybersoft.edu.vn/images/vt7.jpg', 0),
(8, 'Mũi Né', 'Phan Thiết', 'Việt Nam', 'https://airbnbnew.cybersoft.edu.vn/images/vt8.jpg', 0),
(9, 'Quận 5', 'Hồ Chí Minh', 'Việt Nam', '1728050367231_anh-dep-thien-nhien-2-1.jpg', 1),
(10, 'Vườn Hoa', 'Đà Lạt', 'Việt Nam', '1728131071660_anhvitri.jpg', 1);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;