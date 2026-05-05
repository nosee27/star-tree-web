﻿// 全局数据
let contentList = [];
let selectedImages = [];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
});

// 从后端加载帖子列表
async function loadPosts() {
    try {
        const response = await fetch('http://localhost:5000/api/posts', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const data = await response.json();
        if (data.success) {
            contentList = data.posts;
        } else {
            // 如果后端不可用，使用模拟数据
            loadMockData();
        }
        renderContentList();
    } catch (error) {
        console.error('Error loading posts:', error);
        loadMockData();
        renderContentList();
    }
}

// 加载模拟数据（备用）
function loadMockData() {
    contentList = [
        {
            _id: 1,
            author: { nickname: '🌟 浪漫的星球#2847' },
            createdAt: '2小时前',
            visibility: 'public',
            content: '今天工作压力好大，感觉快要扛不住了...\n但是还是要坚持下去！💪',
            tags: ['沮丧', '工作压力', '坚持'],
            likes: 234,
            commentsCount: 45,
            resonance: 156,
            comments: [
                {
                    _id: 101,
                    author: { nickname: '🌙 匿名用户#1234' },
                    createdAt: '1小时前',
                    content: '我也有同样的感受，一起加油！'
                },
                {
                    _id: 102,
                    author: { nickname: '🌙 匿名用户#5678' },
                    createdAt: '30分钟前',
                    content: '相信自己，一切都会好起来的！'
                }
            ]
        },
        {
            _id: 2,
            author: { nickname: '✨ 安全的星球#1092' },
            createdAt: '3小时前',
            visibility: 'public',
            content: '终于完成了这个项目！感谢团队的支持！',
            tags: ['开心', '成就感', '感谢'],
            likes: 567,
            commentsCount: 89,
            resonance: 234,
            comments: [
                {
                    _id: 201,
                    author: { nickname: '🌙 匿名用户#9876' },
                    createdAt: '2小时前',
                    content: '恭喜恭喜！你的努力终于有了回报！'
                },
                {
                    _id: 202,
                    author: { nickname: '🌙 匿名用户#4321' },
                    createdAt: '1小时前',
                    content: '团队合作的力量是无穷的！'
                }
            ]
        },
        {
            _id: 3,
            author: { nickname: '🌊 深蓝星球#5678' },
            createdAt: '5小时前',
            visibility: 'public',
            content: '深蓝总是让人思考很多，今天想了很多关于未来的事情...',
            tags: ['思考', '未来', '深蓝'],
            likes: 123,
            commentsCount: 23,
            resonance: 89
        },
        {
            _id: 4,
            author: { nickname: '🌈 彩虹星球#3456' },
            createdAt: '6小时前',
            visibility: 'public',
            content: '今天和好朋友们一起看了日落，真的好美！生活中还是有很多美好的瞬间值得珍惜 🌅',
            tags: ['美好', '友谊', '日落'],
            likes: 456,
            commentsCount: 67,
            resonance: 312,
            comments: [
                {
                    _id: 401,
                    author: { nickname: '🌙 匿名用户#1111' },
                    createdAt: '5小时前',
                    content: '好羡慕啊！我也想去看看日落...'
                }
            ]
        },
        {
            _id: 5,
            author: { nickname: '❄️ 冰冷星球#7890' },
            createdAt: '8小时前',
            visibility: 'private',
            content: '最近心情很低落，不知道该怎么做..希望明天会更好呢。',
            tags: ['低落', '希望'],
            likes: 45,
            commentsCount: 12,
            resonance: 67
        }
    ];
}

// 渲染内容列表
function renderContentList() {
    const container = document.getElementById('contentList');
    container.innerHTML = '';

    contentList.forEach(item => {
        const contentItem = document.createElement('div');
        contentItem.className = 'content-item';
        
        const authorName = item.author?.nickname || item.author;
        const visibilityText = item.visibility === 'public' ? '🌍 公开' : '🔒 仅自己可见';
        const commentCount = item.commentsCount || (item.comments?.length || 0);
        
        contentItem.innerHTML = `
            <div class="item-header">
                <span class="item-author">${authorName}</span>
                <span class="item-time">${item.createdAt || item.time}</span>
                <span class="item-visibility">${visibilityText}</span>
            </div>
            <div class="item-content">
                <p class="content-text">${item.content.replace(/\n/g, '<br>')}</p>
                ${item.tags ? item.tags.map(tag => `<span class="content-tags">#${tag}</span>`).join('') : ''}
            </div>
            <div class="item-actions">
                <div class="action-item" onclick="likePost('${item._id || item.id}')">
                    <span class="action-icon">❤️</span>
                    <span class="action-text">${item.likes}</span>
                </div>
                <div class="action-item" onclick="showCommentModal('${item._id || item.id}')">
                    <span class="action-icon">💬</span>
                    <span class="action-text">${commentCount}</span>
                </div>
                <div class="action-item" onclick="resonancePost('${item._id || item.id}')">
                    <span class="action-icon">✨</span>
                    <span class="action-text">${item.resonance || 0}</span>
                </div>
            </div>
            ${item.comments && item.comments.length > 0 ? `
            <div class="comment-list">
                <span class="comment-title">评论 (${commentCount})</span>
                ${item.comments.map(comment => `
                <div class="comment-item">
                    <div class="comment-header">
                        <span class="comment-author">${comment.author?.nickname || comment.author}</span>
                        <span class="comment-time">${comment.createdAt || comment.time}</span>
                    </div>
                    <p class="comment-content">${comment.content}</p>
                </div>
                `).join('')}
            </div>
            ` : ''}
        `;
        container.appendChild(contentItem);
    });
}

// 搜索功能
function handleSearch() {
    return;
}

// 显示发布模态框
function showPublishModal() {
    document.getElementById('publishModal').style.display = 'flex';
    document.getElementById('publishContent').value = '';
    selectedImages = [];
    document.getElementById('selectedImages').innerHTML = '';
}

// 关闭发布模态框
function closePublishModal() {
    document.getElementById('publishModal').style.display = 'none';
}

// 添加表情
function addEmotion(emotion) {
    const textarea = document.getElementById('publishContent');
    textarea.value += emotion;
}

// 选择图片
function selectImage() {
    const mockImages = [
        'https://picsum.photos/200/200?random=1',
        'https://picsum.photos/200/200?random=2',
        'https://picsum.photos/200/200?random=3'
    ];

    const numImages = Math.floor(Math.random() * 3) + 1;
    const selected = mockImages.slice(0, numImages);
    selectedImages = [...selectedImages, ...selected];

    renderSelectedImages();
    alert(`选择了${numImages} 张图片`);
}

// 渲染已选择的图片
function renderSelectedImages() {
    const container = document.getElementById('selectedImages');
    container.innerHTML = selectedImages.map((img, index) => `
        <div class="selected-image-item">
            <img src="${img}" class="selected-image">
            <span class="delete-image" onclick="deleteImage(${index})">✕</span>
        </div>
    `).join('');
}

// 删除图片
function deleteImage(index) {
    selectedImages.splice(index, 1);
    renderSelectedImages();
}

// 添加位置
function addLocation() {
    const textarea = document.getElementById('publishContent');
    textarea.value += ' 📍 北京市朝阳区';
    alert('位置添加成功');
}

// 添加话题
function addTopic() {
    const topic = prompt('请输入话题名称（例如：开心、工作压力等）');
    if (topic) {
        const textarea = document.getElementById('publishContent');
        textarea.value += ` #${topic}`;
        alert('话题添加成功');
    }
}

// 添加视频
function addVideo() {
    const textarea = document.getElementById('publishContent');
    textarea.value += ' 🎬 [视频]';
    alert('视频添加成功');
}

// 发布内容
async function publish() {
    const content = document.getElementById('publishContent').value;
    if (!content && selectedImages.length === 0) {
        alert('请输入内容或选择图片');
        return;
    }

    // 从内容中提取标签
    const tagRegex = /#(\S+)/g;
    const tags = [];
    let match;
    while ((match = tagRegex.exec(content)) !== null) {
        tags.push(match[1]);
    }

    try {
        const response = await fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                content,
                tags,
                visibility: 'public',
                images: selectedImages
            })
        });

        const data = await response.json();
        if (data.success) {
            contentList.unshift(data.post);
            renderContentList();
            closePublishModal();
            alert('发布成功');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error publishing:', error);
        // 如果后端不可用，使用本地模拟
        const newPost = {
            _id: Date.now(),
            author: { nickname: '🌙 星树#' + Math.floor(Math.random() * 9999) },
            createdAt: '刚刚',
            visibility: 'public',
            content: content,
            tags: tags,
            likes: 0,
            commentsCount: 0,
            resonance: 0
        };

        contentList.unshift(newPost);
        renderContentList();
        closePublishModal();
        alert('发布成功（本地模式）');
    }
}

