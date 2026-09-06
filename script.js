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
  motion.textContent=language==='zh'?(paused?'开启转场':'关闭转场'):(paused?'Enable transitions':'Disable transitions');
  motion.setAttribute('aria-label',motion.textContent);


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
  remember('portfolio-language',language);refreshMotion();filterProjects();updateRoomView();updateArtStatus();
}
function loadArt(index){
  return Promise.all([...backdrops[index].querySelectorAll('img')].map(image=>{
    if(image.dataset.src){image.srcset=image.dataset.srcset;image.src=image.dataset.src;delete image.dataset.src;delete image.dataset.srcset}
    return image.decode();
  }));
}
async function setScene(index,updateHash=true){
  const next=Number(index);if(!Number.isInteger(next)||next<0||next>=slides.length)return;
  const request=++sceneRequest;
  // Navigation must respond immediately, independently of image download speed.
  document.querySelectorAll('video').forEach(v=>v.pause());
  if(videoDialog.open)videoDialog.close();
  activeScene=next;app.dataset.active=String(next);

  slides.forEach((s,i)=>{const active=i===next;s.classList.toggle('is-active',active);s.inert=!active;s.setAttribute('aria-hidden',String(!active));if(active)s.scrollTop=0});
  sceneButtons.forEach(b=>{const active=Number(b.dataset.sceneTarget)===next;b.classList.toggle('is-active',active);if(b.closest('.scene-switcher')){if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')}});
  document.querySelector('#scene-counter').textContent=String(next+1).padStart(2,'0');
  slides[next].querySelectorAll('video').forEach(v=>{if(v.dataset.poster){v.poster=v.dataset.poster;delete v.dataset.poster}});
  if(updateHash)history.replaceState(null,'','#'+ids[next]);
  if(menu.open)menu.close();
  app.classList.remove('art-unavailable');
  const status=document.querySelector('.art-status');
  status.hidden=false;status.dataset.state='loading';updateArtStatus();
  const timeout=setTimeout(()=>{if(request===sceneRequest){status.dataset.state='retry';updateArtStatus()}},8000);
  try{
    await loadArt(next);if(request!==sceneRequest)return;
    backdrops.forEach((b,i)=>b.classList.toggle('is-active',i===next));
    status.hidden=true;app.classList.remove('art-unavailable');
  }catch{
    if(request!==sceneRequest)return;
    app.classList.add('art-unavailable');status.dataset.state='retry';updateArtStatus();
  }finally{clearTimeout(timeout)}
}
function updateArtStatus(){
  const status=document.querySelector('.art-status');
  const retry=status.dataset.state==='retry';
  status.querySelector('span').textContent=language==='zh'?(retry?'背景暂未加载，内容可正常浏览':'场景加载中…'):(retry?'Background unavailable. Content is ready.':'Loading the room…');
  status.querySelector('button').hidden=!retry;
  status.querySelector('button').textContent=language==='zh'?'重试':'Retry';
}
document.querySelector('.art-status button').addEventListener('click',()=>{
  const img=backdrops[activeScene].querySelector('img');if(img.complete&&!img.naturalWidth)img.src=img.getAttribute('src');
  setScene(activeScene,false);
});
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
document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause());app.classList.toggle('page-hidden',document.hidden)});
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
const viewRoom=document.querySelector('.scene-view');
function updateRoomView(){
  const clean=app.classList.contains('scene-only');
  viewRoom.setAttribute('aria-pressed',String(clean));
  viewRoom.textContent=language==='zh'?(clean?'返回内容':'查看场景'):(clean?'Show content':'View the room');
  document.querySelector('.slide-stage').inert=clean;
}
viewRoom.addEventListener('click',()=>{app.classList.toggle('scene-only');updateRoomView()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!catalog.open&&!menu.open&&!videoDialog.open&&app.classList.contains('scene-only')){app.classList.remove('scene-only');updateRoomView();viewRoom.focus()}});

setLanguage(language);setScene(Math.max(0,ids.indexOf(location.hash.slice(1))),false);
