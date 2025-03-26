// stock.js

const stockItems = [
    { code: 'STK001', name: 'Smock', category: 'Apparel', size: 'L', color: 'White', quantity: 50 },
    { code: 'STK002', name: 'Safety Shoes', category: 'Footwear', size: '42', color: 'Black', quantity: 10 },
    { code: 'STK003', name: 'Gloves', category: 'Safety', size: 'M', color: 'Blue', quantity: 5 },
];

function loadStockCards() {
    const container = document.getElementById('stockCardContainer');
    container.innerHTML = '';

    stockItems.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('stock-card');
        if (item.quantity < 10) card.style.border = '2px solid red';

        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>Code: ${item.code}</p>
            <p>Category: ${item.category}</p>
            <p>Size: ${item.size}</p>
            <p>Color: ${item.color}</p>
            <p>Stock: ${item.quantity}</p>
            <div class="card-actions">
                <button onclick="adjustStock('${item.code}')">Adjust</button>
                <button onclick="viewHistory('${item.code}')">History</button>
            </div>
        `;

        container.appendChild(card);
    });

    updateDashboardSummary();
}

function updateDashboardSummary() {
    document.getElementById('totalItems').innerText = stockItems.length;
    document.getElementById('totalStock').innerText = stockItems.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('lowStockCount').innerText = stockItems.filter(item => item.quantity < 10).length;
}

function filterStockCards() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.stock-card');

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
}

function adjustStock(code) {
    alert(`Adjust stock for ${code} (example)`);
}

function viewHistory(code) {
    alert(`View history for ${code} (example)`);
}

function exportStockData() {
    alert('Export stock data (example)');
}

function openInventoryCountModal() {
    alert('Open Inventory Count Modal (example)');
}

function openAddStockModal() {
    alert('Open Add Stock Modal (example)');
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

document.addEventListener('DOMContentLoaded', loadStockCards);
