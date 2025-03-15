document.addEventListener('DOMContentLoaded', function() {
    // 创建容器并插入修改密码表单
    const container = document.createElement('div');
    container.className = 'password-change-container';
    container.innerHTML = `
        <h2>修改密码</h2>
        <form id="passwordChangeForm">
            <div>
                <label for="currentPassword">当前密码：</label>
                <input type="password" id="currentPassword" name="currentPassword" required>
            </div>
            <div>
                <label for="newPassword">新密码：</label>
                <input type="password" id="newPassword" name="newPassword" required>
            </div>
            <div>
                <label for="confirmPassword">确认新密码：</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
            </div>
            <button type="submit">提交</button>
        </form>
        <div id="message"></div>
    `;
    document.body.appendChild(container);

    // 表单提交处理逻辑
    const form = document.getElementById('passwordChangeForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const messageDiv = document.getElementById('message');

        // 简单验证新密码与确认密码是否一致
        if (newPassword !== confirmPassword) {
            messageDiv.textContent = '新密码和确认密码不匹配！';
            messageDiv.style.color = 'red';
            return;
        }

        // 发送 API 请求，更新密码（请替换成你自己的后端接口地址与逻辑）
        try {
            const response = await fetch('/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await response.json();
            if (response.ok) {
                messageDiv.textContent = data.message || '密码修改成功！';
                messageDiv.style.color = 'green';
            } else {
                messageDiv.textContent = data.error || '密码修改失败！';
                messageDiv.style.color = 'red';
            }
        } catch (error) {
            messageDiv.textContent = '请求异常，请稍后再试。';
            messageDiv.style.color = 'red';
        }
    });
});