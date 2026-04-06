function setupCounter(element) {
  let counter = 0;
  const setCounter = (count) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}

window.addEventListener('load', function() {
  const popup = document.getElementById('videoPopup');
  if (!popup) return;
  setTimeout(() => {
    popup.style.display = 'flex';
  }, 1000);
  popup.addEventListener('click', function(event) {
    if (event.target === popup) {
      closePopup();
    }
  });
});

function closePopup() {
  const popup = document.getElementById('videoPopup');
  if (popup) {
    popup.style.display = 'none';
  }
}

window.closePopup = closePopup;
