// 캔버스 애니메이션 관련 함수들
import { Particle } from './Particle';
import { PARTICLE_COUNTS } from './weatherConfig';

// 파티클 초기화
export function initParticles(type, canvas) {
  if (!canvas) return [];
  
  const particles = [];
  const count = PARTICLE_COUNTS[type] || 200;
  
  for (let i = 0; i < count; i++) {
    particles.push(
      new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        type,
        canvas.width,
        canvas.height
      )
    );
  }
  return particles;
}

// 캔버스 크기 조정
export function resizeCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// 애니메이션 렌더링
export function animate(ctx, canvas, particlesRef, mouseRef, animationFrameIdRef) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesRef.current = particlesRef.current.filter(
    (particle) => particle.opacity > 0
  );

  particlesRef.current.forEach((particle) => {
    particle.update(mouseRef.current.x, mouseRef.current.y);
    particle.draw(ctx);
  });

  animationFrameIdRef.current = requestAnimationFrame(() => 
    animate(ctx, canvas, particlesRef, mouseRef, animationFrameIdRef)
  );
}

// 마우스 이벤트 핸들러
export function handleMouseMove(e, mouseRef) {
  mouseRef.current = {
    x: e.clientX,
    y: e.clientY,
  };
}
