// 植物类型配置
const plantTypes = {
    healing: [
        { emoji: '🌿', name: '薰衣草', desc: '治愈系植物，带来宁静' },
        { emoji: '🌵', name: '仙人掌', desc: '坚强的象征，治愈心灵' },
        { emoji: '🍀', name: '四叶草', desc: '幸运的象征' },
        { emoji: '🌱', name: '新芽', desc: '希望的开始' }
    ],
    blooming: [
        { emoji: '🌸', name: '樱花', desc: '美好的瞬间' },
        { emoji: '🌺', name: '木槿', desc: '温柔的绽放' },
        { emoji: '🌻', name: '向日葵', desc: '阳光与希望' },
        { emoji: '🌹', name: '玫瑰', desc: '爱的表达' },
        { emoji: '💐', name: '花束', desc: '美好的祝福' }
    ],
    rare: [
        { emoji: '🦋', name: '蝴蝶兰', desc: '稀有品种，优雅绽放' },
        { emoji: '🌙', name: '月光花', desc: '夜晚盛开的奇迹' },
        { emoji: '⭐', name: '星辰花', desc: '来自星空的祝福' },
        { emoji: '❄️', name: '雪莲花', desc: '高山上的纯洁' }
    ],
    friendship: [
        { emoji: '🌳', name: '友谊树', desc: '与好友共同培育' },
        { emoji: '🍃', name: '连理枝', desc: '心连心的象征' }
    ]
};

// 模拟植物数据
const plants = [
    { id: 1, emoji: '🌿', name: '薰衣草', type: 'healing', growth: 85, waterCount: 23, plantedDate: '2024-01-10', story: '这株薰衣草来自一次深夜的倾诉，它见证了你的坚强' },
    { id: 2, emoji: '🌻', name: '向日葵', type: 'blooming', growth: 100, waterCount: 30, plantedDate: '2024-01-08', story: '这是你分享快乐时光种下的向日葵，永远面向阳光' },
    { id: 3, emoji: '🦋', name: '蝴蝶兰', type: 'rare', growth: 60, waterCount: 15, plantedDate: '2024-01-18', story: '稀有的蝴蝶兰，只有连续7天登录才能解锁' },
    { id: 4, emoji: '🌵', name: '仙人掌', type: 'healing', growth: 45, waterCount: 8, plantedDate: '2024-01-20', story: '来自一次焦虑的倾诉，它会陪你一起成长' },
    { id: 5, emoji: '🌳', name: '友谊树', type: 'friendship', growth: 72, waterCount: 18, plantedDate: '2024-01-15', story: '与好友共同种下的友谊树，见证你们的情谊' },
    { id: 6, emoji: '🌸', name: '樱花', type: 'blooming', growth: 90, waterCount: 25, plantedDate: '2024-01-12', story: '在春日种下的樱花，象征美好与希望' },
    { id: 7, emoji: '🍀', name: '四叶草', desc: '幸运的象征', type: 'healing', growth: 55, waterCount: 12, plantedDate: '2024-01-19', story: '幸运的四叶草，愿它带给你好运' },
    { id: 8, emoji: '⭐', name: '星辰花', type: 'rare', growth: 35, waterCount: 7, plantedDate: '2024-01-22', story: '来自星空的祝福，稀有而珍贵' },
    { id: 9, emoji: '🍃', name: '连理枝', type: 'friendship', growth: 40, waterCount: 10, plantedDate: '2024-01-17', story: '与好友心连心的象征' }
];

// 当前选中的植物
let currentPlant = null;

// 渲染花园
function renderGarden() {
    const gardenGrid = document.getElementById('gardenGrid');
    gardenGrid.innerHTML = '';
    
    plants.forEach(plant => {
        const card = document.createElement('div');
        card.className = `plant-card ${plant.type === 'rare' ? 'rare' : ''} ${plant.type === 'friendship' ? 'friendship' : ''}`;
        card.innerHTML = `
            <div class="plant-emoji">${plant.emoji}</div>
            <div class="plant-name">${plant.name}</div>
            <div class="plant-growth">
                <div class="growth-fill" style="width: ${plant.growth}%"></div>
            </div>
        `;
        card.onclick = () => showPlantDetail(plant);
        gardenGrid.appendChild(card);
    });
}

// 显示植物详情
function showPlantDetail(plant) {
    currentPlant = plant;
    document.getElementById('plantEmoji').textContent = plant.emoji;
    document.getElementById('plantName').textContent = plant.name;
    document.getElementById('plantType').textContent = getPlantTypeName(plant.type);
    document.getElementById('growthProgress').style.width = `${plant.growth}%`;
    document.getElementById('growthPercent').textContent = `${plant.growth}%`;
    document.getElementById('waterCount').textContent = `${plant.waterCount}次`;
    document.getElementById('plantDate').textContent = plant.plantedDate;
    document.getElementById('plantStory').textContent = plant.story;
    
    document.getElementById('plantModal').style.display = 'flex';
}

// 获取植物类型名称
function getPlantTypeName(type) {
    const names = {
        healing: '治愈系',
        blooming: '开花植物',
        rare: '稀有品种',
        friendship: '友谊植物'
    };
    return names[type] || '普通植物';
}

// 关闭植物详情
function closePlantModal() {
    document.getElementById('plantModal').style.display = 'none';
    currentPlant = null;
}

// 给植物浇水
function waterPlant() {
    if (!currentPlant) return;
    
    currentPlant.waterCount++;
    currentPlant.growth = Math.min(100, currentPlant.growth + 5);
    
    alert(`💧 浇水成功！${currentPlant.name}成长度+5`);
    closePlantModal();
    renderGarden();
}

// 给所有植物浇水
function waterAllPlants() {
    plants.forEach(plant => {
        plant.waterCount++;
        plant.growth = Math.min(100, plant.growth + 2);
    });
    
    alert('💧 已为所有植物浇水！');
    renderGarden();
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

// 页面加载时渲染花园
document.addEventListener('DOMContentLoaded', function() {
    renderGarden();
});