const root = document.documentElement;
const progress = document.querySelector('#progress');
const dialog = document.querySelector('#siteMenu');
const openButton = document.querySelector('#menuOpen');
const closeButton = document.querySelector('#menuClose');
const stillnessButton = document.querySelector('#stillnessToggle');
const skipLink = document.querySelector('.skip-link');
const enquiryDialog = document.querySelector('#enquiryDialog');
const enquiryForm = document.querySelector('#enquiryForm');
const sections = [...document.querySelectorAll('.chapter')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function updateJourney() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const amount = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
  root.style.setProperty('--journey', amount.toFixed(3));
  progress.style.height = `${amount * 100}%`;
}

function setStillness(enabled) {
  document.body.classList.toggle('stillness', enabled);
  stillnessButton.setAttribute('aria-pressed', String(enabled));
  stillnessButton.innerHTML = enabled
    ? 'Disable stillness mode <b>◌</b>'
    : 'Enable stillness mode <b>◌</b>';
  updateJourney();
}

openButton.addEventListener('click', () => dialog.showModal());
closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.querySelectorAll('.menu-links a, .menu-top .wordmark').forEach((link) => {
  link.addEventListener('click', () => dialog.close());
});
stillnessButton.addEventListener('click', () => {
  setStillness(stillnessButton.getAttribute('aria-pressed') !== 'true');
  dialog.close();
});
skipLink.addEventListener('click', () => setStillness(true));
window.addEventListener('scroll', updateJourney, { passive: true });
window.addEventListener('resize', updateJourney);

document.querySelector('#enquireOpen').addEventListener('click', () => enquiryDialog.showModal());
document.querySelector('#enquiryClose').addEventListener('click', () => enquiryDialog.close());
enquiryDialog.addEventListener('click', (event) => {
  if (event.target === enquiryDialog) enquiryDialog.close();
});
enquiryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(enquiryForm);
  const subject = `SERRA enquiry from ${formData.get('name')}`;
  const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`;
  window.location.href = `mailto:thunderatexnew@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

if (reduceMotion.matches) setStillness(true);
updateJourney();