// 点赞
async function likePost(id) {
    const item = contentList.find(item => (item._id || item.id) == id);
    if (!item) return;

    try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}/like`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await response.json();
        if (data.success) {
            item.likes = data.post.likes;
            renderContentList();
        }
    } catch (error) {
        console.error('Error liking:', error);
        item.likes++;
        renderContentList();
    }
}

// 评论
let currentCommentId = null;

function showCommentModal(id) {
    currentCommentId = id;
    document.getElementById('commentModal').style.display = 'flex';
}

function closeCommentModal() {
    document.getElementById('commentModal').style.display = 'none';
    document.getElementById('commentContent').value = '';
    currentCommentId = null;
}

async function submitComment() {
    const comment = document.getElementById('commentContent').value.trim();
    if (!comment) {
        alert('请输入评论内容');
        return;
    }

    const item = contentList.find(item => (item._id || item.id) == currentCommentId);
    if (!item) return;

    try {
        const response = await fetch(`http://localhost:5000/api/posts/${currentCommentId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ content: comment })
        });

        const data = await response.json();
        if (data.success) {
            const newComment = {
                _id: data.comment._id,
                author: { nickname: data.comment.author.nickname },
                createdAt: '刚刚',
                content: data.comment.content
            };
            
            if (!item.comments) item.comments = [];
            item.comments.unshift(newComment);
            item.commentsCount = (item.commentsCount || 0) + 1;
            renderContentList();
            closeCommentModal();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error commenting:', error);
        if (!item.comments) item.comments = [];
        item.comments.unshift({
            _id: Date.now(),
            author: { nickname: '🌙 星树#' + Math.floor(Math.random() * 9999) },
            createdAt: '刚刚',
            content: comment
        });
        item.commentsCount = (item.commentsCount || 0) + 1;
        renderContentList();
        closeCommentModal();
    }
}

