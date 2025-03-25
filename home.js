function loadPage(pageName) {
    const content = `
        <h1>${pageName}</h1>
        <p>กำลังโหลดข้อมูลของ ${pageName}...</p>
        <div class="loading-bar">
            <div class="bar"></div>
        </div>
    `;
    document.getElementById('main-panel-content').innerHTML = content;
    setTimeout(() => {
        document.getElementById('main-panel-content').innerHTML = `
            <h1>${pageName} - ข้อมูลพร้อมแล้ว</h1>
            <p>คุณสามารถดำเนินการได้ต่อจากหน้านี้</p>
        `;
    }, 1000);
}
function toggleMenu() {
    document.querySelector('.sidebar').classList.toggle('active');
}
function updateDateTime() {
    const now = new Date();
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        datetimeElement.innerText = now.toLocaleString('th-TH', { hour12: false });
    }
}
function checkConnection() {
    const status = document.getElementById('connection-status');
    const randomStatus = Math.random() > 0.05;
    if (randomStatus) {
        status.innerHTML = '<span class="status-dot green"></span> เชื่อมต่อฐานข้อมูล';
    } else {
        status.innerHTML = '<span class="status-dot red"></span> ขาดการเชื่อมต่อ';
    }
}
function toggleUserDropdown() {
    document.querySelector('.user-info').classList.toggle('show-dropdown');
}
document.addEventListener('click', function(e) {
    if (!e.target.closest('.user-info')) {
        document.querySelector('.user-info')?.classList.remove('show-dropdown');
    }
});
setInterval(updateDateTime, 1000);
setInterval(checkConnection, 5000);
updateDateTime();
checkConnection();
loadPage('Dashboard');
