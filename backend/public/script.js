document.addEventListener('DOMContentLoaded', () => {
    const userTable = document.querySelector('#userTable tbody');
    
    // Popups
    const popup = document.querySelector('#popup');
    const closeBtn = document.querySelector('#close');

    const addPopup = document.querySelector('#addPopup');
    const openAddPopupBtn = document.querySelector('#openAddPopup');
    const closeAddPopupBtn = document.querySelector('#closeAddPopup');

    // Edit form fields
    const editForm = document.querySelector('#editForm');
    const editNameInput = document.querySelector('#editName');
    const editEmailInput = document.querySelector('#editEmail');
    const addForm = document.querySelector('#addForm');
    const addNameInput = document.querySelector('#addName');
    const addEmailInput = document.querySelector('#addEmail');

    let editingUserId = null;
    const fetchUsers = async () => {
        try {
            const response = await fetch('/users');
            const users = await response.json();
            userTable.innerHTML = '';
            users.forEach(user => addUserRow(user));
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('Failed to fetch users. Try again later.');
        }
    };


    const addUserRow = (user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        userTable.appendChild(row);
    };

    // Open Edit User Popup
    window.editUser = (id, name, email) => {
        editingUserId = id;
        editNameInput.value = name;
        editEmailInput.value = email;
        popup.classList.remove('hide');
    };

    // Close Edit Popup
    closeBtn.addEventListener('click', () => {
        popup.classList.add('hide');
        editingUserId = null;
    });

    // Open Add User Popup
    openAddPopupBtn.addEventListener('click', () => {
        addPopup.classList.remove('hide');
    });

    // Close Add User Popup
    closeAddPopupBtn.addEventListener('click', () => {
        addPopup.classList.add('hide');
    });

    // Add new user
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = addNameInput.value.trim();
        const email = addEmailInput.value.trim();
        if (!name || !email) return alert('Name and Email are required');

        try {
            const response = await fetch('/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });

            if (!response.ok) throw new Error('Failed to add user');

            addForm.reset();
            addPopup.classList.add('hide');
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user. Please try again.');
        }
    });

    // Update existing user
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = editNameInput.value.trim();
        const email = editEmailInput.value.trim();

        if (!name || !email) return alert('Name and Email are required');

        try {
            const response = await fetch(`/users/${editingUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });

            if (!response.ok) throw new Error('Failed to update user');

            popup.classList.add('hide');
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user. Try again later.');
        }
    });
    // Delete user
    window.deleteUser = async (id) => {
        if (!confirm('Are you sure to delete this user?')) return;

        try {
            const response = await fetch(`/users/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete user');

            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user. Try again later.');
        }
    };

    // Initial fetch
    fetchUsers();
});
