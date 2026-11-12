const header = document.querySelector('.header');
const toggle = document.querySelector('.toggle');
const navigation = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width: 720px)');

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  navigation.hidden = mobile.matches && !open;
}

function syncLayout() {
  const focusInNav = navigation.contains(document.activeElement);
  const focusOnToggle = document.activeElement === toggle;
  toggle.hidden = !mobile.matches;
  setMenu(false);

  if (mobile.matches && focusInNav) toggle.focus();
  if (!mobile.matches && focusOnToggle) navigation.querySelector('a').focus();
}

header.classList.add('is-enhanced');
syncLayout();
mobile.addEventListener('change', syncLayout);

toggle.addEventListener('click', () => setMenu(navigation.hidden));

navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!mobile.matches || !link) return;

  const section = document.querySelector(link.hash);
  section.tabIndex = -1;
  section.focus({ preventScroll: true });
  setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});
