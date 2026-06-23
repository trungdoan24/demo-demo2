
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
/* ===== MENU MOBILE 2 CẤP GIỐNG BQP ===== */
document.addEventListener("DOMContentLoaded", function () {
    createBqpMobileMenu();
});

function createBqpMobileMenu() {
    const header = document.querySelector(".banner-header");
    if (!header) return;

    /* Xóa menu mobile cũ nếu đã có */
    document.querySelectorAll(".mobile-bqp-bar, .mobile-menu-overlay, .mobile-category-panel").forEach(el => el.remove());

    const now = new Date();
    const weekdays = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const mobileDateText = `${weekdays[now.getDay()]}, ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

    const menuHTML = `
        <div class="mobile-bqp-bar">
            <button class="mobile-menu-btn" id="openCategoryMenu" type="button">
                <i class="fas fa-bars"></i>
            </button>

            <span class="mobile-date" id="mobileDate">${mobileDateText}</span>

            <button class="mobile-search-btn" type="button">
                <i class="fas fa-search"></i>
            </button>

            <span class="mobile-lang">EN</span>
        </div>

        <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>

        <div class="mobile-category-panel" id="mobileCategoryPanel">

            <div class="mobile-category-header">
                <button class="mobile-back-btn" id="mobileBackBtn" type="button">
                    <i class="fas fa-chevron-left"></i>
                </button>

                <h3 id="mobileMenuTitle">Chuyên mục</h3>

                <button class="close-category-btn" id="closeCategoryMenu" type="button">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="mobile-menu-level active" id="mobileLevel1">
                <ul class="mobile-category-list">
                    <li>
                        <a href="index.html" class="no-arrow">Trang chủ</a>
                    </li>

                    <li>
                        <button class="mobile-parent" data-target="menu-quansu" type="button">
                            <span>Quân sự</span>
                            <em>1</em>
                        </button>
                    </li>

                    <li>
                        <button class="mobile-parent" data-target="menu-chinhtri" type="button">
                            <span>Chính trị</span>
                            <em>8</em>
                        </button>
                    </li>

                    <li>
                        <button class="mobile-parent" data-target="menu-haucankythuat" type="button">
                            <span>Hậu cần kỹ thuật</span>
                            <em>4</em>
                        </button>
                    </li>

                    <li>
                        <button class="mobile-parent" data-target="menu-chuyendoiso" type="button">
                            <span>Chuyển đổi số</span>
                            <em>1</em>
                        </button>
                    </li>
                </ul>
            </div>

            <div class="mobile-menu-level" id="menu-quansu" data-title="Quân sự">
                <ul class="mobile-category-list">
                    <li><a href="quansu.html">Tất cả văn bản Quân sự</a></li>
                    <li><a href="dldn.html">Điều lệnh đội ngũ</a></li>
                </ul>
            </div>

            <div class="mobile-menu-level" id="menu-chinhtri" data-title="Chính trị">
                <ul class="mobile-category-list">
                    <li><a href="chinhtri.html">Tất cả văn bản Chính trị</a></li>
                    <li><a href="chuyende.html">Chuyên đề</a></li>
                    <li><a href="toadam.html">Tọa đàm</a></li>
                    <li><a href="luat.html">Luật</a></li>
                    <li><a href="thongtu.html">Thông tư</a></li>
                    <li><a href="nghidinh.html">Nghị định</a></li>
                    <li><a href="maukekhai.html">Mẫu kê khai</a></li>
                    <li><a href="giaoanhsqbs.html">Giáo án HSQ, BS</a></li>
                    <li><a href="tailieugiaoduc.html">Tài liệu giáo dục</a></li>
                </ul>
            </div>

            <div class="mobile-menu-level" id="menu-haucankythuat" data-title="Hậu cần kỹ thuật">
                <ul class="mobile-category-list">
                    <li><a href="haucankythuat.html">Tất cả văn bản Hậu cần kỹ thuật</a></li>
                    <li><a href="antoanlaodong.html">An toàn lao động</a></li>
                    <li><a href="vanbanhaucan.html">Văn bản hậu cần</a></li>
                    <li><a href="quannhu.html">Quân nhu</a></li>
                    <li><a href="vanbankythuat.html">Văn bản kỹ thuật</a></li>
                </ul>
            </div>

            <div class="mobile-menu-level" id="menu-chuyendoiso" data-title="Chuyển đổi số">
                <ul class="mobile-category-list">
                    <li><a href="chuyendoiso.html">Tất cả văn bản Chuyển đổi số</a></li>
                </ul>
            </div>

        </div>
    `;

    header.insertAdjacentHTML("afterend", menuHTML);

    const openBtn = document.getElementById("openCategoryMenu");
    const closeBtn = document.getElementById("closeCategoryMenu");
    const panel = document.getElementById("mobileCategoryPanel");
    const overlay = document.getElementById("mobileMenuOverlay");
    const backBtn = document.getElementById("mobileBackBtn");
    const title = document.getElementById("mobileMenuTitle");
    const level1 = document.getElementById("mobileLevel1");

    function openMenu() {
        panel.classList.add("show");
        overlay.classList.add("show");
    }

    function closeMenu() {
        panel.classList.remove("show");
        overlay.classList.remove("show");
        showLevel1();
    }

    function showLevel1() {
        document.querySelectorAll(".mobile-menu-level").forEach(level => {
            level.classList.remove("active");
        });

        level1.classList.add("active");
        title.textContent = "Chuyên mục";
        backBtn.style.display = "none";
    }

    function showSubMenu(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        document.querySelectorAll(".mobile-menu-level").forEach(level => {
            level.classList.remove("active");
        });

        target.classList.add("active");
        title.textContent = target.dataset.title || "Chuyên mục";
        backBtn.style.display = "block";
    }

    openBtn.addEventListener("click", function () {
        if (panel.classList.contains("show")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
    backBtn.addEventListener("click", showLevel1);

    document.querySelectorAll(".mobile-parent").forEach(btn => {
        btn.addEventListener("click", function () {
            showSubMenu(this.dataset.target);
        });
    });

    showLevel1();
}