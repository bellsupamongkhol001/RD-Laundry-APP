import { InventoryModel } from "./inventoryModel.js";
import { InventoryView } from "./inventoryView.js";

let allInventory = [];
let allUniforms = [];
let selectedUniform = null;

// 🚀 เริ่มโหลดหน้า
window.addEventListener("DOMContentLoaded", async () => {
  await loadDashboard();
  await loadInventoryList();
  setupEvents();
});

// 📊 โหลด Dashboard
async function loadDashboard() {
  const stats = await InventoryModel.getInventorySummary();
  InventoryView.updateDashboard(stats);
}

// 📦 โหลดรายการ Inventory ทั้งหมด
async function loadInventoryList() {
  allInventory = await InventoryModel.fetchInventoryItems();
  InventoryView.renderInventoryCards(allInventory);
}

// ⚙️ Binding Events
function setupEvents() {
  // 🔍 ค้นหา
  document.getElementById("searchByUniformAndEmployee")?.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = allInventory.filter(item =>
      item.UniformID.toLowerCase().includes(keyword) ||
      item.UniformCode.toLowerCase().includes(keyword) ||
      item.EmployeeName?.toLowerCase().includes(keyword)
    );
    InventoryView.renderInventoryCards(filtered);
  });

  // 📤 Export CSV
  document.getElementById("btnExportReport")?.addEventListener("click", async () => {
    const data = await InventoryModel.fetchAllForExport();
    const url = InventoryModel.exportCSV(data, [
      "UniformID", "UniformCode", "UniformType", "UniformSize", "UniformColor",
      "UniformQty", "EmployeeID", "EmployeeName", "EmployeDepartment", "Status", "RewashCount"
    ]);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  });

  // 👁️ ดูรายละเอียด
  document.getElementById("inventoryList")?.addEventListener("click", async (e) => {
    const btn = e.target.closest(".btn-detail");
    if (!btn) return;
    const code = btn.dataset.code;
    const item = allInventory.find(i => i.UniformCode === code);
    if (!item) return;

    InventoryView.fillDetailModal(item);
    InventoryView.toggleModal("codeListModal", true);
  });

  // ➕ Assign
  document.getElementById("inventoryList")?.addEventListener("click", async (e) => {
    const btn = e.target.closest(".btn-assign");
    if (!btn) return;

    const uniformId = btn.dataset.uniformid;
    const base = await InventoryModel.fetchUniformById(uniformId);
    if (!base) return;

    selectedUniform = base;
    InventoryView.prepareAssignForm(base);
    InventoryView.toggleModal("assignModal", true);
  });

  // 📥 Assign Submit
  document.getElementById("assignForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const empId = document.getElementById("assignEmployeeId")?.value.trim();
    if (!empId || !selectedUniform) return;

    const empData = await InventoryModel.fetchEmployeeById(empId);
    if (!empData) {
      return Swal.fire({
        icon: "error",
        title: "ไม่พบพนักงาน",
        text: "กรุณาตรวจสอบ Employee ID ให้ถูกต้อง",
      });
    }

    const uniformCode = `CODE-${Date.now()}`;
    await InventoryModel.assignUniformToEmployee({
      UniformID: selectedUniform.uniformId,
      UniformCode: uniformCode,
      UniformType: selectedUniform.uniformType,
      UniformSize: selectedUniform.uniformSize,
      UniformColor: selectedUniform.uniformColor,
      UniformQty: 1,
      EmployeeID: empId,
      EmployeeName: empData.employeeName,
      EmployeDepartment: empData.employeeDept,
      Status: "assigned",
      RewashCount: 0,
    });

    Swal.fire({
      icon: "success",
      title: "Assign สำเร็จ!",
      timer: 1500,
      showConfirmButton: false,
    });

    InventoryView.toggleModal("assignModal", false);
    await loadDashboard();
    await loadInventoryList();
  });
}

// 🔁 คืนชุด
window.returnUniformByCode = async (code) => {
  await InventoryModel.returnUniform(code);
  await loadDashboard();
  await loadInventoryList();
};

// ❌ ปิด Modal
window.closeAssignModal = () => InventoryView.toggleModal("assignModal", false);
window.closeCodeListModal = () => InventoryView.toggleModal("codeListModal", false);
