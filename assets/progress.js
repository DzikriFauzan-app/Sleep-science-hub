document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.getElementById("reading-progress");
  if (progressBar) {
    window.addEventListener("scroll", function () {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + "%";
    });
  }
});
