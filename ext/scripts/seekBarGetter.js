function getSeekBarElement() {
  if (window.location.hostname.includes('crunchyroll.com')) return getCrunchyrollSeekBarElement();
}

function getCrunchyrollSeekBarElement() {
  return document.getElementsByClassName("timeline-slider")[0]
}