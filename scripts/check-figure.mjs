import {createRequire} from 'node:module';
import {writeFileSync,mkdirSync} from 'node:fs';
import {machine,machineCss} from '../portfolio/build-machine.mjs';
import {LINE_ENDS} from '../portfolio/vendor/line-ends.mjs';
const {chromium}=createRequire(import.meta.url)('playwright');
const output=process.argv[2];
if(!output) throw Error('Pass an output directory for the offline figure checks.');
mkdirSync(output,{recursive:true});
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:1});
const results=[];
for(const scenario of ['normal','stale','source']){
  const svg=machine(3,scenario).svg;
  await page.setContent(`<style>${machineCss}body{margin:0;background:#fff}.iso{width:1520px}</style><div class="iso" data-theme="light">${svg}</div>`);
  const result=await page.evaluate(`(${LINE_ENDS})({select:'.iso',show:false})`);
  results.push({scenario,...result});
  await page.locator('.iso').screenshot({path:`${output}/figure-${scenario}.png`});
}
await browser.close();
writeFileSync(`${output}/line-check.json`,JSON.stringify(results,null,2));
console.log(JSON.stringify(results));
if(results.some(r=>r.problems.length))process.exitCode=1;
