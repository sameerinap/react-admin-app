import { useState } from 'react';
import './UserManagement.css';

/**
 * User Management Component
 * 
 * Purpose: Display and manage users in a data table
 * - Shows all users in a grid table
 * - Add, Edit, Delete user functionality
 * - Add New User button
 */

function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@react.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@react.com', role: 'Manager', status: 'Active', joinDate: '2024-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@react.com', role: 'User', status: 'Active', joinDate: '2024-03-10' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@react.com', role: 'Manager', status: 'Inactive', joinDate: '2024-01-25' },
    { id: 5, name: 'David Brown', email: 'david@react.com', role: 'User', status: 'Active', joinDate: '2024-03-05' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'Active'
  });
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ show: false, userId: null, userName: '' });

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', role: 'User', status: 'Active' });
    setShowAddModal(true);
  };

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setShowAddModal(true);
  };

  const handleDeleteClick = (id) => {
    const user = users.find(u => u.id === id);
    setDeleteConfirmModal({
      show: true,
      userId: id,
      userName: user?.name || 'this user'
    });
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter(user => user.id !== deleteConfirmModal.userId));
    setDeleteConfirmModal({ show: false, userId: null, userName: '' });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmModal({ show: false, userId: null, userName: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Edit existing user
      setUsers(users.map(user =>
        user.id === editingId
          ? { ...user, ...formData }
          : user
      ));
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        ...formData,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
    }
    
    setShowAddModal(false);
    setFormData({ name: '', email: '', role: 'User', status: 'Active' });
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setFormData({ name: '', email: '', role: 'User', status: 'Active' });
    setEditingId(null);
  };

  return (
    <div className="userManagement">
      <div className="userManagementHeader">
        <h1 className="userManagementTitle">User Management</h1>
        <button 
          className="addUserButton"
          onClick={handleAddClick}
          title="Add new user"
        >
          ➕ Add New User
        </button>
      </div>

      {/* Users Table */}
      <div className="userTableContainer">
        <table className="userTable">
          <thead>
            <tr className="userTableHeader">
              <th className="userTableCell">ID</th>
              <th className="userTableCell">Name</th>
              <th className="userTableCell">Email</th>
              <th className="userTableCell">Role</th>
              <th className="userTableCell">Status</th>
              <th className="userTableCell">Join Date</th>
              <th className="userTableCell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={`userTableRow ${index % 2 === 0 ? 'userTableRowAlt' : ''}`}>
                <td className="userTableCell">{user.id}</td>
                <td className="userTableCell userNameCell">{user.name}</td>
                <td className="userTableCell">{user.email}</td>
                <td className="userTableCell">
                  <span className={`roleBadge roleBadge${user.role}`}>{user.role}</span>
                </td>
                <td className="userTableCell">
                  <span className={`statusBadge statusBadge${user.status}`}>{user.status}</span>
                </td>
                <td className="userTableCell">{user.joinDate}</td>
                <td className="userTableCell userActionsCell">
                  <button 
                    className="actionButton editButton"
                    onClick={() => handleEditClick(user)}
                    title="Edit user"
                  >
                    ✏️
                  </button>
                  <button 
                    className="actionButton deleteButton"
                    onClick={() => handleDeleteClick(user.id)}
                    title="Delete user"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Modal */}
      {showAddModal && (
        <div className="modalOverlay" onClick={handleCancel}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2 className="modalTitle">
              {editingId ? 'Edit User' : 'Add New User'}
            </h2>

            <form className="userForm" onSubmit={handleSubmit}>
              <div className="formGroup">
                <label className="formLabel">Name</label>
                <input
                  type="text"
                  name="name"
                  className="formInput"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter user name"
                  required
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Email</label>
                <input
                  type="email"
                  name="email"
                  className="formInput"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter user email"
                  required
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Role</label>
                <select
                  name="role"
                  className="formInput"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="formGroup">
                <label className="formLabel">Status</label>
                <select
                  name="status"
                  className="formInput"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="formActions">
                <button type="submit" className="submitButton">
                  {editingId ? 'Update User' : 'Add User'}
                </button>
                <button type="button" className="cancelButton" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmModal.show && (
        <div className="modalOverlay">
          <div className="deleteConfirmModal">
            <div className="deleteModalHeader">
              <h3 className="deleteModalTitle">Delete User</h3>
              <button className="deleteModalClose" onClick={handleCancelDelete}>✕</button>
            </div>
            <div className="deleteModalContent">
              <p className="deleteModalMessage">
                Are you sure you want to delete <strong>{deleteConfirmModal.userName}</strong>?
              </p>
              <p className="deleteModalWarning">This action cannot be undone.</p>
            </div>
            <div className="deleteModalActions">
              <button className="deleteModalCancel" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="deleteModalConfirm" onClick={handleConfirmDelete}>
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Stats */}
      <div className="userStats">
        <div className="statCard">
          <span className="statLabel">Total Users</span>
          <span className="statValue">{users.length}</span>
        </div>
        <div className="statCard">
          <span className="statLabel">Active Users</span>
          <span className="statValue">{users.filter(u => u.status === 'Active').length}</span>
        </div>
        <div className="statCard">
          <span className="statLabel">Inactive Users</span>
          <span className="statValue">{users.filter(u => u.status === 'Inactive').length}</span>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
