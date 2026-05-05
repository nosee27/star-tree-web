﻿// 鎻愪氦鐣欒█
function submitMessage() {
    const message = document.getElementById('messageInput').value.trim();
    
    if (!message) {
        alert('璇疯緭鍏ョ暀瑷€鍐呭');
        return;
    }
    
    alert('鎰熻阿鎮ㄧ殑鐣欒█锛佹垜浠細灏藉揩鍥炲鎮ㄣ€?);
    document.getElementById('messageInput').value = '';
}

// 杩斿洖涓婁竴椤?function goBack() {
    window.history.back();
}

// 瀵艰埅鍑芥暟
function redirectToIndex() {
    window.location.href = 'index.html';
}

function redirectToTreehole() {
    window.location.href = 'treehole.html';
}

function redirectToProfile() {
    window.location.href = 'profile.html';
}
