const cursor = document.getElementById('cursor');
let lastMouseY = 0;

// Lắng nghe sự kiện di chuyển chuột
document.addEventListener('mousemove', (e) => {
    const mouseY = e.clientY;
    
    // Cập nhật vị trí con trỏ chuột
    cursor.style.left = `${e.clientX - cursor.offsetWidth / 500}px`;
    cursor.style.top = `${e.clientY - cursor.offsetHeight / 500}px`;

    // Kiểm tra hướng di chuyển chuột và áp dụng hiệu ứng quay
    if (mouseY > lastMouseY) {
        // Chuột di chuyển từ trên xuống dưới
        cursor.style.animation = 'move-down 1s forwards';
    } else if (mouseY < lastMouseY) {
        // Chuột di chuyển từ dưới lên trên
        cursor.style.animation = 'move-up 1s forwards';
    }

    // Cập nhật vị trí Y của chuột để so sánh với lần di chuyển tiếp theo
    lastMouseY = mouseY;
});
