﻿// 搜索数据
const searchData = [
    {
        id: 1,
        author: '🌟 浪漫星球#3456',
        time: '2小时前',
        visibility: '🌍 公开',
        content: '今天真的很开心！收到了好朋友送的礼物，感觉生活充满了阳光 ☀️',
        tags: ['开心', '幸福', '友谊'],
        likes: 123,
        comments: 23,
        resonance: 89
    },
    {
        id: 2,
        author: '🌊 安静星球#1234',
        time: '3小时前',
        visibility: '🌍 公开',
        content: '安静世界里一个人静静看书，这种感觉真的很好。希望每个人都能找到属于自己的安静时光。',
        tags: ['安静', '阅读', '平静'],
        likes: 89,
        comments: 12,
        resonance: 56
    },
    {
        id: 3,
        author: '🔥 热恋星球#5678',
        time: '5小时前',
        visibility: '🌍 公开',
        content: '最近工作状态超好！感觉自己充满了干劲，加油！💪',
        tags: ['热情', '工作', '动力'],
        likes: 234,
        comments: 45,
        resonance: 123
    },
    {
        id: 4,
        author: '🌈 希望星球#7890',
        time: '昨天',
        visibility: '🌍 公开',
        content: '即使遇到困难也要保持希望，相信明天会更好，加油！✨',
        tags: ['希望', '正能量', '坚持'],
        likes: 567,
        comments: 89,
        resonance: 345
    },
    {
        id: 5,
        author: '☀️ 温暖星球#2345',
        time: '昨天',
        visibility: '🌍 公开',
        content: '对自己好一点点，也对他人温暖一点点。生活需要温暖。',
        tags: ['温暖', '温暖', '生活'],
        likes: 345,
        comments: 67,
        resonance: 234
    },
    {
        id: 6,
        author: '⭐ 时光星球#6789',
        time: '2天前',
        visibility: '🔒 仅自己可见',
        content: '今天终于鼓起勇气向喜欢的人表白了，虽然被拒绝了，但我不会后悔！至少我尝试过了 💔',
        tags: ['勇气', '表白', '成长'],
        likes: 456,
        comments: 78,
        resonance: 312
    }
];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取URL参数中的搜索关键词
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get('keyword');

    if (keyword) {
        document.getElementById('searchInput').value = keyword;
        performSearch(keyword);
    }
});

// 处理搜索
function handleSearch() {
    const keyword = document.getElementById('searchInput').value.trim();
    performSearch(keyword);
}

// 执行搜索
function performSearch(keyword) {
    const container = document.getElementById('searchResults');

    if (!keyword) {
        container.innerHTML = `
            <div class="search-empty">
                <span class="search-empty-icon">🔍</span>
                <p class="search-empty-text">请输入关键词进行搜索</p>
            </div>
        `;
        return;
    }

    // 搜索匹配内容
    const results = searchData.filter(item => {
        const contentMatch = item.content.includes(keyword);
        const tagMatch = item.tags.some(tag => tag.includes(keyword));
        const authorMatch = item.author.includes(keyword);
        return contentMatch || tagMatch || authorMatch;
    });

    if (results.length === 0) {
        container.innerHTML = `
            <div class="search-empty">
                <span class="search-empty-icon">😢</span>
                <p class="search-empty-text">没有找到与 "${keyword}" 相关的内容</p>
            </div>
        `;
        return;
    }

    container.innerHTML = results.map(item => `
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
                <div class="action-item" onclick="likePost(${item.id})">
                    <span class="action-icon">❤️</span>
                    <span class="action-text">${item.likes}</span>
                </div>
                <div class="action-item" onclick="showCommentModal(${item.id})">
                    <span class="action-icon">💬</span>
                    <span class="action-text">${item.comments}</span>
                </div>
                <div class="action-item" onclick="resonancePost(${item.id})">
                    <span class="action-icon">✨</span>
                    <span class="action-text">${item.resonance}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// 点赞
function likePost(id) {
    alert('点赞成功 ❤️');
}

// 显示评论
function showCommentModal(id) {
    alert('评论功能开发中...');
}

// 共鸣
function resonancePost(id) {
    alert('共鸣成功 ✨');
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