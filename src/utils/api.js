// utils/api.js
const getAllStats = async (playerId) => {
    const apiUrl = "https://www.balldontlie.io/api/v1/stats";
    let allStats = [];
  
    let page = 0;
    let totalPages = 1;
  
    while (page < totalPages) {
      const response = await fetch(`${apiUrl}?page=${page + 1}&per_page=100&player_ids[]=${playerId}`);
      const data = await response.json();
  
      if (data.meta) {
        totalPages = data.meta.total_pages;
  
        if (data.data) {
          allStats = allStats.concat(data.data);
        }
      }
  
      page++;
    }
  
    return allStats;
  };
  
  export { getAllStats };
  