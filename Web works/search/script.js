document.getElementById('searchInput').addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let items = document.getElementById('searchList').getElementsByTagName('li');
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.textContent.toLowerCase().includes(filter)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        }
});