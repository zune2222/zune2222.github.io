// A teaching model of the current claim/revision guard, not a running backend.
export function analysisState(scenario, step) {
  const changed=scenario==='stale' && step>=2;
  const revision=changed?2:1;
  const jobRevision=1;
  const current=revision===jobRevision;
  const source=scenario!=='source';
  const finished=step===4;
  const accepted=finished && current && source;
  const status=finished ? (!current?'PENDING':source?'READY':'NEEDS_CONTENT') : changed?'PENDING':step===0?'PENDING':'PROCESSING';
  const labels=['링크 저장','작업 선점','외부 AI 분석','출처·버전 확인',accepted?'결과 반영':!current?'이전 결과 폐기':source?'처리 대기':'본문 보완 요청'];
  const descriptions=[
    '링크와 대기 상태를 DB에 저장합니다. 사용자의 저장 요청은 AI 응답을 기다리지 않습니다.',
    '작업자가 선점 토큰과 내용 버전을 가져갑니다. 분석할 작업을 짧은 DB 트랜잭션 안에서 확정합니다.',
    changed?'분석 중 사용자가 본문을 보완했습니다. 현재 내용은 v2가 되고, 진행 중인 작업은 v1을 기억합니다.':'외부 AI 호출은 DB 트랜잭션 밖에서 수행합니다. 이 그림은 처리 원리를 설명하며 실제 API를 호출하지 않습니다.',
    !current?'작업의 내용 버전 v1과 현재 v2가 다릅니다. 오래된 결과는 최신 내용을 덮어쓸 수 없습니다.':!source?'원문과 같은 콘텐츠의 출처를 확인하지 못했습니다. 읽지 못한 내용으로 요약을 확정하지 않습니다.':'출처를 확인하고 현재 선점 토큰·내용 버전과 비교합니다. 모두 일치해야 결과를 반영합니다.',
    accepted?'현재 작업의 결과만 반영해 READY로 바꿉니다. 링크의 제목·요약·태그를 화면에 표시할 수 있습니다.':!current?'이전 작업의 완료를 무시합니다. 보완한 링크는 PENDING으로 남아 새 분석을 기다립니다.':'NEEDS_CONTENT로 남겨 사용자가 본문을 보완할 수 있게 합니다. 링크 원본은 유지합니다.'
  ];
  return {revision,jobRevision,current,source,accepted,status,title:labels[step],description:descriptions[step]};
}
