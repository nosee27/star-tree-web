﻿// 鍒囨崲FAQ灞曞紑/鏀惰捣
function toggleFaq(id) {
    const faqItem = document.querySelector(`#faq${id}`).parentElement;
    faqItem.classList.toggle('active');
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

function redirectToContact() {
    window.location.href = 'contact.html';
}
