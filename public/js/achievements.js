﻿// 成就徽章数据
const achievements = [
    { emoji: '🪐', name: '新手探险家', unlocked: true },
    { emoji: '🌱', name: '萌芽', unlocked: true },
    { emoji: '🌸', name: '花开富贵', unlocked: true },
    { emoji: '🌙', name: '月光守护者', unlocked: true },
    { emoji: '🔥', name: '热情如火', unlocked: true },
    { emoji: '💧', name: '水滴石穿', unlocked: true },
    { emoji: '🌈', name: '晴天娃娃', unlocked: true },
    { emoji: '⭐', name: '星光闪耀', unlocked: true },
    { emoji: '🍃', name: '清风徐来', unlocked: true },
    { emoji: '✨', name: '闪光荣耀', unlocked: true },
    { emoji: '🌊', name: '海洋之心', unlocked: true },
    { emoji: '🎵', name: '音乐精灵', unlocked: true },
    { emoji: '📚', name: '知识渊博', unlocked: false },
    { emoji: '💪', name: '坚持不懈', unlocked: false },
    { emoji: '❤️', name: '爱心大使', unlocked: false },
    { emoji: '🦋', name: '蝴蝶之梦', unlocked: false },
    { emoji: '🏆', name: '成就大师', unlocked: false },
    { emoji: '👑', name: '星球之王', unlocked: false },
    { emoji: '💎', name: '钻石徽章', unlocked: false },
    { emoji: '🌟', name: '明星达人', unlocked: false },
    { emoji: '🌳', name: '森林守护者', unlocked: false },
    { emoji: '🌈', name: '绚丽彩虹', unlocked: false },
    { emoji: '⚡', name: '雷电击中', unlocked: false },
    { emoji: '💫', name: '星光闪耀', unlocked: false },
    { emoji: '🚀', name: '星际旅行者', unlocked: false },
    { emoji: '🌍', name: '环球探险家', unlocked: false },
    { emoji: '🐬', name: '海豚守护者', unlocked: false },
    { emoji: '🤝', name: '社交达人', unlocked: false },
    { emoji: '🏔️', name: '攀登之星', unlocked: false },
    { emoji: '🎨', name: '艺术大师', unlocked: false },
    { emoji: '🥇', name: '金牌冠军', unlocked: false }
];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    renderBadges();
});

// 渲染徽章
function renderBadges() {
    const container = document.getElementById('badgesGrid');
    
    container.innerHTML = achievements.map(item => `
        <div class="badge-item ${item.unlocked ? '' : 'locked'}">
            <span class="badge-emoji">${item.emoji}</span>
            <span class="badge-name">${item.unlocked ? item.name : '???'}</span>
        </div>
    `).join('');
}

// 返回上一页
function goBack() {
    window.history.back();
}

// 导航函数
function redirectToIndex() {
    window.location.href = 'index.html';
}

function redirectToTreehole() {
    window.location.href = 'treehole.html';
}

function redirectToProfile() {
    window.location.href = 'profile.html';
}