﻿// 我的共鸣数据
const myResonances = [
    {
        id: 1,
        author: '🌟 浪漫的星球#2847',
        time: '3小时前',
        content: '今天工作压力好大，感觉快要扛不住了...但是还是要坚持下去！💪',
        tags: ['沮丧', '工作压力', '坚持'],
        likes: 234,
        comments: 45,
        resonance: 156
    },
    {
        id: 2,
        author: '✨ 安全的星球#1092',
        time: '5小时前',
        content: '终于完成了这个项目！感谢团队的支持！',
        tags: ['开心', '成就感', '感谢'],
        likes: 567,
        comments: 89,
        resonance: 234
    },
    {
        id: 3,
        author: '🌊 深蓝星球#5678',
        time: '昨天',
        content: '深蓝总是让人思考很多，今天想了很多关于未来的事情...',
        tags: ['思考', '未来', '深蓝'],
        likes: 123,
        comments: 23,
        resonance: 89
    },
    {
        id: 4,
        author: '🌈 彩虹星球#3456',
        time: '2天前',
        content: '今天和好朋友们一起看了日落，真的好美！生活中还是有很多美好的瞬间值得珍惜 🌅',
        tags: ['美好', '友谊', '日落'],
        likes: 456,
        comments: 67,
        resonance: 312
    }
];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    renderResonances();
});

// 渲染我的共鸣
function renderResonances() {
    const container = document.getElementById('resonanceList');

    if (myResonances.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 50px; color: #999;">还没有共鸣内容</p>';
        return;
    }

    container.innerHTML = myResonances.map(item => `
        <div class="content-item">
            <div class="item-header">
                <span class="item-author">${item.author}</span>
                <span class="item-time">${item.time}</span>
            </div>
            <div class="item-content">
                <p class="content-text">${item.content}</p>
                ${item.tags ? item.tags.map(tag => `<span class="content-tags">#${tag}</span>`).join('') : ''}
            </div>
            <div class="item-actions">
                <div class="action-item">
                    <span class="action-icon">❤️</span>
                    <span class="action-text">${item.likes}</span>
                </div>
                <div class="action-item">
                    <span class="action-icon">💬</span>
                    <span class="action-text">${item.comments}</span>
                </div>
                <div class="action-item">
                    <span class="action-icon">✨</span>
                    <span class="action-text">${item.resonance}</span>
                </div>
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