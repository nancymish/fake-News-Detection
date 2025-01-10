document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchTerm').value.trim();
  
    if (searchTerm === '') {
      alert('Please enter a search term!');
      return;
    }
  
    fetchNews(searchTerm);
  });
  
  async function fetchNews(query) {
    const apiKey = '13e24219bddc4b78a27f3b0843c65f4c'; 
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();

      if (data.articles && data.articles.length > 0) {
        displayNews(data.articles);  
      } else {
       
        document.getElementById('articles').innerHTML = `
          <p>No news found related to "${query}". Please try a different keyword.</p>
        `;
      }
    } catch (error) {
      console.error('Error fetching the news:', error);
      document.getElementById('articles').innerHTML = `
        <p>There was an error fetching the news. Please try again later.</p>
      `;
    }
  }
  
  function displayNews(articles) {
    const articlesContainer = document.getElementById('articles');
    articlesContainer.innerHTML = ''; 
    
    articles.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('news-item');
  
      articleElement.innerHTML = `
        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
        <p>${article.description || 'No description available.'}</p>
        <small>Published on: ${new Date(article.publishedAt).toLocaleString()}</small>
      `;
  
      articlesContainer.appendChild(articleElement);
    });
  }
  