var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},t=e.parcelRequire07b5;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){r[e]=n},e.parcelRequire07b5=t);var i=t("2shzp");const o=document.querySelector(".popular-recipes-card");function l(){i.default.get("https://tasty-treats-backend.p.goit.global/api/recipes/popular").then((e=>{const n=e.data,r=window.innerWidth<768?2:4,t=n.slice(0,r),i=t.map((e=>{return`\n    <ul class="popular-recipe-list list">\n      <li class="popular-recipe-item">\n        <div class="popular-recipe-card">\n          <img class="popular-card-image" src="${e.preview}" alt="${e.title}">\n          <div class="popular-card-content">\n            <h3 class="popular-card-heading">${n=e.title,n.length>15?n.slice(0,15)+"...":n}</h3>\n            <p class="popular-card-description">${s(e.description)}</p>\n          </div>\n        </div>\n      </li>\n    </ul>\n`;var n})).join("");o.innerHTML=i})).catch((e=>{console.error("Error fetching popular recipes:",e)}))}window.addEventListener("resize",l),l();const a=document.querySelectorAll(".card-description");let c=80;function d(){c=window.innerWidth<768?110:80,a.forEach((e=>{const n=e.textContent;e.textContent=s(n)}))}function s(e){return e.length>c?e.slice(0,c)+"...":e}window.addEventListener("DOMContentLoaded",d),window.addEventListener("resize",d);
//# sourceMappingURL=index.7622611f.js.map