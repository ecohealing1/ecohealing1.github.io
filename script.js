const themeToggle = document.getElementById('toggle-theme');
const body = document.body;
const container = document.querySelector('.container');
const table = document.getElementById('airdrop-table');
const thead = table.querySelector('thead tr');
const tbody = document.getElementById('airdrop-list');
const sortSelect = document.getElementById('sort');

// ฟังก์ชันสำหรับสลับธีม
function toggleTheme() {
    body.classList.toggle('dark-mode');
    container.classList.toggle('dark-mode');
    const ths = thead.querySelectorAll('th');
    ths.forEach(th => th.classList.toggle('dark-mode'));
    const tds = tbody.querySelectorAll('td');
    tds.forEach(td => td.classList.toggle('dark-mode'));
    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
        if (Array.from(rows).indexOf(row) % 2 === 0) {
            row.classList.toggle('dark-mode');
        }
    });
}

// Event listener สำหรับปุ่มเปลี่ยนธีม
themeToggle.addEventListener('click', toggleTheme);

let airdropData = []; // ตัวแปรสำหรับเก็บข้อมูลแอร์ดรอป

// ฟังก์ชันสำหรับดึงข้อมูลจาก Google Sheets (จะต้องใช้ Google Sheets API)
async function fetchAirdrops() {
    // *** ส่วนนี้จะต้องมีการใช้งาน Google Sheets API ***
    // ตัวอย่าง (อาจต้องใช้ Library เพิ่มเติม เช่น 'google-spreadsheet' สำหรับ Node.js หรือ Fetch API สำหรับ Client-side)
    // const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
    // const SHEET_NAME = 'Sheet1'; // หรือชื่อชีทของคุณ
    // const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=YOUR_GOOGLE_API_KEY`;

    // try {
    //     const response = await fetch(API_URL);
    //     const data = await response.json();
    //     const rows = data.values.slice(1); // Skip header row
    //     airdropData = rows.map(row => ({
    //         name: row[0],
    //         link: row[1],
    //         video: row[2]
    //     }));
    //     renderAirdrops(airdropData);
    // } catch (error) {
    //     console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    //     tbody.innerHTML = '<tr><td colspan="3">ไม่สามารถโหลดข้อมูลได้</td></tr>';
    // }

    // **แทนที่ด้วยข้อมูลจำลองชั่วคราว**
    airdropData = [
        { name: 'Project Beta', link: 'https://beta.com', video: 'https://youtube.com/watch?v=beta' },
        { name: 'Project Alpha', link: 'https://alpha.com', video: 'https://youtube.com/watch?v=alpha' },
        { name: 'Project Gamma', link: 'https://gamma.com', video: 'https://youtube.com/watch?v=gamma' }
    ];
    renderAirdrops(airdropData);
}

// ฟังก์ชันสำหรับแสดงข้อมูลแอร์ดรอปในตาราง
function renderAirdrops(data) {
    tbody.innerHTML = '';
    data.forEach(airdrop => {
        const row = tbody.insertRow();
        const nameCell = row.insertCell();
        const linkCell = row.insertCell();
        const videoCell = row.insertCell();

        nameCell.textContent = airdrop.name;
        linkCell.innerHTML = `<a href="${airdrop.link}" target="_blank">เยี่ยมชม</a>`;
        if (airdrop.video) {
            videoCell.innerHTML = `<a href="${airdrop.video}" target="_blank">ดูวิดีโอ</a>`;
        } else {
            videoCell.textContent = '-';
        }

        if (body.classList.contains('dark-mode')) {
            nameCell.classList.add('dark-mode');
            linkCell.classList.add('dark-mode');
            videoCell.classList.add('dark-mode');
            if (Array.from(tbody.querySelectorAll('tr')).indexOf(row) % 2 === 0) {
                row.classList.add('dark-mode');
            }
        }
    });
}

// ฟังก์ชันสำหรับเรียงข้อมูล
function sortAirdrops(sortBy) {
    let sortedData = [...airdropData];
    sortedData.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (sortBy === 'az') {
            return nameA.localeCompare(nameB);
        } else if (sortBy === 'za') {
            return nameB.localeCompare(nameA);
        }
        return 0;
    });
    renderAirdrops(sortedData);
}

// Event listener สำหรับการเปลี่ยนแปลงการเรียงลำดับ
sortSelect.addEventListener('change', function() {
    sortAirdrops(this.value);
});

// โหลดข้อมูลแอร์ดรอปเมื่อหน้าเว็บโหลด
fetchAirdrops();
