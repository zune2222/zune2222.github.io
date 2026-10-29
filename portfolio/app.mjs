import {analysisState} from './model.mjs';
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  let count=0;
  document.querySelectorAll('.project').forEach(project=>{
    const show=filter==='all'||project.dataset.tags.split(' ').includes(filter);
    project.hidden=!show;
    if(show) count++;
  });
  document.querySelector('#project-count').textContent=`${filter==='all'?'전체':button.textContent} ${count}개 프로젝트`;
}));
let scenario='normal';
let step=0;
function render(){
  const state=analysisState(scenario,step);
  const oldPaper=document.querySelector('#machine [data-part="subject.link"]');
  const previous=oldPaper?{x:Number(oldPaper.dataset.cx),y:Number(oldPaper.dataset.cy)}:null;
  document.querySelector('#machine').replaceChildren(document.querySelector(`#frame-${scenario}-${step}`).content.cloneNode(true));
  const paper=document.querySelector('#machine [data-part="subject.link"]');
  if(previous&&paper&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    paper.animate([{transform:`translate(${previous.x-Number(paper.dataset.cx)}px,${previous.y-Number(paper.dataset.cy)}px)`},{transform:'translate(0,0)'}],{duration:360,easing:'cubic-bezier(.2,.7,.2,1)'});
  }
  for(const [id,value] of Object.entries({'current-revision':`v${state.revision}`,'job-revision':step===0?'—':`v${state.jobRevision}`,'analysis-status':state.status,'step-number':`STEP 0${step+1} / 05`,'step-title':state.title,'step-description':state.description})) document.getElementById(id).textContent=value;
  document.querySelector('#prev').disabled=step===0;
  document.querySelector('#next').disabled=step===4;
  document.querySelector('#analysis-status').dataset.result=state.accepted?'accepted':step===4?'held':'pending';
}
document.querySelectorAll('[name=scenario]').forEach(r=>r.addEventListener('change',()=>{scenario=r.value;step=0;render();}));
document.querySelector('#next').addEventListener('click',()=>{step=Math.min(step+1,4);render();});
document.querySelector('#prev').addEventListener('click',()=>{step=Math.max(step-1,0);render();});
document.querySelector('#reset').addEventListener('click',()=>{step=0;render();});
render();
// Hero links still find a project after filtering.
document.querySelectorAll('.hero-index a').forEach(a=>a.addEventListener('click',()=>document.querySelector('[data-filter=all]').click()));
