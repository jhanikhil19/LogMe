const { ipcRenderer } = require('electron');

document.getElementById('select-directory').addEventListener('click', async () => {
    const directory = await ipcRenderer.invoke('select-directory');
    document.getElementById('directory-path').textContent = directory;
});

let items = [];

document.getElementById('add-item').addEventListener('click', () => {
    const itemInput = document.getElementById('item-input');
    const item = itemInput.value.trim();
    if (item) {
        items.push(item);
        const itemElement = document.createElement('li');
        itemElement.textContent = item;
        document.getElementById('items-list').appendChild(itemElement);
        itemInput.value = '';
    }
});

document.getElementById('save-items').addEventListener('click', async () => {
    const directory = document.getElementById('directory-path').textContent;
    const format = document.getElementById('format').value;
    if (directory && items.length > 0) {
        const filePath = await ipcRenderer.invoke('save-items', { directory, items, format });
        alert(`Items have been saved to ${filePath}`);
    } else {
        alert('Please select a directory and add some items.');
    }
});