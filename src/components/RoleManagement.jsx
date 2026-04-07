import { useState } from 'react';
import './UserManagement.css';

function RoleManagement() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', description: 'Full system access', permissions: 'All', status: 'Active', createdDate: '2024-01-10' },
    { id: 2, name: 'Manager', description: 'User and report management', permissions: 'Read/Write Users, Reports', status: 'Active', createdDate: '2024-01-15' },
    { id: 3, name: 'User', description: 'Basic user access', permissions: 'Read Data', status: 'Active', createdDate: '2024-01-20' },
    { id: 4, name: 'Viewer', description: 'Read-only access', permissions: 'Read Only', status: 'Active', createdDate: '2024-02-01' },
    { id: 5, name: 'Moderator', description: 'Content moderation', permissions: 'Read/Write/Delete Content', status: 'Inactive', createdDate: '2024-02-15' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: '',
    status: 'Active'
  });
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ show: false, roleId: null, roleName: '' });

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', permissions: '', status: 'Active' });
    setShowAddModal(true);
  };

  const handleEditClick = (role) => {
    setEditingId(role.id);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      status: role.status
    });
    setShowAddModal(true);
  };

  const handleDeleteClick = (id) => {
    const role = roles.find(r => r.id === id);
    setDeleteConfirmModal({
      show: true,
      roleId: id,
      roleName: role?.name || 'this role'
    });
  };

  const handleConfirmDelete = () => {
    setRoles(roles.filter(role => role.id !== deleteConfirmModal.roleId));
    setDeleteConfirmModal({ show: false, roleId: null, roleName: '' });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmModal({ show: false, roleId: null, roleName: '' });
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
      setRoles(roles.map(role =>
        role.id === editingId
          ? { ...role, ...formData }
          : role
      ));
    } else {
      const newRole = {
        id: Math.max(...roles.map(r => r.id), 0) + 1,
        ...formData,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setRoles([...roles, newRole]);
    }
    
    setShowAddModal(false);
    setFormData({ name: '', description: '', permissions: '', status: 'Active' });
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setFormData({ name: '', description: '', permissions: '', status: 'Active' });
    setEditingId(null);
  };

  return (
    <div className="userManagement">
      <div className="userManagementHeader">
        <h1 className="userManagementTitle">Role Management</h1>
        <button 
          className="addUserButton"
          onClick={handleAddClick}
          title="Add new role"
        >
          ➕ Add New Role
        </button>
      </div>

      <div className="userTableContainer">
        <table className="userTable">
          <thead>
            <tr className="userTableHeader">
              <th className="userTableCell">ID</th>
              <th className="userTableCell">Role Name</th>
              <th className="userTableCell">Description</th>
              <th className="userTableCell">Permissions</th>
              <th className="userTableCell">Status</th>
              <th className="userTableCell">Created Date</th>
              <th className="userTableCell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={role.id} className={`userTableRow ${index % 2 === 0 ? 'userTableRowAlt' : ''}`}>
                <td className="userTableCell">{role.id}</td>
                <td className="userTableCell userNameCell">{role.name}</td>
                <td className="userTableCell">{role.description}</td>
                <td className="userTableCell">{role.permissions}</td>
                <td className="userTableCell">
                  <span className={`statusBadge statusBadge${role.status}`}>{role.status}</span>
                </td>
                <td className="userTableCell">{role.createdDate}</td>
                <td className="userTableCell userActionsCell">
                  <button 
                    className="actionButton editButton"
                    onClick={() => handleEditClick(role)}
                    title="Edit role"
                  >
                    ✏️
                  </button>
                  <button 
                    className="actionButton deleteButton"
                    onClick={() => handleDeleteClick(role.id)}
                    title="Delete role"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modalOverlay" onClick={handleCancel}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2 className="modalTitle">
              {editingId ? 'Edit Role' : 'Add New Role'}
            </h2>

            <form className="userForm" onSubmit={handleSubmit}>
              <div className="formGroup">
                <label className="formLabel">Role Name</label>
                <input
                  type="text"
                  name="name"
                  className="formInput"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter role name"
                  required
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Description</label>
                <input
                  type="text"
                  name="description"
                  className="formInput"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter role description"
                  required
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Permissions</label>
                <input
                  type="text"
                  name="permissions"
                  className="formInput"
                  value={formData.permissions}
                  onChange={handleInputChange}
                  placeholder="Enter permissions (comma-separated)"
                  required
                />
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
                  {editingId ? 'Update Role' : 'Add Role'}
                </button>
                <button type="button" className="cancelButton" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmModal.show && (
        <div className="modalOverlay">
          <div className="deleteConfirmModal">
            <div className="deleteModalHeader">
              <h3 className="deleteModalTitle">Delete Role</h3>
              <button className="deleteModalClose" onClick={handleCancelDelete}>✕</button>
            </div>
            <div className="deleteModalContent">
              <p className="deleteModalMessage">
                Are you sure you want to delete <strong>{deleteConfirmModal.roleName}</strong>?
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

      <div className="userStats">
        <div className="statCard">
          <span className="statLabel">Total Roles</span>
          <span className="statValue">{roles.length}</span>
        </div>
        <div className="statCard">
          <span className="statLabel">Active Roles</span>
          <span className="statValue">{roles.filter(r => r.status === 'Active').length}</span>
        </div>
        <div className="statCard">
          <span className="statLabel">Inactive Roles</span>
          <span className="statValue">{roles.filter(r => r.status === 'Inactive').length}</span>
        </div>
      </div>
    </div>
  );
}

export default RoleManagement;
