﻿﻿// 全局变量
let leafCount = 0;
let showHistory = false;
let historyMessages = [];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 从localStorage加载历史消息
    const savedHistory = localStorage.getItem('treehole_history');
    if (savedHistory) {
        historyMessages = JSON.parse(savedHistory);
        leafCount = historyMessages.length;
        renderLeaves();
        updateLeafCount();
    }
});

// 渲染树叶
function renderLeaves() {
    const container = document.getElementById('treeLeaves');
    container.innerHTML = '';

    const leafEmojis = ['🍃', '🌿', '🍀', '🌱', '🌾'];
    
    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('span');
        leaf.className = 'leaf';
        leaf.textContent = leafEmojis[i % leafEmojis.length];
        
        // 随机位置
        leaf.style.position = 'absolute';
        leaf.style.left = `${20 + Math.random() * 60}%`;
        leaf.style.top = `${10 + Math.random() * 60}%`;
        leaf.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.4})`;
        leaf.style.animationDelay = `${i * 0.05}s`;
        
        container.appendChild(leaf);
    }
}

// 更新树叶数量
function updateLeafCount() {
    document.getElementById('leafCount').textContent = leafCount;
}

// 发送消息到树洞
function sendToTreehole() {
    const input = document.getElementById('treeholeInput');
    const content = input.value.trim();
    
    if (!content) {
        alert('请输入内容');
        return;
    }

    // 添加到历史消息
    const newMessage = {
        id: Date.now(),
        content: content,
        time: new Date().toLocaleString('zh-CN')
    };
    
    historyMessages.unshift(newMessage);
    
    // 保存到localStorage
    localStorage.setItem('treehole_history', JSON.stringify(historyMessages));
    
    // 增加树叶
    if (leafCount < 999) {
        leafCount++;
        renderLeaves();
        updateLeafCount();
    }
    
    // 清空输入
    input.value = '';
    
    alert('消息已投入树洞');
}

// 切换历史消息显示
function toggleHistory() {
    showHistory = !showHistory;
    const historyList = document.getElementById('historyList');
    const btn = document.querySelector('.history-btn');
    
    if (showHistory) {
        historyList.style.display = 'block';
        btn.innerHTML = '📜 隐藏历史消息';
        renderHistory();
    } else {
        historyList.style.display = 'none';
        btn.innerHTML = '📜 查看历史消息';
    }
}

// 渲染历史消息
function renderHistory() {
    const container = document.getElementById('historyList');
    
    if (historyMessages.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">还没有历史消息</p>';
        return;
    }
    
    container.innerHTML = historyMessages.map(msg => `
        <div class="history-item">
            <p class="history-content">${msg.content}</p>
            <span class="history-time">${msg.time}</span>
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

function redirectToMatch() {
    window.location.href = 'match.html';
}

function redirectToGarden() {
    window.location.href = 'garden.html';
}

function redirectToProfile() {
    window.location.href = 'profile.html';
}