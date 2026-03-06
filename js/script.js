// --- Карта ---
const map = L.map('map',{zoomControl:false}).setView([53.214938,63.628656],15);
const lightTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png');
const darkTiles  = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png');
lightTiles.addTo(map);

const places = [
    { coords: [53.214938, 63.628656], title: "Первое объятие", desc: "двор где впервые я лег на тебя", img:"img/obyatie.jpg" },
    { coords: [53.238607, 63.673581], title: "Первый магазин", desc: "Первая прогулка и первый магаз", video: "video/magaz.mp4" },
    { coords: [53.234998, 63.669866], title: "Двор алкашей", desc: "Там была любовь", img: "img/alkashi.jpg" },
    { coords: [53.236156, 63.668905], title: "Платье", desc: "С кайфом вышли погулять", video: "video/platbe.mp4" },
    { coords: [53.242217, 63.678673], title: "Северный отдел", desc: "Зато круто погуляли)", img: "img/otdel.jpg" },
    { coords: [53.238306, 63.680012], title: "Пенис", desc: "Ну просто пенис чё", img: "img/penis.jpg" },
    { coords: [53.235600, 63.668846], title: "Соевое мясо", desc: "Дегустация дерьма", videos: ["video/govno1.mp4", "video/govno2.mp4"] },     
    { coords: [53.238095, 63.681222], title: "Первый поцелуй", desc: "Яна смогла!!!!", img: "img/vanna.jpg" },
    { coords: [53.237554, 63.680199], title: "Дом Яны", desc: "легенда", videos: ["video/pbyanb.mp4", "video/pbyanb2.mp4"] },
    { coords: [53.197951, 63.646775], title: "Триатлон парк", desc: "ну иногда бывали", img: "img/naberezh.jpg" },
    { coords: [53.243911, 63.703028], title: "Поле", desc: "должна была быть романтика", videos: ["video/pole.mp4", "video/pole2.mp4", "video/pole3.mp4"] },
    { coords: [53.239432, 63.675057], title: "Легендарное кресло", desc: "", img: "img/kreslo.jpg" },
    { coords: [53.190893, 63.595584], title: "Кинорум", desc: "тут происходила грязь", img: "img/kinor.jpg" },   
    { coords: [53.173011, 63.613927], title: "Свадьба", desc: "первое мероприятие вместе", img: "img/svadba.jpg" },
    { coords: [53.234151, 63.674797], title: "Улица", desc: "частенько шли в ливень", videos: ["video/ulica.mp4", "video/ulica2.mp4"] },
    { coords: [53.226304, 63.636445], title: "Футбол", desc: "твои первые разы", img: "img/football.jfif" },
    { coords: [53.206241, 63.648117], title: "Набережная", desc: "ты ругалась", img: "img/rugalasb.jpg" },
    { coords: [53.238899, 63.674270], title: "Дом Вани", desc: "иногда ночевали", img: "img/moidom.jfif" },
    { coords: [53.240820, 63.679668], title: "JamBakery", desc: "бывало кушали", img: "img/jamb.jfif" }, 
    { coords: [53.228266, 63.663265], title: "11", desc: "рвало кое кого ужасно", img: "img/odinad.jfif" },
    { coords: [53.239508, 63.676813], title: "3 Школа", desc: "Яна шумела", video: "video/school.mp4" },
    { coords: [53.24001219508713, 63.614864048183016], title: "Каток", desc: "за год ниче не поменялось", videos: ["video/katok1.mp4","video/katok2.mp4"] },
    { coords: [53.241816, 63.683633], title: "Улица", desc: "часто попадали в ливень", img: "img/ulica3.jpg" },
    { coords: [53.240005, 63.680827], title: "Улица", desc: "часто попадали в ливень", img: "img/ulica4.jpg" }
];
const markerObjects = [];

