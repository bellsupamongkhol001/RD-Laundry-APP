function filterUniformCards() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.uniform-card');

    cards.forEach(card => {
        const uniformCode = card.getAttribute('data-code').toLowerCase();
        const size = card.getAttribute('data-size').toLowerCase();

        if (uniformCode.includes(input) || size.includes(input)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
