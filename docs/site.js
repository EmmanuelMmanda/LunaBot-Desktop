document.documentElement.classList.add('js');
const previousGuideLinks={install:'install.html',overview:'overview.html',charts:'charts.html',trading:'trading.html',manual:'trading.html#market',strategies:'strategies.html',connected:'connected-apps.html',reports:'reports.html',activation:'settings.html#activation',help:'settings.html#support'};
if(location.pathname.endsWith('/guide.html')&&previousGuideLinks[location.hash.slice(1)])location.replace('guides/'+previousGuideLinks[location.hash.slice(1)]);
const appearance=document.querySelector('#site-theme'),media=matchMedia('(prefers-color-scheme: dark)');
let preference='system';try{preference=localStorage.getItem('lunabot-site-theme')||'system'}catch{}
if(!['system','light','dark'].includes(preference))preference='system';
function applyTheme(){document.documentElement.dataset.theme=preference==='system'?(media.matches?'dark':'light'):preference;if(appearance)appearance.value=preference}
applyTheme();appearance?.addEventListener('change',()=>{preference=appearance.value;try{localStorage.setItem('lunabot-site-theme',preference)}catch{}applyTheme()});media.addEventListener('change',()=>{if(preference==='system')applyTheme()});
for(const selector of ['.menu-toggle','.guide-toggle']){const button=document.querySelector(selector);if(!button)continue;const target=document.getElementById(button.getAttribute('aria-controls'));button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));target.classList.toggle('open',open)});target.addEventListener('keydown',e=>{if(e.key==='Escape'){target.classList.remove('open');button.setAttribute('aria-expanded','false');button.focus()}})}
const search=document.querySelector('#guide-search');search?.addEventListener('input',()=>{const terms=search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);let count=0;document.querySelectorAll('[data-guide-search]').forEach(row=>{const show=terms.every(t=>row.dataset.guideSearch.includes(t));row.hidden=!show;if(show)count++});document.querySelectorAll('.nav-group').forEach(g=>g.hidden=![...g.querySelectorAll('li')].some(li=>!li.hidden));document.querySelector('#search-status').textContent=terms.length?(count?count+' guide'+(count===1?'':'s')+' found':'No guides found. Try “MT5”, “orders” or “backtest”.'):''});
const viewer=document.querySelector('#image-dialog');document.querySelectorAll('.image-open').forEach(button=>button.addEventListener('click',()=>{const source=button.querySelector('img'),image=document.querySelector('#image-full');image.src=source.src;image.alt=source.alt;document.querySelector('#image-title').textContent=button.dataset.imageTitle||source.alt;viewer.showModal()}));document.querySelector('#image-close')?.addEventListener('click',()=>viewer.close());viewer?.addEventListener('click',e=>{if(e.target!==viewer)return;const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close()});
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!visible)return;document.querySelectorAll('.page-toc nav a').forEach(a=>{if(a.hash==='#'+visible.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})},{rootMargin:'-90px 0px -55% 0px',threshold:0});document.querySelectorAll('.article-section').forEach(s=>observer.observe(s))}
// Resolve only the public stable Windows installer. Visiting ordinary pages never starts a download.
async function latestWindowsInstaller(){
 let release;
 try{const cached=JSON.parse(sessionStorage.getItem('lunabot-release')||'null');if(!document.querySelector('#download-status')&&cached&&Date.now()-cached.at<120000)release=cached.release}catch{}
 if(!release){
  const response=await fetch('https://api.github.com/repos/EmmanuelMmanda/LunaBot-Desktop/releases/latest',{headers:{Accept:'application/vnd.github+json'},cache:'no-store'});
  if(!response.ok)throw Error('The release service is unavailable. Open releases to download manually.');
  release=await response.json();
  try{sessionStorage.setItem('lunabot-release',JSON.stringify({at:Date.now(),release}))}catch{}
 }
 if(release.draft||release.prerelease)throw Error('No stable release is available.');
 const assets=(release.assets||[]).filter(asset=>/^LunaBot_[0-9]+\.[0-9]+\.[0-9]+_x64-setup\.exe$/.test(asset.name));
 if(assets.length!==1)throw Error('A Windows installer could not be identified. Open releases to review the files.');
 const url=new URL(assets[0].browser_download_url);
 if(url.origin!=='https://github.com'||!url.pathname.startsWith('/EmmanuelMmanda/LunaBot-Desktop/releases/download/'))throw Error('Unexpected download address.');
 return {url:url.href,version:release.tag_name};
}
const downloadLinks=document.querySelectorAll('[data-download]'),downloadStatus=document.querySelector('#download-status');
if(downloadLinks.length||downloadStatus){
 latestWindowsInstaller().then(({url,version})=>{
 downloadLinks.forEach(link=>{link.href=url;link.setAttribute('aria-label','Download LunaBot '+version+' for Windows x64')});
 if(downloadStatus){const link=document.querySelector('#resolved-download');link.href=url;link.hidden=false;link.textContent='Download '+version+' for Windows';downloadStatus.textContent='Starting your '+version+' download. If it does not start, use the button below.';location.assign(url);}
 }).catch(error=>{if(downloadStatus)downloadStatus.textContent=error.message});
}
