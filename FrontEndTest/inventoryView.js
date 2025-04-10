// 📁 views/inventoryView.js
import {
    renderInventoryCards,
    handleAddInventoryCode,
    assignInventoryCode,
    returnInventoryCode,
    deleteInventory,
  } from "./inventoryController.js";
  
  // ✅ เริ่มต้นโหลดข้อมูลเมื่อหน้าเว็บโหลด
  export async function initInventoryView() {
    await renderInventoryCards("inventoryList");
  
    // 📌 เพิ่ม event listener สำหรับฟอร์มเพิ่มโค้ด
    const form = document.getElementById("codeForm");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const uniformId = document.getElementById("addCodeUniformId").value;
        const code = document.getElementById("addUniformCode").value.trim();
        await handleAddInventoryCode(uniformId, code);
        closeAddCodeModal();
        await renderInventoryCards("inventoryList");
      });
    }
  
    // 📌 ปิด modal ด้วยปุ่ม cancel
    document.querySelectorAll(".btn-cancel").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".modal").forEach((m) => (m.style.display = "none"));
      });
    });
  }
  
  // ✅ ฟังก์ชัน global สำหรับใช้ใน HTML onclick
  window.openAddCodeModal = function (uniformId) {
    document.getElementById("addCodeUniformId").value = uniformId;
    document.getElementById("codeModal").style.display = "flex";
  };
  
  window.viewDetail = async function (uniformId) {
    console.log("📌 Show detail of:", uniformId);
    // 👉 สามารถเชื่อมต่อ modal สำหรับแสดง detail หรือจัดการที่นี่
  };
  
  window.assignInventoryCode = assignInventoryCode;
  window.returnInventoryCode = returnInventoryCode;
  window.deleteInventory = deleteInventory;
  