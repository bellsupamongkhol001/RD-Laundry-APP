// ข้อมูลจำลองของ Stock
const stockItems = [
  {
    code: "RD-001",
    name: "Smock",
    size: "XL",
    color: "White",
    stock: 20,
    count: null,
    image: "https://via.placeholder.com/150?text=Smock"
  },
  {
    code: "RD-002",
    name: "Safety Shoes",
    size: "42",
    color: "Black",
    stock: 10,
    count: null,
    image: "https://via.placeholder.com/150?text=Shoes"
  }
];

// ฟังก์ชันเรนเดอร์การ์ดแสดงรายการสต็อก
function renderStockCards() {
  const container = document.getElementById("stockCardContainer");
  container.innerHTML = "";

  stockItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "stock-card";
    card.innerHTML = `
      <img src="${item.image}" class="item-image" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Size: ${item.size}</p>
      <p>Color: ${item.color}</p>
      <p>Stock: ${item.stock}</p>
      <div class="card-actions">
        <button class="card-btn history" onclick="viewHistory('${item.code}')">
          <i class="fas fa-clock"></i> History
        </button>
        <button class="card-btn adjust" onclick="openAdjustStockModal('${item.code}')">
          <i class="fas fa-sliders-h"></i> Adjust
        </button>
        <button class="card-btn detail" onclick="viewDetails('${item.code}')">
          <i class="fas fa-info-circle"></i> Detail
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// การแสดง modal นับสต็อกรายเดือน
function openInventoryCountModal() {
  const modal = document.getElementById("countModal");
  const table = document.getElementById("countTableBody");
  const totalEl = document.getElementById("countTotal");

  table.innerHTML = "";
  let total = 0;

  stockItems.forEach((item, index) => {
    total += item.stock;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.size}</td>
      <td>${item.color}</td>
      <td>${item.stock}</td>
      <td>
        <input type="number" id="countInput-${index}" placeholder="Counted" ${item.count !== null ? "value='" + item.count + "' disabled" : ""}>
      </td>
      <td>
        <button class="count-btn" onclick="confirmCount(${index})" ${item.count !== null ? "style='display:none'" : ""}>Confirm</button>
        <button class="edit-btn" onclick="editCount(${index})" ${item.count === null ? "style='display:none'" : ""}>Edit</button>
      </td>
    `;
    table.appendChild(row);
  });

  totalEl.innerText = total;
  modal.style.display = "flex";
}

// ยืนยันการนับสต็อก
function confirmCount(index) {
  const input = document.getElementById(`countInput-${index}`);
  const value = parseInt(input.value);

  if (isNaN(value)) {
    alert("Please enter a valid number");
    return;
  }

  stockItems[index].count = value;
  input.disabled = true;
  input.nextElementSibling.style.display = "none"; // confirm btn
  input.nextElementSibling.nextElementSibling.style.display = "inline-block"; // edit btn
}

// แก้ไขข้อมูลนับสต็อก
function editCount(index) {
  const input = document.getElementById(`countInput-${index}`);
  stockItems[index].count = null;
  input.disabled = false;
  input.nextElementSibling.style.display = "inline-block"; // confirm
  input.nextElementSibling.nextElementSibling.style.display = "none"; // edit
}

// ปิด modal การนับสต็อก
function closeInventoryCountModal() {
  if (confirm("ยกเลิกการนับสต็อกใช่หรือไม่?")) {
    document.getElementById("countModal").style.display = "none";
  }
}

// ฟังก์ชันสำหรับการดูรายละเอียด
function viewDetails(code) {
  document.getElementById("detailModal").style.display = "flex";
  // คุณสามารถโหลดข้อมูลการใช้งานจริงจาก API หรือ Local Data ได้ที่นี่
}

// ปิด detail modal
function closeDetailModal() {
  document.getElementById("detailModal").style.display = "none";
}

// แสดง modal ปรับสต็อก
function openAdjustStockModal(code) {
  const item = stockItems.find(i => i.code === code);
  const newQty = prompt(`Enter new quantity for ${item.name}:`, item.stock);
  if (newQty !== null && !isNaN(newQty)) {
    item.stock = parseInt(newQty);
    renderStockCards();
  }
}

// ประวัติ
function viewHistory(code) {
  alert(`Viewing stock history for ${code}`);
}

// ฟิลเตอร์การค้นหา
function filterStockCards() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".stock-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(keyword) ? "block" : "none";
  });
}

// Export รายงาน
function exportStockData() {
  alert("Export function called. Implement actual export logic.");
}

// เริ่มต้นโหลดหน้า
renderStockCards();