// --- Маркеры ---
places.forEach(place=>{
    const icon = L.divIcon({className:'custom-div-icon', html:`<div class='heart-marker'>❤️</div>`, iconSize:[50,50], iconAnchor:[25,25]});
    let allVideos=[];
    if(place.video) allVideos.push(place.video);
    if(place.videos) allVideos.push(...place.videos);
    let videoButtons="";
    allVideos.forEach((v,i)=>{
        let label=allVideos.length>1?`ВИДЕО ${i+1}`:"СМОТРЕТЬ ВИДЕО";
        videoButtons += `<button class="video-btn" onclick="openVideo('${v}')">${label}</button>`;
    });
    let media = allVideos.length>0?"":`<img loading="lazy" src="${place.img}" onclick="openImage('${place.img}')">`;
    const popupContent=`<div class="popup-content">${media}<h3>${place.title}</h3><p>${place.desc}</p>${videoButtons}</div>`;
    const marker=L.marker(place.coords,{icon:icon}).addTo(map).bindPopup(popupContent,{className:'custom-popup', maxWidth:400, minWidth:300});
    markerObjects.push(marker);
    marker.on('click', (e) => map.flyTo(e.latlng, 16, { animate: true, duration: 1.5 }));
});

// --- Функции интерфейса ---
function openImage(src){ document.getElementById('full-res-img').src=src; document.getElementById('full-image-overlay').style.display='flex'; }
function toggleTheme(){
    const body=document.body, icon=document.getElementById('theme-icon');
    if(body.classList.contains('dark-mode')){ body.classList.remove('dark-mode'); map.removeLayer(darkTiles); lightTiles.addTo(map); icon.innerText='🌙'; }
    else{ body.classList.add('dark-mode'); map.removeLayer(lightTiles); darkTiles.addTo(map); icon.innerText='☀️'; }
}
function showSuggestions(){
    const val=document.getElementById('map-search').value.toLowerCase(), box=document.getElementById('suggestions');
    box.innerHTML=''; if(val.length<1){ box.style.display='none'; return; }
    const matches = places.filter(p=>p.title.toLowerCase().includes(val));
    if(matches.length){ box.style.display='block'; matches.forEach(m=>{ let div=document.createElement('div'); div.className='suggestion-item'; div.innerText=m.title; div.onclick=()=>{ goToPlace(m); box.style.display='none'; }; box.appendChild(div); }); }
    else box.style.display='none';
}
function goToPlace(p){
    const i=places.findIndex(x=>x.title===p.title), m=markerObjects[i];
    map.flyTo(p.coords,18,{animate:true,duration:1.5});
    document.getElementById('map-search').value='';
    setTimeout(()=>m.openPopup(),1200);
}
function openVideo(url){ document.getElementById('video-iframe').src=url; document.getElementById('video-overlay').style.display='flex'; }
function closeVideo(){ document.getElementById('video-overlay').style.display='none'; document.getElementById('video-iframe').src=''; }
function goToRandomPlace(){ const i=Math.floor(Math.random()*places.length); map.flyTo(places[i].coords,18,{animate:true,duration:1.5}); map.once('moveend',()=>markerObjects[i].openPopup()); }
map.on('click',()=>{ document.getElementById('suggestions').style.display='none'; });

// --- Анимация сердечек ---
const canvas = document.getElementById('heartCanvas'), ctx = canvas.getContext('2d');
let hearts=[];
function resize(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
window.addEventListener('resize',resize); resize();
function createHeart(){ return { x:Math.random()*canvas.width, y:canvas.height+20, size:Math.random()*15+10, speed:Math.random()*1+1, opacity:Math.random()*0.5+0.3, swing:Math.random()*0.02-0.01 }; }
function drawHeart(h){ ctx.globalAlpha=h.opacity; ctx.fillStyle='#ff4d6d'; ctx.beginPath(); let x=h.x+Math.sin(h.y*h.swing)*15, y=h.y; ctx.moveTo(x,y+h.size/4); ctx.quadraticCurveTo(x,y,x+h.size/4,y); ctx.quadraticCurveTo(x+h.size/2,y,x+h.size/2,y+h.size/4); ctx.quadraticCurveTo(x+h.size/2,y,x+h.size*3/4,y); ctx.quadraticCurveTo(x+h.size,y,x+h.size,y+h.size/4); ctx.lineTo(x+h.size/2,y+h.size); ctx.lineTo(x,y+h.size/4); ctx.fill(); }
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(hearts.length<35 && Math.random()<0.1) hearts.push(createHeart());
    hearts.forEach((h,i)=>{ h.y-=h.speed; drawHeart(h); if(h.y+h.size<0) hearts.splice(i,1); });
    requestAnimationFrame(update);
}

update();

