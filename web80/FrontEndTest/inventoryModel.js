import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const db = getFirestore();

// ==============================
// 🔗 Firestore Collections
// ==============================
const UniformDB = collection(db, "UniformDB");
const InventoryDB = collection(db, "InventoryDB");
const EmployeeDB = collection(db, "EmployeesDB");

// ==============================
// 📥 ดึงข้อมูล Uniform จาก UniformDB
// ==============================
async function fetchUniforms() {
  const snapshot = await getDocs(query(UniformDB, orderBy("uniformType")));
  return snapshot.docs.map(doc => doc.data());
}

async function fetchUniformById(uniformId) {
  const snap = await getDoc(doc(db, "UniformDB", uniformId));
  return snap.exists() ? snap.data() : null;
}

// ==============================
// 👤 ดึงข้อมูลพนักงานจาก EmployeeDB
// ==============================
async function fetchEmployeeById(empId) {
  if (!empId) return null;
  const snap = await getDoc(doc(EmployeeDB, empId));
  return snap.exists() ? snap.data() : null;
}

// ==============================
// 📦 Inventory (InventoryDB)
// ==============================
async function fetchInventoryItems() {
  const snapshot = await getDocs(query(InventoryDB, orderBy("UniformType")));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function assignUniformToEmployee(data) {
  const id = `${data.UniformCode}-${data.EmployeeID}`;
  await setDoc(doc(db, "InventoryDB", id), {
    UniformID: data.UniformID,
    UniformCode: data.UniformCode,
    UniformType: data.UniformType,
    UniformSize: data.UniformSize,
    UniformColor: data.UniformColor,
    UniformQty: data.UniformQty || 1,
    EmployeeID: data.EmployeeID,
    EmployeeName: data.EmployeeName,
    EmployeDepartment: data.EmployeDepartment,
    Status: "assigned",
    RewashCount: data.RewashCount || 0,
  });
}

async function returnUniform(code) {
  const docRef = doc(db, "InventoryDB", code);
  await updateDoc(docRef, {
    Status: "available",
    EmployeeID: "",
    EmployeeName: "",
    EmployeDepartment: "",
  });
}

async function deleteUniformEntry(code) {
  await deleteDoc(doc(db, "InventoryDB", code));
}

// ==============================
// 📊 Dashboard
// ==============================
async function getInventorySummary() {
  const snapshot = await getDocs(InventoryDB);
  const items = snapshot.docs.map(doc => doc.data());
  const total = items.length;
  const assigned = items.filter(i => i.Status === "assigned").length;
  const available = items.filter(i => i.Status === "available").length;

  return { total, assigned, available };
}

// ==============================
// 📤 Export CSV
// ==============================
async function fetchAllForExport() {
  const snapshot = await getDocs(InventoryDB);
  return snapshot.docs.map(doc => doc.data());
}

function exportCSV(dataArray, headers) {
  const csv = [
    headers.join(","),
    ...dataArray.map(row => headers.map(h => `"${row[h] || ""}"`).join(","))
  ].join("\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  return URL.createObjectURL(blob);
}

// ==============================
// ✅ Export Module
// ==============================
export const InventoryModel = {
  fetchUniforms,
  fetchUniformById,
  fetchEmployeeById,
  fetchInventoryItems,
  assignUniformToEmployee,
  returnUniform,
  deleteUniformEntry,
  getInventorySummary,
  fetchAllForExport,
  exportCSV,
};
