document.addEventListener("DOMContentLoaded", () => {

    console.log("Cổng thông tin nội bộ đã khởi động");

    /* Hiệu ứng card */
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => {

            card.style.boxShadow = "0 0 20px rgba(0,102,204,.4)";

            setTimeout(() => {
                card.style.boxShadow = "0 2px 10px rgba(0,0,0,.08)";
            }, 300);

        });
    });

    /* Menu hamburger */

    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");

    if (hamburger && menu) {

        hamburger.addEventListener("click", () => {

            hamburger.classList.toggle("active");
            menu.classList.toggle("active");

        });

    }

    /* Mega menu mobile */

    const megaLinks = document.querySelectorAll(".mega > a");

    megaLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            if (window.innerWidth <= 768) {

                e.preventDefault();

                const parent = this.parentElement;

                document.querySelectorAll(".mega").forEach(item => {

                    if (item !== parent) {
                        item.classList.remove("active");
                    }

                });

                parent.classList.toggle("active");

            }

        });

    });

    /* Menu cấp 2 */

    const subLinks = document.querySelectorAll(".submenu-item > a");

    subLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            if (window.innerWidth <= 768) {

                const submenu =
                    this.parentElement.querySelector(".submenu-level2");

                if (!submenu) return;

                e.preventDefault();

                document
                    .querySelectorAll(".submenu-level2")
                    .forEach(item => {

                        if (item !== submenu) {
                            item.style.display = "none";
                        }

                    });

                submenu.style.display =
                    submenu.style.display === "block"
                        ? "none"
                        : "block";

            }

        });

    });

    /* Đóng menu khi chuyển sang desktop */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            if (menu) menu.classList.remove("active");
            if (hamburger) hamburger.classList.remove("active");

            document
                .querySelectorAll(".mega")
                .forEach(item => item.classList.remove("active"));

            document
                .querySelectorAll(".submenu-level2")
                .forEach(item => item.style.display = "");

        }

    });

});
