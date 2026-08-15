/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (navMenu.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* =========================================
   DARK / LIGHT MODE
========================================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("chronicleTheme");

if (savedTheme === "light") {

    document.body.classList.add("light");

}

function updateThemeIcon() {

    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("light")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

}

updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const isLight =
            document.body.classList.contains("light");

        localStorage.setItem(
            "chronicleTheme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon();

    });

}


/* =========================================
   SEARCH PANEL
========================================= */

const searchToggle =
    document.getElementById("searchToggle");

const searchPanel =
    document.getElementById("searchPanel");

const closeSearch =
    document.getElementById("closeSearch");

if (searchToggle && searchPanel) {

    searchToggle.addEventListener("click", () => {

        searchPanel.classList.toggle("show");

        const input =
            document.getElementById("globalSearch");

        if (searchPanel.classList.contains("show") && input) {

            input.focus();

        }

    });

}

if (closeSearch) {

    closeSearch.addEventListener("click", () => {

        searchPanel.classList.remove("show");

    });

}


/* =========================================
   ARTICLE SEARCH
========================================= */

const articleSearch =
    document.getElementById("articleSearch");

const categoryFilter =
    document.getElementById("categoryFilter");

const articleList =
    document.getElementById("articleList");

const noResults =
    document.getElementById("noResults");


function filterArticles() {

    if (!articleList) return;

    const searchValue =
        articleSearch ?
        articleSearch.value.toLowerCase().trim() :
        "";

    const categoryValue =
        categoryFilter ?
        categoryFilter.value :
        "all";

    const articles =
        articleList.querySelectorAll(".searchable");

    let visibleCount = 0;

    articles.forEach(article => {

        const title =
            article.dataset.title.toLowerCase();

        const category =
            article.dataset.category;

        const matchesSearch =
            title.includes(searchValue);

        const matchesCategory =
            categoryValue === "all" ||
            category === categoryValue;

        if (matchesSearch && matchesCategory) {

            article.style.display = "";

            visibleCount++;

        } else {

            article.style.display = "none";

        }

    });

    if (noResults) {

        noResults.style.display =
            visibleCount === 0 ? "block" : "none";

    }

}


if (articleSearch) {

    articleSearch.addEventListener(
        "input",
        filterArticles
    );

}

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterArticles
    );

}


/* =========================================
   BOOKMARKS
========================================= */

const bookmarkButtons =
    document.querySelectorAll(".bookmark-btn");


function getBookmarks() {

    try {

        return JSON.parse(
            localStorage.getItem("chronicleBookmarks")
        ) || [];

    } catch {

        return [];

    }

}


function saveBookmarks(bookmarks) {

    localStorage.setItem(
        "chronicleBookmarks",
        JSON.stringify(bookmarks)
    );

}


function updateBookmarkButton(button) {

    const id =
        button.dataset.bookmark;

    if (!id) return;

    const bookmarks =
        getBookmarks();

    const icon =
        button.querySelector("i");

    if (bookmarks.includes(id)) {

        button.classList.add("saved");

        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");

    } else {

        button.classList.remove("saved");

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");

    }

}


bookmarkButtons.forEach(button => {

    updateBookmarkButton(button);

    button.addEventListener("click", event => {

        event.preventDefault();
        event.stopPropagation();

        const id =
            button.dataset.bookmark ||
            "article-" +
            Math.random().toString(36).substring(2);

        button.dataset.bookmark = id;

        let bookmarks =
            getBookmarks();

        if (bookmarks.includes(id)) {

            bookmarks =
                bookmarks.filter(
                    bookmark => bookmark !== id
                );

        } else {

            bookmarks.push(id);

        }

        saveBookmarks(bookmarks);

        updateBookmarkButton(button);

    });

});


/* =========================================
   NEWSLETTER
========================================= */

const newsletterForm =
    document.getElementById("newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const email =
                newsletterForm
                .querySelector("input")
                .value;

            if (!email) return;

            alert(
                "Thank you for subscribing to ChronicleX!"
            );

            newsletterForm.reset();

        }
    );

}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            alert(
                "Thank you! Your message has been received."
            );

            contactForm.reset();

        }
    );

}


/* =========================================
   GOOGLE LOGIN PLACEHOLDER
========================================= */

const googleLogin =
    document.getElementById("googleLogin");

if (googleLogin) {

    googleLogin.addEventListener(
        "click",
        () => {

            alert(
                "Google Login will be connected when the backend and authentication system are added."
            );

        }
    );

}


/* =========================================
   COPY ARTICLE LINK
========================================= */

const copyButtons =
    document.querySelectorAll(
        ".article-share button"
    );

copyButtons.forEach(button => {

    const icon =
        button.querySelector("i");

    if (
        icon &&
        icon.classList.contains("fa-link")
    ) {

        button.addEventListener(
            "click",
            async () => {

                try {

                    await navigator.clipboard.writeText(
                        window.location.href
                    );

                    alert(
                        "Article link copied!"
                    );

                } catch {

                    alert(
                        "Unable to copy the link."
                    );

                }

            }
        );

    }

});


/* =========================================
   READING PROGRESS BAR
========================================= */

const progressBar =
    document.createElement("div");

progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "3px";
progressBar.style.width = "0%";
progressBar.style.background = "#d5a84f";
progressBar.style.zIndex = "9999";

document.body.appendChild(progressBar);


window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progressBar.style.width =
        progress + "%";

});