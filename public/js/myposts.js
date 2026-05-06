﻿// 我的发布数据
const myPosts = [
    {
        id: 1,
        author: '🌙 星树#1234',
        time: '2小时前',
        visibility: '🌍 公开',
        content: '今天工作压力好大，感觉快要扛不住了...但是还是要坚持下去！💪',
        tags: ['沮丧', '工作压力', '坚持'],
        likes: 45,
        comments: 12,
        resonance: 34
    },
    {
        id: 2,
        author: '🌙 星树#1234',
        time: '昨天',
        visibility: '🌍 公开',
        content: '周末和朋友们去看了公海，天气很好，心情也跟着好了！🌊',
        tags: ['开心', '周末', '友谊'],
        likes: 89,
        comments: 23,
        resonance: 56
    },
    {
        id: 3,
        author: '🌙 星树#1234',
        time: '2天前',
        visibility: '🔒 仅自己可见',
        content: '最近一直在思考人生的意义，感觉有点迷茫...',
        tags: ['思考', '迷茫'],
        likes: 12,
        comments: 5,
        resonance: 23
    },
    {
        id: 4,
        author: '🌙 星树#1234',
        time: '3天前',
        visibility: '🌍 公开',
        content: '今天完成了一个大项目，那种成就感真的很棒！🎉',
        tags: ['成就', '努力', '开心'],
        likes: 156,
        comments: 34,
        resonance: 89
    }
];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    renderPosts();
});

// 渲染我的发布
function renderPosts() {
    const container = document.getElementById('contentList');

    if (myPosts.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 50px; color: #999;">还没有发布内容</p>';
        return;
    }

    container.innerHTML = myPosts.map(item => `
        <div class="content-item">
            <div class="item-header">
                <span class="item-author">${item.author}</span>
                <span class="item-time">${item.time}</span>
                <span class="item-visibility">${item.visibility}</span>
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