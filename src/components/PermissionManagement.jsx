import { useState } from 'react';
import './UserManagement.css';
import './PermissionManagement.css';

function PermissionManagement() {
  // Master list of available permissions (catalog)
  const [permissions, setPermissions] = useState([
    { id: 1, name: 'user.view', displayName: 'View Users', description: 'Permission to view user list', module: 'Users', type: 'READ', status: 'Active', createdDate: '2024-01-10' },
    { id: 2, name: 'user.create', displayName: 'Create User', description: 'Permission to create new users', module: 'Users', type: 'CREATE', status: 'Active', createdDate: '2024-01-15' },
    { id: 3, name: 'user.edit', displayName: 'Edit User', description: 'Permission to edit user information', module: 'Users', type: 'UPDATE', status: 'Active', createdDate: '2024-01-20' },
    { id: 4, name: 'user.delete', displayName: 'Delete User', description: 'Permission to delete users', module: 'Users', type: 'DELETE', status: 'Active', createdDate: '2024-02-01' },
    { id: 5, name: 'report.view', displayName: 'View Reports', description: 'Permission to view reports', module: 'Reports', type: 'READ', status: 'Active', createdDate: '2024-02-05' },
    { id: 6, name: 'report.create', displayName: 'Generate Report', description: 'Permission to generate new reports', module: 'Reports', type: 'CREATE', status: 'Active', createdDate: '2024-02-10' },
    { id: 7, name: 'config.manage', displayName: 'System Configuration', description: 'Permission to configure system settings', module: 'Settings', type: 'UPDATE', status: 'Inactive', createdDate: '2024-02-15' },
    { id: 8, name: 'audit.view', displayName: 'View Audit Logs', description: 'Permission to view audit logs', module: 'Audit', type: 'READ', status: 'Active', createdDate: '2024-02-20' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    displayName: '',
    description: '',
    module: '',
    type: 'READ',
    status: 'Active'
  });
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ show: false, permissionId: null, permissionName: '' });

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ name: '', displayName: '', description: '', module: '', type: 'READ', status: 'Active' });
    setShowAddModal(true);
  };

  const handleEditClick = (permission) => {
    setEditingId(permission.id);
    setFormData({
      name: permission.name,
      displayName: permission.displayName,
      description: permission.description,
      module: permission.module,
      type: permission.type,
      status: permission.status
    });
    setShowAddModal(true);
  };

  const handleDeleteClick = (id) => {
    const permission = permissions.find(p => p.id === id);
    setDeleteConfirmModal({
      show: true,
      permissionId: id,
      permissionName: permission?.displayName || 'this permission'
    });
  };

  const handleConfirmDelete = () => {
    setPermissions(permissions.filter(permission => permission.id !== deleteConfirmModal.permissionId));
    setDeleteConfirmModal({ show: false, permissionId: null, permissionName: '' });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmModal({ show: false, permissionId: null, permissionName: '' });
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
      setPermissions(permissions.map(permission =>
        permission.id === editingId
          ? { ...permission, ...formData }
          : permission
      ));
    } else {
      const newPermission = {
        id: Math.max(...permissions.map(p => p.id), 0) + 1,
        ...formData,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setPermissions([...permissions, newPermission]);
    }
    
    setShowAddModal(false);
    setFormData({ name: '', displayName: '', description: '', module: '', type: 'READ', status: 'Active' });
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setFormData({ name: '', displayName: '', description: '', module: '', type: 'READ', status: 'Active' });
    setEditingId(null);
  };

  return (
    <div className="userManagement">
      <div className="userManagementHeader">
        <h1 className="userManagementTitle">Permission Catalog (RBAC)</h1>
        <button 
          className="addUserButton"
          onClick={handleAddClick}
          title="Add new permission"
        >
          ➕ Add New Permission
        </button>
      </div>

      <div className="userTableContainer">
        <table className="userTable">
          <thead>
            <tr className="userTableHeader">
              <th className="userTableCell">ID</th>
              <th className="userTableCell">Permission Code</th>
              <th className="userTableCell">Display Name</th>
              <th className="userTableCell">Description</th>
              <th className="userTableCell">Module</th>
              <th className="userTableCell">Type</th>
              <th className="userTableCell">Status</th>
              <th className="userTableCell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission, index) => (
              <tr key={permission.id} className={`userTableRow ${index % 2 === 0 ? 'userTableRowAlt' : ''}`}>
                <td className="userTableCell">{permission.id}</td>
                <td className="userTableCell userNameCell">{permission.name}</td>
                <td className="userTableCell">{permission.displayName}</td>
                <td className="userTableCell">{permission.description}</td>
                <td className="userTableCell">{permission.module}</td>
                <td className="userTableCell">
                  <span className={`permissionTypeBadge ${
                    permission.type === 'READ' ? 'typeRead' :
                    permission.type === 'CREATE' ? 'typeCreate' :
                    permission.type === 'UPDATE' ? 'typeUpdate' :
                    permission.type === 'DELETE' ? 'typeDelete' :
                    'typeDefault'
                  }`}>
                    {permission.type}
                  </span>
                </td>
                <td className="userTableCell">
                  <span className={`statusBadge statusBadge${permission.status}`}>{permission.status}</span>
                </td>
                <td className="userTableCell userActionsCell">
                  <button 
                    className="actionButton editButton"
                    onClick={() => handleEditClick(permission)}
                    title="Edit permission"
                  >
                    ✏️
                  </button>
                  <button 
                    className="actionButton deleteButton"
                    onClick={() => handleDeleteClick(permission.id)}
                    title="Delete permission"
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
        <div className="modalOverlay">
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h2 className="modalTitle">
                {editingId ? 'Edit Permission' : 'Add New Permission'}
              </h2>
              <button 
                type="button"
                className="modalCloseButton"
                onClick={handleCancel}
                title="Close"
              >
                ✕
              </button>
            </div>

            <form className="userForm" onSubmit={handleSubmit}>
              <div className="formGroup">
                <label className="formLabel">Permission Code (e.g., user.view)</label>
                <input
                  type="text"
                  name="name"
                  className="formInput"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., user.view, user.create"
                  required
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  className="formInput"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  placeholder="e.g., View Users"
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
                  placeholder="Enter permission description"
                  required
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Module</label>
                <input
                  type="text"
                  name="module"
                  className="formInput"
                  value={formData.module}
                  onChange={handleInputChange}
                  placeholder="e.g., Users, Reports, Settings"
                  required
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Type</label>
                <select
                  name="type"
                  className="formInput"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="READ">READ</option>
                  <option value="CREATE">CREATE</option>
                  <option value="UPDATE">UPDATE</option>
                  <option value="DELETE">DELETE</option>
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
                  {editingId ? 'Update Permission' : 'Add Permission'}
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
              <h3 className="deleteModalTitle">Delete Permission</h3>
              <button className="deleteModalClose" onClick={handleCancelDelete}>✕</button>
            </div>
            <div className="deleteModalContent">
              <p className="deleteModalMessage">
                Are you sure you want to delete <strong>{deleteConfirmModal.permissionName}</strong>?
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
          <span className="statLabel">Total Permissions</span>
          <span className="statValue">{permissions.length}</span>
        </div>
        <div className="statCard">
          <span className="statLabel">Active Permissions</span>
          <span className="statValue">{permissions.filter(p => p.status === 'Active').length}</span>
        </div>
        <div className="statCard">
          <span className="statLabel">Inactive Permissions</span>
          <span className="statValue">{permissions.filter(p => p.status === 'Inactive').length}</span>
        </div>
      </div>
    </div>
  );
}

export default PermissionManagement;
