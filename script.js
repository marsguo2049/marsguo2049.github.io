'use strict';
const app=document.querySelector('.app-shell');
const slides=[...document.querySelectorAll('[data-slide]')];
const backdrops=[...document.querySelectorAll('[data-backdrop]')];
const sceneButtons=[...document.querySelectorAll('[data-scene-target]')];
const catalog=document.querySelector('.project-catalog');
const menu=document.querySelector('.mobile-menu');
const videoDialog=document.querySelector('.video-dialog');
const search=document.querySelector('#project-search');
const motion=document.querySelector('.motion-toggle');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
const ids=slides.map(s=>s.id);
let activeScene=0, touchStart=null, sceneRequest=0, lastFocus=null;
function stored(key,fallback){try{return localStorage.getItem(key)||fallback}catch{return fallback}}
function remember(key,value){try{localStorage.setItem(key,value)}catch{}}
let language=stored('portfolio-language',navigator.language.toLowerCase().startsWith('zh')?'zh':'en');
let paused=stored('portfolio-motion','running')==='paused';

function refreshMotion(){
  app.classList.toggle('motion-paused',paused||reduceMotion.matches);
  motion.setAttribute('aria-pressed',String(paused));
  motion.textContent=language==='zh'?(paused?'继续动效':'暂停动效'):(paused?'Resume motion':'Pause motion');
  motion.setAttribute('aria-label',motion.textContent);
  syncWeather();

}
function setLanguage(next){
  language=next==='zh'?'zh':'en';document.documentElement.lang=language==='zh'?'zh-CN':'en';
  document.querySelectorAll('[data-i18n]').forEach(e=>{e.textContent=e.dataset[language]??e.textContent});
  document.querySelectorAll('.lang-toggle').forEach(b=>{b.textContent=language==='zh'?'EN':'中文';b.setAttribute('aria-label',language==='zh'?'切换到英文':'Switch to Chinese')});
  document.querySelectorAll('a').forEach(a=>{
    const path=a.getAttribute('href');
    if(/^autonomous-lab\/(aor\/)?index(\.en)?\.html$/.test(path||''))a.setAttribute('href',path.replace(/index(\.en)?\.html/,language==='en'?'index.en.html':'index.html'));
  });
  catalog.setAttribute('aria-label',language==='zh'?'全部项目':'All projects');
  search.setAttribute('aria-label',language==='zh'?'查找项目':'Find a project');
  document.querySelector('.catalog-close').setAttribute('aria-label',language==='zh'?'关闭项目目录':'Close projects');
  document.querySelector('.menu-toggle').setAttribute('aria-label',language==='zh'?'打开菜单':'Open menu');
  document.querySelector('.menu-close').setAttribute('aria-label',language==='zh'?'关闭菜单':'Close menu');
  document.querySelector('.skip-link').textContent=language==='zh'?'跳到正文':'Skip to content';
  document.querySelector('.video-start').setAttribute('aria-label',language==='zh'?'播放仿真视频':'Play simulation video');
  document.title='Mars Guo · 2049';
  document.querySelectorAll('.shelf-prev').forEach(b=>b.setAttribute('aria-label',language==='zh'?'上一组项目':'Previous projects'));
  document.querySelectorAll('.shelf-next').forEach(b=>b.setAttribute('aria-label',language==='zh'?'下一组项目':'Next projects'));
  document.querySelector('.video-close').setAttribute('aria-label',language==='zh'?'关闭视频':'Close video');
  document.querySelector('meta[name=description]').content=language==='zh'?'Mars Guo 的四个探索窗口：科研工具、本地 AI、City2049 与无人实验室。':'Four windows into Mars Guo’s work: research tools, local AI, City2049 and autonomous systems.';
  remember('portfolio-language',language);refreshMotion();filterProjects();
}
function loadArt(index){
  return Promise.all([...backdrops[index].querySelectorAll('img'),document.querySelector('.desk-props[data-props="'+index+'"]')].map(image=>{
    if(image.dataset.src){image.srcset=image.dataset.srcset;image.src=image.dataset.src;delete image.dataset.src;delete image.dataset.srcset}
    return image.decode().catch(()=>{});
  }));
}
async function setScene(index,updateHash=true){
  const next=Number(index);if(!Number.isInteger(next)||next<0||next>=slides.length)return;
  const request=++sceneRequest;
  // Keep the current scene visible until the requested image can be painted.
  await loadArt(next);if(request!==sceneRequest)return;
  document.querySelectorAll('video').forEach(v=>v.pause());
  if(videoDialog.open)videoDialog.close();
  activeScene=next;app.dataset.active=String(next);
  syncWeather();
  slides.forEach((s,i)=>{const active=i===next;s.classList.toggle('is-active',active);s.inert=!active;s.setAttribute('aria-hidden',String(!active));if(active)s.scrollTop=0});
  backdrops.forEach((b,i)=>b.classList.toggle('is-active',i===next));
  sceneButtons.forEach(b=>{const active=Number(b.dataset.sceneTarget)===next;b.classList.toggle('is-active',active);if(b.closest('.scene-switcher')){if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')}});
  document.querySelector('#scene-counter').textContent=String(next+1).padStart(2,'0');
  slides[next].querySelectorAll('video').forEach(v=>{if(v.dataset.poster){v.poster=v.dataset.poster;delete v.dataset.poster}});
  if(updateHash)history.replaceState(null,'','#'+ids[next]);
  if(menu.open)menu.close();

}
function filterProjects(){
  const q=search.value.trim().toLocaleLowerCase();let total=0;
  catalog.querySelectorAll('.catalog-group').forEach(group=>{let count=0;group.querySelectorAll('.catalog-card').forEach(card=>{const words=card.textContent+' '+[...card.querySelectorAll('[data-i18n]')].map(e=>e.dataset.en+' '+e.dataset.zh).join(' ');const match=!q||words.toLocaleLowerCase().includes(q);card.hidden=!match;if(match)count++});group.hidden=count===0;total+=count});
  catalog.querySelector('.search-empty').hidden=total>0;
}
function openCatalog(group,project){
  if(menu.open)menu.close();lastFocus=document.activeElement;search.value=project||'';filterProjects();catalog.showModal();
  const target=catalog.querySelector('[data-catalog-group="'+group+'"]');
  catalog.querySelector('.catalog-scroll').scrollTop=target?target.offsetTop-catalog.querySelector('.catalog-scroll').offsetTop:0;
  search.focus({preventScroll:true});
}
document.querySelectorAll('.catalog-trigger').forEach(b=>b.addEventListener('click',()=>openCatalog(b.dataset.group,b.dataset.project)));
document.querySelector('.catalog-close').addEventListener('click',()=>catalog.close());
catalog.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();catalog.close()}});
catalog.addEventListener('close',()=>{if(lastFocus?.isConnected&&!lastFocus.closest('[inert]'))lastFocus.focus({preventScroll:true})});
for(const dialog of [catalog,menu,videoDialog])dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.querySelector('.menu-toggle').addEventListener('click',()=>menu.showModal());
document.querySelector('.menu-close').addEventListener('click',()=>menu.close());
document.querySelectorAll('.lang-toggle').forEach(b=>b.addEventListener('click',()=>setLanguage(language==='zh'?'en':'zh')));
sceneButtons.forEach(b=>b.addEventListener('click',()=>setScene(b.dataset.sceneTarget)));
document.querySelectorAll('.shelf-link').forEach(b=>b.addEventListener('click',()=>{const shelf=b.closest('.slide').querySelector('.project-shelf');shelf.scrollIntoView({block:'start',behavior:reduceMotion.matches?'instant':'smooth'});shelf.querySelector('.project-tile').focus({preventScroll:true})}));
search.addEventListener('input',filterProjects);
motion.addEventListener('click',()=>{paused=!paused;remember('portfolio-motion',paused?'paused':'running');refreshMotion()});
document.querySelector('.video-start').addEventListener('click',async e=>{
  const button=e.currentTarget,video=document.querySelector('video'),source=video.querySelector('source');
  button.disabled=true;
  if(source.dataset.src){source.src=source.dataset.src;delete source.dataset.src;video.load()}
  try{await video.play();button.hidden=true;button.disabled=false;video.parentElement.classList.add('started')}
  catch{button.disabled=false;button.textContent=language==='zh'?'重试':'Retry'}
});
document.querySelector('.video-open').addEventListener('click',()=>{const video=videoDialog.querySelector('video');if(video.dataset.poster){video.poster=video.dataset.poster;delete video.dataset.poster}videoDialog.showModal();document.querySelector('.video-start').click()});
document.querySelector('.video-close').addEventListener('click',()=>videoDialog.close());
videoDialog.addEventListener('close',()=>videoDialog.querySelector('video').pause());
reduceMotion.addEventListener('change',refreshMotion);
document.addEventListener('keydown',e=>{
  if(catalog.open||menu.open||videoDialog.open||e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,textarea,select,video,[contenteditable]'))return;
  if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();setScene((activeScene+(e.key==='ArrowRight'?1:3))%4)}
  else if(/^[1-4]$/.test(e.key))setScene(Number(e.key)-1);
});
app.addEventListener('touchstart',e=>{if(catalog.open||menu.open||videoDialog.open||e.target.closest('video,button,a,input'))return;const t=e.changedTouches[0];touchStart={x:t.screenX,y:t.screenY}},{passive:true});
app.addEventListener('touchend',e=>{if(!touchStart)return;const t=e.changedTouches[0],dx=t.screenX-touchStart.x,dy=t.screenY-touchStart.y;touchStart=null;if(!catalog.open&&!menu.open&&!videoDialog.open&&Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.6)setScene((activeScene+(dx<0?1:3))%4)},{passive:true});
window.addEventListener('hashchange',()=>{const index=ids.indexOf(location.hash.slice(1));if(index>=0)setScene(index,false)});
document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause());app.classList.toggle('page-hidden',document.hidden);syncWeather()});
const pointer={x:0,y:0};
app.addEventListener('pointermove',e=>{
  if(e.pointerType!=='mouse'||paused||reduceMotion.matches)return;
  app.style.setProperty('--px',(e.clientX/innerWidth-.5)*14+'px');
  app.style.setProperty('--py',(e.clientY/app.clientHeight-.5)*10+'px');
},{passive:true});
app.addEventListener('pointerleave',()=>{app.style.setProperty('--px','0px');app.style.setProperty('--py','0px')});
function setProjectPage(slide,page){
  const shelf=slide.querySelector('.project-shelf'),items=[...shelf.querySelectorAll('.project-tile')];
  const total=Math.ceil(items.length/3),current=Math.max(0,Math.min(total-1,page));
  shelf.dataset.page=String(current);
  shelf.querySelector('.shelf-pagination>div').hidden=total<=1;
  items.forEach((item,i)=>item.hidden=Math.floor(i/3)!==current);
  shelf.querySelector('.shelf-page').textContent=String(current*3+1).padStart(2,'0')+' — '+String(Math.min((current+1)*3,items.length)).padStart(2,'0')+' / '+String(items.length).padStart(2,'0');
  shelf.querySelector('.shelf-prev').disabled=current===0;
  shelf.querySelector('.shelf-next').disabled=current===total-1;
}
slides.forEach(slide=>{
  const shelf=slide.querySelector('.project-shelf');
  shelf.querySelector('.shelf-prev').addEventListener('click',()=>setProjectPage(slide,Number(shelf.dataset.page)-1));
  shelf.querySelector('.shelf-next').addEventListener('click',()=>setProjectPage(slide,Number(shelf.dataset.page)+1));
  setProjectPage(slide,0);
});
// Window-only atmospheric animation. The frame and desk never move with the view.
const weatherLayers=[...document.querySelectorAll('.window-weather')].map(canvas=>({canvas,ctx:canvas.getContext('2d'),width:0,height:0}));
let weatherRequest=0,weatherLast=0,weatherTime=0,weatherFrames=0;
function resizeWeather(){
  weatherLayers.forEach(layer=>{const r=layer.canvas.parentElement.getBoundingClientRect(),ratio=Math.min(devicePixelRatio||1,1.25);layer.width=r.width;layer.height=r.height;layer.canvas.width=Math.round(r.width*ratio);layer.canvas.height=Math.round(r.height*ratio);layer.ctx?.setTransform(ratio,0,0,ratio,0,0)});
  paintWeather();
}
function haze(ctx,x,y,rx,ry,alpha){
  ctx.save();ctx.translate(x,y);ctx.scale(rx,ry);
  const g=ctx.createRadialGradient(0,0,.1,0,0,1);g.addColorStop(0,`rgba(234,246,255,${alpha})`);g.addColorStop(1,'rgba(234,246,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,1,0,Math.PI*2);ctx.fill();ctx.restore();
}
function paintWeather(){
  const layer=weatherLayers[activeScene];if(!layer?.ctx||!layer.width)return;
  const {ctx,width:w,height:h}=layer,t=weatherTime;
  ctx.clearRect(0,0,w,h);
  if(activeScene===1){
    // Nearby stars drift faster than the planet plate; gentle scintillation adds depth.
    for(let i=0;i<65;i++){
      const x=((i*.61803398875+t*(.002+i%3*.001))%1)*w,y=((i*.381966+.137)%1)*h;
      const a=.18+.4*(.5+.5*Math.sin(t*.7+i));ctx.fillStyle=`rgba(227,218,255,${a})`;ctx.beginPath();ctx.arc(x,y,.55+(i%4)*.28,0,Math.PI*2);ctx.fill();
    }
  }else{
    // Independent mid-distance mist/cloud banks, rather than moving a flat full-page image.
    for(let i=0;i<5;i++){
      const x=((i*.29+t*(activeScene===0?.004:.0025))%1.6-.3)*w;
      const y=h*(activeScene===0?.62+i%2*.08:.19+i%3*.055);
      haze(ctx,x,y,w*(.22+i%2*.08),h*.065,activeScene===0?.12:.085);
    }
    if(activeScene===0||activeScene===2){
      // Short low-contrast glints over the open water, not over the UI or frame.
      for(let i=0;i<24;i++){
        const x=w*(.03+(i*.173+t*.002)% .48),y=h*(.73+(i*.037)% .22);
        ctx.strokeStyle=`rgba(221,242,255,${.05+.1*(.5+.5*Math.sin(t*1.5+i))})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+w*(.008+.008*Math.sin(t*.4+i)),y);ctx.stroke();
      }
    }else{
      // Slow drifting garden leaves; no fictional physical control claim.
      for(let i=0;i<12;i++){
        const x=w*(.48+((i*.19+t*.007)% .56)),y=h*((i*.137+t*.015)%1);
        ctx.save();ctx.translate(x,y);ctx.rotate(t*.6+i);ctx.fillStyle='rgba(188,220,148,.32)';ctx.beginPath();ctx.ellipse(0,0,2.5,1.1,0,0,Math.PI*2);ctx.fill();ctx.restore();
      }
    }
  }
  layer.canvas.dataset.frame=String(++weatherFrames);
}
function weatherRunning(){return !paused&&!reduceMotion.matches&&!document.hidden&&!catalog.open&&!menu.open&&!videoDialog.open}
function weatherTick(now){
  weatherRequest=0;if(!weatherRunning())return;
  if(!weatherLast)weatherLast=now;
  if(now-weatherLast>=40){weatherTime+=Math.min(now-weatherLast,100)/1000;weatherLast=now;paintWeather()}
  weatherRequest=requestAnimationFrame(weatherTick);
}
function syncWeather(){
  if(weatherRequest)cancelAnimationFrame(weatherRequest);weatherRequest=0;weatherLast=0;
  paintWeather();if(weatherRunning())weatherRequest=requestAnimationFrame(weatherTick);
}
window.addEventListener('resize',resizeWeather);
const weatherObserver=new MutationObserver(syncWeather);
for(const dialog of [catalog,menu,videoDialog])weatherObserver.observe(dialog,{attributes:true,attributeFilter:['open']});
resizeWeather();

setLanguage(language);setScene(Math.max(0,ids.indexOf(location.hash.slice(1))),false);
