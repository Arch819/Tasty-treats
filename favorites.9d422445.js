function e(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},i=r.parcelRequire07b5;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},r.parcelRequire07b5=i),i.register("kyEFX",(function(t,r){var n,o;e(t.exports,"register",(function(){return n}),(function(e){return n=e})),e(t.exports,"resolve",(function(){return o}),(function(e){return o=e}));var i={};n=function(e){for(var t=Object.keys(e),r=0;r<t.length;r++)i[t[r]]=e[t[r]]},o=function(e){var t=i[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),i("kyEFX").register(JSON.parse('{"5ZPII":"favorites.9d422445.js","6vWST":"elements.5eac9335.jpg"}'));const s=document.querySelector(".open-modal-button"),u=document.querySelector(".mobile-menu"),c=(document.querySelector(".mobile-menu-content"),document.querySelector(".close-modal-button"));document.querySelector(".mobile-menu input");function l(){u.classList.toggle("is-hidden")}s.addEventListener("click",l),c.addEventListener("click",l),u.addEventListener("click",(e=>{e.target.closest(".mobile-menu-content")||l()}));document.querySelector(".svg-list"),document.querySelector(".switch"),window.matchMedia("(min-width: 768px)");var a;a=new URL(i("kyEFX").resolve("6vWST"),import.meta.url).toString();const d=e=>{e.classList.add("empty"),e.innerHTML=`<div class="favorites__empty">\n  <div class="favorites__img"></div>\n    <img src="${t(a)}" alt="chef's hat">\n    <p class="favorites__text">It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.</p></div>`},f=document.querySelector(".favorites__wrap");console.log(f);localStorage.getItem("setting")||d(f);
//# sourceMappingURL=favorites.9d422445.js.map
