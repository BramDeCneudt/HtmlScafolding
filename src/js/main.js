document.getElementById("hamburgermenu").onclick = function toggleNavMenu() {
  let horizontalMenu = document.getElementById("horizontalmenu");
  horizontalMenu.classList.toggle('display-on-small');
}

let hamburgerMenuItems = document.querySelectorAll('.hb')
hamburgerMenuItems.forEach(function (hamburgerItem) {

  hamburgerItem.addEventListener('click', function () {
    document.getElementById("horizontalmenu").classList.toggle('display-on-small');
  })
})