// Fake database (acts like backend)
let items = [
    { id: 1, item: "Mobile", category: "Electronics", location: "Library", status: "Lost" },
    { id: 2, item: "Wallet", category: "Personal", location: "Cafeteria", status: "Found" }
];

// READ
function loadItems() {
    const table = document.getElementById("itemTable");
    if (!table) return;

    table.innerHTML = "";
    items.forEach(i => {
        table.innerHTML += `
        <tr>
            <td>${i.item}</td>
            <td>${i.category}</td>
            <td>${i.location}</td>
            <td>${i.status}</td>
            <td>
                <a href="edit.html?id=${i.id}">Edit</a>
                <button onclick="deleteItem(${i.id})">Delete</button>
            </td>
        </tr>`;
    });
}
loadItems();

// CREATE
const addForm = document.getElementById("addForm");
if (addForm) {
    addForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newItem = {
            id: Date.now(),
            item: item.value,
            category: category.value,
            location: location.value,
            status: status.value
        };

        items.push(newItem);
        document.getElementById("message").innerText = "Record Added Successfully";
        addForm.reset();
    });
}

// DELETE
function deleteItem(id) {
    if (confirm("Are you sure you want to delete?")) {
        items = items.filter(i => i.id !== id);
        loadItems();
    }
}

// UPDATE
const params = new URLSearchParams(window.location.search);
const editId = params.get("id");

if (editId) {
    const itemData = items.find(i => i.id == editId);
    if (itemData) {
        editIdField.value = itemData.id;
        editItem.value = itemData.item;
        editCategory.value = itemData.category;
        editLocation.value = itemData.location;
        editStatus.value = itemData.status;
    }
}

const editForm = document.getElementById("editForm");
if (editForm) {
    editForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const index = items.findIndex(i => i.id == editIdField.value);
        items[index] = {
            id: editIdField.value,
            item: editItem.value,
            category: editCategory.value,
            location: editLocation.value,
            status: editStatus.value
        };

        document.getElementById("editMessage").innerText = "Record Updated Successfully";
    });
}
