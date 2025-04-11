export const InventoryView = {
  renderInventoryCards(inventoryList = []) {
    const container = document.getElementById("inventoryList");
    container.innerHTML = "";

    if (inventoryList.length === 0) {
      container.innerHTML = `<p style="text-align:center;color:#888;">🚫 No inventory found</p>`;
      return;
    }

    inventoryList.forEach(item => {
      const card = document.createElement("div");
      card.className = "inventory-card";

      card.innerHTML = `
        <div class="card-header">
          <strong>${item.UniformCode}</strong>
          <span class="badge ${item.Status}">${item.Status.toUpperCase()}</span>
        </div>
        <div class="card-body">
          <p><strong>Type:</strong> ${item.UniformType}</p>
          <p><strong>Size:</strong> ${item.UniformSize}</p>
          <p><strong>Color:</strong> ${item.UniformColor}</p>
          <p><strong>Qty:</strong> ${item.UniformQty}</p>
        </div>
        <div class="card-footer">
          ${
            item.Status === "available"
              ? `<button class="btn btn-primary btn-assign" data-uniformid="${item.UniformID}">Assign</button>`
              : `
                <button class="btn btn-secondary btn-detail" data-code="${item.UniformCode}">Details</button>
                <button class="btn btn-danger" onclick="returnUniformByCode('${item.UniformCode}')">Return</button>
              `
          }
        </div>
      `;
      container.appendChild(card);
    });
  },

  updateDashboard({ total, assigned, available }) {
    document.getElementById("totalCount").textContent = total;
    document.getElementById("assignedCount").textContent = assigned;
    document.getElementById("availableCount").textContent = available;
  },

  toggleModal(id, show = true) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.toggle("hidden", !show);
  },

  prepareAssignForm(uniform) {
    document.getElementById("assignEmployeeId").value = "";
    document.getElementById("assignEmployeeName").value = "";
  },

  fillDetailModal(uniformItem) {
    const tbody = document.getElementById("codeListBody");
    tbody.innerHTML = "";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${uniformItem.UniformCode}</td>
      <td>${uniformItem.EmployeeID || "-"}</td>
      <td>${uniformItem.EmployeeName || "-"}</td>
      <td>${uniformItem.Status}</td>
      <td>
        ${
          uniformItem.Status === "assigned"
            ? `<button class="btn btn-danger" onclick="returnUniformByCode('${uniformItem.UniformCode}')">Return</button>`
            : "-"
        }
      </td>
    `;
    tbody.appendChild(row);

    // อัปเดตหัว modal ให้แสดงรายละเอียดชุด
    const title = document.querySelector("#codeListModal h3");
    if (title) {
      title.innerHTML = `
        Uniform Details:
        <br>
        <small>
          ID: <strong>${uniformItem.UniformID}</strong> | 
          Type: <strong>${uniformItem.UniformType}</strong> | 
          Size: <strong>${uniformItem.UniformSize}</strong> | 
          Color: <strong>${uniformItem.UniformColor}</strong>
        </small>
      `;
    }
  }
};
