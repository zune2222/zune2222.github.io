# 박준이 포트폴리오 · zun2log

- 포트폴리오: https://zune2222.github.io/
- PDF: https://zune2222.github.io/portfolio.pdf
- 이전 블로그: https://zune2222.github.io/legacy/

## 수정과 배포

포트폴리오 원고는 `portfolio/content.json`, 웹 스타일은 `portfolio/style.css`, PDF 스타일은 `portfolio/print.css`입니다. `main` push 시 GitHub Actions가 포트폴리오와 기존 Next.js 블로그를 함께 배포합니다. 기존 블로그 소스와 글은 원래 경로에 보존하고 `next.config.js`의 `/legacy` basePath로 빌드합니다. 기존 `/posts/`, `/log/`, `/memory/` 접근은 해당 이전 블로그 경로로 연결합니다.

```sh
npm ci
npx next build
node portfolio/build.mjs
node scripts/assemble-site.mjs
node scripts/check-site.mjs
python3 -m http.server 8765 --directory dist
```

PDF 갱신은 위 서버 실행 뒤 Playwright를 사용할 수 있는 Node 환경에서 `node scripts/render-portfolio.mjs`를 실행합니다. `portfolio/portfolio.pdf`를 웹과 함께 배포합니다. 전체 HTML과 PDF는 같은 원고를 사용합니다.

## 일러스트

처리 원리를 설명하는 모형은 Anatomy SVG kit를 사용했습니다. `portfolio/vendor/ANATOMY-LICENSE`에 MIT 라이선스를 보존했습니다. 실제 AI API 호출이나 성능 측정 시뮬레이터가 아닙니다.

---

## 이전 블로그 README

# zun2log

---

## 박준이의 블로그

"zun2log"은 제가 개발한 개인 블로그입니다. 이 블로그는 제 관심사와 취향을 반영하며, 디자인, 기획, 기능, 그림, 애니메이션 등 제가 좋아하는 모든 것들로 가득 차 있습니다.

### 주요 특징

- 화려한 디자인과 동시에 적절한 애니메이션 효과를 통해 사용자에게 시각적으로 풍부한 경험을 제공합니다.
- 모든 그림은 박준이가 직접 그린 것으로, 블로그 내에서 그림 작품을 감상할 수 있습니다.
- 일반적이지 않은 네비게이션 바를 통해 블로그를 탐색하고 손쉽게 원하는 콘텐츠를 찾을 수 있습니다.

### 기술 스택

이 프로젝트는 다음 기술 스택을 사용하여 개발되었습니다:

