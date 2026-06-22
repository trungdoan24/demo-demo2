
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
        title: "Bài 1 HSQ-BS 2026",
        date: "2026-06-20",
        time: "17:00",
        desc: "Giáo án chính trị HSQ-BS năm 1.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 1/Bài 1 HSQ-BS 2026.pdf"
    },
    {
        title: "Bài 10 HSQ, BS 2026",
        date: "2026-06-20",
        time: "16:55",
        desc: "Giáo án chính trị HSQ-BS năm 1.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 1/Bài 10 HSQ, BS 2026.pdf"
    },
    {
        title: "Bài 11 HSQ, BS 2026",
        date: "2026-06-20",
        time: "16:50",
        desc: "Giáo án chính trị HSQ-BS năm 1.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 1/Bài 11 HSQ, BS 2026.pdf"
    },
    {
        title: "Bài 12 HSQ, BS 2026",
        date: "2026-06-20",
        time: "16:45",
        desc: "Giáo án chính trị HSQ-BS năm 1.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 1/Bài 12 HSQ, BS 2026.pdf"
    },
    {
        title: "Bài 2 HSQ, BS 2026",
        date: "2026-06-20",
        time: "16:40",
        desc: "Giáo án chính trị HSQ-BS năm 1.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 1/Bài 2 HSQ, BS 2026.pdf"
    },
    {
        title: "Bài 3 HSQ,BS 2026",
        date: "2026-06-20",
        time: "16:35",
        desc: "Giáo án chính trị HSQ-BS năm 1.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 1/Bài 3 HSQ,BS 2026.pdf"
    },
    {
        title: "Bài 4 HSQ,BS 2026",
        date: "2026-06-20",
        time: "16:30",
        desc: "Giáo án chính trị HSQ-BS năm 1.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 1/Bài 4 HSQ,BS 2026.pdf"
    },
    {
        title: "Bài 5 HSQ, BS 2026",
        date: "2026-06-20",
        time: "16:25",
        desc: "Giáo án chính trị HSQ-BS năm 1.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 1/Bài 5 HSQ, BS 2026.pdf"
    },
    {
        title: "Bài 6 HSQ, BS 2026",
        date: "2026-06-20",
        time: "16:20",
        desc: "Giáo án chính trị HSQ-BS năm 1.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 1/Bài 6 HSQ, BS 2026.pdf"
    },
    {
        title: "Bài 7 HSQ, BS 2026",
        date: "2026-06-20",
        time: "16:15",
        desc: "Giáo án chính trị HSQ-BS năm 1.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 1/Bài 7 HSQ, BS 2026.pdf"
    },
    {
        title: "Bài 8 HSQ, BS 2026",
        date: "2026-06-20",
        time: "16:10",
        desc: "Giáo án chính trị HSQ-BS năm 1.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 1/Bài 8 HSQ, BS 2026.pdf"
    },
    {
        title: "Bài 9 HSQ, BS 2026",
        date: "2026-06-20",
        time: "16:05",
        desc: "Giáo án chính trị HSQ-BS năm 1.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 1/Bài 9 HSQ, BS 2026.pdf"
    },

    {
        title: "Bài 10: Đấu tranh làm thất bại âm mưu, thủ đoạn diễn biến hòa bình, bạo loạn lật đổ",
        date: "2026-06-19",
        time: "17:00",
        desc: "Giáo án chính trị HSQ-BS năm 2.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 2/Bài 10 “Đấu tranh làm thất bại âm mưu, thủ đoạn ‘diễn biến hòa bình’, bạo loạn lật đổ của các thế lực thù địch chống phá cách mạng Việt Nam hiện nay”.pdf"
    },
    {
        title: "Bài 11: Công tác vận động quần chúng, tham gia xây dựng cơ sở vững mạnh",
        date: "2026-06-19",
        time: "16:55",
        desc: "Giáo án chính trị HSQ-BS năm 2.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 2/Bài 11 Công tác vận động quần chúng, tham gia xây dựng cơ sở vững mạnh của cán bộ, chiến sĩ trong Quân đội hiện nay.pdf"
    },
    {
        title: "Bài 6: Xây dựng Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam hiện nay",
        date: "2026-06-19",
        time: "16:50",
        desc: "Giáo án chính trị HSQ-BS năm 2.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 2/Bài 6 Xây dựng Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam hiện nay.pdf"
    },
    {
        title: "Bài 7: Quan điểm, chính sách dân tộc, tôn giáo của Đảng và Nhà nước ta hiện nay",
        date: "2026-06-19",
        time: "16:45",
        desc: "Giáo án chính trị HSQ-BS năm 2.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 2/Bài 7  Quan điểm, chính sách dân tộc, tôn giáo của Đảng và Nhà nước ta hiện nay..pdf"
    },
    {
        title: "Bài 8: Đường lối, chính sách đối ngoại của Đảng và Nhà nước ta hiện nay",
        date: "2026-06-19",
        time: "16:40",
        desc: "Giáo án chính trị HSQ-BS năm 2.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 2/Bài 8 Đường lối, chính sách đối ngoại của Đảng và Nhà nước ta hiện nay.pdf"
    },
    {
        title: "Bài 9: Quan điểm của Đảng về đối tác, đối tượng của cách mạng Việt Nam trong tình hình mới",
        date: "2026-06-19",
        time: "16:35",
        desc: "Giáo án chính trị HSQ-BS năm 2.",
        link: "sohoa/CHINHTRI/BAIGIANGCHINHTRI/GIÁO ÁN HSQ - BS NĂM 2/Bài 9 “Quan điểm của Đảng về đối tác, đối tượng của cách mạng Việt Nam trong tình hình mới”..pdf"
    },

    {
        title: "Đẩy mạnh học tập, rèn luyện đạo đức cách mạng của quân nhân, phấn đấu xứng danh Bộ đội Cụ Hồ trong thời kỳ mới",
        date: "2026-06-18",
        time: "17:00",
        desc: "Tài liệu chuyên đề.",
        link: "sohoa/CHINHTRI/CHUYENDE/ĐẨY MẠNH HỌC TẬP, RÈN LUYỆN ĐẠO ĐỨC CÁCH MẠNG CỦA QUÂN NHÂN, PHẤN ĐẤU XỨNG DANH “BỘ ĐỘI CỤ HỒ” TRONG THỜI KỲ MỚI.pdf"
    },
    {
        title: "Học tập và làm theo phong cách diễn đạt Hồ Chí Minh",
        date: "2026-06-18",
        time: "16:55",
        desc: "Tài liệu chuyên đề.",
        link: "sohoa/CHINHTRI/CHUYENDE/HỌC TẬP VÀ LÀM THEO PHONG CÁCH DIỄN ĐẠT HỒ CHÍ MINH.pdf"
    },
    {
        title: "Học tập và làm theo phong cách làm việc Hồ Chí Minh",
        date: "2026-06-18",
        time: "16:50",
        desc: "Tài liệu chuyên đề.",
        link: "sohoa/CHINHTRI/CHUYENDE/HỌC TẬP VÀ LÀM THEO PHONG CÁCH LÀM VIỆC HỒ CHÍ MINH.pdf"
    },
    {
        title: "Học tập và làm theo phong cách ứng xử của Hồ Chí Minh",
        date: "2026-06-18",
        time: "16:45",
        desc: "Tài liệu chuyên đề.",
        link: "sohoa/CHINHTRI/CHUYENDE/HỌC TẬP VÀ LÀM THEO PHONG CÁCH ỨNG XỬ CỦA HỒ CHÍ MINH.pdf"
    },
    {
        title: "Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh trở thành nhu cầu tự thân",
        date: "2026-06-18",
        time: "16:40",
        desc: "Tài liệu chuyên đề.",
        link: "sohoa/CHINHTRI/CHUYENDE/HỌC TẬP VÀ LÀM THEO TƯ TƯỞNG, ĐẠO ĐỨC, PHONG CÁCH HỒ CHÍ MINH TRỞ THÀNH NHU CẦU TỰ THÂN CỦA CÁN BỘ, ĐẢNG VIÊN, QUẦN CHÚNG TRONG QUÂN ĐỘI HIỆN NAY.pdf"
    },

    {
        title: "Luật Dân quân tự vệ 2019",
        date: "2026-06-17",
        time: "17:00",
        desc: "Văn bản luật.",
        link: "sohoa/CHINHTRI/LUAT/LUẬT DÂN QUÂN TỰ VỆ 2019.pdf"
    },
    {
        title: "Luật Lực lượng dự bị động viên",
        date: "2026-06-17",
        time: "16:55",
        desc: "Văn bản luật.",
        link: "sohoa/CHINHTRI/LUAT/LUẬT LỰC LƯỢNG DỰ BỊ ĐỘNG VIÊN.pdf"
    },
    {
        title: "Luật Nghĩa vụ quân sự 2015",
        date: "2026-06-17",
        time: "16:50",
        desc: "Văn bản luật.",
        link: "sohoa/CHINHTRI/LUAT/LUẬT NGHĨA VỤ QUÂN SỰ 2015.pdf"
    },
    {
        title: "Luật Quân nhân chuyên nghiệp, công nhân và viên chức quốc phòng 2015",
        date: "2026-06-17",
        time: "16:45",
        desc: "Văn bản luật.",
        link: "sohoa/CHINHTRI/LUAT/LUẬT QUÂN NHÂN CHUYÊN NGHIỆP, CÔNG NHÂN VÀ VIÊN CHỨC QUỐC PHÒNG 2015.pdf"
    },
    {
        title: "Luật Quốc phòng",
        date: "2026-06-17",
        time: "16:40",
        desc: "Văn bản luật.",
        link: "sohoa/CHINHTRI/LUAT/LUẬT QUỐC PHÒNG.pdf"
    },
    {
        title: "Luật sửa đổi bổ sung Luật Sĩ quan 2024",
        date: "2026-06-17",
        time: "16:35",
        desc: "Văn bản luật.",
        link: "sohoa/CHINHTRI/LUAT/LUẬT SỬA ĐỔI BỔ SUNG LUÂT SI QUAN 2024.pdf"
    },

    {
        title: "Mẫu kê khai trợ cấp khó khăn HSQ-CS",
        date: "2026-06-16",
        time: "17:00",
        desc: "Mẫu kê khai.",
        link: "sohoa/CHINHTRI/MAUKEKHAI/Mẫu kê khai trợ cấp khó khăn HSQ-CS.pdf"
    },
    {
        title: "Mẫu kê khai trợ cấp SQ, QNCN",
        date: "2026-06-16",
        time: "16:55",
        desc: "Mẫu kê khai.",
        link: "sohoa/CHINHTRI/MAUKEKHAI/MẪU kê khai trợ cấp SQ, QNCN.pdf"
    },

    {
        title: "Nghị định chế độ tiền lương công chức, viên chức và LLVT",
        date: "2026-06-15",
        time: "17:00",
        desc: "Văn bản nghị định.",
        link: "sohoa/CHINHTRI/NGHIDINH/NGHỊ ĐỊNH CHẾ ĐỘ TIỀN LƯƠNG CÔNG CHỨC, VIÊN CHỨC VÀ LLVT.pdf"
    },

    {
        title: "Tài liệu giáo dục chính trị cho đảng viên mới",
        date: "2026-06-14",
        time: "17:00",
        desc: "Tài liệu giáo dục chính trị.",
        link: "sohoa/CHINHTRI/TAILIEUGIAODUC/TÀI LIỆU GIÁO DỤC CHÍNH TRỊ CHO ĐẢNG VIÊN MỚI.pdf"
    },
    {
        title: "Tài liệu giáo dục chính trị cho đối tượng nhận thức về Đảng năm 2026",
        date: "2026-06-14",
        time: "16:55",
        desc: "Tài liệu giáo dục chính trị.",
        link: "sohoa/CHINHTRI/TAILIEUGIAODUC/TÀI LIỆU GIÁO DỤC CHÍNH TRỊ CHO ĐỐI TƯỢNG NHẬN THỨC VỀ ĐẢNG NĂM 2026.pdf"
    },
    {
        title: "Tài liệu học tập chính trị của chiến sĩ mới 2026",
        date: "2026-06-14",
        time: "16:50",
        desc: "Tài liệu giáo dục chính trị.",
        link: "sohoa/CHINHTRI/TAILIEUGIAODUC/TÀI LIỆU HỌC TẬP CHÍNH TRỊ CỦA CHIẾN SĨ MỚI 2026.pdf"
    },
    {
        title: "Đề cương tuyên truyền truyền thống 80 năm Trung đoàn",
        date: "2026-06-14",
        time: "16:45",
        desc: "Tài liệu giáo dục chính trị.",
        link: "sohoa/CHINHTRI/TAILIEUGIAODUC/ĐỀ CƯƠNG TUYÊN TRUYỀN TRUYỀN THỐNG 80 NĂM TRUNG ĐOÀN.pdf"
    },

    {
        title: "Thông tư 143",
        date: "2026-06-13",
        time: "17:00",
        desc: "Văn bản thông tư.",
        link: "sohoa/CHINHTRI/THONGTU/THÔNG TƯ 143.pdf"
    },

    {
        title: "Diễn đàn thanh niên tuổi trẻ Trung đoàn học tập, noi gương anh hùng LLVTND Vũ Văn Bình - Kế hoạch",
        date: "2026-06-12",
        time: "17:00",
        desc: "Tài liệu tọa đàm.",
        link: "sohoa/CHINHTRI/TOADAM/Diễn đàn thanh niên tuổi trẻ Trung đoàn học tập, noi gương anh hùng LLVTND Vũ Văn Bình/KẾ HOẠCH.pdf"
    },
    {
        title: "Diễn đàn thanh niên tuổi trẻ Trung đoàn học tập, noi gương anh hùng LLVTND Vũ Văn Bình - Kịch bản",
        date: "2026-06-12",
        time: "16:55",
        desc: "Tài liệu tọa đàm.",
        link: "sohoa/CHINHTRI/TOADAM/Diễn đàn thanh niên tuổi trẻ Trung đoàn học tập, noi gương anh hùng LLVTND Vũ Văn Bình/KỊCH BẢN.pdf"
    },
    {
        title: "Diễn đàn thanh niên với chủ đề khát vọng thanh niên, đưa Sư đoàn vươn tới danh hiệu anh hùng lần thứ 3 - Kế hoạch",
        date: "2026-06-12",
        time: "16:50",
        desc: "Tài liệu tọa đàm.",
        link: "sohoa/CHINHTRI/TOADAM/Diễn đàn thanh niên với chủ đề khát vọng thanh niên, đưa Sư đoàn vươn tới danh hiệu anh hùng lần thứ 3/kế hoạch.pdf"
    },
    {
        title: "Diễn đàn thanh niên với chủ đề khát vọng thanh niên, đưa Sư đoàn vươn tới danh hiệu anh hùng lần thứ 3 - Kịch bản",
        date: "2026-06-12",
        time: "16:45",
        desc: "Tài liệu tọa đàm.",
        link: "sohoa/CHINHTRI/TOADAM/Diễn đàn thanh niên với chủ đề khát vọng thanh niên, đưa Sư đoàn vươn tới danh hiệu anh hùng lần thứ 3/kịch bản.pdf"
    },
    {
        title: "Diễn đàn thanh niên với chủ đề tuổi trẻ Trung đoàn 24 giữ lửa truyền thống, thắp sáng tương lai - Kế hoạch",
        date: "2026-06-12",
        time: "16:40",
        desc: "Tài liệu tọa đàm.",
        link: "sohoa/CHINHTRI/TOADAM/Diễn đàn thanh niên với chủ đề tuổi trẻ Trung đoàn 24 giữ lửa truyền thống, thắp sáng tương lai/kế hoạch.pdf"
    },
    {
        title: "Diễn đàn thanh niên với chủ đề tuổi trẻ Trung đoàn 24 giữ lửa truyền thống, thắp sáng tương lai - Kịch bản",
        date: "2026-06-12",
        time: "16:35",
        desc: "Tài liệu tọa đàm.",
        link: "sohoa/CHINHTRI/TOADAM/Diễn đàn thanh niên với chủ đề tuổi trẻ Trung đoàn 24 giữ lửa truyền thống, thắp sáng tương lai/kịch bản.pdf"
    },
    {
        title: "Diễn đàn thanh niên với chủ đề tuổi trẻ Trung đoàn 24, bản lĩnh, khát vọng, xung kích sáng tạo, tiên phong, quyết thắng - Kế hoạch",
        date: "2026-06-12",
        time: "16:30",
        desc: "Tài liệu tọa đàm.",
        link: "sohoa/CHINHTRI/TOADAM/Diễn đàn thanh niên với chủ đề tuổi trẻ Trung đoàn 24, bản lĩnh, khát vọng, xung kích sáng tạo, tiên phong, quyết thắng/kế hoạch.pdf"
    },
    {
        title: "Diễn đàn thanh niên với chủ đề tuổi trẻ Trung đoàn 24, bản lĩnh, khát vọng, xung kích sáng tạo, tiên phong, quyết thắng - Kịch bản",
        date: "2026-06-12",
        time: "16:25",
        desc: "Tài liệu tọa đàm.",
        link: "sohoa/CHINHTRI/TOADAM/Diễn đàn thanh niên với chủ đề tuổi trẻ Trung đoàn 24, bản lĩnh, khát vọng, xung kích sáng tạo, tiên phong, quyết thắng/kịch bản.pdf"
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
const quansuDocuments = [
    {
        title: "ĐLĐN - Tập bài giảng, tập 1, XB 2014",
        date: "2026-06-20",
        time: "17:00",
        desc: "Tài liệu điều lệnh đội ngũ.",
        link: "sohoa/QUANSU/ĐLĐN/ĐLĐN (TẬP BÀI GIẢNG-TẬP 1) XB 2014.pdf"
    },
    {
        title: "ĐLĐN - Đơn vị",
        date: "2026-06-20",
        time: "16:55",
        desc: "Tài liệu điều lệnh đội ngũ.",
        link: "sohoa/QUANSU/ĐLĐN/ĐLĐN- ĐƠN VỊ.pdf"
    },
    {
        title: "ĐLĐN - TNCS STV380, STV 215",
        date: "2026-06-20",
        time: "16:50",
        desc: "Tài liệu điều lệnh đội ngũ.",
        link: "sohoa/QUANSU/ĐLĐN/ĐLĐN-TNCS STV380, STV 215.pdf"
    },
    {
        title: "Đội ngũ hỏa khí trợ chiến AGS-17, RPG-29",
        date: "2026-06-20",
        time: "16:45",
        desc: "Tài liệu điều lệnh đội ngũ.",
        link: "sohoa/QUANSU/ĐLĐN/ĐỘI NGŨ HỎA KHÍ TRỢ CHIẾN AGS-17, RPG-29.pdf"
    }
];
const hcktDocuments = [

    {
        title: "Cách nhận biết các yếu tố nguy hiểm, yếu tố có hại tại nơi làm việc",
        date: "2026-06-20",
        time: "17:00",
        desc: "An toàn lao động.",
        link: "sohoa/HAUCANKYTHUAT/ANTOANLAODONG/CÁCH NHẬN BIẾT CÁC YẾU TỐ NGUY HIỂM, YẾU TỐ CÓ HẠI TẠI NƠI LÀM VIỆC.pdf"
    },

    {
        title: "Giới thiệu tóm tắt Luật, Nghị định VSATLĐ",
        date: "2026-06-20",
        time: "16:55",
        desc: "An toàn lao động.",
        link: "sohoa/HAUCANKYTHUAT/ANTOANLAODONG/GIỚI THIỆU TÓM TẮT LUẬT, NGHỊ ĐỊNH VSATLĐ.pdf"
    },

    {
        title: "Luật An toàn, vệ sinh lao động",
        date: "2026-06-20",
        time: "16:50",
        desc: "An toàn lao động.",
        link: "sohoa/HAUCANKYTHUAT/ANTOANLAODONG/LUẬT AN TOÀN, VỆ SINH LAO ĐỘNG.pdf"
    },

    {
        title: "Một số giải pháp cải thiện điều kiện lao động",
        date: "2026-06-20",
        time: "16:45",
        desc: "An toàn lao động.",
        link: "sohoa/HAUCANKYTHUAT/ANTOANLAODONG/MỘT SỐ GIẢI PHÁP CẢI THIỆN ĐIỀU KIỆN LAO ĐỘNG.pdf"
    },

    {
        title: "Nghiệp vụ công tác ATVSLĐ ở cơ sở",
        date: "2026-06-20",
        time: "16:40",
        desc: "An toàn lao động.",
        link: "sohoa/HAUCANKYTHUAT/ANTOANLAODONG/NGHIỆP VỤ CÔNG TÁC ATVSLĐ Ở CƠ SỞ.pdf"
    },

    {
        title: "Nhận biết, đánh giá và quản lý các rủi ro tại nơi làm việc",
        date: "2026-06-20",
        time: "16:35",
        desc: "An toàn lao động.",
        link: "sohoa/HAUCANKYTHUAT/ANTOANLAODONG/NHẬN BIẾT, ĐÁNH GIÁ VÀ QUẢN LÝ CÁC RỦI RO TẠI NƠI LÀM VIỆC.pdf"
    },

    {
        title: "Tiêu chuẩn chế độ hậu cần",
        date: "2026-06-19",
        time: "17:00",
        desc: "Văn bản hậu cần.",
        link: "sohoa/HAUCANKYTHUAT/VANBANHAUCAN/tiêu chuẩn chế độ hậu cần.pdf"
    },

    {
        title: "Công tác quân nhu dã ngoại - SSCĐ",
        date: "2026-06-19",
        time: "16:55",
        desc: "Quân nhu.",
        link: "sohoa/HAUCANKYTHUAT/VANBANHAUCAN/QUANNHU/Công tác QN dã ngoại-SSCĐ.pdf"
    },

    {
        title: "Công tác tăng gia sản xuất Trung đoàn 24 năm 2026",
        date: "2026-06-19",
        time: "16:50",
        desc: "Quân nhu.",
        link: "sohoa/HAUCANKYTHUAT/VANBANHAUCAN/QUANNHU/Công tác Tăng gia sản xuất e24 năm 2026.pdf"
    },

    {
        title: "Một số rau dại ăn được ở Việt Nam",
        date: "2026-06-19",
        time: "16:45",
        desc: "Quân nhu.",
        link: "sohoa/HAUCANKYTHUAT/VANBANHAUCAN/QUANNHU/Mot so rau dai an duoc o Viet Nam.pdf"
    },

    {
        title: "Các bước thực hiện ngày kỹ thuật",
        date: "2026-06-18",
        time: "17:00",
        desc: "Văn bản kỹ thuật.",
        link: "sohoa/HAUCANKYTHUAT/VANBANKYTHUAT/Các bước thực hiện ngày kỹ thuật.pdf"
    },

    {
        title: "Hướng dẫn nội dung bảo quản vũ khí bộ binh ngày, tuần",
        date: "2026-06-18",
        time: "16:55",
        desc: "Văn bản kỹ thuật.",
        link: "sohoa/HAUCANKYTHUAT/VANBANKYTHUAT/HDND BQVKBB ngày, tuần.pdf"
    },

    {
        title: "Hướng dẫn sắp xếp tủ súng K22",
        date: "2026-06-18",
        time: "16:50",
        desc: "Văn bản kỹ thuật.",
        link: "sohoa/HAUCANKYTHUAT/VANBANKYTHUAT/Hướng dẫn sắp xếp tủ súng K22.pdf"
    },

    {
        title: "Tổ chức ngày kỹ thuật theo 1164",
        date: "2026-06-18",
        time: "16:45",
        desc: "Văn bản kỹ thuật.",
        link: "sohoa/HAUCANKYTHUAT/VANBANKYTHUAT/TO CHUC NGAY KT theo 1164.pdf"
    }

];
function renderDocumentPage(data, listId, paginationId) {
    const list = document.getElementById(listId);
    const pagination = document.getElementById(paginationId);

    if (!list || !pagination) return;

    const perPage = 10;
    let currentPage = 1;

    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    function formatDate(date) {
        return new Date(date).toLocaleDateString("vi-VN");
    }

    function render() {
        const start = (currentPage - 1) * perPage;
        const pageItems = data.slice(start, start + perPage);

        list.innerHTML = pageItems.map(item => `
            <div class="news-item-bqp">
                <h3>
                    <a href="${item.link}" target="_blank">
                        ${item.title}
                    </a>
                </h3>
                <p>${item.time} | ${formatDate(item.date)}</p>
                <span>${item.desc}</span>
            </div>
        `).join("");
    }

    function renderPagination() {
        const totalPages = Math.ceil(data.length / perPage);
        let html = "";

        html += `<button onclick="${listId}ChangePage(${Math.max(1, currentPage - 1)})">&lt;&lt;</button>`;

        for (let i = 1; i <= totalPages; i++) {
            html += `
                <button class="${i === currentPage ? "active" : ""}"
                        onclick="${listId}ChangePage(${i})">
                    ${i}
                </button>
            `;
        }

        html += `<button onclick="${listId}ChangePage(${Math.min(totalPages, currentPage + 1)})">&gt;&gt;</button>`;

        pagination.innerHTML = html;
    }

    window[listId + "ChangePage"] = function (page) {
        currentPage = page;
        render();
        renderPagination();
    };

    render();
    renderPagination();
}

renderDocumentPage(quansuDocuments, "quansuList", "quansuPagination");
renderDocumentPage(hcktDocuments, "hcktList", "hcktPagination");
