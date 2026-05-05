// 当前选择的心情
let selectedMood = 'happy';
let matchingInterval = null;
let matchTimeout = null;
let isAIMatch = false;

// 心情映射
const moodMap = {
    happy: { emoji: '😊', name: '开心' },
    sad: { emoji: '😢', name: '难过' },
    anxious: { emoji: '😰', name: '焦虑' },
    angry: { emoji: '😤', name: '生气' },
    lonely: { emoji: '🥺', name: '孤独' },
    confused: { emoji: '😕', name: '困惑' },
    tired: { emoji: '😴', name: '疲惫' },
    hopeful: { emoji: '🌟', name: '期待' }
};

// 选择心情
function selectMood(mood) {
    selectedMood = mood;
    document.querySelectorAll('.mood-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-mood="${mood}"]`).classList.add('active');
}

// 开始匹配
async function startMatching() {
    document.getElementById('moodSection').style.display = 'none';
    document.getElementById('matchingSection').style.display = 'block';
    isAIMatch = false;
    
    try {
        const response = await fetch('/api/api/match/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ mood: selectedMood })
        });

        const data = await response.json();
        if (data.success) {
            // 模拟匹配过程
            let count = 128;
            matchingInterval = setInterval(() => {
                count += Math.floor(Math.random() * 10) - 5;
                if (count < 50) count = 50;
                document.getElementById('waitingCount').textContent = count;
            }, 2000);
            
            // 15秒超时后使用AI替代
            matchTimeout = setTimeout(() => {
                clearInterval(matchingInterval);
                isAIMatch = true;
                showAIMatch();
            }, 15000);
            
            // 模拟匹配成功（匹配相同心情）- 在超时前如果找到匹配
            setTimeout(() => {
                if (!isAIMatch) {
                    clearTimeout(matchTimeout);
                    clearInterval(matchingInterval);
                    document.getElementById('matchingSection').style.display = 'none';
                    document.getElementById('matchSuccessSection').style.display = 'block';
                    
                    // 设置匹配到的用户心情（与选择的心情相同）
                    const mood = moodMap[selectedMood];
                    document.querySelector('.partner-name').textContent = `✨ 星树#${Math.floor(Math.random() * 9000) + 1000}`;
                    document.querySelector('.partner-mood').textContent = `当前心情: ${mood.emoji} ${mood.name}`;
                }
            }, 8000);
        } else {
            alert(data.message);
            document.getElementById('matchingSection').style.display = 'none';
            document.getElementById('moodSection').style.display = 'block';
        }
    } catch (error) {
        console.error('Error starting match:', error);
        // 如果后端不可用，使用模拟数据
        let count = 128;
        matchingInterval = setInterval(() => {
            count += Math.floor(Math.random() * 10) - 5;
            if (count < 50) count = 50;
            document.getElementById('waitingCount').textContent = count;
        }, 2000);
        
        // 15秒超时后使用AI替代
        matchTimeout = setTimeout(() => {
            clearInterval(matchingInterval);
            isAIMatch = true;
            showAIMatch();
        }, 15000);
        
        // 模拟匹配成功（匹配相同心情）
        setTimeout(() => {
            if (!isAIMatch) {
                clearTimeout(matchTimeout);
                clearInterval(matchingInterval);
                document.getElementById('matchingSection').style.display = 'none';
                document.getElementById('matchSuccessSection').style.display = 'block';
                
                const mood = moodMap[selectedMood];
                document.querySelector('.partner-name').textContent = `✨ 星树#${Math.floor(Math.random() * 9000) + 1000}`;
                document.querySelector('.partner-mood').textContent = `当前心情: ${mood.emoji} ${mood.name}`;
            }
        }, 8000);
    }
}

// 显示AI匹配结果
function showAIMatch() {
    document.getElementById('matchingSection').style.display = 'none';
    document.getElementById('matchSuccessSection').style.display = 'block';
    
    const mood = moodMap[selectedMood];
    document.querySelector('.partner-avatar').textContent = '🤖';
    document.querySelector('.partner-name').textContent = '🤖 星树AI助手';
    document.querySelector('.partner-mood').textContent = `当前心情: ${mood.emoji} ${mood.name}`;
}

// 取消匹配
function cancelMatching() {
    clearInterval(matchingInterval);
    clearTimeout(matchTimeout);
    document.getElementById('matchingSection').style.display = 'none';
    document.getElementById('moodSection').style.display = 'block';
}

// 显示契约书
function showContract() {
    document.getElementById('contractModal').style.display = 'flex';
}

// 关闭契约书
function closeContract() {
    document.getElementById('contractModal').style.display = 'none';
}

// 确认契约
async function confirmContract() {
    const checkboxes = document.querySelectorAll('.contract-checkbox');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    
    if (!allChecked) {
        alert('请勾选所有条款以确认契约');
        return;
    }
    
    try {
        const response = await fetch('/api/api/match/confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ mood: selectedMood })
        });

        const data = await response.json();
        if (data.success) {
            closeContract();
            alert('契约已确认！正在建立加密聊天通道...');
            
            setTimeout(() => {
                window.location.href = 'chat.html';
            }, 2000);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error confirming contract:', error);
        // 如果后端不可用，使用模拟
        closeContract();
        alert('契约已确认！正在建立加密聊天通道...');
        
        setTimeout(() => {
            window.location.href = 'chat.html';
        }, 2000);
    }
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

function redirectToGarden() {
    window.location.href = 'garden.html';
}

function redirectToProfile() {
    window.location.href = 'profile.html';
}