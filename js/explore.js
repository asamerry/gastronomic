function sample(array, n) {
    return [...array]
        .sort(() => Math.random() - 0.5)
        .slice(0, n);
}

async function main() {
    const response1 = await fetch("data/explore.json");
    const categories = await response1.json();

    const response2 = await fetch("data/articles.json");
    const articles = await response2.json();

    // Randomly sample categories and articles
    const selectedCategories = categories.map(group => {
        const entries = sample(Object.entries(group), 2);

        const selected = entries.map(([category, articles]) => {
            return [category, sample(articles, 3)];
        });

        return Object.fromEntries(selected);
    });

    const flatSelectedCategories = selectedCategories.flatMap(group =>
        Object.entries(group)
    );

    // Assign styles to html
    const exploreCategories = document.querySelectorAll(".explore-category");

    const order = [0, 3, 1, 4, 2, 5];
    const reorderedExploreCategories = order.map(i => exploreCategories[i]);

    reorderedExploreCategories.forEach((exploreCategory, index) => {
        const [categoryName, articleIds] = flatSelectedCategories[index];

        // Category header
        exploreCategory.querySelector(".explore-category-title").textContent = categoryName;

        // Recommendations
        const recommendations = exploreCategory.querySelectorAll(".recommendation");

        recommendations.forEach((recommendation, index) => {
            const articleId = articleIds[index];

            recommendation.href = "articles/" + articleId + ".html"
            recommendation.querySelector(".recommendation-image").src = "images/" + articleId + "/1.jpg"
            recommendation.querySelector(".recommendation-title").textContent = articles[articleId].title;
        });

    });

}

main();