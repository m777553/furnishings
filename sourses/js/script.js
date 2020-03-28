var menuButton = document.querySelector(".contacts__button-menu");
var menuCloseButton = document.querySelector(".menu__close-button");
var menu = document.querySelector(".menu");

menu.classList.remove("menu--nojs");
menu.classList.remove("menu--opened");
menu.classList.add("menu--closed");

menuButton.addEventListener("click", function (evt) {
	evt.preventDefault();
	menu.classList.remove("menu--closed");
	menu.classList.add("menu--opend");
});

menuCloseButton.addEventListener("click", function(evt) {
	menu.classList.remove("menu--opened");
	menu.classList.add("menu--closed");
});
