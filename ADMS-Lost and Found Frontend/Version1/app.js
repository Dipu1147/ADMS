// Handle form submission
document.getElementById('objectForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get the form data
    const newObject = {
        name: document.getElementById('objectName').value,
        description: document.getElementById('objectDescription').value,
        location: document.getElementById('objectLocation').value,
        date: document.getElementById('objectDate').value
    };

    // Send the data to the backend
    fetch('http://localhost:5000/api/objects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newObject)
    })
    .then(response => response.json())
    .then(() => loadObjects()) // Refresh the object list
    .catch(error => console.error('Error:', error));
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
                `;
                tableBody.appendChild(row); // Add row to table
            });
        })
        .catch(error => console.error('Error loading objects:', error));
}

// Run loadObjects when the page loads
window.onload = loadObjects;
