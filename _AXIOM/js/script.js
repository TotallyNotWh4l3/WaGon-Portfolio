const glowContainer = document.getElementById('glow-container');

glowContainer.addEventListener('mousemove', (e) => {
  const rect = glowContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  glowContainer.style.setProperty('--mouse-x', `${x}px`);
  glowContainer.style.setProperty('--mouse-y', `${y}px`);
});

const catchPhraseContainer = document.getElementById("catchphrase-container");

catchPhraseContainer.addEventListener('mousemove', (e) => {
  const rect = catchPhraseContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  catchPhraseContainer.style.setProperty('--mouse-xx', `${x}px`);
  catchPhraseContainer.style.setProperty('--mouse-yy', `${y}px`);
});

// 