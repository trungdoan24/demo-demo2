
document.addEventListener("DOMContentLoaded", () => {

    console.log("Cổng thông tin nội bộ đã khởi động");

    /* Card animation */

    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("click", () => {

            card.style.boxShadow =
                "0 0 20px rgba(0,102,204,.4)";

            setTimeout(() => {

                card.style.boxShadow =
                    "0 2px 10px rgba(0,0,0,.08)";

            }, 300);

        });

    });

    /* Hamburger */

    const hamburger =
        document.querySelector(".hamburger");

    const menu =
        document.querySelector(".menu");

    if (hamburger && menu) {

        hamburger.addEventListener("click", () => {

            hamburger.classList.toggle("active");
            menu.classList.toggle("active");

        });

    }

    /* Mega menu */

    document.querySelectorAll(".mega > a")
        .forEach(link => {

            link.addEventListener("click", function (e) {

                if (window.innerWidth > 768) return;

                e.preventDefault();

                this.parentElement
                    .classList.toggle("active");

            });

        });

    /* Menu cấp 2 */

    document.querySelectorAll(".submenu-item > a")
        .forEach(link => {

            link.addEventListener("click", function (e) {

                if (window.innerWidth > 768) return;

                const submenu =
                    this.parentElement
                        .querySelector(".submenu-level2");

                if (!submenu) return;

                e.preventDefault();

                submenu.style.display =
                    submenu.style.display === "block"
                        ? "none"
                        : "block";

            });

        });

});

// ===== ĐỌC DOCUMENTS.JSON DÙNG CHUNG CHO TOÀN BỘ WEBSITE =====

