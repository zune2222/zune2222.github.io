import * as k from './vendor/iso-kit.mjs';
import * as A from './vendor/audit.mjs';
import {writeFileSync} from 'node:fs';

// One mechanism: a filing press. A stored slip moves to the inspection bed;
// a current, verified result is stamped, while an obsolete result stays out.
// 63 structural parts; no throughput or elapsed time is invented by this model.
export function machine(step=0, scenario='normal', audit=false) {
  const base={x:-150,y:-65,w:300,d:130,r:5};
  const P=k.fitProjection([...k.boxCorners(base,-16,0),[5,-32,84]],760,420,{pad:22,azimuth:32});
  const R=A.recorder(P);
  let count=0;
  const slab=(name,plan,z,h,{lit=false,extra='',ground=false}={})=>{
    const paths=k.slabOf(plan,z,h,P,5,.45);
    const shape=R.solid(A.slab(plan,z,h,{name,ground},5));
    R.put({name,at:[plan.x+plan.w/2,plan.y+plan.d/2,z+h/2],svg:k.solidSvg(paths,{tone:'mid',lit,inner:extra}),shapes:[shape]});
    count++;
  };
  const box=(name,x,y,w,d,z,h,opt={})=>slab(name,{x,y,w,d,r:.8},z,h,opt);
  for(const [i,[x,y]] of k.corners(base,16).entries()) box(`stand.foot${i}`,x-5,y-5,10,10,-16,6,{ground:true});
  slab('stand.base',base,-10,10,{ground:true,extra:k.lineSvg(k.planOutline(k.insetPlan(base,5),0,P),{tone:'faint'})});
  for(const [i,[x,y]] of k.corners(base,10).entries()) box(`base.screw${i}`,x-1,y-1,2,2,0,1);
  box('feed.support',-113,-26,226,52,0,6);
  box('feed.bed',-113,-24,226,48,6,4);
  for(let i=0;i<18;i++) box(`feed.belt${i}`,-109+i*12.1,-23,11.3,46,10,3);
  for(const y of [-28,25]) box(`feed.guide${y}`,-113,y,226,3,6,10);
  // Infeed tray: a solid base with three raised sides and stacked source slips.
  box('input.base',-139,-21,25,42,0,6);
  box('input.back',-142,-23,3,46,0,18);
  for(const y of [-24,21]) box(`input.side${y}`,-139,y,25,3,0,15);
  for(let i=0;i<4;i++) box(`input.sheet${i}`,-137,-19,21,38,6+i*1.5,1.5);
  // Output tray and a five-slot filing rack.
  box('output.base',117,-23,25,46,0,6);
  for(const y of [-26,23]) box(`output.side${y}`,117,y,28,3,0,19);
  box('output.end',142,-23,3,46,0,19);
  box('rack.base',-80,-61,120,16,0,4);
  box('rack.back',-80,-63,120,2,0,23);
  for(let i=0;i<6;i++) box(`rack.divider${i}`,-80+i*23.2,-61,2,16,4,20);
  // A gantry and telescoping rectangular stamp; all faces meet real supports.
  for(const y of [-38,30]) {
    box(`press.mount${y}`,-9,y-2,18,12,0,6);
    box(`press.post${y}`,-5,y,10,8,6,56);
    box(`press.cap${y}`,-8,y-1,16,10,62,4);
  }
  box('press.crossbar',-8,-38,16,76,66,8);
  box('press.housing',-10,-10,20,20,56,10);
  const pressed=step===3 && scenario==='normal';
  const headZ=pressed?14.2:35;
  box('press.rod',-2,-2,4,4,headZ+5,56-headZ-5);
  box('press.head',-17,-17,34,34,headZ,5);
  box('press.topplate',-13,-13,26,26,74,2);
  for(const [x,y] of [[-6,-6],[6,-6],[-6,6],[6,6]]) box(`press.bolt${x}.${y}`,x-1,y-1,2,2,76,2);
  // The front control strip is physically mounted to the base.
  box('control.panel',-94,43,184,13,0,3);
  for(let i=0;i<3;i++) box(`control.key${i}`,-83+i*22,46,15,7,3,2);
  box('control.readout',5,45,72,9,3,1,{extra:k.faceTextSvg(k.topMatrix([10,47],4,P),'CLAIM / REV',{size:3})});
  const x=[-103,-67,0,0,scenario==='normal'?92:scenario==='stale'?-67:0][step];
  box('subject.link',x-15,-16,30,32,13,1.2,{lit:true,extra:k.lineSvg(k.lineOnTop([x-9,-8],[x+8,-8],14.2,P),{tone:'hi',free:true})+k.lineSvg(k.lineOnTop([x-9,-3],[x+4,-3],14.2,P),{tone:'lo',free:true})});
  A.settle(R,P,{states:[0]});
  if(audit) A.auditOrExit(R,P,{argv:['--audit'],apart:false,frames:[]});
  R.items.sort((a,b)=>a.key-b.key);
  const body=R.items.map(i=>`<g data-part="${i.name}" data-cx="${i.name==='subject.link'?k.iso([x,0,13.6],P)[0]:0}" data-cy="${i.name==='subject.link'?k.iso([x,0,13.6],P)[1]:0}">${i.svg}</g>`).join('');
  return {svg:k.figureSvg({width:760,height:420,label:'우리모하냥의 분석 결과 반영을 설명하는 링크 검사·분류 장치 모형',body}),count};
}

export const machineCss=k.ISO_CSS;
if(process.argv.includes('--audit')) {
  for(const scenario of ['normal','stale','source']) for(let step=0;step<5;step++) {
    const {svg,count}=machine(step,scenario,true);
    console.log(`${scenario} / ${step}: ${count} solids`);
    if(step===4) writeFileSync(new URL(`machine-${scenario}.svg`,import.meta.url),svg);
  }
}
