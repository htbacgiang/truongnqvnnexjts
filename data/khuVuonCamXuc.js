// Khu Vườn Cảm Xúc
// - Bạn chỉ cần chỉnh phần WISHES_POOL và/hoặc wishes ở từng ô.
// - Sunflower (ô 1) đang có sẵn 5 câu "ngưỡng mộ" theo mô tả.

export const EMOTION_GARDEN_CELLS = [
  {
    id: 1,
    flowerName: "Hoa Hướng Dương",
    flowerNameEn: "Sunflower",
    type: "Admire",
    icon: "🌻",
    message:
      "Đại diện cho sự ngưỡng mộ và năng lượng tích cực. (Dành cho 5 câu ngưỡng mộ).",
    accent: "from-amber-200/80 via-orange-200/50 to-rose-200/60",
    wishes: [
      "Anh ngưỡng mộ cách Ánh luôn giữ được năng lượng tích cực, ngay cả khi mọi thứ bận rộn.",
      "Anh thích nhất là sự tinh tế trong gu thẩm mỹ của Ánh — nhìn vào là thấy có 'chất' ngay.",
      "Anh nể sự kiên định của Ánh: đã làm là làm tới nơi, tới chốn.",
      "Anh trân trọng việc Ánh luôn tử tế và biết quan tâm đúng lúc.",
      "Anh thấy Ánh có một kiểu mạnh mẽ rất dịu — không ồn ào nhưng khiến người khác yên tâm.",
    ],
  },
  {
    id: 2,
    flowerName: "Hoa Hồng",
    flowerNameEn: "Rose",
    type: "Sincere",
    icon: "🌹",
    message: "Đại diện cho sự chân thành và tình cảm ấm áp.",
    accent: "from-rose-200/80 via-pink-200/50 to-fuchsia-200/60",
  },
  {
    id: 3,
    flowerName: "Hoa Cẩm Tú Cầu",
    flowerNameEn: "Hydrangea",
    type: "Understanding",
    icon: "🌸",
    message: "Loài hoa của sự biết ơn và thấu hiểu những tâm tư sâu sắc.",
    accent: "from-sky-200/70 via-violet-200/40 to-pink-200/60",
  },
  {
    id: 4,
    flowerName: "Hoa Sen Trắng",
    flowerNameEn: "White Lotus",
    type: "Peace",
    icon: "🪷",
    message: 'Sự thuần khiết và bình yên trong tâm hồn (gu "tự chữa lành").',
    accent: "from-slate-100/80 via-zinc-100/50 to-rose-100/60",
  },
  {
    id: 5,
    flowerName: "Hoa Sen Hồng",
    flowerNameEn: "Pink Lotus",
    type: "Tradition",
    icon: "🪷",
    message:
      "Sự gần gũi và nét đẹp truyền thống mà anh và Ánh cùng trân trọng.",
    accent: "from-pink-200/80 via-rose-200/50 to-orange-200/60",
  },
  {
    id: 6,
    flowerName: "Hoa Lan",
    flowerNameEn: "Orchid",
    type: "Strength",
    icon: "🌺",
    message: "Sự thanh cao, độc lập và bản lĩnh của người phụ nữ.",
    accent: "from-fuchsia-200/70 via-violet-200/45 to-sky-200/55",
  },
  {
    id: 7,
    flowerName: "Hoa Tulip",
    flowerNameEn: "Tulip",
    type: "New Start",
    icon: "🌷",
    message: "Sự khởi đầu mới mẻ và những dự định đầy triển vọng.",
    accent: "from-red-200/70 via-orange-200/40 to-amber-200/55",
  },
  {
    id: 8,
    flowerName: "Hoa Baby",
    flowerNameEn: "Baby's Breath",
    type: "Little Joys",
    icon: "🤍",
    message: "Những niềm vui nhỏ bé, dung dị trong cuộc sống hàng ngày.",
    accent: "from-zinc-100/80 via-sky-100/40 to-pink-100/60",
  },
  {
    id: 9,
    flowerName: "Hoa Sen Bách Diệp",
    flowerNameEn: "Special Lotus",
    type: "2026 Wish",
    icon: "🪷",
    message:
      "Chứa đựng lời chúc cho năm 2026 và những khát vọng lớn lao hơn.",
    accent: "from-amber-100/70 via-rose-100/40 to-violet-100/60",
  },
];

// Pool lời chúc để chia đều vào các ô (trừ những ô đã có wishes sẵn).
// Gợi ý: điền đủ 25 câu tổng cộng (tính cả 5 câu ở Hoa Hướng Dương).
export const WISHES_POOL = [
  "Chúc Ánh luôn bình yên trong lòng, và mọi điều khó rồi cũng sẽ nhẹ lại.",
  "Cảm ơn Ánh vì đã luôn cố gắng — theo cách rất đẹp và rất riêng.",
  "Mong những ngày bận rộn cũng sẽ có chỗ cho những niềm vui nho nhỏ.",
  "Chúc Ánh gặp đúng người, đúng việc, đúng thời điểm — và đúng cảm xúc.",
  "Chúc Ánh được yêu thương theo cách khiến Ánh thấy an toàn.",
  "Mong mọi dự định của Ánh trong năm tới sẽ tiến triển thuận lợi và rực rỡ.",
  "Chúc Ánh luôn giữ được sự dịu dàng với chính mình, kể cả những ngày không hoàn hảo.",
  "Mong Ánh luôn có một góc nhỏ để thở, để chữa lành, để nạp lại năng lượng.",
  "Chúc Ánh luôn tự tin với lựa chọn của mình, và đủ kiên định để đi tiếp.",
  "Cảm ơn Ánh vì những lần lắng nghe và thấu hiểu, dù không cần nói quá nhiều.",
  "Chúc Ánh luôn có những chuyến đi hay ho, những trải nghiệm đáng nhớ.",
  "Mong Ánh được gặp nhiều điều tử tế, và cũng nhận lại thật nhiều tử tế.",
  "Chúc Ánh luôn có cảm hứng sáng tạo — nhẹ nhàng mà bền bỉ.",
  "Mong những điều Ánh mong sẽ đến theo cách đẹp nhất, đúng lúc nhất.",
  "Chúc Ánh luôn vui với những điều giản dị — một bữa ăn ngon, một bài nhạc hay, một buổi chiều yên.",
  "Mong Ánh giữ được trái tim ấm và cái đầu tỉnh táo.",
  "Chúc Ánh luôn có người đồng hành, nhưng cũng không ngại đi một mình khi cần.",
  "Mong năm 2026 sẽ là năm Ánh 'nở rộ' theo đúng nghĩa: khỏe mạnh, vững vàng, hạnh phúc.",
  "Chúc Ánh luôn được tôn trọng, được lắng nghe, và được là chính mình.",
  "Mong những ngày tới sẽ ít lo hơn, nhiều cười hơn.",
];


