document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const clearListButton = document.getElementById('clearListButton');
    const shoppingList = document.getElementById('shoppingList');
    
    let shoppingArray = JSON.parse(localStorage.getItem('shoppingList')) || [];

    const renderList = () => {
        shoppingList.innerHTML = '';
        shoppingArray.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = item.purchased ? 'purchased' : '';
            listItem.innerHTML = `
                <span class="item-text">${item.name}</span>
                <button class="edit">Edit</button>
                <button class="mark-purchased">Mark Purchased</button>
            `;
            listItem.querySelector('.edit').addEventListener('click', () => editItem(index));
            listItem.querySelector('.mark-purchased').addEventListener('click', () => markPurchased(index));
            shoppingList.appendChild(listItem);
        });
    };

    const addItem = () => {
        const itemName = itemInput.value.trim();
        if (itemName !== '') {
            shoppingArray.push({ name: itemName, purchased: false });
            itemInput.value = '';
            saveAndRender();
        }
    };

    const markPurchased = (index) => {
        shoppingArray[index].purchased = !shoppingArray[index].purchased;
        saveAndRender();
    };

    const clearList = () => {
        shoppingArray = [];
        saveAndRender();
    };

    const saveAndRender = () => {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingArray));
        renderList();
    };

    const editItem = (index) => {
        const newItemName = prompt('Edit item name:', shoppingArray[index].name);
        if (newItemName !== null && newItemName.trim() !== '') {
            shoppingArray[index].name = newItemName.trim();
            saveAndRender();
        }
    };

    addItemButton.addEventListener('click', addItem);
    clearListButton.addEventListener('click', clearList);
    itemInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    });

    renderList();
});