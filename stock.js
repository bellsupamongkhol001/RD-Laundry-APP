// stock.js

const stockData = [
    { code: 'STK001', name: 'Smock', category: 'Apparel', size: 'XL', color: 'White', stock: 50 },
    { code: 'STK002', name: 'Safety Shoes', category: 'Footwear', size: '42', color: 'Black', stock: 30 },
    { code: 'STK003', name: 'Gloves', category: 'Accessories', size: 'M', color: 'Blue', stock: 15 },
];

function renderStockCards() {
    const container = document.getElementById('stockCardContainer');
    container.innerHTML = '';
    stockData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'stock-card';
        if (item.stock < 20) card.classList.add('low-stock');
        card.innerHTML = `
            <img src="https://via.placeholder.com/100" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Code: ${item.code}</p>
            <p>Category: ${item.category}</p>
            <p>Size: ${item.size}</p>
            <p>Color: ${item.color}</p>
            <p>Stock: ${item.stock} pcs</p>
            <button onclick="showHistory('${item.code}')">History</button>
            <button onclick="openAdjustStockModal('${item.code}')">Adjust Stock</button>
        `;
        container.appendChild(card);
    });
    updateSummary();
}

function updateSummary() {
    document.getElementById('totalItems').textContent = stockData.length;
    const totalStock = stockData.reduce((sum, item) => sum + item.stock, 0);
    document.getElementById('totalStock').textContent = totalStock;
    const lowStockCount = stockData.filter(item => item.stock < 20).length;
    document.getElementById('lowStockCount').textContent = lowStockCount;
}

function filterStockCards() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.stock-card');
    cards.forEach(card => {
        const code = card.querySelector('p:nth-of-type(1)').textContent.toLowerCase();
        const name = card.querySelector('h3').textContent.toLowerCase();
        if (code.includes(input) || name.includes(input)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function openAddStockModal() {
    document.getElementById('addStockModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function addNewStock() {
    const name = document.getElementById('newItemName').value;
    const code = document.getElementById('newItemCode').value;
    const category = document.getElementById('newCategory').value;
    const size = document.getElementById('newSize').value;
    const color = document.getElementById('newColor').value;
    const quantity = parseInt(document.getElementById('newQuantity').value);

    stockData.push({ code, name, category, size, color, stock: quantity });
    renderStockCards();
    closeModal('addStockModal');
}

function openAdjustStockModal(code) {
    const item = stockData.find(i => i.code === code);
    if (item) {
        document.getElementById('adjustStockDetails').innerHTML = `
            <p><strong>${item.name}</strong> (${item.code})</p>
            <p>Current Stock: ${item.stock}</p>
        `;
        document.getElementById('adjustStockModal').style.display = 'block';
    }
}

function saveAdjustStock() {
    const adjustAmount = parseInt(document.getElementById('adjustAmount').value);
    const reason = document.getElementById('adjustReason').value;
    // Logic for saving adjustments can go here
    alert('Stock adjusted by ' + adjustAmount + ' for reason: ' + reason);
    closeModal('adjustStockModal');
}

function showHistory(code) {
    alert('Showing history for ' + code);
}

document.addEventListener('DOMContentLoaded', renderStockCards);
