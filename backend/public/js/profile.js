﻿// 匿名等级配置
const anonymityLevels = [
    { level: 1, name: '完全实名', desc: '所有个人信息完全公开', color: '#FF6B6B' },
    { level: 2, name: '半实名', desc: '部分个人信息可见', color: '#FFB347' },
    { level: 3, name: '半匿名', desc: '部分个人信息会被隐藏', color: '#FFD93D' },
    { level: 4, name: '高匿名', desc: '大部分信息被隐藏', color: '#6BCB77' },
    { level: 5, name: '完全匿名', desc: '所有个人信息完全隐藏', color: '#4D96FF' }
];

// 更新匿名等级
function updateAnonymityLevel(value) {
    const level = anonymityLevels[value - 1];
    document.getElementById('anonymityLevel').textContent = `Lv.${value} ${level.name}`;
    document.getElementById('anonymityLevel').style.color = level.color;
    document.getElementById('anonymityDesc').textContent = level.desc;
    
    // 保存到localStorage
    localStorage.setItem('anonymityLevel', value);
    
    alert(`匿名等级已设置为: ${level.name}`);
}

// 页面加载时恢复匿名等级
document.addEventListener('DOMContentLoaded', function() {
    const savedLevel = localStorage.getItem('anonymityLevel') || '3';
    document.getElementById('anonymitySlider').value = savedLevel;
    updateAnonymityLevel(savedLevel);
});

// 编辑资料
function editProfile() {
    alert('编辑资料功能开发中...');
}

// 显示菜单
function showMenu() {
    alert('菜单功能开发中...');
}

// 退出登录
function logout() {
    if (confirm('确定要退出登录吗？')) {
        alert('退出成功');
        window.location.href = 'login.html';
    }
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

function redirectToMyPosts() {
    window.location.href = 'myposts.html';
}

function redirectToMyResonance() {
    window.location.href = 'myresonance.html';
}

function redirectToMyPlanets() {
    window.location.href = 'myplanets.html';
}

function redirectToAchievements() {
    window.location.href = 'achievements.html';
}

function redirectToAgreement() {
    window.location.href = 'agreement.html';
}

function redirectToPrivacy() {
    window.location.href = 'privacy.html';
}

function redirectToContact() {
    window.location.href = 'contact.html';
}

function redirectToHelp() {
    window.location.href = 'help.html';
}

function redirectToSearch() {
    window.location.href = 'search.html';
}

function redirectToMatch() {
    window.location.href = 'match.html';
}

function redirectToGarden() {
    window.location.href = 'garden.html';
}

function redirectToChat() {
    window.location.href = 'chat.html';
}