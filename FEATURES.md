# Tính năng mới - Trang Tỏ Tình

## 🎯 Tính năng đã thêm

### 1. Hình ảnh nhỏ rơi cùng trái tim
- **Hiệu ứng rơi**: Các hình ảnh nhỏ sẽ rơi từ trên xuống với tốc độ ngẫu nhiên
- **Xoay tròn**: Hình ảnh sẽ xoay nhẹ nhàng khi rơi
- **Hover effect**: Khi di chuột qua, hình ảnh sẽ phóng to và có hiệu ứng sáng
- **Tự động tạo**: Hình ảnh mới được tạo mỗi 2 giây

### 2. Modal hiển thị ảnh lớn với lời chúc
- **Click để mở**: Click vào hình ảnh nhỏ để mở modal
- **Ảnh lớn**: Hiển thị ảnh với kích thước lớn hơn
- **Lời chúc lãng mạn**: Mỗi ảnh có một lời chúc riêng
- **Hiệu ứng đẹp**: Animation mở/đóng modal mượt mà
- **Emoji động**: Các emoji nhảy nhót dưới lời chúc

### 3. Cải tiến giao diện
- **CSS animations**: Thêm nhiều hiệu ứng CSS đẹp mắt
- **Responsive**: Tương thích với mọi kích thước màn hình
- **Smooth transitions**: Chuyển đổi mượt mà giữa các trạng thái

## 📁 Cấu trúc file

```
pages/to-tinh/
├── index.js          # Component chính
└── styles/
    └── to-tinh.css   # CSS cho hiệu ứng

public/tam/
├── 1.jpg            # Hình ảnh 1
├── 2.jpg            # Hình ảnh 2
├── 3.jpg            # Hình ảnh 3
├── 4.jpg            # Hình ảnh 4
└── 5.jpg            # Hình ảnh 5
```

## 🎨 Cách tùy chỉnh

### Thay đổi hình ảnh
1. Thay thế các file trong thư mục `/public/tam/`
2. Cập nhật đường dẫn trong `IMAGE_DATA` nếu cần

### Thay đổi lời chúc
Chỉnh sửa mảng `IMAGE_DATA` trong file `index.js`:

```javascript
const IMAGE_DATA = [
  {
    id: 1,
    smallImage: "/tam/1.jpg",
    largeImage: "/tam/1.jpg",
    message: "Lời chúc của bạn ở đây ❤️"
  },
  // ...
];
```

### Thay đổi tốc độ rơi
Chỉnh sửa trong `useEffect` tạo hình ảnh:

```javascript
const interval = setInterval(createFallingImage, 2000); // 2000ms = 2 giây
```

### Thay đổi kích thước hình ảnh
Chỉnh sửa trong JSX:

```javascript
style={{
  width: '40px',    // Kích thước nhỏ
  height: '40px'
}}
```

## 🚀 Cách sử dụng

1. Truy cập trang `/to-tinh`
2. Chờ hình ảnh rơi xuống
3. Click vào bất kỳ hình ảnh nào để xem ảnh lớn và lời chúc
4. Click nút "×" hoặc click bên ngoài modal để đóng

## 🎵 Tính năng âm nhạc

Trang vẫn giữ nguyên tính năng phát nhạc nền với nút điều khiển ở góc trái trên.

## 📱 Responsive Design

- **Desktop**: Hiệu ứng đầy đủ với nhiều hình ảnh
- **Tablet**: Tự động điều chỉnh số lượng hình ảnh
- **Mobile**: Tối ưu cho màn hình nhỏ

## 🔧 Technical Details

- **React Hooks**: useState, useEffect, useRef, useMemo
- **Three.js**: WebGL 3D graphics
- **CSS Animations**: Keyframes và transitions
- **Event Handling**: Click, hover, resize
- **Performance**: Optimized rendering với requestAnimationFrame
