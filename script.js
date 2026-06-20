
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
        title: "Diễn đàn thanh niên tuổi trẻ Trung đoàn học tập, noi gương Anh hùng LLVTND Vũ Văn Bình",
        date: "2026-06-19",
        time: "15:13",
        desc: "Tài liệu tọa đàm, diễn đàn thanh niên.",
        link: "toadam.html"
    },
    {
        title: "Diễn đàn thanh niên với chủ đề tuổi trẻ Trung đoàn 24 giữ lửa truyền thống, thắp sáng tương lai",
        date: "2026-06-18",
        time: "14:20",
        desc: "Tài liệu tọa đàm, diễn đàn thanh niên.",
        link: "toadam.html"
    },
    {
        title: "Diễn đàn thanh niên với chủ đề tuổi trẻ Trung đoàn 24, bản lĩnh, khát vọng, xung kích sáng tạo, tiên phong, quyết thắng",
        date: "2026-06-17",
        time: "10:30",
        desc: "Tài liệu tọa đàm, diễn đàn thanh niên.",
        link: "toadam.html"
    },
    {
        title: "Học tập và làm theo phong cách diễn đạt Hồ Chí Minh",
        date: "2026-06-16",
        time: "17:05",
        desc: "Tài liệu chuyên đề.",
        link: "chuyende.html"
    },
    {
        title: "Học tập và làm theo phong cách làm việc Hồ Chí Minh",
        date: "2026-06-15",
        time: "15:13",
        desc: "Tài liệu chuyên đề.",
        link: "chuyende.html"
    },
    {
        title: "Học tập và làm theo phong cách ứng xử của Hồ Chí Minh",
        date: "2026-06-14",
        time: "14:20",
        desc: "Tài liệu chuyên đề.",
        link: "chuyende.html"
    },
    {
        title: "Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh trở thành nhu cầu tự thân của cán bộ, đảng viên, quần chúng trong quân đội hiện nay",
        date: "2026-06-13",
        time: "09:00",
        desc: "Tài liệu chuyên đề.",
        link: "chuyende.html"
    },
    {
        title: "Luật Sĩ quan Quân đội nhân dân Việt Nam",
        date: "2026-06-12",
        time: "08:30",
        desc: "Văn bản luật.",
        link: "luat.html"
    },
    {
        title: "Luật Nghĩa vụ quân sự",
        date: "2026-06-11",
        time: "08:00",
        desc: "Văn bản luật.",
        link: "luat.html"
    },
    {
        title: "Thông tư công tác Đảng, công tác chính trị",
        date: "2026-06-10",
        time: "07:45",
        desc: "Văn bản thông tư.",
        link: "thongtu.html"
    },
    {
        title: "Nghị định liên quan đến công tác chính trị",
        date: "2026-06-09",
        time: "07:30",
        desc: "Văn bản nghị định.",
        link: "nghidinh.html"
    },
    {
        title: "Mẫu kê khai phục vụ công tác chính trị",
        date: "2026-06-08",
        time: "07:15",
        desc: "Mẫu biểu, tài liệu kê khai.",
        link: "maukehai.html"
    },
    {
        title: "Giáo án HSQ, BS",
        date: "2026-06-07",
        time: "07:00",
        desc: "Giáo án chính trị cho hạ sĩ quan, binh sĩ.",
        link: "giaoanhsqbs.html"
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
