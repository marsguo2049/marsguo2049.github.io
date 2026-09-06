'use strict';
const app=document.querySelector('.app-shell');
const slides=[...document.querySelectorAll('[data-slide]')];
const backdrops=[...document.querySelectorAll('[data-backdrop]')];
const sceneButtons=[...document.querySelectorAll('[data-scene-target]')];
const catalog=document.querySelector('.project-catalog');
const menu=document.querySelector('.mobile-menu');
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
  document.title=language==='zh'?'Mars Guo · 科研工具、本地 AI、未来城市与机器人':'Mars Guo · Research tools, local AI, future worlds & robots';
  document.querySelector('meta[name=description]').content=language==='zh'?'Mars Guo 的四个探索窗口：科研工具、本地 AI、City2049 与无人实验室。':'Four windows into Mars Guo’s work: research tools, local AI, City2049 and autonomous systems.';
  remember('portfolio-language',language);refreshMotion();filterProjects();
}
function loadArt(index){
  const image=backdrops[index].querySelector('img');
  if(image.dataset.src){image.srcset=image.dataset.srcset;image.src=image.dataset.src;delete image.dataset.src;delete image.dataset.srcset}
  return image.decode().catch(()=>{});
}
async function setScene(index,updateHash=true){
  const next=Number(index);if(!Number.isInteger(next)||next<0||next>=slides.length)return;
  const request=++sceneRequest;
  // Keep the current scene visible until the requested image can be painted.
  await loadArt(next);if(request!==sceneRequest)return;
  const previous=slides[activeScene];previous.querySelectorAll('video').forEach(v=>v.pause());
  activeScene=next;app.dataset.active=String(next);
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
  catalog.querySelectorAll('.catalog-group').forEach(group=>{let count=0;group.querySelectorAll('.catalog-card').forEach(card=>{const match=!q||card.textContent.toLocaleLowerCase().includes(q);card.hidden=!match;if(match)count++});group.hidden=count===0;total+=count});
  catalog.querySelector('.search-empty').hidden=total>0;
}
function openCatalog(group){
  if(menu.open)menu.close();lastFocus=document.activeElement;search.value='';filterProjects();catalog.showModal();
  const target=catalog.querySelector('[data-catalog-group="'+group+'"]');
  catalog.querySelector('.catalog-scroll').scrollTop=target?target.offsetTop-catalog.querySelector('.catalog-scroll').offsetTop:0;
  search.focus({preventScroll:true});
}
document.querySelectorAll('.catalog-trigger').forEach(b=>b.addEventListener('click',()=>openCatalog(b.dataset.group)));
document.querySelector('.catalog-close').addEventListener('click',()=>catalog.close());
catalog.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();catalog.close()}});
catalog.addEventListener('close',()=>{if(lastFocus?.isConnected&&!lastFocus.closest('[inert]'))lastFocus.focus({preventScroll:true})});
for(const dialog of [catalog,menu])dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.querySelector('.menu-toggle').addEventListener('click',()=>menu.showModal());
document.querySelector('.menu-close').addEventListener('click',()=>menu.close());
document.querySelectorAll('.lang-toggle').forEach(b=>b.addEventListener('click',()=>setLanguage(language==='zh'?'en':'zh')));
sceneButtons.forEach(b=>b.addEventListener('click',()=>setScene(b.dataset.sceneTarget)));
search.addEventListener('input',filterProjects);
motion.addEventListener('click',()=>{paused=!paused;remember('portfolio-motion',paused?'paused':'running');refreshMotion()});
document.querySelector('.video-start').addEventListener('click',async e=>{
  const button=e.currentTarget,video=document.querySelector('video'),source=video.querySelector('source');
  button.disabled=true;
  if(source.dataset.src){source.src=source.dataset.src;delete source.dataset.src;video.load()}
  try{await video.play();button.hidden=true;video.parentElement.classList.add('started')}
  catch{button.disabled=false;button.textContent=language==='zh'?'重试':'Retry'}
});
reduceMotion.addEventListener('change',refreshMotion);
document.addEventListener('keydown',e=>{
  if(catalog.open||menu.open||e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,textarea,select,video,[contenteditable]'))return;
  if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();setScene((activeScene+(e.key==='ArrowRight'?1:3))%4)}
  else if(/^[1-4]$/.test(e.key))setScene(Number(e.key)-1);
});
app.addEventListener('touchstart',e=>{if(catalog.open||menu.open||e.target.closest('video,button,a,input'))return;const t=e.changedTouches[0];touchStart={x:t.screenX,y:t.screenY}},{passive:true});
app.addEventListener('touchend',e=>{if(!touchStart)return;const t=e.changedTouches[0],dx=t.screenX-touchStart.x,dy=t.screenY-touchStart.y;touchStart=null;if(!catalog.open&&!menu.open&&Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.6)setScene((activeScene+(dx<0?1:3))%4)},{passive:true});
window.addEventListener('hashchange',()=>{const index=ids.indexOf(location.hash.slice(1));if(index>=0)setScene(index,false)});
document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause());app.classList.toggle('page-hidden',document.hidden)});
setLanguage(language);setScene(Math.max(0,ids.indexOf(location.hash.slice(1))),false);
