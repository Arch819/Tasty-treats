!function(){function t(t,e,r,n){Object.defineProperty(t,e,{get:r,set:n,enumerable:!0,configurable:!0})}function e(t){return t&&t.__esModule?t.default:t}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},i=r.parcelRequire07b5;null==i&&((i=function(t){if(t in n)return n[t].exports;if(t in a){var e=a[t];delete a[t];var r={id:t,exports:{}};return n[t]=r,e.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){a[t]=e},r.parcelRequire07b5=i),i.register("iE7OH",(function(e,r){var n,a;t(e.exports,"register",(function(){return n}),(function(t){return n=t})),t(e.exports,"resolve",(function(){return a}),(function(t){return a=t}));var i={};n=function(t){for(var e=Object.keys(t),r=0;r<e.length;r++)i[e[r]]=t[e[r]]},a=function(t){var e=i[t];if(null==e)throw new Error("Could not resolve bundle with id "+t);return e}})),i.register("aNJCr",(function(e,r){var n;t(e.exports,"getBundleURL",(function(){return n}),(function(t){return n=t}));var a={};function i(t){return(""+t).replace(/^((?:https?|file|ftp|(chrome|moz)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}n=function(t){var e=a[t];return e||(e=function(){try{throw new Error}catch(e){var t=(""+e.stack).match(/(https?|file|ftp|(chrome|moz)-extension):\/\/[^)\n]+/g);if(t)return i(t[2])}return"/"}(),a[t]=e),e}})),i("iE7OH").register(JSON.parse('{"i4hX4":"favorites.83be3adb.js","ee16w":"sprite.cde4e078.svg","46g4K":"elements.5eac9335.jpg","gt5lo":"favorites.349e3234.js"}'));var s,o,c,u=i("bpxeT"),l=i("2TvXO"),f=(u=i("bpxeT"),l=i("2TvXO"),u=i("bpxeT"),l=i("2TvXO"),i("dIxxU")),v=(s=e(u)(e(l).mark((function t(r){var n;return e(l).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f.default.get("".concat("https://tasty-treats-backend.p.goit.global/api/recipes/").concat(r));case 3:if(404!==(n=t.sent).status){t.next=6;break}throw new Error("Page not found error 404");case 6:return t.abrupt("return",n);case 9:throw t.prev=9,t.t0=t.catch(0),new Error("an error occurred while fetching the images from the API");case 12:case"end":return t.stop()}}),t,null,[[0,9]])}))),function(t){return s.apply(this,arguments)}),p=(o=e(u)(e(l).mark((function t(r){var n,a;return e(l).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=r.map(function(){var t=e(u)(e(l).mark((function t(r){var n;return e(l).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v(r);case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),t.next=3,Promise.all(n);case 3:return a=t.sent,t.abrupt("return",a);case 5:case"end":return t.stop()}}),t)}))),function(t){return o.apply(this,arguments)});c=i("aNJCr").getBundleURL("i4hX4")+i("iE7OH").resolve("ee16w");var d,g=function(t){return"<div class='favorites__rating'>\n              <div class=\"favorites__rating-body\">\n                <div class=\"favorites__rating-active\"><div class='favorites__cards-rating'>".concat(t,"</div>").concat(function(t){for(var r=Math.round(t),n='<svg class="favorites__star-active"><use href="'.concat(e(c),'#icon-star"></use></svg>'),a='<svg class="favorites__star-notActive"><use href="'.concat(e(c),'#icon-star-grey"></use></svg>'),i=[],s=1;s<=5;s+=1)i.push(s>r?a:n);return i.join("")}(t),'</div>\n                <div class="favorites__rating-items">\n                  <input type="radio" class="favorites__rating-item" value="1" name="rating">\n                  <input type="radio" class="favorites__rating-item" value="2" name="rating">\n                  <input type="radio" class="favorites__rating-item" value="3" name="rating">\n                  <input type="radio" class="favorites__rating-item" value="4" name="rating">\n                  <input type="radio" class="favorites__rating-item" value="5" name="rating">\n                </div>\n              </div>\n  \n    </div>')},_=function(t){var r;return(r=t,r.map((function(t){var r=t.data;return'\n        <li class="favorites__cards-item">\n        <button type="button" id="#'.concat(r._id,'" class="icon-button" data-category="').concat(r.category,'"><svg class="favorites__heart heart-isActive"><use href="').concat(e(c),'#icon-heart"></use></svg></button>\n          <img src="').concat(r.preview,'" alt="').concat(r.title,'" width="335">\n          <div class="favorites__cards-thumb">\n            <h2 class="favorites__cards-title">').concat(r.title,'</h2>\n            <p class="favorites__cards-text">').concat(r.description,'</p>\n            <div class="favorites__rating-thumb">\n              ').concat(g(r.rating),'\n              <button class="favorites__cards-btn">See recipe</button>\n            </div>\n          </div>\n        </li>')}))).join("")},b=function(t){return function(t){var e=[],r=!0,n=!1,a=void 0;try{for(var i,s=t[Symbol.iterator]();!(r=(i=s.next()).done);r=!0){var o=i.value;e.includes(o)||e.push(o)}}catch(t){n=!0,a=t}finally{try{r||null==s.return||s.return()}finally{if(n)throw a}}var c=e.map((function(t){return'<li><button type="button" class="favorites__filter-btn">'.concat(t,"</button></li>")}));return c.unshift('<li><button type="button" class="favorites__filter-btn favorites__active-btn">All categories</button></li>'),c}(t).join("")},h=function(){var t=e(u)(e(l).mark((function t(r){var n,a,i;return e(l).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,p(r.map((function(t){return t.id})));case 3:return n=t.sent,a=n.map((function(t){return t.data.category})),i=b(a),t.abrupt("return",i);case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}(),y=function(){var t=e(u)(e(l).mark((function t(r,n,a){var i,s,o,c,u;return e(l).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,p(r.map((function(t){return t.id})));case 3:return i=t.sent,o=(s=(n-1)*a)+a,c=i.slice(s,o),u=_(c),t.abrupt("return",u);case 11:t.prev=11,t.t0=t.catch(0),console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e,r,n){return t.apply(this,arguments)}}();d=i("aNJCr").getBundleURL("i4hX4")+i("iE7OH").resolve("46g4K");var m=function(){return'\n    <img src="'.concat(e(d),'" class="favorites__empty-img" alt="chef\'s hat">\n    <p class="favorites__text">').concat("It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.","</p>")},x=function(t){return JSON.parse(localStorage.getItem(t))},w=(u=i("bpxeT"),l=i("2TvXO"),document.querySelector(".favorites__empty")),k=(document.querySelector(".favorites__img"),document.querySelector(".favorites__list-filter")),S=document.querySelector(".favorites__list-cards"),H=document.querySelector(".pagination-bar"),L=(document.querySelector(".favorites__list-cards-thumb"),function(t){for(var e=[],r=1;r<=t;r+=1)e.push(T(r));return e}),T=function(t){return'<div class="pag-btn-block pag-btn-block-container"><button id="pag-btn-1" class="pag-btn-white pag-btn-number" type="button" aria-label="page 1">'.concat(t,"</button></div>")},E=12,O=1,j=function(t){if(t.classList.contains("favorites__filter-btn")){var e=document.querySelector(".favorites__filter-btn.favorites__active-btn");e&&e.classList.remove("favorites__active-btn"),t.classList.add("favorites__active-btn")}},M=function(){var t=e(u)(e(l).mark((function t(r){var n,a,i,s,o,c,u;return e(l).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.target,j(n),a=x("favorites"),"All categories"!==n.textContent){t.next=12;break}return O=1,i=Math.ceil(a.length/E),q(i),t.next=9,y(a,O,E);case 9:return s=t.sent,S.innerHTML=s,t.abrupt("return");case 12:if(0===(o=a.filter((function(t){return t.category===n.textContent}))).length){t.next=24;break}return O=1,c=Math.ceil(o.length/E),q(c),t.next=19,y(o,O,E);case 19:u=t.sent,S.style.justifyContent="start",S.innerHTML=u,t.next=25;break;case 24:S.style.justifyContent="center",S.innerHTML='<li class="favorites__list-cards-thumb">'.concat(m(),"</li>");case 25:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),q=function(t){if(1!==t){var e=L(t);H.firstElementChild.innerHTML=e.join(""),H.style.display="flex"}else H.style.display="none"},A=(function(){var t=e(u)(e(l).mark((function t(r){var n,a;return e(l).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!r.target.classList.contains("pag-btn-number")){t.next=8;break}return O=Number(r.target.textContent),n=x("favorites"),console.log(n),t.next=6,y(n,O,E);case 6:a=t.sent,S.innerHTML=a;case 8:case"end":return t.stop()}}),t)})))}(),function(t){var e=t.target.closest(".icon-button");if(e){var r=e.id.slice(1),n=e.getAttribute("data-category"),a=x("favorites"),i=[];a&&(i=a);var s=i.findIndex((function(t){return t.id===r}));-1!==s?i.splice(s,1):i.push({id:r,category:n}),localStorage.setItem("favorites",JSON.stringify(i)),e.querySelector(".favorites__heart").classList.toggle("heart-isActive")}}),C=function(){var t=e(u)(e(l).mark((function t(){var r,n,a,i,s,o;return e(l).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=x("favorites"),H.style.display="none",r&&0!==r.length){t.next=5;break}return(e=w).classList.add("empty"),e.insertAdjacentHTML("beforeend",m()),t.abrupt("return");case 5:return t.next=7,h(r);case 7:return n=t.sent,t.next=10,y(r,1,12);case 10:a=t.sent,k.innerHTML=n,S.innerHTML=a,i=document.querySelector(".favorites__list-cards"),(s=r.length)<12?H.style.display="none":(o=L(s),document.querySelector(".pagination-bar").firstElementChild.insertAdjacentHTML("beforeend",o.join("")),H.style.display="flex"),i.addEventListener("click",A),document.querySelector(".favorites__list-filter").addEventListener("click",M);case 19:case"end":return t.stop()}var e}),t)})));return function(){return t.apply(this,arguments)}}();C()}();
//# sourceMappingURL=favorites.83be3adb.js.map