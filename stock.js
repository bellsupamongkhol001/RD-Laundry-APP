// stock.js

const stockItems = [
  {
    code: "RD-001",
    name: "Smock",
    size: "XL",
    color: "White",
    stock: 20,
    counted: null
  },
  {
    code: "RD-002",
    name: "Safety Shoes",
    size: "42",
    color: "Black",
    stock: 10,
    counted: null
  }
];

const countHistory = [];

function renderStockCards() {
  const container = document.getElementById("stockCardContainer");
  container.innerHTML = "";
  stockItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "stock-card";
    card.innerHTML = `
      <img src="https://via.placeholder.com/150?text=${item.name}" alt="${item.name}" class="item-image">
      <h3>${item.name}</h3>
      <p>Size: ${item.size}</p>
      <p>Color: ${item.color}</p>
      <p>Stock: ${item.stock}</p>
    `;
    container.appendChild(card);
  });
}

function filterStockCards() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".stock-card");
  cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(keyword) ? "block" : "none";
  });
}

function openInventoryCountModal() {
  document.getElementById("countModal").style.display = "flex";
  renderCountTable();
}

function renderCountTable() {
  const tbody = document.getElementById("countTableBody");
  tbody.innerHTML = "";
  stockItems.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.size}</td>
      <td>${item.color}</td>
      <td>${item.stock}</td>
      <td><input type="number" id="count-${index}" value="${item.counted !== null ? item.counted : ''}" ${item.counted !== null ? 'disabled' : ''}></td>
      <td>
        <button onclick="${item.counted !== null ? `editCount(${index})` : `confirmCount(${index})`}">
          ${item.counted !== null ? 'Edit' : 'Confirm'}
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
  updateTotalCounted();
}

function confirmCount(index) {
  const input = document.getElementById(`count-${index}`);
  const value = parseInt(input.value);
  if (!isNaN(value)) {
    stockItems[index].counted = value;
    renderCountTable();
  }
}

function editCount(index) {
  stockItems[index].counted = null;
  renderCountTable();
}

function cancelInventoryCount() {
  if (confirm("Cancel current count session?")) {
    stockItems.forEach(item => (item.counted = null));
    document.getElementById("countModal").style.display = "none";
  }
}

function confirmSubmitInventoryCount() {
  if (confirm("Submit this inventory count?")) {
    const today = new Date().toISOString().split("T")[0];
    stockItems.forEach(item => {
      if (item.counted !== null) {
        countHistory.push({
          date: today,
          ...item,
          operator: "Admin"
        });
      }
    });
    stockItems.forEach(item => {
      if (item.counted !== null) {
        item.stock = item.counted;
        item.counted = null;
      }
    });
    document.getElementById("countModal").style.display = "none";
    renderStockCards();
    renderCountHistory();
  }
}

function renderCountHistory() {
  const tbody = document.getElementById("countHistoryTableBody");
  tbody.innerHTML = "";
  countHistory.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.code}</td>
      <td>${entry.name}</td>
      <td>${entry.size}</td>
      <td>${entry.color}</td>
      <td>${entry.stock}</td>
      <td>${entry.stock}</td>
      <td>${entry.operator}</td>
    `;
    tbody.appendChild(row);
  });
}

function closeDetailModal() {
  document.getElementById("detailModal").style.display = "none";
}

function closeInventoryCountModal() {
  document.getElementById("countModal").style.display = "none";
}

function closeCountHistoryModal() {
  document.getElementById("countHistoryModal").style.display = "none";
}

function exportStockData() {
  alert("Exporting stock report...");
}

function exportCountHistory() {
  alert("Exporting count history...");
}

function filterCountTable() {
  const keyword = document.getElementById("countSearchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#countTableBody tr");
  rows.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(keyword) ? "table-row" : "none";
  });
}

function filterHistoryTable() {
  const keyword = document.getElementById("historySearchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#countHistoryTableBody tr");
  rows.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(keyword) ? "table-row" : "none";
  });
}

function updateTotalCounted() {
  const total = stockItems.reduce((sum, item) => sum + (item.counted !== null ? 1 : 0), 0);
  document.getElementById("totalCounted").innerText = total;
}

renderStockCards();
