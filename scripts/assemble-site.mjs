import fs from 'node:fs';
import path from 'node:path';
const dest=path.resolve('dist');
if(!fs.existsSync('out/index.html')) throw new Error('Build legacy blog with next build first.');
fs.cpSync('out',path.join(dest,'legacy'),{recursive:true});
if(!fs.existsSync('portfolio/portfolio.pdf')) throw new Error('Generate the portfolio PDF before publishing.');
fs.copyFileSync('portfolio/portfolio.pdf',path.join(dest,'portfolio.pdf'));
// Preserve incoming links to the old blog's log, memory and article routes.
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const pages=walk('out').filter(f=>f.endsWith('index.html')&&!['out/index.html','out/404/index.html'].includes(f));
for(const file of pages){
  const relative=path.relative('out',file);
  const route='/'+relative.slice(0,-'index.html'.length);
  if(!/^\/(log|memory|posts\/)/.test(route)) continue;
  const target='/legacy'+route;
  const html=`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${target}"><title>이전 블로그로 이동</title><link rel="canonical" href="https://zune2222.github.io${target}"></head><body><a href="${target}">이전 블로그에서 글 읽기</a><script>location.replace('/legacy'+location.pathname+location.search+location.hash)</script></body></html>`;
  const output=path.join(dest,relative);
  fs.mkdirSync(path.dirname(output),{recursive:true});
  fs.writeFileSync(output,html);
}
fs.writeFileSync(path.join(dest,'404.html'),'<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>페이지를 찾을 수 없습니다</title></head><body style="font:16px/1.8 system-ui;max-width:650px;margin:15vh auto;padding:25px"><h1>페이지를 찾을 수 없습니다.</h1><p><a href="/">포트폴리오로</a> · <a href="/legacy/log/">이전 블로그 글 목록으로</a></p></body></html>');
console.log(`Assembled portfolio, PDF and preserved blog; ${pages.length} old routes checked.`);
