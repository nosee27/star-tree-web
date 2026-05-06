// AI回复库
const aiReplies = [
    ['我能理解你的感受，有时候生活确实会让人感到疲惫', '听起来你需要一个温暖的拥抱', '你不是一个人，我在这里陪伴你'],
    ['谢谢你愿意和我分享这些', '我在认真听，请继续说', '你的感受很重要'],
    ['这一定很不容易，你已经很棒了', '困难只是暂时的，明天会更好', '我相信你有能力度过这个难关'],
    ['深呼吸，一切都会好起来的', '你比想象中更坚强', '给自己一些时间，慢慢来'],
    ['能感受到你的努力和坚持', '有时候释放情绪也是一种勇气', '你并不孤单，我们都在这里']
];

// 当前AI回复索引
let currentReplyIndex = 0;
let aiMode = false;
let maskEnabled = false;

// 检查是否深夜时段
function isNightTime() {
    const hour = new Date().getHours();
    return hour >= 23 || hour < 6;
}

// 页面加载时检查深夜时段
document.addEventListener('DOMContentLoaded', function() {
    if (isNightTime()) {
        document.getElementById('nightPrompt').style.display = 'flex';
    }
    loadAIReplies();
});

// 加载AI回复
function loadAIReplies() {
    const replies = aiReplies[currentReplyIndex];
    document.getElementById('aiText0').textContent = replies[0];
    document.getElementById('aiText1').textContent = replies[1];
    document.getElementById('aiText2').textContent = replies[2];
}

// 发送消息
function sendMessage() {
    const input = document.getElementById('chatInput');
    const content = input.value.trim();
    
    if (!content) return;
    
    addMessage(content, 'self');
    input.value = '';
    
    // 如果是AI模式，模拟回复
    if (aiMode) {
        setTimeout(() => {
            const replies = [
                '我理解你的感受，有时候生活确实会让人感到疲惫...',
                '谢谢你愿意分享，我在这里倾听',
                '这一定很不容易，但你已经很棒了',
                '深呼吸，一切都会好起来的'
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            addMessage(randomReply, 'other');
        }, 1500);
    }
}

// 添加消息
function addMessage(content, type) {
    const chatContent = document.getElementById('chatContent');
    const messageItem = document.createElement('div');
    messageItem.className = `message-item ${type}`;
    
    const avatar = type === 'self' ? '🌙' : '🌟';
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    messageItem.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${content}</p>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    // 添加长按事件
    messageItem.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showLongpressMenu(e);
    });
    
    chatContent.appendChild(messageItem);
    chatContent.scrollTop = chatContent.scrollHeight;
}

// 处理回车键
function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// 切换AI助攻
function toggleAIAssist() {
    const aiBubbles = document.getElementById('aiBubbles');
    const isVisible = aiBubbles.style.display !== 'none';
    
    if (isVisible) {
        aiBubbles.style.display = 'none';
    } else {
        aiBubbles.style.display = 'flex';
        // 切换到下一组回复
        currentReplyIndex = (currentReplyIndex + 1) % aiReplies.length;
        loadAIReplies();
    }
}

// 发送AI回复
function sendAIReply(index) {
    const replies = aiReplies[currentReplyIndex];
    addMessage(replies[index], 'self');
    document.getElementById('aiBubbles').style.display = 'none';
}

// 开启AI陪伴模式
function enableAIMode() {
    aiMode = true;
    document.getElementById('nightPrompt').style.display = 'none';
    alert('🌙 AI陪伴模式已开启，我会陪你聊天');
}

// 切换身份面具
function toggleMask() {
    const maskBtn = document.getElementById('maskBtn');
    maskEnabled = !maskEnabled;
    
    if (maskEnabled) {
        maskBtn.classList.add('active');
        alert('🎭 已切换到匿名模式');
    } else {
        maskBtn.classList.remove('active');
        alert('🎭 已切换到实名模式');
    }
}

// 显示长按菜单
function showLongpressMenu(event) {
    const menu = document.getElementById('longpressMenu');
    menu.style.display = 'block';
    menu.style.left = `${event.pageX}px`;
    menu.style.top = `${event.pageY}px`;
    
    document.addEventListener('click', hideLongpressMenu);
}

// 隐藏长按菜单
function hideLongpressMenu() {
    document.getElementById('longpressMenu').style.display = 'none';
    document.removeEventListener('click', hideLongpressMenu);
}

// 修改暴露程度
function editMessage() {
    alert('✏️ 正在修改消息暴露程度...');
    hideLongpressMenu();
}

// 复制消息
function copyMessage() {
    alert('📋 消息已复制到剪贴板');
    hideLongpressMenu();
}

// 删除消息
function deleteMessage() {
    if (confirm('确定要删除这条消息吗？')) {
        alert('🗑️ 消息已删除');
    }
    hideLongpressMenu();
}

// 返回上一页
function goBack() {
    window.history.back();
}

// 显示更多选项
function showMore() {
    alert('更多选项功能开发中...');
}