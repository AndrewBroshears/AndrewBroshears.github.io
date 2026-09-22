(function () {
    "use strict";

    var nav = document.querySelector(".nav-ab");
    var toggle = document.querySelector(".nav-ab__toggle");
    var menu = document.querySelector(".nav-ab__menu");
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-ab__link"));

    /* --- Sticky nav background --- */
    function onScroll() {
        if (nav) {
            nav.classList.toggle("is-stuck", window.scrollY > 24);
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* --- Mobile menu --- */
    function closeMenu() {
        if (!menu) return;
        menu.classList.remove("is-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
    }

    if (toggle && menu) {
        toggle.addEventListener("click", function () {
            var open = menu.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(open));
        });

        menu.addEventListener("click", function (e) {
            if (e.target.closest(".nav-ab__link")) closeMenu();
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeMenu();
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 860) closeMenu();
        });
    }

    /* --- Active section highlighting --- */
    var sections = links
        .map(function (link) {
            var id = (link.getAttribute("href") || "").replace("#", "");
            return id ? document.getElementById(id) : null;
        })
        .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
        var spy = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    links.forEach(function (link) {
                        link.classList.toggle(
                            "is-active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });
                });
            },
            { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
        );
        sections.forEach(function (section) {
            spy.observe(section);
        });
    }

    /* --- Scroll reveal --- */
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var revealables = document.querySelectorAll(".reveal");

    if (reduced || !("IntersectionObserver" in window)) {
        Array.prototype.forEach.call(revealables, function (el) {
            el.classList.add("is-visible");
        });
    } else {
        var revealer = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        );
        Array.prototype.forEach.call(revealables, function (el) {
            revealer.observe(el);
        });
    }

    /* --- Footer year --- */
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
})();
