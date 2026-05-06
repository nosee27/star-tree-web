// 全局变量
let exploreCount = 0;
let signalCount = 0;
let discoverCount = 0;
let exploreHistory = [];

// 星球类型
const planetTypes = [
    { emoji: '🌸', name: '繁花星球', content: '这里充满了美丽的花朵，每一朵花都代表着一个美好的愿望。在这里，你可以许下心愿，让梦想绽放�? },
    { emoji: '🌙', name: '月光星球', content: '在月光的照耀下，所有的烦恼都变得渺小。在这里，你可以静静地思考，找到内心的平静�? },
    { emoji: '🔥', name: '火焰星球', content: '这里燃烧着热情的火焰，代表着勇气和力量。在这里，你可以重新点燃内心的激情�? },
    { emoji: '💧', name: '水滴星球', content: '水是生命之源，在这里，你可以洗涤心灵，让自己焕然一新�? },
    { emoji: '🌟', name: '星光星球', content: '无数的星星在闪烁，每一颗星星都是一个希望。在这里，你可以找到属于自己的那颗星�? },
    { emoji: '🍃', name: '微风星球', content: '轻柔的微风拂过，带走所有的疲惫。在这里，你可以放松身心，享受宁静�? },
    { emoji: '🌈', name: '彩虹星球', content: '雨后总会有彩虹，在这里，你可以相信，困难之后一定会有美好的明天�? },
    { emoji: '❄️', name: '冰雪星球', content: '纯洁的冰雪覆盖一切，在这里，你可以净化心灵，重新出发�? },
    { emoji: '🌊', name: '海洋星球', content: '广阔的海洋包容一切，在这里，你可以释放压力，找回自我�? },
    { emoji: '🪨', name: '岩石星球', content: '坚固的岩石代表着坚强，在这里，你可以获得力量，勇敢面对挑战�? },
    { emoji: '🎵', name: '音乐星球', content: '美妙的音乐环绕四周，在这里，你可以用音乐治愈心灵�? },
    { emoji: '📚', name: '知识星球', content: '智慧的光芒照耀一切，在这里，你可以获得启发，找到答案�? }
];

// 当前探索的星�?let currentPlanet = null;

// 页面加载完成后执�?document.addEventListener('DOMContentLoaded', function() {
    // 从localStorage加载数据
    const savedData = localStorage.getItem('explore_data');
    if (savedData) {
        const data = JSON.parse(savedData);
        exploreCount = data.exploreCount || 0;
        signalCount = data.signalCount || 0;
        discoverCount = data.discoverCount || 0;
        exploreHistory = data.exploreHistory || [];
    }
    
    updateStats();
    renderHistory();
});

// 更新统计信息
function updateStats() {
    document.getElementById('exploreCount').textContent = exploreCount;
    document.getElementById('signalCount').textContent = signalCount;
    document.getElementById('discoverCount').textContent = discoverCount;
}

// 保存数据
function saveData() {
    const data = {
        exploreCount,
        signalCount,
        discoverCount,
        exploreHistory
    };
    localStorage.setItem('explore_data', JSON.stringify(data));
}

// 探索星球
function explorePlanet() {
    // 随机选择一个星�?    const randomIndex = Math.floor(Math.random() * planetTypes.length);
    currentPlanet = planetTypes[randomIndex];
    
    // 显示结果
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('planetEmoji').textContent = currentPlanet.emoji;
    document.getElementById('planetName').textContent = currentPlanet.name;
    document.getElementById('planetContent').textContent = currentPlanet.content;
    
    // 清空评论
    document.getElementById('planetComments').innerHTML = '<p style="text-align: center; color: #999;">暂无评论，快来发表第一条评论吧�?/p>';
    
    // 更新统计
    exploreCount++;
    
    // 检查是否是新发现的星球
    const isNew = !exploreHistory.some(item => item.name === currentPlanet.name);
    if (isNew) {
        discoverCount++;
        exploreHistory.push({
            emoji: currentPlanet.emoji,
            name: currentPlanet.name,
            time: new Date().toLocaleString('zh-CN')
        });
        renderHistory();
    }
    
    updateStats();
    saveData();
    
    // 显示探索成功提示
    alert(`发现新星球：${currentPlanet.emoji} ${currentPlanet.name}`);
}

// 发送信�?function sendSignal() {
    signalCount++;
    updateStats();
    saveData();
    alert('信号发送成功！愿远方的朋友能收到你的信�?�?);
}

// 点赞星球
function likePlanet() {
    alert('已为这个星球点赞 💚');
}

// 评论星球
function commentPlanet() {
    const comment = prompt('请输入评论内�?);
    if (comment) {
        const commentSection = document.getElementById('planetComments');
        commentSection.innerHTML = `
            <div class="comment-item">
                <div class="comment-author">�?星数</div>
                <p class="comment-content">${comment}</p>
            </div>
            <p style="text-align: center; color: #999; margin-top: 15px;">更多评论加载�?..</p>
        `;
        alert('评论成功�?);
    }
}

// 渲染探索历史
function renderHistory() {
    const container = document.getElementById('historyGrid');
    
    if (exploreHistory.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">还没有探索记录，快去探索未知星球吧！</p>';
        return;
    }
    
    container.innerHTML = exploreHistory.map(item => `
        <div class="history-item">
            <span class="history-emoji">${item.emoji}</span>
            <span class="history-name">${item.name}</span>
        </div>
    `).join('');
}

// 返回上一�?function goBack() {
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
