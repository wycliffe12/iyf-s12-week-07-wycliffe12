// DAY 1: THEME PERSISTENCE

const themeButton = document.getElementById("theme-toggle");

function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("week7-theme", theme);
}

const savedTheme = localStorage.getItem("week7-theme") || "light";
applyTheme(savedTheme);

themeButton.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark") ? "light" : "dark";

    applyTheme(newTheme);
});

// DAY 2: RECENT SEARCHES

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchHistory = document.getElementById("search-history");
const searchResult = document.getElementById("search-result");

function getSearches() {
    try {
        const searches = JSON.parse(localStorage.getItem("recent-searches"));
        return Array.isArray(searches) ? searches.filter((item) => typeof item === "string") : [];
    } catch {
        return [];
    }
}

let searches = getSearches();

function renderSearchHistory() {
    searchHistory.replaceChildren();

    searches.forEach((search) => {
        const item = document.createElement("li");
        const button = document.createElement("button");

        button.textContent = search;
        button.addEventListener("click", () => performSearch(search));

        item.appendChild(button);
        searchHistory.appendChild(item);
    });
}

function performSearch(search) {
    const trimmedSearch = search.trim();

    if (!trimmedSearch) {
        return;
    }

    searches = [trimmedSearch, ...searches.filter((item) => item !== trimmedSearch)].slice(0, 5);

    localStorage.setItem("recent-searches", JSON.stringify(searches));

    searchResult.textContent = `You searched for: ${trimmedSearch}`;
    renderSearchHistory();
}

searchButton.addEventListener("click", () => {
    performSearch(searchInput.value);
    searchInput.value = "";
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});

renderSearchHistory();

// DAY 3: FORM AUTO-SAVE

const form = document.getElementById("autosave-form");
const saveStatus = document.getElementById("save-status");
const FORM_KEY = "week7-autosave";

function saveForm() {
    const formData = Object.fromEntries(new FormData(form).entries());

    try {
        localStorage.setItem(FORM_KEY, JSON.stringify(formData));
        saveStatus.textContent = "Form automatically saved.";
    } catch {
        saveStatus.textContent = "Unable to save form data.";
    }
}

function recoverForm() {
    try {
        const savedData = JSON.parse(localStorage.getItem(FORM_KEY));

        if (!savedData || typeof savedData !== "object") {
            return;
        }

        Object.entries(savedData).forEach(([name, value]) => {
            if (typeof value !== "string") {
                return;
            }

            const field = form.elements.namedItem(name);
            if (field) {
                field.value = value;
            }
        });

        saveStatus.textContent = "Previous form data recovered.";
    } catch {
        saveStatus.textContent = "No valid saved form data found.";
    }
}

recoverForm();

const autosaveInterval = setInterval(saveForm, 5000);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearInterval(autosaveInterval);
    localStorage.removeItem(FORM_KEY);
    form.reset();
    saveStatus.textContent = "Form submitted successfully. Saved data cleared.";
});
