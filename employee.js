function filterCards() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.employee-card');
    cards.forEach(card => {
        const id = card.getAttribute('data-id').toLowerCase();
        const name = card.getAttribute('data-name').toLowerCase();
        if (id.includes(input) || name.includes(input)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// ตัวอย่างการเพิ่มลูกเล่นเมื่อกด Edit หรือ Delete
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-btn')) {
        const employeeName = e.target.closest('.employee-card').getAttribute('data-name');
        alert(`Edit info for ${employeeName}`);
    }

    if (e.target.classList.contains('delete-btn')) {
        const employeeName = e.target.closest('.employee-card').getAttribute('data-name');
        if (confirm(`Are you sure you want to delete ${employeeName}?`)) {
            e.target.closest('.employee-card').remove();
        }
    }
});
