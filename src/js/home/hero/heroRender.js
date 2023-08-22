export function eventRender(event) {
    return event.map(({ cook, topic: { name, area, previewWebpUrl, imgWebpUrl }, _id }) => {
        return `<div class="swiper-slide" >
    <div class="event">
     
        <div class="img-item cook-img" style="background-image: url(${cook.imgWebpUrl})"></div>
        <div class="img-item preview-img" >
        <div class="preview-deash" style="background-image: url(${previewWebpUrl})"></div>
            <h2 class="el-title">${name}</h2>
            <p class="el-text">${area}</p>
        </div>
        <div class="img-item delish-img" style="
        background-image: url(${imgWebpUrl}); 
        background-size: cover;
        background-position: center center 10%"
        >
        </div>
    
    </div>
  
 
</div>`
    }).join('');
}
