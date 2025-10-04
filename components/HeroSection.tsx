'use client'; // <-- Đánh dấu đây là một Client Component

import React from 'react';
import styles from './Galaxy.module.css'; // Import CSS Modules

const Galaxy = () => {
    // ❤️ NỘI DUNG ANH CÓ THỂ THAY ĐỔI TẠI ĐÂY ❤️
    const messages = [
        "Chúc mừng Trung Thu, bé Tám của anh ❤️",
        "Ngô Quang Trường mãi yêu Bùi Thị Tám",
        "Mong mỗi mùa trăng tròn chúng ta đều có nhau...",
        "Em là ánh trăng sáng nhất trong màn đêm của đời anh",
        "Happy Mid-Autumn Festival 2025 with all my love"
    ];

    return (
        <div className={styles.galaxyContainer}>
            {messages.map((text, index) => {
                const radius = 100 + index * 60; // Bán kính tăng dần
                const duration = 20 + index * 10; // Tốc độ xoay chậm dần
                const characters = text.split('');
                const angleStep = 360 / characters.length;

                // Style động cho mỗi vòng
                const ringStyle: React.CSSProperties = {
                    animationName: `${styles.expandIn}, ${index % 2 === 0 ? styles.rotate : styles.rotateReverse}`,
                    animationDuration: `2s, ${duration}s`,
                    animationDelay: `${index * 1.5}s`,
                    animationTimingFunction: 'ease-out, linear',
                    animationFillMode: 'forwards',
                };

                return (
                    <div key={index} className={styles.textRing} style={ringStyle}>
                        {characters.map((char, i) => {
                            const angle = angleStep * i;
                            
                            // Style động cho mỗi ký tự
                            const charStyle: React.CSSProperties = {
                                transform: `rotate(${angle}deg) translate(${radius}px) rotate(90deg)`
                            };

                            return (
                                <span key={i} style={charStyle}>
                                    {char}
                                </span>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Galaxy;