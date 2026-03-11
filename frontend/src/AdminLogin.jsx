import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  // 檢查 localStorage 登入狀態
  useEffect(() => {
    const storedAuth = localStorage.getItem("adminAuth");
    if (storedAuth) {
      const auth = JSON.parse(storedAuth);
      setIsAdminLoggedIn(true);
      setAdminUsername(auth.username);
    }
  }, []);

  // 登入處理
  const doLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post('/api/admin.php?action=login', {
        username,
        password,
      });

      if (response.data.success) {
        setIsAdminLoggedIn(true);
        setAdminUsername(username);
        localStorage.setItem("adminAuth", JSON.stringify({ username }));
      } else {
        setError("登入失敗");
      }
    } catch (err) {
      setError(err.response?.data?.error || "登入失敗");
    }
  };

  if (isAdminLoggedIn) {
    return <Navigate to="/admin_dashboard" replace />;
  }

  return (
    <div className="container">
      <div className="login-form">


        {error && <div className="error-message">{error}</div>}

        {!showChangePassword && !showResetPassword ? (
          <>
            <h2>🔐 管理頁面</h2>
            <form onSubmit={doLogin}>
              <div className="form-group">
                <label>用戶名</label>
                <input
                  type="text"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>密碼</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn">
                登入
              </button>
            </form>
            <Link to="/#home" style={{ display: "block", marginTop: "15px", textAlign: "center", color: "#3b4cca" }}>
              返回首頁
            </Link>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                type="button"
                onClick={() => setShowChangePassword(true)}
                style={{ background: "none", border: "none", color: "#3b4cca", cursor: "pointer", textDecoration: "underline" }}
              >
                修改密碼
              </button>
              {" | "}
              <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                style={{ background: "none", border: "none", color: "#3b4cca", cursor: "pointer", textDecoration: "underline" }}
              >
                忘記密碼
              </button>
            </div>
          </>
        ) : (
          <>
            {showChangePassword && <ChangePassword onCancel={() => setShowChangePassword(false)} />}
            {showResetPassword && <ResetPassword onCancel={() => setShowResetPassword(false)} />}
          </>
        )}
      </div>
    </div>
  );
}

function ChangePassword({ onCancel }) {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 驗證新密碼確認
    if (newPassword !== confirmPassword) {
      setError('新密碼和確認密碼不匹配');
      return;
    }

    try {
      const response = await axios.post('/api/admin.php?action=change-password', {
        username,
        old_password: oldPassword,
        new_password: newPassword
      });

      if (response.data.success) {
        setSuccess('密碼修改成功！');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || '修改失敗';
      if (errorMsg.includes('密碼錯誤') || errorMsg.includes('Invalid')) {
        setError('密碼錯誤，請檢查後重新輸入');
      } else {
        setError(errorMsg);
      }
    }
  };

  return (
    <>
      <h2>🔐修改密碼</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>用戶名</label>
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>舊密碼</label>
          <input
            type="password"
            className="form-input"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>新密碼</label>
          <input
            type="password"
            className="form-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>確認新密碼</label>
          <input
            type="password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn">
          修改密碼
        </button>
      </form>
      <button className="btn btn-secondary" onClick={onCancel}>
        返回
      </button>
    </>
  );
}

function ResetPassword({ onCancel }) {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState(''); // 新增驗證碼欄位
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('新密碼和確認密碼不匹配');
      return;
    }

    if (!code || code.trim() === '') {
      setError('請輸入驗證碼');
      return;
    }

    try {
      const response = await axios.post('/api/admin.php?action=reset-password', {
        username,
        new_password: newPassword,
        code,          // 把驗證碼送到後端
      });

      if (response.data.success) {
        setSuccess('密碼重置成功！');
        setUsername('');
        setNewPassword('');
        setConfirmPassword('');
        setCode('');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || '重置失敗';
      if (errorMsg.includes('無效的驗證碼') || errorMsg.includes('Invalid')) {
        setError('驗證碼無效，請重新輸入');
      } else {
        setError(errorMsg);
      }
    }
  };

  // 重新發送驗證碼
  const handleResendCode = async () => {
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('/api/admin.php?action=resend-code', {
        username
      });
      if (response.data.success) {
        setSuccess('驗證碼已重新發送！');
      } else {
        setError(response.data.error || '重新發送失敗');
      }
    } catch (err) {
      setError('重新發送失敗');
    }
  };

  return (
    <>
      <h2>🔐 重置密碼</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>用戶名</label>
          <input type="text" className="form-input" value={username}
            onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>新密碼</label>
          <input type="password" className="form-input" value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>確認新密碼</label>
          <input type="password" className="form-input" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>驗證碼</label>
          <div className="verification-code-wrapper" style={{display: 'flex', alignItems: 'center'}}>
            <input type="text" className="form-input" value={code} onChange={(e) => setCode(e.target.value)} required />
              <button type="button" className="btn" style={{marginLeft:'10px',maxWidth:'40%'}} onClick={handleResendCode}>發送驗證碼</button>
          </div>
        </div>
        <button type="submit" className="btn">重置密碼</button>
      </form>
      <button className="btn btn-secondary" onClick={onCancel}>返回</button>
    </>
  );
}


export default AdminLogin;
