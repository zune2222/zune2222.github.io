// Particle 클래스 - 각종 날씨 효과를 위한 파티클
export class Particle {
  constructor(x, y, type, canvasWidth, canvasHeight) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.speed = Math.random() * 0.5 + 0.2;
    this.radius = Math.random() * 2 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.opacity = 1;
    this.fadeOut = false;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.originalOpacity = 1;
    this.originalRadius = this.radius;
    this.twinkleSpeed = Math.random() * 0.03 + 0.01; // 반짝임 속도
    this.twinklePhase = Math.random() * Math.PI * 2; // 반짝임 위상
    // 별들을 화면 상단 2/3 영역에만 배치
    this.y = Math.random() * (canvasHeight * 0.7);
    // 색상 랜덤 선택 (흰색, 연한 파랑, 연한 노랑)
    this.color = [
      [255, 255, 255], // 흰색
      [200, 220, 255], // 연한 파랑
      [255, 255, 200], // 연한 노랑
    ][Math.floor(Math.random() * 3)];

    // 타입별 초기화
    this.initializeByType(type, canvasWidth, canvasHeight);
  }

  initializeByType(type, canvasWidth, canvasHeight) {
    switch (type) {
      case "cloud":
        this.initCloud(canvasHeight);
        break;
      case "sun":
        this.initSun(canvasWidth);
        break;
      case "rain":
        this.initRain();
        break;
      case "star":
        this.initStar(canvasHeight);
        break;
    }
  }

  initCloud(canvasHeight) {
    this.radius = Math.random() * 40 + 30; // 약간 더 작게
    this.speed = Math.random() * 0.15 - 0.075; // 더 천천히
    this.opacity = Math.random() * 0.2 + 0.15; // 더 투명하게
    this.originalOpacity = this.opacity;
    this.y = Math.random() * (canvasHeight / 3);
    // 구름의 모양을 위한 추가 속성
    this.subClouds = [
      { x: 0, y: 0, r: this.radius }, // 메인 구름
      { x: -this.radius * 0.5, y: -this.radius * 0.2, r: this.radius * 0.7 },
      { x: this.radius * 0.5, y: -this.radius * 0.3, r: this.radius * 0.6 },
      { x: -this.radius * 0.8, y: -this.radius * 0.1, r: this.radius * 0.5 },
      { x: this.radius * 0.8, y: this.radius * 0.1, r: this.radius * 0.6 },
      { x: this.radius * 0.2, y: this.radius * 0.15, r: this.radius * 0.7 },
      { x: -this.radius * 0.3, y: this.radius * 0.15, r: this.radius * 0.6 },
    ];
  }

  initSun(canvasWidth) {
    this.radius = Math.random() * 1.5 + 0.5; // 약간 두께 업
    this.speed = Math.random() * 0.5 + 0.2; // 약간 빠르게
    this.opacity = Math.random() * 0.3 + 0.15; // 좀 더 선명하게
    this.originalOpacity = this.opacity;
    this.angle = Math.random() * Math.PI; // 0 ~ 180도
    this.length = Math.random() * 200 + 100; // 광선 길이
    // 시작 위치를 화면 상단으로
    this.y = -this.length;
    this.x = Math.random() * canvasWidth;
  }

  initRain() {
    this.length = Math.random() * 30 + 20; // 더 긴 빗줄기
    this.speed = Math.random() * 8 + 5; // 더 느린 속도 (15+10 → 8+5)
    this.opacity = Math.random() * 0.4 + 0.2; // 더 선명하게
    this.thickness = Math.random() * 2 + 1; // 더 두꺼운 빗줄기
    this.originalOpacity = this.opacity;
    this.splashed = false;
    this.splashSize = 0;
    this.maxSplashSize = Math.random() * 4 + 3; // 더 큰 물방울 크기
  }

  initStar(canvasHeight) {
    this.radius = Math.random() * 1 + 0.3; // 더 작은 별
    this.originalRadius = this.radius;
    this.speed = Math.random() * 0.2 + 0.1;
    this.opacity = Math.random() * 0.4 + 0.1; // 더 은은하게
    this.originalOpacity = this.opacity;
    this.twinkleSpeed = Math.random() * 0.008 + 0.002; // 더욱 천천히 반짝이도록
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.glowSize = Math.random() * 2 + 1.5; // 더 작은 빛나는 효과
    this.y = Math.random() * canvasHeight * 0.9;
    // 대부분 흰색으로
    this.color =
      Math.random() > 0.1
        ? [255, 255, 255] // 90% 확률로 흰색
        : [255, 255, Math.random() > 0.5 ? 220 : 200]; // 10% 확률로 약간 노란빛이나 푸른빛
  }

  update(mouseX, mouseY) {
    if (this.fadeOut) {
      this.opacity -= 0.02;
      return;
    }

    switch (this.type) {
      case "sun":
        this.updateSun(mouseX, mouseY);
        break;
      case "cloud":
        this.updateCloud(mouseX, mouseY);
        break;
      case "rain":
        this.updateRain(mouseX, mouseY);
        break;
      case "star":
        this.updateStar(mouseX, mouseY);
        break;
      default:
        this.updateDefault(mouseX, mouseY);
    }
  }

  updateSun(mouseX, mouseY) {
    // 수직으로 내려오는 움직임
    this.y += this.speed;

    // 마우스와의 상호작용
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      // 마우스 근처에서 빛나는 효과
      this.opacity = Math.min(0.6, this.opacity + 0.05);
    } else {
      // 원래 투명도로 복귀
      this.opacity += (this.originalOpacity - this.opacity) * 0.1;
    }

    // 화면 아래로 나가면 위에서 다시 시작
    if (this.y > this.canvasHeight) {
      this.y = -this.length;
      this.x = Math.random() * this.canvasWidth;
    }
  }

  updateCloud(mouseX, mouseY) {
    // 기본 수평 이동
    this.x += this.speed;

    // 마우스와의 상호작용
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const interactionRadius = this.radius * 3; // 상호작용 범위

    if (distance < interactionRadius) {
      // 마우스로부터 멀어지는 방향으로 이동
      const angle = Math.atan2(dy, dx);
      const pushForce = (interactionRadius - distance) / interactionRadius; // 거리에 따른 힘 조절

      this.x -= Math.cos(angle) * pushForce * 2;
      this.y -= Math.sin(angle) * pushForce * 2;

      // 투명도 살짝 변경
      this.opacity = Math.min(1, this.opacity + 0.02);
    } else {
      // 원래 투명도로 천천히 복귀
      this.opacity += (this.originalOpacity - this.opacity) * 0.1;
    }

    // 화면 밖으로 나가면 반대편에서 다시 등장
    if (this.x > this.canvasWidth + this.radius) {
      this.x = -this.radius;
      this.y = Math.random() * (this.canvasHeight / 3);
    }
    if (this.x < -this.radius) {
      this.x = this.canvasWidth + this.radius;
      this.y = Math.random() * (this.canvasHeight / 3);
    }

    // y 위치 제한 (화면 상단 1/3 영역 내에서만 움직이도록)
    this.y = Math.max(this.radius, Math.min(this.canvasHeight / 3, this.y));
  }

  updateRain(mouseX, mouseY) {
    if (this.splashed) {
      // 물방울 효과 업데이트
      this.splashSize += 0.2; // 더 천천히 퍼짐
      this.opacity -= 0.02; // 더 천천히 사라짐
      return;
    }

    this.y += this.speed;
    this.x += this.speed * 0.05; // 더 수직에 가깝게 (0.1 → 0.05)

    // 마우스와의 상호작용
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 50) {
      // 마우스 근처에서 빗줄기가 휘어짐
      this.x += dx * 0.02;
      this.y += dy * 0.02;
      this.opacity = Math.min(0.9, this.opacity + 0.1);
    } else {
      this.opacity += (this.originalOpacity - this.opacity) * 0.1;
    }

    // 바닥에 닿으면 물방울 효과 시작
    if (this.y > this.canvasHeight) {
      this.splashed = true;
      this.y = this.canvasHeight;
      this.opacity = this.originalOpacity * 3; // 더 선명한 물방울
      this.splashSize = 2; // 시작 크기 증가
    }
  }

  updateStar(mouseX, mouseY) {
    // 반짝이는 효과
    this.twinklePhase += this.twinkleSpeed;
    const twinkle = Math.sin(this.twinklePhase) * 0.5 + 0.5;
    this.opacity = this.originalOpacity * (0.5 + twinkle * 0.5);
    this.radius = this.originalRadius * (0.8 + twinkle * 0.4);

    // 마우스와의 상호작용
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      // 마우스 근처에서 더 밝게 빛나기
      this.opacity = Math.min(1, this.opacity + 0.3);
      this.radius = this.originalRadius * 1.5;
    }
  }

  updateDefault(mouseX, mouseY) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      this.x += dx * 0.01;
      this.y += dy * 0.01;
    }

    this.y += this.speed;

    if (this.y > this.canvasHeight) {
      this.y = 0;
      this.x = Math.random() * this.canvasWidth;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    
    switch (this.type) {
      case "sun":
        this.drawSun(ctx);
        break;
      case "cloud":
        this.drawCloud(ctx);
        break;
      case "rain":
        this.drawRain(ctx);
        break;
      case "star":
        this.drawStar(ctx);
        break;
      case "snow":
        this.drawSnow(ctx);
        break;
    }
    
    ctx.closePath();
  }

  drawSun(ctx) {
    // 태양광선 그리기
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);

    // 시간대에 따른 태양광선 색상 변경
    const hours = new Date().getHours();
    let sunColor;
    if (hours < 8) {
      sunColor = [255, 190, 150]; // 이른 아침: 부드러운 복숭아색
    } else if (hours < 11) {
      sunColor = [255, 210, 120]; // 아침: 따뜻한 노란색
    } else if (hours < 14) {
      sunColor = [255, 240, 180]; // 정오: 밝은 노란색
    } else if (hours < 17) {
      sunColor = [255, 225, 140]; // 오후: 황금색
    } else {
      sunColor = [255, 180, 120]; // 저녁: 주황색
    }
    
    // 그라데이션 효과
    const gradient = ctx.createLinearGradient(
      this.x,
      this.y,
      this.x,
      this.y + this.length
    );
    gradient.addColorStop(0, `rgba(${sunColor[0]}, ${sunColor[1]}, ${sunColor[2]}, 0)`);
    gradient.addColorStop(0.5, `rgba(${sunColor[0]}, ${sunColor[1]}, ${sunColor[2]}, ${this.opacity})`);
    gradient.addColorStop(1, `rgba(${sunColor[0]}, ${sunColor[1]}, ${sunColor[2]}, 0)`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = this.radius;
    ctx.stroke();
  }

  drawCloud(ctx) {
    const x = this.x;
    const y = this.y;

    // 구름의 외부 빛나는 효과
    const outerGlow = ctx.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      this.radius * 1.5
    );
    outerGlow.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.3})`);
    outerGlow.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.beginPath();
    ctx.fillStyle = outerGlow;
    ctx.arc(x, y, this.radius * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // 각 부분 구름 그리기
    this.subClouds.forEach((cloud) => {
      const cloudX = x + cloud.x;
      const cloudY = y + cloud.y;

      // 각 부분의 그라데이션
      const gradient = ctx.createRadialGradient(
        cloudX,
        cloudY,
        0,
        cloudX,
        cloudY,
        cloud.r
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 1.2})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${this.opacity * 0.8})`);

      // 부드러운 그림자 효과
      ctx.shadowColor = "rgba(0, 0, 0, 0.05)";
      ctx.shadowBlur = cloud.r * 0.3;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = cloud.r * 0.1;

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(cloudX, cloudY, cloud.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // 그림자 초기화
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  drawRain(ctx) {
    if (this.splashed) {
      // 물방울 그리기
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.splashSize * this.maxSplashSize
      );
      gradient.addColorStop(0, `rgba(174, 194, 224, ${this.opacity})`);
      gradient.addColorStop(
        0.5,
        `rgba(174, 194, 224, ${this.opacity * 0.5})`
      );
      gradient.addColorStop(1, `rgba(174, 194, 224, 0)`);

      ctx.beginPath();
      ctx.arc(
        this.x,
        this.y,
        this.splashSize * this.maxSplashSize,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = gradient;
      ctx.fill();
    } else {
      // 빗줄기 그리기
      const gradient = ctx.createLinearGradient(
        this.x,
        this.y,
        this.x + this.speed * 0.05,
        this.y + this.length
      );
      gradient.addColorStop(0, `rgba(174, 194, 224, 0)`);
      gradient.addColorStop(0.5, `rgba(174, 194, 224, ${this.opacity})`);
      gradient.addColorStop(1, `rgba(174, 194, 224, 0)`);

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.speed * 0.05, this.y + this.length);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = this.thickness;
      ctx.stroke();
    }
  }

  drawStar(ctx) {
    const [r, g, b] = this.color;

    // 중심 별 먼저 그리기
    ctx.globalCompositeOperation = "screen";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity * 1.2})`;
    ctx.fill();

    // 부드러운 빛나는 효과
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius * this.glowSize
    );
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.5})`);
    gradient.addColorStop(
      0.5,
      `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.1})`
    );
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * this.glowSize, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.globalCompositeOperation = "source-over";
  }

  drawSnow(ctx) {
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
    ctx.fill();
  }
}
