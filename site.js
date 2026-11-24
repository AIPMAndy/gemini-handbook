(()=>{'use strict';
const d=window.GEMINI_GUIDE;if(!d){document.body.insertAdjacentHTML('afterbegin','<p style="padding:16px;color:white">课程数据加载失败，请刷新页面。</p>');return;}
const $=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cleanUrl=s=>{try{const u=new URL(s,location.href);return ['https:','http:'].includes(u.protocol)?u.href:'#'}catch{return '#'}};
const local={get(k){try{return window.localStorage.getItem(k)}catch{return null}},set(k,v){try{window.localStorage.setItem(k,v);return true}catch{return false}},remove(k){try{window.localStorage.removeItem(k);return true}catch{return false}}};
let toastHandle;function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastHandle);toastHandle=setTimeout(()=>el.classList.remove('show'),2500)}
function promptText(p){return ['【任务目标】'+p.task,'【输入材料】'+p.input+'。材料不足时先提问，不得编造。','【执行要求】先列计划和证据约束；严格依照我实际提供的输入。','【输出格式】'+p.output,'【验收标准】'+p.accept,'【风险边界】'+p.boundary+'。不擅自删除、外发、支付、联网传输敏感资料。','【结果报告】逐项写明「通过 / 失败 / 未验证」，列出需要我人工复核的地方。','','我的材料：','[在此粘贴你有权使用的内容]'].join('\n')}
async function copy(s){if(!s)return;try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(s);toast('已复制到剪贴板 ✓');return}}catch{}const t=document.createElement('textarea');t.value=s;t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();let ok=false;try{ok=document.execCommand('copy')}catch{}t.remove();toast(ok?'已复制到剪贴板 ✓':'复制不可用，请手动选择文字')}
function makePath(){const root=$('path-cards');root.innerHTML=d.paths.map((p,i)=>'<button type="button" class="path-card" data-role="path" data-path="'+esc(p.id)+'" aria-pressed="false"><span class="path-number">0'+(i+1)+' / ROUTE</span><strong>'+esc(p.title)+'</strong><small>'+esc(p.subtitle)+'</small><span class="path-days">'+esc(p.days)+' ↗</span></button>').join('');const selected=local.get('gemini-path')||'beginner';setPath(d.paths.some(p=>p.id===selected)?selected:'beginner')}
function setPath(id){const p=d.paths.find(x=>x.id===id)||d.paths[0];document.querySelectorAll('[data-role="path"]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.path===p.id)));const items=p.lessonIds.map(x=>d.modules.find(m=>m.id===x)).filter(Boolean);$('path-result').innerHTML='<div><strong>'+esc(p.title)+' · '+esc(p.days)+'学习路线</strong><p>建议顺序：'+items.map(x=>esc(x.id+' '+x.title)).join(' → ')+'</p></div><a href="#lessons">开始阅读对应章节 ↗</a>';local.set('gemini-path',p.id);}
let lessonGroup='全部';
const groups=['全部',...new Set(d.modules.map(m=>m.group))];
function makeLessonFilters(){$('lesson-filters').innerHTML=groups.map((g,i)=>'<button class="chip" data-role="lesson-filter" data-group="'+esc(g)+'" aria-pressed="'+(i===0)+'" type="button">'+esc(g)+'</button>').join('')}
let lessonCards;
function renderLessons(){
  if(!lessonCards){
    $('lesson-list').innerHTML=d.modules.map(m=>'<details class="lesson" id="lesson-'+esc(m.id)+'"><summary><div class="lesson-meta"><b>'+esc(m.id)+'</b><span>'+esc(m.group)+'</span><span>'+esc(m.level)+'</span><span>'+esc(m.mins)+' MIN</span></div><h3>'+esc(m.title)+'</h3><p class="lesson-goal">'+esc(m.goal)+'</p></summary><div class="lesson-body"><h4>操作步骤 · STEP BY STEP</h4><ol>'+m.steps.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol><div class="lesson-results"><p><b>动手练习：</b>'+esc(m.exercise)+'</p><p><b>交付文件：</b>'+esc(m.deliverable)+'</p><p><b>验收标准：</b>'+esc(m.acceptance)+'</p></div><p class="lesson-warning">⚠ '+esc(m.warning)+'</p><div class="lesson-source">'+m.sources.map((url,i)=>'<a href="'+esc(cleanUrl(url))+'" target="_blank" rel="noopener noreferrer">原始资料 '+(i+1)+' ↗</a>').join('')+'</div></div></details>').join('');
    lessonCards=[...$('lesson-list').querySelectorAll('.lesson')];
  }
  const q=$('lesson-search').value.trim().toLocaleLowerCase();
  let visible=0;
  lessonCards.forEach((card,i)=>{
    const m=d.modules[i];
    const match=(lessonGroup==='全部'||m.group===lessonGroup)&&[m.title,m.id,m.goal,m.group,m.exercise,m.deliverable,m.steps.join(' ')].join(' ').toLocaleLowerCase().includes(q);
    card.hidden=!match;if(match)visible++;
  });
  $('lesson-empty').hidden=visible!==0;
  $('lesson-count').textContent=visible+' / '+d.modules.length+' 章';
  $('lesson-reset').hidden=!q&&lessonGroup==='全部';
}
function setLessonGroup(group){lessonGroup=group;document.querySelectorAll('[data-role="lesson-filter"]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.group===group)));renderLessons()}
const cats=['all',...new Set(d.prompts.map(p=>p.category))];
function makePromptFilters(){$('prompt-category').innerHTML=cats.map(c=>'<option value="'+esc(c)+'">'+(c==='all'?'全部场景':esc(c))+'</option>').join('')}
let promptCards;
function renderPrompts(){
  if(!promptCards){
    $('prompt-grid').innerHTML=d.prompts.map(p=>'<article class="prompt-card"><div class="prompt-meta"><b>'+esc(p.id)+'</b><i>'+esc(p.category)+'</i></div><h3>'+esc(p.title)+'</h3><p>'+esc(p.task)+'</p><div class="output-note"><b>输出</b> '+esc(p.output)+'</div><button type="button" data-role="copy-prompt" data-prompt="'+esc(p.id)+'" aria-label="复制'+esc(p.title)+'完整提示词">复制完整任务协议 ↗</button></article>').join('');
    promptCards=[...$('prompt-grid').querySelectorAll('.prompt-card')];
  }
  const q=$('prompt-search').value.trim().toLocaleLowerCase(),c=$('prompt-category').value;
  let visible=0;
  promptCards.forEach((card,i)=>{
    const p=d.prompts[i];
    const match=(c==='all'||p.category===c)&&[p.id,p.title,p.category,p.task,p.input,p.output].join(' ').toLocaleLowerCase().includes(q);
    card.hidden=!match;if(match)visible++;
  });
  $('prompt-count').textContent=visible+' / '+d.prompts.length+' 份';
  $('prompt-empty').hidden=visible!==0;$('prompt-reset').hidden=!q&&c==='all';
}
const progressKey='gemini-7-day-v1';
let progress=[],undoProgress=null,readIssue='';
try {
  const parsed=JSON.parse(window.localStorage.getItem(progressKey)||'[]');
  if(!Array.isArray(parsed))throw Error('invalid progress');
  progress=[...new Set(parsed.filter(x=>Number.isInteger(x)&&x>=0&&x<d.day7.length))].sort((a,b)=>a-b);
  if(progress.length!==parsed.length)readIssue='旧记录包含无效打卡，已忽略无效项。';
}catch{readIssue='无法读取本机旧进度；打卡可能不会保留。'}
const progressMessage=message=>{const el=$('progress-status');el.textContent=message;el.hidden=!message;};
function renderDay7(){$('day7-list').innerHTML=d.day7.map((a,i)=>'<label class="day7"><input type="checkbox" data-day="'+i+'" '+(progress.includes(i)?'checked':'')+'><span><strong>DAY 0'+(i+1)+' · '+esc(a[1])+'</strong><p>'+esc(a[2])+'</p><small>验收：'+esc(a[3])+'</small></span></label>').join('');updateProgress();if(readIssue)progressMessage(readIssue);}
function updateProgress(){
  $('day7-list').querySelectorAll('input[data-day]').forEach(box=>{box.checked=progress.includes(Number(box.dataset.day));});
  const v=Math.round(progress.length/d.day7.length*100);
  $('progress-percent').textContent=v+'%';
  $('progress-meter').setAttribute('aria-valuenow',String(v));
  $('progress-meter').setAttribute('aria-valuetext',progress.length+' / '+d.day7.length+' 天');
  $('progress-bar').style.transform='scaleX('+v/100+')';
  $('reset-progress').disabled=progress.length===0;
  $('undo-progress').hidden=undoProgress===null;
}
function persistProgress(message){const saved=local.set(progressKey,JSON.stringify(progress));progressMessage(saved?message:'本机保存失败；当前进度仅在本次页面有效。');return saved;}
function renderDay30(){$('day30-list').innerHTML=d.days30.map(a=>'<button type="button" data-role="day30" data-day30="'+a.day+'" aria-pressed="'+(a.day===1?'true':'false')+'" aria-label="第'+a.day+'天 '+esc(a.title)+'"><b>'+String(a.day).padStart(2,'0')+'</b><span>DAY</span></button>').join('');const detail=document.createElement('div');detail.id='day30-detail';detail.className='day30-detail';detail.setAttribute('role','status');$('day30-list').after(detail);setDay30(1)}
function setDay30(day){const a=d.days30.find(x=>x.day===day);if(!a)return;document.querySelectorAll('[data-role="day30"]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.day30)===day)));$('day30-detail').textContent='第 '+day+' 天 · '+a.title+'。建议产物：'+a.artifact+'。完工后记录输入、修改和验收证据。'}
function renderFaq(){$('faq-list').innerHTML=d.faq.map((a,i)=>'<details><summary>'+String(i+1).padStart(2,'0')+' · '+esc(a[0])+'</summary><p>'+esc(a[1])+'</p></details>').join('')}
function renderResources(){$('resource-list').innerHTML=d.resources.map(r=>'<a href="'+esc(cleanUrl(r.url))+'" target="_blank" rel="noopener noreferrer"><span>'+esc(r.type)+' ↗</span><strong>'+esc(r.title)+'</strong></a>').join('')}
document.addEventListener('click',ev=>{const el=ev.target.closest('[data-role],[data-copy]');if(!el)return;
if(el.dataset.copy==='first')copy($('first-prompt').textContent);
if(el.dataset.copy==='wechat')copy(d.wechat);
if(el.dataset.role==='path')setPath(el.dataset.path);
if(el.dataset.role==='lesson-filter')setLessonGroup(el.dataset.group);
if(el.dataset.role==='copy-prompt'){const p=d.prompts.find(x=>x.id===el.dataset.prompt);if(p)copy(promptText(p))}
if(el.dataset.role==='day30')setDay30(Number(el.dataset.day30));
});
$('lesson-search').addEventListener('input',renderLessons);$('prompt-search').addEventListener('input',renderPrompts);$('prompt-category').addEventListener('change',renderPrompts);
$('lesson-reset').addEventListener('click',()=>{$('lesson-search').value='';setLessonGroup('全部');$('lesson-search').focus({preventScroll:true})});
$('prompt-reset').addEventListener('click',()=>{$('prompt-search').value='';$('prompt-category').value='all';renderPrompts();$('prompt-search').focus({preventScroll:true})});
$('day7-list').addEventListener('change',ev=>{
  const box=ev.target.closest('input[data-day]');if(!box)return;const day=Number(box.dataset.day);
  if(!Number.isInteger(day)||day<0||day>=d.day7.length)return;
  undoProgress=null;
  progress=box.checked?[...new Set([...progress,day])]:progress.filter(x=>x!==day);
  progress.sort((a,b)=>a-b);updateProgress();persistProgress('学习进度已保存。');
});
$('reset-progress').addEventListener('click',()=>{
  if(!progress.length||!confirm('清空当前浏览器的 7 天打卡记录？清空后可立即撤销。'))return;
  undoProgress=progress.slice();progress=[];updateProgress();persistProgress('已清空本机打卡，可撤销。');$('undo-progress').focus({preventScroll:true});
});
$('undo-progress').addEventListener('click',()=>{
  if(undoProgress===null)return;
  progress=undoProgress;undoProgress=null;updateProgress();persistProgress('已撤销清空。');$('reset-progress').focus({preventScroll:true});
});
makePath();makeLessonFilters();renderLessons();makePromptFilters();renderPrompts();renderDay7();renderDay30();renderFaq();renderResources();
if(location.hash.startsWith('#lesson-')){const el=document.getElementById(location.hash.slice(1));if(el)el.open=true}
})();