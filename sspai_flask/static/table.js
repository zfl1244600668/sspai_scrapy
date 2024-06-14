const updateInterval = 1000;

function updateTable() {
    fetch('/api/articles')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#articlesTable tbody');
            tableBody.innerHTML = '';

            data.forEach(article => {
                const row = document.createElement('tr');

                const titleCell = document.createElement('td');
                titleCell.textContent = article.title;
                row.appendChild(titleCell);

                const linkCell = document.createElement('td');
                const link = document.createElement('a');
                link.href = `https://sspai.com${article.link}`;
                link.textContent = article.link;
                linkCell.appendChild(link);
                row.appendChild(linkCell);

                const authorCell = document.createElement('td');
                authorCell.textContent = article.author;
                row.appendChild(authorCell);

                const timePostedCell = document.createElement('td');
                timePostedCell.textContent = article.time_posted;
                row.appendChild(timePostedCell);

                const chargeCountCell = document.createElement('td');
                chargeCountCell.textContent = article.charge_count;
                row.appendChild(chargeCountCell);

                const commentCountCell = document.createElement('td');
                commentCountCell.textContent = article.comment_count;
                row.appendChild(commentCountCell);

                tableBody.appendChild(row);
            });
        });
}

document.addEventListener('DOMContentLoaded', () => {
    setInterval(updateTable, updateInterval);
});