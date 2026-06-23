
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
    return (str || "")
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/[^\w\s/.-]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
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
                const keyword = searchInput ? searchInput.value.trim() : "";

                if (!keyword) {
                    filteredDocs = [...docs];
                } else {
                    const searchText = removeVietnameseTones(keyword);

                    filteredDocs = docs.filter(doc => {
                        const title = removeVietnameseTones(doc.title || "");
                        const category = removeVietnameseTones(doc.category || "");
                        const link = removeVietnameseTones(doc.link || "");
                        const date = removeVietnameseTones(doc.date || "");
                        const time = removeVietnameseTones(doc.time || "");

                        const fullText = `${title} ${category} ${link} ${date} ${time}`;

                        return fullText.includes(searchText);
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

            /* Nhận từ khóa từ thanh tìm kiếm mobile khi chuyển về index.html?q=... */
            const urlKeyword = new URLSearchParams(window.location.search).get("q");

            if (urlKeyword && searchInput) {
                searchInput.value = urlKeyword;
                searchDocs();
            }
        })
        .catch(error => {
            console.error("Không đọc được documents.json ở trang chủ:", error);
        });
}

renderHomePageDocuments();
// ===== MENU CHUYÊN MỤC MOBILE =====
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
                            <em>2</em>
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
                    <li><a href="chienle.html">Chiến lệ</a></li>
                    <li><a href="ĐLĐN.html">Điều lệnh đội ngũ</a></li>
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

        document.documentElement.classList.add("mobile-menu-open");
        document.body.classList.add("mobile-menu-open");
    }

    function closeMenu() {
        panel.classList.remove("show");
        overlay.classList.remove("show");

        document.documentElement.classList.remove("mobile-menu-open");
        document.body.classList.remove("mobile-menu-open");

        showLevel1();
    }
    /* Khi bấm vào link trong menu thì mở khóa cuộn lại */
    panel.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function () {
            document.documentElement.classList.remove("mobile-menu-open");
            document.body.classList.remove("mobile-menu-open");
        });
    });

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
/* ===== NÚT TÌM KIẾM TRÊN THANH MOBILE ===== */
document.addEventListener("DOMContentLoaded", function () {
    setupMobileSearch();
});

function setupMobileSearch() {
    const mobileBar = document.querySelector(".mobile-bqp-bar");
    const searchBtn = document.querySelector(".mobile-search-btn");

    if (!mobileBar || !searchBtn) return;

    let searchPanel = document.querySelector(".mobile-search-panel");

    if (!searchPanel) {
        searchPanel = document.createElement("div");
        searchPanel.className = "mobile-search-panel";

        searchPanel.innerHTML = `
            <input type="text" id="mobileSearchInput" placeholder="Nhập nội dung tìm kiếm...">
            <button type="button" id="mobileSearchSubmit">
                <i class="fas fa-search"></i>
            </button>
        `;

        mobileBar.insertAdjacentElement("afterend", searchPanel);
    }

    const mobileSearchInput = document.getElementById("mobileSearchInput");
    const mobileSearchSubmit = document.getElementById("mobileSearchSubmit");

    searchBtn.addEventListener("click", function () {
        searchPanel.classList.toggle("show");

        if (searchPanel.classList.contains("show")) {
            setTimeout(() => {
                mobileSearchInput.focus();
            }, 100);
        }
    });

    function doMobileSearch() {
        const keyword = mobileSearchInput.value.trim();

        if (!keyword) return;

        const homeSearchInput = document.getElementById("homeSearchInput");
        const homeSearchBtn = document.getElementById("homeSearchBtn");

        if (homeSearchInput && homeSearchBtn) {
            homeSearchInput.value = keyword;
            homeSearchBtn.click();

            searchPanel.classList.remove("show");

            homeSearchInput.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        } else {
            window.location.href = "index.html?q=" + encodeURIComponent(keyword);
        }
    }

    mobileSearchSubmit.addEventListener("click", doMobileSearch);

    mobileSearchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            doMobileSearch();
        }
    });
}
/* ===== THANH TÌM KIẾM NẰM TRÊN RIGHT-CATEGORY CHO TẤT CẢ TRANG HTML ===== */
document.addEventListener("DOMContentLoaded", function () {
    createGlobalSearchBox();
});

function createGlobalSearchBox() {
    /*
        Trang chủ index.html đã có ô tìm kiếm riêng,
        nên không tạo thêm để tránh bị lặp.
    */
    if (document.getElementById("homeSearchInput")) return;

    /*
        Nếu đã có ô tìm kiếm chung thì không tạo lặp.
    */
    if (document.getElementById("globalSearchInput")) return;

    const rightCategory = document.querySelector(".right-category");
    const navbar = document.querySelector(".navbar");

    const searchHTML = `
        <div class="global-search-box">
            <input type="text" id="globalSearchInput" placeholder="Tìm kiếm nội dung...">
            <button type="button" id="globalSearchBtn">
                <i class="fas fa-search"></i>
            </button>
        </div>
    `;

    /*
        Nếu trang có right-category thì tạo cột phải riêng:
        search nằm trên, right-category nằm dưới.
    */
    if (rightCategory) {
        const rightColumn = document.createElement("aside");
        rightColumn.className = "right-column";

        rightCategory.parentNode.insertBefore(rightColumn, rightCategory);

        rightColumn.innerHTML = searchHTML;
        rightColumn.appendChild(rightCategory);
    }

    /*
        Nếu trang không có right-category thì đặt dưới navbar.
    */
    else if (navbar) {
        navbar.insertAdjacentHTML("afterend", searchHTML);
    }

    else {
        document.body.insertAdjacentHTML("afterbegin", searchHTML);
    }

    const globalSearchInput = document.getElementById("globalSearchInput");
    const globalSearchBtn = document.getElementById("globalSearchBtn");

    function doGlobalSearch() {
        const keyword = globalSearchInput.value.trim();

        if (!keyword) return;

        window.location.href = "index.html?q=" + encodeURIComponent(keyword);
    }

    globalSearchBtn.addEventListener("click", doGlobalSearch);

    globalSearchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            doGlobalSearch();
        }
    });
}
/* ================================================= */
/* FOOTER DÙNG CHUNG CHO TẤT CẢ TRANG HTML */
/* ================================================= */

document.addEventListener("DOMContentLoaded", function () {
    createSiteFooter();
});

function createSiteFooter() {
    /*
        Nếu trang đã có footer rồi thì không tạo thêm.
        Tránh bị lặp footer ở index.html.
    */
    if (document.querySelector(".site-footer")) return;

    const footer = document.createElement("footer");
    footer.className = "site-footer";

    footer.innerHTML = `
        <div class="footer-main">
            <div class="footer-info">
                <h2>© 2026 CỔNG THÔNG TIN ĐIỆN TỬ TRUNG ĐOÀN 24</h2>

                <p>Địa chỉ: Trung đoàn 24, Thôn 2, Xã Đăk Tô, Tỉnh Quảng Ngãi</p>
                <p>Điện thoại: ................................</p>
                <p>Email: ................................</p>
            </div>

            <div class="footer-social">
                <h2>THEO DÕI CHÚNG TÔI</h2>

                <div class="social-icons">
                    <a href="https://www.facebook.com/groups/690650291691522/about" target="_blank" title="Facebook">
                        <i class="fab fa-facebook-f"></i>
                    </a>

                    <a href="#" title="Zalo" class="zalo-icon">Zalo</a>

                    <a href="#" title="TikTok">
                        <i class="fab fa-tiktok"></i>
                    </a>

                    <a href="#" title="YouTube">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(footer);
}