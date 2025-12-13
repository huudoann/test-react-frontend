import React, { useState, useEffect } from 'react';
import './App.css';
import { apiService } from './services/api';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
  });
  const [editingUser, setEditingUser] = useState(null);

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(`Không thể tải danh sách người dùng: ${err.message}`);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const userData = {
        name: formData.name,
        email: formData.email,
        age: formData.age ? parseInt(formData.age) : undefined,
        address: formData.address || undefined,
      };

      if (editingUser) {
        await apiService.updateUser(editingUser.id, userData);
      } else {
        await apiService.createUser(userData);
      }

      // Reset form and reload users
      setFormData({ name: '', email: '', age: '', address: '' });
      setEditingUser(null);
      await loadUsers();
    } catch (err) {
      setError(`Không thể ${editingUser ? 'cập nhật' : 'tạo'} người dùng: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      age: user.age?.toString() || '',
      address: user.address || '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await apiService.deleteUser(id);
      await loadUsers();
    } catch (err) {
      setError(`Không thể xóa người dùng: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', age: '', address: '' });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="app-container">
          <h1 className="app-title">Quản Lý Người Dùng</h1>
          <p className="app-subtitle">Tạo, chỉnh sửa và quản lý người dùng</p>
          <div className="version-badge">
            🚀 v1.1.0 - Auto Redeploy Test | Build: {new Date().toLocaleString('vi-VN')}
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <strong>Lỗi:</strong> {error}
              <button 
                className="error-close"
                onClick={() => setError(null)}
                aria-label="Đóng thông báo lỗi"
              >
                ×
              </button>
            </div>
          )}

          {/* User Form */}
          <div className="user-form card">
            <h2 className="form-title">
              {editingUser ? 'Chỉnh Sửa Người Dùng' : 'Tạo Người Dùng Mới'}
            </h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="name">Họ và tên *</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Tuổi (tùy chọn)</label>
                <input
                  id="age"
                  type="number"
                  placeholder="Nhập tuổi"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  min="1"
                  max="150"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Địa chỉ (tùy chọn)</label>
                <input
                  id="address"
                  type="text"
                  placeholder="Nhập địa chỉ"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? 'Đang xử lý...' : editingUser ? 'Cập nhật' : 'Tạo người dùng'}
                </button>
                {editingUser && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    Hủy
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Users List */}
          <div className="users-list card">
            <div className="list-header">
              <h2 className="list-title">
                Danh sách người dùng <span className="user-count">({users.length})</span>
              </h2>
              <button
                onClick={loadUsers}
                disabled={loading}
                className="btn btn-refresh"
                title="Làm mới danh sách"
              >
                Làm mới
              </button>
            </div>
            
            {loading && users.length === 0 ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Đang tải danh sách người dùng...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="empty-state">
                <p className="empty-icon">📋</p>
                <p className="empty-text">Chưa có người dùng nào. Hãy tạo người dùng mới ở trên!</p>
              </div>
            ) : (
              <div className="users-grid">
                {users.map((user) => (
                  <div key={user.id} className="user-card">
                    <div className="user-info">
                      <h3 className="user-name">{user.name}</h3>
                      <p className="user-email">{user.email}</p>
                      {user.age && (
                        <p className="user-detail">Tuổi: {user.age}</p>
                      )}
                      {user.address && (
                        <p className="user-address">{user.address}</p>
                      )}
                      <p className="user-id">ID: {user.id}</p>
                    </div>
                    <div className="user-actions">
                      <button
                        onClick={() => handleEdit(user)}
                        disabled={loading}
                        className="btn btn-edit"
                        title="Chỉnh sửa người dùng"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        disabled={loading}
                        className="btn btn-delete"
                        title="Xóa người dùng"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
/ /   t e s t  
 