- [Next.js](https://nextjs.org/): 빠르고 강력한 리액트 프레임워크를 기반으로 한 웹 애플리케이션 개발 플랫폼.
- ContentLayer: 내용 관리 시스템 (CMS)으로 사용되며, 블로그 콘텐츠를 관리하고 게시하는 데 사용됩니다.
- [GitHub Pages](https://pages.github.com/): 프로젝트를 호스팅하고 무료로 배포하는 데 사용됩니다.
- [react-spring](https://www.react-spring.io/): 웹 애니메이션을 만들기 위한 리액트 애니메이션 라이브러리.

### 블로그

블로그에 접속하기! [블로그 바로가기](https://zune2222.github.io)를 방문하세요.

---

## 📋 Release Notes

### Version 1.1.0 (2025-06-11)

![Main Page](https://github.com/zune2222/zune2222.github.io/assets/57588269/main-page-v1.1.0.png)
_실시간 날씨 기반 동적 배경 시스템_

![Blog List](https://github.com/zune2222/zune2222.github.io/assets/57588269/blog-list-v1.1.0.png)
_13개의 기술 블로그 글이 포함된 블로그 목록_

#### ✨ 새로운 기능

- **실시간 날씨 기반 배경 시스템**: 부산 지역 날씨에 따라 메인 페이지 배경과 파티클 애니메이션이 자동으로 변경됩니다
  - 맑은 날: 파란 하늘과 태양
  - 비/눈: 실제 날씨에 맞는 파티클 애니메이션
  - 밤: 별이 빛나는 밤하늘
- **AI 기반 블로그 작성 워크플로우**: MCP 도구를 활용한 완전 자동화된 블로그 글 작성 및 배포 시스템
- **Google Analytics 통합**: GA4를 통한 방문자 통계 추적
- **Google Search Console 연동**: 검색 엔진 최적화를 위한 사이트 인증

#### 🛠️ 개선사항

- **빌드 시스템 안정화**: GitHub Actions 워크플로우 최적화로 배포 안정성 향상
- **반응형 디자인 개선**: 다양한 화면 크기에서의 사용자 경험 향상
- **페이지 로딩 속도 최적화**: Next.js 이미지 최적화 및 우선순위 로딩 적용

#### 📝 새로운 콘텐츠

- **Log #12**: "한 줄의 polyfill이 살린 React Native STOMP 연결" - React Native 개발 경험담
- **Log #13**: "Claude Code와 Cursor를 동시에 사용해서 개발 속도 2배 향상" - AI 도구 활용법

#### 🐛 버그 수정

- 메인 페이지 로고 이미지 가시성 문제 해결 (z-index 레이어링 이슈)
- GitHub Actions 빌드 실패 문제 해결 (워크플로우 명령어 수정)
- SEO 관련 빌드 오류 수정

#### 🎨 UI/UX 개선

- Travel Button 네비게이션 최적화 (Bitcoin 링크 제거, 3개 항목으로 조정)
- 블로그 카드 디자인 통일성 향상
- 캔버스 애니메이션과 콘텐츠 레이어링 최적화

#### 🔧 기술적 개선

- **MCP 도구 생태계 구축**:
  - File System Tools: 로컬 파일 관리 자동화
  - GitHub Integration Tools: 원클릭 배포 시스템
  - Browser Automation Tools: 실시간 배포 상태 모니터링
- **Knowledge Graph 시스템**: 블로그 개발 과정 및 워크플로우 문서화
- **ContentLayer 설정 최적화**: MDX 파일 처리 성능 향상

#### 📊 현재 상태

- **총 블로그 글**: 13개 (기술 블로그 위주)
- **빌드 상태**: ✅ 안정적 배포 (GitHub Actions)
- **접근성**: ✅ Google Search Console 인증 완료
- **모니터링**: ✅ Google Analytics 4 연동

---

### 작성자

- 박준이
  - GitHub: [zune2222](https://github.com/zune2222)
  - 이메일: [zun_e@kakao.com](mailto:zun_e@kakao.com)

---

# Jun's Blog

"zun2log" is a personal blog developed by me, Jun. This blog is a reflection of my interests and preferences, filled with everything I love, including design, planning, features, artwork, animations, and more.

### Key Features

- Offers a visually rich experience to users with a combination of dazzling design and appropriate animation effects.
- All artwork featured on the blog is hand-drawn by me, and you can enjoy these artistic creations.
- Features an unconventional navigation bar for easy exploration of the blog and quick access to desired content.

### Technology Stack

This project was developed using the following technology stack:

- [Next.js](https://nextjs.org/): A fast and powerful React framework for web application development.
- ContentLayer: Used as a content management system (CMS) for managing and publishing blog content.
- [GitHub Pages](https://pages.github.com/): Used for hosting and free deployment of the project.
- [react-spring](https://www.react-spring.io/): A React animation library for creating web animations.

### Demo

To check out a my blog, visit the [Blog](https://zune2222.github.io)

### Contribution

If you'd like to contribute to this project, fork the GitHub repository and submit a pull request. Suggestions for improvements or bug reports are also welcome.

### Author

- Jun
  - GitHub: [zune2222](https://github.com/zune2222)
  - Email: [zun_e@kakao.com](mailto:zun_e@kakao.com)
