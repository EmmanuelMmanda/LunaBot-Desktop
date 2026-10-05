document.documentElement.classList.add('js');
const previousGuideLinks={install:'install.html',overview:'overview.html',charts:'charts.html',trading:'trading.html',manual:'trading.html#market',strategies:'strategies.html',connected:'connected-apps.html',reports:'reports.html',activation:'settings.html#activation',help:'settings.html#support'};
if(location.pathname.endsWith('/guide.html')&&previousGuideLinks[location.hash.slice(1)])location.replace('guides/'+previousGuideLinks[location.hash.slice(1)]);
if(location.pathname.endsWith('/guide.html')){const settings=document.querySelector('#settings');if(settings){const row=document.createElement('a');row.className='directory-row';row.href='guides/operations.html';row.innerHTML='<div><h3>Operations</h3><p>See setup progress, account health and LunaBot resource use across this computer.</p></div><span aria-hidden="true">↗</span>';settings.after(row)}}
const appearance=document.querySelector('#site-theme'),media=matchMedia('(prefers-color-scheme: dark)');
let preference='system';try{preference=localStorage.getItem('lunabot-site-theme')||'system'}catch{}
if(!['system','light','dark'].includes(preference))preference='system';
function applyTheme(){document.documentElement.dataset.theme=preference==='system'?(media.matches?'dark':'light'):preference;if(appearance)appearance.value=preference}
applyTheme();appearance?.addEventListener('change',()=>{preference=appearance.value;try{localStorage.setItem('lunabot-site-theme',preference)}catch{}applyTheme()});media.addEventListener('change',()=>{if(preference==='system')applyTheme()});
for(const selector of ['.menu-toggle','.guide-toggle']){const button=document.querySelector(selector);if(!button)continue;const target=document.getElementById(button.getAttribute('aria-controls'));button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));target.classList.toggle('open',open)});target.addEventListener('keydown',e=>{if(e.key==='Escape'){target.classList.remove('open');button.setAttribute('aria-expanded','false');button.focus()}})}
const search=document.querySelector('#guide-search');search?.addEventListener('input',()=>{const terms=search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);let count=0;document.querySelectorAll('[data-guide-search]').forEach(row=>{const show=terms.every(t=>row.dataset.guideSearch.includes(t));row.hidden=!show;if(show)count++});document.querySelectorAll('.nav-group').forEach(g=>g.hidden=![...g.querySelectorAll('li')].some(li=>!li.hidden));document.querySelector('#search-status').textContent=terms.length?(count?count+' guide'+(count===1?'':'s')+' found':'No guides found. Try “MT5”, “orders” or “backtest”.'):''});
const viewer=document.querySelector('#image-dialog');document.querySelectorAll('.image-open').forEach(button=>button.addEventListener('click',()=>{const source=button.querySelector('img'),image=document.querySelector('#image-full');image.src=source.src;image.alt=source.alt;document.querySelector('#image-title').textContent=button.dataset.imageTitle||source.alt;viewer.showModal()}));document.querySelector('#image-close')?.addEventListener('click',()=>viewer.close());viewer?.addEventListener('click',e=>{if(e.target!==viewer)return;const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close()});
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!visible)return;document.querySelectorAll('.page-toc nav a').forEach(a=>{if(a.hash==='#'+visible.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})},{rootMargin:'-90px 0px -55% 0px',threshold:0});document.querySelectorAll('.article-section').forEach(s=>observer.observe(s))}
// Ordinary downloads remain stable. The pilot requires an explicit channel link.
async function latestWindowsInstaller(pilot=false){
 let release;
 try{const cached=JSON.parse(sessionStorage.getItem('lunabot-release')||'null');if(!pilot&&!document.querySelector('#download-status')&&cached&&Date.now()-cached.at<120000)release=cached.release}catch{}
 if(!release){
  const endpoint=pilot?'tags/v1.0.1-rc.3':'latest';
  const response=await fetch('https://api.github.com/repos/EmmanuelMmanda/LunaBot-Desktop/releases/'+endpoint,{headers:{Accept:'application/vnd.github+json'},cache:'no-store'});
  if(!response.ok)throw Error('The release service is unavailable. Open releases to download manually.');
  release=await response.json();
  if(!pilot)try{sessionStorage.setItem('lunabot-release',JSON.stringify({at:Date.now(),release}))}catch{}
 }
 if(release.draft||(pilot?(!release.prerelease||release.tag_name!=='v1.0.1-rc.3'):release.prerelease))throw Error('The requested release channel is unavailable.');
 const assets=(release.assets||[]).filter(asset=>new RegExp(pilot?'^LunaBot_1\\.0\\.1-rc\\.3_x64-setup\\.exe$':'^LunaBot_[0-9]+\\.[0-9]+\\.[0-9]+_x64-setup\\.exe$').test(asset.name));
 if(assets.length!==1)throw Error('A Windows installer could not be identified. Open releases to review the files.');
 const url=new URL(assets[0].browser_download_url);
 if(url.origin!=='https://github.com'||!url.pathname.startsWith('/EmmanuelMmanda/LunaBot-Desktop/releases/download/'))throw Error('Unexpected download address.');
 const zipAsset=(release.assets||[]).find(asset=>asset.name===assets[0].name.replace(/\.exe$/,'.zip'));
 let zipUrl=null;
 if(zipAsset){const candidate=new URL(zipAsset.browser_download_url);if(candidate.origin==='https://github.com'&&candidate.pathname.startsWith('/EmmanuelMmanda/LunaBot-Desktop/releases/download/'))zipUrl=candidate.href}
 return {url:url.href,zipUrl,version:release.tag_name};
}
const downloadLinks=document.querySelectorAll('[data-download]'),downloadStatus=document.querySelector('#download-status');
if(downloadLinks.length||downloadStatus){
 const pilot=!!downloadStatus&&new URLSearchParams(location.search).get('channel')==='pilot';
 if(pilot){downloadStatus.textContent='Finding the 1.0.1-rc.3 pilot installer…';const note=document.querySelector('.download-resolver small');if(note)note.textContent='Windows x64 pilot. Locally self-signed, not publicly trusted. Demo broker and two-account acceptance are still open.'}
 latestWindowsInstaller(pilot).then(({url,zipUrl,version})=>{
 downloadLinks.forEach(link=>{const archive=link.dataset.download==='zip';if(!archive||zipUrl)link.href=archive?zipUrl:url;link.setAttribute('aria-label','Download LunaBot '+version+' for Windows x64'+(archive?' as ZIP':''))});
 if(downloadStatus){const archive=new URLSearchParams(location.search).get('format')==='zip';if(archive&&!zipUrl)throw Error('This release has no ZIP alternative. Open releases to choose an available installer.');const target=archive?zipUrl:url;const link=document.querySelector('#resolved-download');link.href=target;link.hidden=false;link.textContent='Download '+version+(archive?' ZIP':' for Windows');downloadStatus.textContent='Starting your '+version+(pilot?' pilot':'')+(archive?' ZIP':' installer')+' download. If it does not start, use the button below.';location.assign(target);}
 }).catch(error=>{if(downloadStatus)downloadStatus.textContent=error.message});
}
