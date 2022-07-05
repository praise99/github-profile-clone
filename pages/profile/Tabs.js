// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
function openTab(evt, cityName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

const tabsContainer = document.getElementById("tabs");
const tabFixed = document.getElementById("tab_fixed");
window.addEventListener("scroll", () => {
  switch (true) {
    case window.innerWidth > 900:
      if (window.scrollY > 60) {
        tabsContainer.classList.add("active_scroll");
        tabFixed.classList.add("active_scroll");
      } else {
        tabsContainer.classList.remove("active_scroll");
        tabFixed.classList.remove("active_scroll");
      }
      break;
    default:
      if (window.scrollY > 430) {
        tabsContainer.classList.add("active_scroll");
        tabFixed.classList.add("active_scroll");
      } else {
        tabsContainer.classList.remove("active_scroll");
        tabFixed.classList.remove("active_scroll");
      }
  }
});

const nameFixed = document.getElementById("name-fixed");
window.addEventListener("scroll", () => {
  switch (true) {
    case window.innerWidth > 900:
      if (window.scrollY > 370) {
        nameFixed.classList.add("name-block");
      } else {
        nameFixed.classList.remove("name-block");
      }
      break;
  }
});
