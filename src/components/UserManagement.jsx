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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeId: '',
    department: 'Development',
    dateOfBirth: '',
    address: '',
    role: 'User',
    status: 'Active',
    profileImage: null,
    profileImagePreview: '',
    idDocument: null,
    idDocumentName: '',
    passportDocument: null,
    passportDocumentName: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ show: false, userId: null, userName: '' });

  const resetFormData = () => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeId: '',
    department: 'Development',
    dateOfBirth: '',
    address: '',
    role: 'User',
    status: 'Active',
    profileImage: null,
    profileImagePreview: '',
    idDocument: null,
    idDocumentName: '',
    passportDocument: null,
    passportDocumentName: ''
  });

  const handleAddClick = () => {
    setEditingId(null);
    setFormData(resetFormData());
    setShowAddModal(true);
  };

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email,
      phone: user.phone || '',
      employeeId: user.employeeId || '',
      department: user.department || 'Development',
      dateOfBirth: user.dateOfBirth || '',
      address: user.address || '',
      role: user.role,
      status: user.status,
      profileImage: null,
      profileImagePreview: user.profileImagePreview || '',
      idDocument: null,
      idDocumentName: user.idDocumentName || '',
      passportDocument: null,
      passportDocumentName: user.passportDocumentName || ''
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
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        if (name === 'profileImage') {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData(prev => ({
              ...prev,
              profileImage: file,
              profileImagePreview: reader.result
            }));
          };
          reader.readAsDataURL(file);
        } else if (name === 'idDocument') {
          setFormData(prev => ({
            ...prev,
            idDocument: file,
            idDocumentName: file.name
          }));
        } else if (name === 'passportDocument') {
          setFormData(prev => ({
            ...prev,
            passportDocument: file,
            passportDocumentName: file.name
          }));
        }
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Edit existing user
      setUsers(users.map(user =>
        user.id === editingId
          ? { 
              ...user, 
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              employeeId: formData.employeeId,
              department: formData.department,
              dateOfBirth: formData.dateOfBirth,
              address: formData.address,
              name: `${formData.firstName} ${formData.lastName}`,
              role: formData.role,
              status: formData.status,
              profileImagePreview: formData.profileImagePreview || user.profileImagePreview,
              idDocumentName: formData.idDocumentName || user.idDocumentName,
              passportDocumentName: formData.passportDocumentName || user.passportDocumentName
            }
          : user
      ));
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        employeeId: formData.employeeId,
        department: formData.department,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        role: formData.role,
        status: formData.status,
        joinDate: new Date().toISOString().split('T')[0],
        profileImagePreview: formData.profileImagePreview,
        idDocumentName: formData.idDocumentName,
        passportDocumentName: formData.passportDocumentName
      };
      setUsers([...users, newUser]);
    }
    
    setShowAddModal(false);
    setFormData(resetFormData());
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setFormData(resetFormData());
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
              <th className="userTableCell">Department</th>
              <th className="userTableCell">Role</th>
              <th className="userTableCell">Status</th>
              <th className="userTableCell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={`userTableRow ${index % 2 === 0 ? 'userTableRowAlt' : ''}`}>
                <td className="userTableCell">{user.id}</td>
                <td className="userTableCell userNameCell">{user.name}</td>
                <td className="userTableCell">{user.email}</td>
                <td className="userTableCell">{user.department || 'N/A'}</td>
                <td className="userTableCell">
                  <span className={`roleBadge roleBadge${user.role}`}>{user.role}</span>
                </td>
                <td className="userTableCell">
                  <span className={`statusBadge statusBadge${user.status}`}>{user.status}</span>
                </td>
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
        <div className="modalOverlay">
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h2 className="modalTitle">
                {editingId ? 'Edit User' : 'Add New User'}
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
                {/* First Name */}
                <div className="formGroup">
                  <label className="formLabel">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="formInput"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="formGroup">
                  <label className="formLabel">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="formInput"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="formGroup">
                  <label className="formLabel">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="formInput"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="formGroup">
                  <label className="formLabel">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="formInput"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Employee ID */}
                <div className="formGroup">
                  <label className="formLabel">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    className="formInput"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    placeholder="Enter employee ID"
                    required
                  />
                </div>

                {/* Department */}
                <div className="formGroup">
                  <label className="formLabel">Department</label>
                  <select
                    name="department"
                    className="formInput"
                    value={formData.department}
                    onChange={handleInputChange}
                  >
                    <option value="Development">Development</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div className="formGroup">
                  <label className="formLabel">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="formInput"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Role */}
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

                {/* Status */}
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

                {/* Address - Full Width */}
                <div className="formGroup formFullWidth">
                  <label className="formLabel">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="formInput"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter complete address"
                  />
                </div>

                {/* Profile Image - Full Width */}
                <div className="fileUploadGroup formFullWidth">
                  <label className="fileUploadLabel">Profile Image</label>
                  <input
                    type="file"
                    name="profileImage"
                    className="fileUploadInput"
                    onChange={handleInputChange}
                    accept="image/*"
                    title="Upload profile image"
                  />
                  {formData.profileImagePreview && (
                    <div className="fileUploadPreview">
                      ✓ Profile image selected
                    </div>
                  )}
                </div>

                {/* ID Document - Full Width */}
                <div className="fileUploadGroup formFullWidth">
                  <label className="fileUploadLabel">ID Document (PDF/JPG)</label>
                  <input
                    type="file"
                    name="idDocument"
                    className="fileUploadInput"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    title="Upload ID document"
                  />
                  {formData.idDocumentName && (
                    <div className="fileUploadPreview">
                      ✓ {formData.idDocumentName}
                    </div>
                  )}
                </div>

                {/* Passport Document - Full Width */}
                <div className="fileUploadGroup formFullWidth">
                  <label className="fileUploadLabel">Passport Document (PDF/JPG)</label>
                  <input
                    type="file"
                    name="passportDocument"
                    className="fileUploadInput"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    title="Upload passport document"
                  />
                  {formData.passportDocumentName && (
                    <div className="fileUploadPreview">
                      ✓ {formData.passportDocumentName}
                    </div>
                  )}
                </div>

                {/* Form Actions */}
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