function renderDocumentsFromJson() {
    const list = document.getElementById("documentList");
    const pagination = document.getElementById("document-pagination");

    if (!list || !pagination) return;

    const folder = window.DOCUMENT_FOLDER || "";

    if (!folder) return;

    fetch("data/documents.json")
        .then(response => response.json())
        .then(docs => {

            docs = docs.filter(doc =>
                doc &&
                doc.link &&
                doc.link.toUpperCase().includes(folder.toUpperCase())
            );

            docs.sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.time || "00:00"}`);
                const dateB = new Date(`${b.date}T${b.time || "00:00"}`);
                return dateB - dateA;
            });

            const perPage = 10;
            let currentPage = 1;

            function formatDate(dateText) {
                if (!dateText) return "";

                if (dateText.includes("-")) {
                    const parts = dateText.split("-");
                    return `${parts[2]}/${parts[1]}/${parts[0]}`;
                }

                return dateText;
            }

            function renderDocs() {
                const start = (currentPage - 1) * perPage;
                const pageItems = docs.slice(start, start + perPage);

                if (pageItems.length === 0) {
                    list.innerHTML = `
                        <div class="news-item-bqp">
                            <h3>Chưa có văn bản</h3>
                            <p>Danh mục này chưa có tài liệu PDF.</p>
                        </div>
                    `;
                    pagination.innerHTML = "";
                    return;
                }

                list.innerHTML = pageItems.map(doc => `
                    <div class="news-item-bqp">
                        <h3>
                            <a href="${doc.link}" target="_blank">
                                ${doc.title}
                            </a>
                        </h3>
                        <p>${doc.time || ""} | ${formatDate(doc.date)}</p>
                        <span>Tài liệu văn bản</span>
                    </div>
                `).join("");
            }

            function renderPagination() {
                const totalPages = Math.ceil(docs.length / perPage);

                if (totalPages <= 1) {
                    pagination.innerHTML = "";
                    return;
                }

                let html = "";

                html += `
                    <button onclick="changeDocumentPage(${Math.max(1, currentPage - 1)})">
                        &lt;&lt;
                    </button>
                `;

                for (let i = 1; i <= totalPages; i++) {
                    html += `
                        <button class="${i === currentPage ? "active" : ""}"
                                onclick="changeDocumentPage(${i})">
                            ${i}
                        </button>
                    `;
                }

                html += `
                    <button onclick="changeDocumentPage(${Math.min(totalPages, currentPage + 1)})">
                        &gt;&gt;
                    </button>
                `;

                pagination.innerHTML = html;
            }

            window.changeDocumentPage = function (page) {
                currentPage = page;
                renderDocs();
                renderPagination();
            };

            renderDocs();
            renderPagination();
        })
        .catch(error => {
            console.error("Không đọc được documents.json:", error);
        });
}

renderDocumentsFromJson();
// ===== TRANG CHỦ: HIỂN THỊ TẤT CẢ VĂN BẢN TỪ DOCUMENTS.JSON =====
function removeVietnameseTones(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase();
}
function renderHomePageDocuments() {
    const mainList = document.getElementById("homeMainDocs");
    const pagination = document.getElementById("homePagination");
    const featuredList = document.getElementById("homeFeaturedDocs");
    const searchInput = document.getElementById("homeSearchInput");
    const searchBtn = document.getElementById("homeSearchBtn");
    const dateBox = document.getElementById("homeDate");

    if (!mainList || !pagination || !featuredList) return;

    if (dateBox) {
        const now = new Date();

        const weekdays = [
            "Chủ nhật",
            "Thứ Hai",
            "Thứ Ba",
            "Thứ Tư",
            "Thứ Năm",
            "Thứ Sáu",
            "Thứ Bảy"
        ];

        const dayName = weekdays[now.getDay()];
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const year = now.getFullYear();

        dateBox.textContent = `${dayName}, ${day}/${month}/${year}`;
    }

    fetch("data/documents.json")
        .then(response => response.json())
        .then(allDocs => {

            let docs = allDocs.filter(doc =>
                doc &&
                doc.link &&
                doc.title
            );

            function getDateTime(doc) {
                return new Date(`${doc.date}T${doc.time || "00:00"}`);
            }

            docs.sort((a, b) => getDateTime(b) - getDateTime(a));

            const perPage = 10;
            let currentPage = 1;
            let filteredDocs = [...docs];

            function formatDate(dateText) {
                if (!dateText) return "";

                if (dateText.includes("-")) {
                    const parts = dateText.split("-");
                    return `${parts[2]}/${parts[1]}/${parts[0]}`;
                }

                return dateText;
            }

            function renderMainDocs() {
                const start = (currentPage - 1) * perPage;
                const pageItems = filteredDocs.slice(start, start + perPage);

                if (pageItems.length === 0) {
                    mainList.innerHTML = `
                        <div class="news-item-bqp">
                            <h3>Không tìm thấy văn bản</h3>
                            <p>Không có tài liệu phù hợp với nội dung tìm kiếm.</p>
                        </div>
                    `;
                    pagination.innerHTML = "";
                    return;
                }

                mainList.innerHTML = pageItems.map(doc => `
                    <div class="news-item-bqp">
                        <h3>
                            <a href="${doc.link}" target="_blank">
                                ${doc.title}
                            </a>
                        </h3>
                        <p>${doc.time || ""} | ${formatDate(doc.date)}</p>
                        <span>Tài liệu văn bản</span>
                    </div>
                `).join("");
            }

            function renderPagination() {
                const totalPages = Math.ceil(filteredDocs.length / perPage);

                if (totalPages <= 1) {
                    pagination.innerHTML = "";
                    return;
                }

                let html = "";

                html += `
                    <button onclick="changeHomePage(${Math.max(1, currentPage - 1)})">
                        &lt;&lt;
                    </button>
                `;

                for (let i = 1; i <= totalPages; i++) {
                    html += `
                        <button class="${i === currentPage ? "active" : ""}"
                                onclick="changeHomePage(${i})">
                            ${i}
                        </button>
                    `;
                }

                html += `
                    <button onclick="changeHomePage(${Math.min(totalPages, currentPage + 1)})">
                        &gt;&gt;
                    </button>
                `;

                pagination.innerHTML = html;
            }

            function renderFeaturedDocs() {
                const top5 = docs.slice(0, 5);

                featuredList.innerHTML = `
                    <div class="home-highlight-list">
                        ${top5.map(doc => `
                            <div class="home-highlight-item">
                                <a href="${doc.link}" target="_blank">
                                    ${doc.title}
                                </a>
                            </div>
                        `).join("")}
                    </div>
                `;
            }

            function searchDocs() {
                const keyword = searchInput
                    ? searchInput.value.trim()
                    : "";

                if (!keyword) {
                    filteredDocs = [...docs];
                } else {
                    const searchText = removeVietnameseTones(keyword);

                    filteredDocs = docs.filter(doc => {
                        const title = removeVietnameseTones(doc.title || "");
                        const link = removeVietnameseTones(doc.link || "");

                        return title.includes(searchText) || link.includes(searchText);
                    });
                }

                currentPage = 1;
                renderMainDocs();
                renderPagination();
            }

            window.changeHomePage = function (page) {
                currentPage = page;
                renderMainDocs();
                renderPagination();
            };

            if (searchBtn) {
                searchBtn.addEventListener("click", searchDocs);
            }

            if (searchInput) {
                searchInput.addEventListener("keydown", function (e) {
                    if (e.key === "Enter") {
                        searchDocs();
                    }
                });
            }

            renderMainDocs();
            renderPagination();
            renderFeaturedDocs();
        })
        .catch(error => {
            console.error("Không đọc được documents.json ở trang chủ:", error);
        });
}

renderHomePageDocuments();
// ===== MENU CHUYÊN MỤC MOBILE =====

// ===== MOBILE BAR GIỐNG BQP =====

function updateMobileDate() {
    const mobileDate = document.getElementById("mobileDate");
    if (!mobileDate) return;

    const now = new Date();

    const weekdays = [
        "Chủ nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy"
    ];

    const dayName = weekdays[now.getDay()];
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    mobileDate.textContent = `${dayName}, ${day}/${month}/${year}`;
}

updateMobileDate();

const openCategoryMenu = document.getElementById("openCategoryMenu");
const closeCategoryMenu = document.getElementById("closeCategoryMenu");
const mobileCategoryPanel = document.getElementById("mobileCategoryPanel");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");

if (openCategoryMenu && closeCategoryMenu && mobileCategoryPanel && mobileMenuOverlay) {

    function closeMobileMenu() {
        mobileCategoryPanel.classList.remove("show");
        mobileMenuOverlay.classList.remove("show");
        openCategoryMenu.classList.remove("active");
    }

    openCategoryMenu.addEventListener("click", () => {
        const isOpen = mobileCategoryPanel.classList.contains("show");

        if (isOpen) {
            closeMobileMenu();
        } else {
            mobileCategoryPanel.classList.add("show");
            mobileMenuOverlay.classList.add("show");
            openCategoryMenu.classList.add("active");
        }
    });

    closeCategoryMenu.addEventListener("click", closeMobileMenu);

    mobileMenuOverlay.addEventListener("click", closeMobileMenu);
}