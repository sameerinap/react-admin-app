import { useState } from 'react';
import './UserManagement.css';
import './RoleManagement.css';

function RoleManagement() {
  // Master permissions list (from Permission Catalog)
  const allPermissions = [
    { id: 1, name: 'user.view', displayName: 'View Users' },
    { id: 2, name: 'user.create', displayName: 'Create User' },
    { id: 3, name: 'user.edit', displayName: 'Edit User' },
    { id: 4, name: 'user.delete', displayName: 'Delete User' },
    { id: 5, name: 'report.view', displayName: 'View Reports' },
    { id: 6, name: 'report.create', displayName: 'Generate Report' },
    { id: 7, name: 'config.manage', displayName: 'System Configuration' },
    { id: 8, name: 'audit.view', displayName: 'View Audit Logs' },
  ];

  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', description: 'Full system access', permissionIds: [1, 2, 3, 4, 5, 6, 7, 8], status: 'Active', createdDate: '2024-01-10' },
    { id: 2, name: 'Manager', description: 'User and report management', permissionIds: [1, 2, 3, 5, 6], status: 'Active', createdDate: '2024-01-15' },
    { id: 3, name: 'User', description: 'Basic user access', permissionIds: [1, 5], status: 'Active', createdDate: '2024-01-20' },
    { id: 4, name: 'Viewer', description: 'Read-only access', permissionIds: [1, 5, 8], status: 'Active', createdDate: '2024-02-01' },
    { id: 5, name: 'Moderator', description: 'Content moderation', permissionIds: [1, 3, 5], status: 'Inactive', createdDate: '2024-02-15' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissionIds: [],
    status: 'Active'
  });
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ show: false, roleId: null, roleName: '' });

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ name: '', description: '', permissionIds: [], status: 'Active' });
    setShowAddModal(true);
  };

  const handleEditClick = (role) => {
    setEditingId(role.id);
    setFormData({
      name: role.name,
      description: role.description,
      permissionIds: [...role.permissionIds],
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

  const handlePermissionToggle = (permissionId) => {
    setFormData(prev => {
      const newPermissions = prev.permissionIds.includes(permissionId)
        ? prev.permissionIds.filter(id => id !== permissionId)
        : [...prev.permissionIds, permissionId];
      return { ...prev, permissionIds: newPermissions };
    });
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
    setFormData({ name: '', description: '', permissionIds: [], status: 'Active' });
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setFormData({ name: '', description: '', permissionIds: [], status: 'Active' });
    setEditingId(null);
  };

  const getPermissionNames = (permissionIds) => {
    return permissionIds
      .map(id => allPermissions.find(p => p.id === id)?.displayName)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="userManagement">
      <div className="userManagementHeader">
        <h1 className="userManagementTitle">Role Management (RBAC)</h1>
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
              <th className="userTableCell">Assigned Permissions</th>
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
                <td className="userTableCell permissionCountCell">
                  <span className="permissionCountBadge">
                    {role.permissionIds.length} permission(s)
                  </span>
                </td>
                <td className="userTableCell">
                  <span className={`statusBadge statusBadge${role.status}`}>{role.status}</span>
                </td>
                <td className="userTableCell">{role.createdDate}</td>
                <td className="userTableCell userActionsCell">
                  <button 
                    className="actionButton editButton"
                    onClick={() => handleEditClick(role)}
                    title="Edit role and permissions"
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
        <div className="modalOverlay">
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h2 className="modalTitle">
                {editingId ? 'Edit Role & Permissions' : 'Add New Role'}
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

            <div className="modalBody">
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
                <label className="formLabel">Assign Permissions</label>
                <div className="permissionContainer">
                  {allPermissions.map((permission) => (
                    <div key={permission.id} className="permissionItem">
                      <label className={`permissionLabel ${formData.permissionIds.includes(permission.id) ? 'selected' : ''}`}>
                        <input
                          type="checkbox"
                          className="permissionCheckbox"
                          checked={formData.permissionIds.includes(permission.id)}
                          onChange={() => handlePermissionToggle(permission.id)}
                        />
                        <span className="permissionTextContainer">
                          <div className="permissionDisplayName">
                            {permission.displayName}
                          </div>
                          <div className="permissionCode">
                            {permission.name}
                          </div>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="permissionCounter">
                  ✓ Selected: <strong>{formData.permissionIds.length}</strong> permission(s)
                </div>
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
          <span className="statLabel">Total Permissions</span>
          <span className="statValue">{allPermissions.length}</span>
        </div>
      </div>
    </div>
  );
}

export default RoleManagement;
