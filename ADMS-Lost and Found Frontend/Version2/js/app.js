// Handle form submission (for both Version 1 and Version 2)
document.getElementById('objectForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from refreshing the page

    // Get form data
    const newObject = {
        name: document.getElementById('objectName').value,
        description: document.getElementById('objectDescription').value,
        location: document.getElementById('objectLocation').value,
        date: document.getElementById('objectDate').value
    };

    const objectId = document.getElementById('objectId').value; // Check if updating an existing object
    let storedObjects = JSON.parse(sessionStorage.getItem('objects')) || [];  // Get existing objects or initialize an empty array
    
    if (objectId) {
        // Update existing object
        storedObjects[objectId] = newObject;
        showStatusMessage('Object updated successfully!', 'success');
    } else {
        // Add new object
        storedObjects.push(newObject);
        showStatusMessage('Object added successfully!', 'success');
    }

    sessionStorage.setItem('objects', JSON.stringify(storedObjects));  // Save updated array to sessionStorage

    loadObjects();  // Reload the objects list
    document.getElementById('objectForm').reset(); // Clear the form fields
    document.getElementById('objectId').value = ''; // Reset the hidden object ID field
});

// Show success/error messages
function showStatusMessage(message, type) {
    const statusMessageElement = document.getElementById('statusMessage');
    statusMessageElement.innerText = message;
    statusMessageElement.className = `alert alert-${type}`;
    statusMessageElement.style.display = 'block'; // Make the message visible
}

// Load objects from sessionStorage and populate the table
function loadObjects() {
    const storedObjects = JSON.parse(sessionStorage.getItem('objects')) || [];  // Retrieve objects from sessionStorage

    const tableBody = document.querySelector('#objectsTable tbody');
    tableBody.innerHTML = '';  // Clear existing rows

    // Add each object as a row in the table
    storedObjects.forEach((obj, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${obj.name}</td>
            <td>${obj.description}</td>
            <td>${obj.location}</td>
            <td>${obj.date}</td>
            <td>
                <button class="btn btn-info" onclick="editObject(${index})">Edit</button>
                <button class="btn btn-danger" onclick="deleteObject(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);  // Add the row to the table
    });
}

// Edit object
function editObject(index) {
    const storedObjects = JSON.parse(sessionStorage.getItem('objects')) || [];  // Get stored objects
    const objectToEdit = storedObjects[index];  // Get the object by index

    // Pre-fill the form with the object data
    document.getElementById('objectName').value = objectToEdit.name;
    document.getElementById('objectDescription').value = objectToEdit.description;
    document.getElementById('objectLocation').value = objectToEdit.location;
    document.getElementById('objectDate').value = objectToEdit.date;
    document.getElementById('objectId').value = index; // Set hidden object ID for update
}

// Delete object
function deleteObject(index) {
    const storedObjects = JSON.parse(sessionStorage.getItem('objects')) || [];  // Get stored objects
    storedObjects.splice(index, 1);  // Remove the object from the array

    sessionStorage.setItem('objects', JSON.stringify(storedObjects));  // Save the updated array to sessionStorage
    loadObjects();  // Reload the objects list after deletion
}

// Load objects when the page loads
window.onload = loadObjects;
