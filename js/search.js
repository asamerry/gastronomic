let articles = [];

async function loadArticles() {
    const siteRoot = document.body.dataset.root;

    const response = await fetch(siteRoot + "data/articles.json");

    articles = await response.json();
}

// Defines order in which positive search matches appear
function getMatchPriority(article, query) {
    const normalizedQuery = query.toLowerCase();

    const primaryTag = article.tags[0].toLowerCase();

    const otherTags = article.tags
        .slice(1)
        .map(tag => tag.toLowerCase());


    // Exact match with primary tag
    if (primaryTag === normalizedQuery) {
        return 1;
    }

    // Partial match with primary tag
    if (primaryTag.includes(normalizedQuery)) {
        return 2;
    }

    // Exact match with another tag
    if (otherTags.includes(normalizedQuery)) {
        return 3;
    }

    // Partial match with another tag
    if (otherTags.some(tag => tag.includes(normalizedQuery))) {
        return 4;
    }

    return 5;
}

// Search all article tags to find and sort positive matches
function searchArticles(query) {
    const normalizedQuery = query.trim().toLowerCase();

    // Empty query returns nothing
    if (normalizedQuery === "") {
        return [];
    }

    // Get all positive search results
    const results = articles.filter(article =>
        article.tags.some(tag =>
            tag.toLowerCase().includes(normalizedQuery)
        )
    );

    // Sort positive search results
    results.sort((a, b) => {
        return (
            getMatchPriority(a, normalizedQuery) -
            getMatchPriority(b, normalizedQuery)
        );
    });

    return results;
}

// Display Search Results
function displaySearchResults(results) {
    const siteRoot = document.body.dataset.root;

    searchResults.innerHTML = "";

    if (results.length === 0) {
        return;
    }

    results.forEach(article => {
        const result = document.createElement("a");
        result.href = siteRoot + "articles/" + article.id + ".html";
        result.classList.add("search-result");

        const image = document.createElement("img");
        image.src = siteRoot + "images/" + article.id + "/1.jpg";
        image.classList.add("search-result-image");

        const title = document.createElement("span");
        title.textContent = article.title;
        title.classList.add("search-results-title");

        result.appendChild(image);
        result.appendChild(title);

        searchResults.appendChild(result);
    });
}

loadArticles();

const searchInput = document.querySelector(".search-input");
const searchResults = document.querySelector(".search-results");
const searchForm = document.querySelector(".search-form");

searchInput.addEventListener("input", () => {
    const results = searchArticles(searchInput.value);

    displaySearchResults(results);
});

// Enter key submits search form and redirects to first search result
searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const results = searchArticles(searchInput.value);

    if (results.length > 0) {
        const siteRoot = document.body.dataset.root;
        window.location.href = siteRoot + "articles/" + results[0].id + ".html";
    }
});