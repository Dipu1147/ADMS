// Handle form submission
document.getElementById('objectForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from refreshing the page

    // Get form data
    const newObject = {
        name: document.getElementById('objectName').value,
        description: document.getElementById('objectDescription').value,
        location: document.getElementById('objectLocation').value,
        date: document.getElementById('objectDate').value
    };

    console.log('Submitting Object:', newObject); // Log the data being submitted

    // Store the new object in sessionStorage (temporary storage)
    let storedObjects = JSON.parse(sessionStorage.getItem('objects')) || [];  // Get existing objects or initialize an empty array
    storedObjects.push(newObject);  // Add the new object to the array
    sessionStorage.setItem('objects', JSON.stringify(storedObjects));  // Save the updated array to sessionStorage

    // Show success message
    showStatusMessage('Object added successfully!', 'success');

    // Reload the objects list
    loadObjects();
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
    storedObjects.forEach(obj => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${obj.name}</td>
            <td>${obj.description}</td>
            <td>${obj.location}</td>
            <td>${obj.date}</td>
        `;
        tableBody.appendChild(row);  // Add the row to the table
    });
}

// Load objects when the page loads
window.onload = loadObjects;
