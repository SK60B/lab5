// 1. Автоматичне перемикання теми та ручне перемикання
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('themeToggle');
  const modal = document.getElementById('modal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');

  openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Також закривати модальне при кліку поза формою
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });


  function setThemeByTime() {
    const hour = new Date().getHours();
    const isNight = hour < 7 || hour >= 21;
    document.body.classList.toggle('night', isNight);
    toggle.checked = isNight;
  }

  toggle.addEventListener('change', () => {
    document.body.classList.toggle('night', toggle.checked);
  });

  setThemeByTime();

  // 2. Збереження даних про систему в localStorage та виведення у футер
  const systemInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
  };

  localStorage.setItem('systemInfo', JSON.stringify(systemInfo));

  const footer = document.getElementById('footer-info');
  footer.textContent = 'Інформація про систему: ' + JSON.stringify(systemInfo, null, 2);

  // 3. Завантаження коментарів з JSONPlaceholder
  fetch('https://jsonplaceholder.typicode.com/posts/20/comments')
    .then(res => res.json())
    .then(comments => {
      const ul = document.getElementById('comments');
      comments.forEach(comment => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${comment.name}</strong> (${comment.email}):<br>${comment.body}`;
        ul.appendChild(li);
      });
    });

  // 4. Показ модального вікна через 1 хвилину
  setTimeout(() => {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }, 60000);
});