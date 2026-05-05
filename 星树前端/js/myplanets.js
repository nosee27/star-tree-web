﻿// 我的星球数据
const myPlanets = [
    { emoji: '🌍', name: '地球' },
    { emoji: '🌙', name: '月球' },
    { emoji: '⭐', name: '星星' },
    { emoji: '🔥', name: '火星' },
    { emoji: '💧', name: '水星' },
    { emoji: '🪐', name: '木星' },
    { emoji: '💫', name: '流星' },
    { emoji: '🌈', name: '彩虹星' }
];

// 探索记录
const exploreHistory = [
    { emoji: '✨', name: '闪光星球', time: '3小时前' },
    { emoji: '🌊', name: '海洋星球', time: '今天' },
    { emoji: '🎵', name: '音乐星球', time: '2天前' },
    { emoji: '📚', name: '知识星球', time: '3天前' }
];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    renderPlanets();
    renderExploreHistory();
});

// 渲染我的星球
function renderPlanets() {
    const container = document.getElementById('planetsGrid');
    
    container.innerHTML = myPlanets.map(item => `
        <div class="planet-item">
            <span class="planet-emoji">${item.emoji}</span>
            <span class="planet-name">${item.name}</span>
        </div>
    `).join('');
}

// 渲染探索记录
function renderExploreHistory() {
    const container = document.getElementById('exploreList');
    
    if (exploreHistory.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 30px; color: #999;">还没有探索记录</p>';
        return;
    }
    
    container.innerHTML = exploreHistory.map(item => `
        <div class="explore-item">
            <span class="explore-emoji">${item.emoji}</span>
            <div class="explore-info">
                <div class="explore-name">${item.name}</div>
                <div class="explore-time">${item.time}</div>
            </div>
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