// 共鸣
async function resonancePost(id) {
    const item = contentList.find(item => (item._id || item.id) == id);
    if (!item) return;

    try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}/resonance`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await response.json();
        if (data.success) {
            item.resonance = data.post.resonance;
            renderContentList();
            alert('共鸣成功');
        }
    } catch (error) {
        console.error('Error resonating:', error);
        item.resonance = (item.resonance || 0) + 1;
        renderContentList();
        alert('共鸣成功（本地模式）');
    }
}

// 加载更多
function loadMore() {
    const morePosts = [
        {
            _id: Date.now() + 1,
            author: { nickname: '🌅 海洋星球#1122' },
            createdAt: '昨天',
            visibility: 'public',
            content: '今天起早去海边散了步，海风轻轻吹过，觉得所有烦恼都被带走了。',
            tags: ['放松', '大海', '治愈'],
            likes: 345,
            commentsCount: 56,
            resonance: 234
        },
        {
            _id: Date.now() + 2,
            author: { nickname: '⚡ 闪耀星球#3344' },
            createdAt: '昨天',
            visibility: 'public',
            content: '今天完成了一个大项目，那种成就感真的很棒！🎉',
            tags: ['成就', '努力', '开心'],
            likes: 678,
            commentsCount: 98,
            resonance: 456
        }
    ];

    contentList = [...contentList, ...morePosts];
    renderContentList();
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

function redirectToLogin() {
    window.location.href = 'login.html';
}

function redirectToMatch() {
    window.location.href = 'match.html';
}

function redirectToGarden() {
    window.location.href = 'garden.html';
}