// Handle form submission
document.getElementById('objectForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const objectId = document.getElementById('objectId').value; // Get the object ID if updating
    const newObject = {
        name: document.getElementById('objectName').value,
        description: document.getElementById('objectDescription').value,
        location: document.getElementById('objectLocation').value,
        date: document.getElementById('objectDate').value
    };

    const method = objectId ? 'PUT' : 'POST'; // Decide the method: POST for new, PUT for update
    const url = objectId ? `http://localhost:5000/api/objects/${objectId}` : 'http://localhost:5000/api/objects';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newObject)
    })
    .then(response => response.json())
    .then(() => {
        loadObjects(); // Reload the objects list after submission
        document.getElementById('objectForm').reset(); // Reset the form fields
        document.getElementById('objectId').value = ''; // Clear the hidden object ID field
        showNotification('Record Added/Updated Successfully!', 'success');
    })
    .catch(error => showNotification('Error: ' + error.message, 'danger'));
});

// Load all objects from the backend
function loadObjects() {
    fetch('http://localhost:5000/api/objects')
        .then(response => response.json())
        .then(objects => {
            const tableBody = document.querySelector('#objectsTable tbody');
            tableBody.innerHTML = ''; // Clear previous rows

            objects.forEach(obj => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${obj.name}</td>
                    <td>${obj.description}</td>
                    <td>${obj.location}</td>
                    <td>${obj.date}</td>
                    <td>
                        <button class="btn btn-info" onclick="editObject(${obj.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteObject(${obj.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row); // Append new row to table
            });
        })
        .catch(error => showNotification('Error loading objects: ' + error.message, 'danger'));
}

// Edit object
function editObject(id) {
    fetch(`http://localhost:5000/api/objects/${id}`)
        .then(response => response.json())
        .then(object => {
            document.getElementById('objectName').value = object.name;
            document.getElementById('objectDescription').value = object.description;
            document.getElementById('objectLocation').value = object.location;
            document.getElementById('objectDate').value = object.date;
            document.getElementById('objectId').value = object.id; // Set hidden object ID for update
        })
        .catch(error => showNotification('Error: ' + error.message, 'danger'));
}

// Delete object
function deleteObject(id) {
    fetch(`http://localhost:5000/api/objects/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => {
            loadObjects(); // Reload the objects list after deletion
            showNotification('Record Deleted Successfully!', 'success');
        })
        .catch(error => showNotification('Error: ' + error.message, 'danger'));
}

// Show notifications (success or error)
function showNotification(message, type) {
    const notificationMessage = document.getElementById('notificationMessage');
    notificationMessage.textContent = message;
    const modal = new bootstrap.Modal(document.getElementById('notificationModal'));
    modal.show();
}

// Initialize objects when the page loads
window.onload = loadObjects;
