// 验证账号格式
function validateAccount(account) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (phoneRegex.test(account)) {
        return true;
    } else if (emailRegex.test(account)) {
        return true;
    } else {
        return false;
    }
}

// 切换到登录
function switchToLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginTab').className = 'tab-item active';
    document.getElementById('registerTab').className = 'tab-item';
}

// 切换到注册
function switchToRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginTab').className = 'tab-item';
    document.getElementById('registerTab').className = 'tab-item active';
}

// 获取登录验证码
async function getLoginVerificationCode() {
    const account = document.getElementById('account').value;
    if (!account) {
        alert('请输入账号');
        return;
    }
    
    if (!validateAccount(account)) {
        alert('请输入正确的手机号或邮箱');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:5000/api/users/sendcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ account })
        });
        
        const data = await response.json();
        if (data.success) {
            alert('验证码已发送');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('发送失败，请稍后重试');
    }
}

// 获取注册验证码
async function getVerificationCode() {
    const account = document.getElementById('registerAccount').value;
    if (!account) {
        alert('请输入账号');
        return;
    }
    
    if (!validateAccount(account)) {
        alert('请输入正确的手机号或邮箱');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:5000/api/users/sendcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ account })
        });
        
        const data = await response.json();
        if (data.success) {
            alert('验证码已发送');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('发送失败，请稍后重试');
    }
}

// 登录
async function login() {
    const account = document.getElementById('account').value;
    const verificationCode = document.getElementById('verificationCode').value;
    
    if (!account) {
        alert('请输入账号');
        return;
    }
    
    if (!verificationCode) {
        alert('请输入验证码');
        return;
    }
    
    if (!validateAccount(account)) {
        alert('请输入正确的手机号或邮箱');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ account, verificationCode })
        });
        
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('登录成功');
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('登录失败，请稍后重试');
    }
}

// 注册
async function register() {
    const account = document.getElementById('registerAccount').value;
    const verificationCode = document.getElementById('registerVerificationCode').value;
    const password = document.getElementById('registerPassword').value;
    
    if (!account) {
        alert('请输入账号');
        return;
    }
    
    if (!validateAccount(account)) {
        alert('请输入正确的手机号或邮箱');
        return;
    }
    
    if (!verificationCode) {
        alert('请输入验证码');
        return;
    }
    
    if (!password || password.length < 8) {
        alert('密码至少8位');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ account, verificationCode, password })
        });
        
        const data = await response.json();
        if (data.success) {
            alert('注册成功');
            switchToLogin();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('注册失败，请稍后重试');
    }
}

// 微信登录
function loginWithWechat() {
    alert('微信登录中...(模拟)');
    setTimeout(() => {
        alert('微信登录成功');
        window.location.href = 'index.html';
    }, 1500);
}

// 微信注册
function registerWithWechat() {
    alert('微信注册中...(模拟)');
    setTimeout(() => {
        alert('微信注册成功');
        switchToLogin();
    }, 1500);
}