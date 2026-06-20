
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
// ===== CHÍNH TRỊ =====

const documents = [
    {
        title: "Diễn đàn thanh niên với chủ đề Khát vọng thanh niên, đưa Sư đoàn vươn tới danh hiệu anh hùng lần thứ 3",
        date: "2026-06-20",
        time: "15:40",
        desc: "Tài liệu tọa đàm, diễn đàn thanh niên.",
        link: "toadam.html"
    },
    {
        title: "Học tập và làm theo phong cách diễn đạt Hồ Chí Minh",
        date: "2026-06-19",
        time: "15:13",
        desc: "Tài liệu chuyên đề.",
        link: "chuyende.html"
    },
    {
        title: "Học tập và làm theo phong cách làm việc Hồ Chí Minh",
        date: "2026-06-18",
        time: "14:20",
        desc: "Tài liệu chuyên đề.",
        link: "chuyende.html"
    }
];

const documentList = document.getElementById("documentList");
const pagination = document.getElementById("pagination");

if (documentList && pagination) {

    const perPage = 10;
    let currentPage = 1;

    documents.sort((a, b) => new Date(b.date) - new Date(a.date));

    function formatDate(date) {
        return new Date(date).toLocaleDateString("vi-VN");
    }

    function renderDocuments() {

        const start = (currentPage - 1) * perPage;
        const pageItems = documents.slice(start, start + perPage);

        documentList.innerHTML = pageItems.map(item => `
            <div class="news-item-bqp">
                <h3>
                    <a href="${item.link}">
                        ${item.title}
                    </a>
                </h3>

                <p>${item.time} | ${formatDate(item.date)}</p>

                <span>${item.desc}</span>
            </div>
        `).join("");
    }

    function renderPagination() {

        const totalPages = Math.ceil(documents.length / perPage);

        let html = '';

        html += `
            <button onclick="changePage(${Math.max(1, currentPage - 1)})">
                <<
            </button>
        `;

        for (let i = 1; i <= totalPages; i++) {

            html += `
                <button
                    class="${i === currentPage ? 'active' : ''}"
                    onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        }

        html += `
            <button onclick="changePage(${Math.min(totalPages, currentPage + 1)})">
                >>
            </button>
        `;

        pagination.innerHTML = html;
    }

    window.changePage = function (page) {

        currentPage = page;

        renderDocuments();

        renderPagination();
    }

    renderDocuments();

    renderPagination();
}
