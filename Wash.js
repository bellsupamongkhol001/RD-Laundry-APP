const washDetails = {
  "W001": {
    employeeName: "Sudlor",
    employeeID: "EMP001",
    uniforms: [
      { code: "U-1001", quantity: 5 },
      { code: "U-1002", quantity: 2 }
    ],
    shoes: [
      { code: "S-2001", quantity: 1 }
    ]
  },
  "W002": {
    employeeName: "Sudlor",
    employeeID: "EMP002",
    uniforms: [
      { code: "U-2050", quantity: 4 }
    ],
    shoes: [
      { code: "S-3050", quantity: 1 },
      { code: "S-3051", quantity: 2 }
    ]
  }
};

function viewDetails(washID) {
  const detail = washDetails[washID];
  let html = `<p><strong>Employee:</strong> ${detail.employeeName} (${detail.employeeID})</p>`;
  html += `<h4>Uniform Codes</h4><ul>`;
  detail.uniforms.forEach(item => {
    html += `<li>${item.code} - Quantity: ${item.quantity}</li>`;
  });
  html += `</ul><h4>Shoe Codes</h4><ul>`;
  detail.shoes.forEach(item => {
    html += `<li>${item.code} - Quantity: ${item.quantity}</li>`;
  });
  html += `</ul>`;
  document.getElementById('modal-body-content').innerHTML = html;
  document.getElementById('detailModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('detailModal').style.display = 'none';
}

function filterTable() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const rows = document.querySelectorAll('#washTable tbody tr');
  rows.forEach(row => {
      const washID = row.cells[0].innerText.toLowerCase();
      const employeeName = row.cells[2].innerText.toLowerCase();
      if (washID.includes(input) || employeeName.includes(input)) {
          row.style.display = '';
      } else {
          row.style.display = 'none';
      }
  });
}
