export async function loadBlogPosts() {
  try {
    const response = await fetch('data/blog.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const blogPosts = await response.json();

    const blogSection = document.getElementById('blog-posts');
    blogSection.innerHTML = '';

    blogPosts.slice(0, 15).forEach(post => {
      const article = document.createElement('article');
      article.classList.add('blog-card');

      article.innerHTML = `
        <h2>${post.title}</h2>
        <p class="meta">${post.date} | By ${post.author}</p>
        <p>${post.excerpt}</p>
        <a href="#" class="read-more">Read More</a>
      `;

      blogSection.appendChild(article);
    });
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
}
