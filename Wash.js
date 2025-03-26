function filterTable() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const rows = document.querySelectorAll('#washTable tbody tr');
  rows.forEach(row => {
      const washID = row.cells[0].innerText.toLowerCase();
      const employeeID = row.cells[1].innerText.toLowerCase();
      const employeeName = row.cells[2].innerText.toLowerCase();
      if (washID.includes(input) || employeeID.includes(input) || employeeName.includes(input)) {
          row.style.display = '';
      } else {
          row.style.display = 'none';
      }
  });
}
