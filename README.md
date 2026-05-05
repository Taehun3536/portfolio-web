# 🚀 Backend QA Engineer Portfolio

구현을 넘어 검증까지, 품질의 가치를 코드로 증명하는 **권태훈**의 포트폴리오 웹사이트입니다.
Java/Spring Boot 기반의 백엔드 개발 역량과 Playwright를 이용한 테스트 자동화 전문성을 시각화했습니다.

## 🔗 Live Demo
- **GitHub**: [github.com/Taehun3536](https://github.com/Taehun3536)

## ✨ 주요 특징

### 1. 기술 중심의 프로젝트 큐레이션
- **QA & Test Automation**: Playwright 기반의 UI E2E 및 API 테스트 자동화 연구 (`QA-Study`).
- **Backend Engineering**: GCP 연동 및 보안 정책이 적용된 백엔드 시스템 설계 (`Backend-QA-Engineering-Portfolio`).
- **Web Development**: Next.js 14 App Router와 GitHub API를 연동한 모던 웹 아키텍처.

### 2. 품질 우선주의 (Quality First)
- **Playwright Test Suite**: POM(Page Object Model) 패턴을 적용한 견고한 E2E 테스트 환경 구축.
- **API Reliability**: Mocking 및 통합 테스트를 통한 외부 API 의존성 검증.
- **CI/CD Pipeline**: GitHub Actions를 통해 모든 커밋에 대한 테스트 자동화 및 배포 수행.

### 3. 성능 및 최적화
- **Static Site Generation (SSG)**: Next.js의 정적 내보내기 기능을 활용한 빠른 로딩 속도.
- **Responsive Design**: 다양한 디바이스(Desktop, Tablet, Mobile)를 지원하는 반응형 UI.

## 🛠 기술 스택

- **Backend**: Java, Spring Boot
- **Frontend**: Next.js 14, React, Vanilla CSS
- **QA/Testing**: Playwright, JUnit
- **DevOps**: GitHub Actions, GCP, GitHub Pages

## 🚀 시작하기

### 1. 환경 설정
`.env.local` 파일을 생성하고 GitHub Personal Access Token을 설정합니다.
```env
GITHUB_TOKEN=your_github_token_here
```

### 2. 의존성 설치 및 실행
```bash
npm install
npm run dev
```

## 🧪 테스트 고도화

본 프로젝트는 단순한 포트폴리오를 넘어, 테스트 자동화의 모범 사례를 지향합니다.

### 실행 방법
```bash
# 전체 E2E 및 API 테스트 실행
npm test

# 특정 브라우저(chromium)에서 실행
npx playwright test --project=chromium

# 테스트 리포트 확인
npx playwright show-report
```

### 테스트 시나리오
- **정상 케이스**: 메인 페이지 렌더링, 섹션 이동, GitHub API 연동 데이터 검증.
- **예외 케이스**: API 호출 실패(404, 500) 시 폴백(Fallback) UI 확인, 모바일 환경 UI 적응성 검증.
- **성능/보안**: API 응답 속도 및 필수 필드 유효성 검증.

## 📁 프로젝트 구조
```text
src/
├── app/          # Next.js App Router (Layout, Styles)
├── components/   # 재사용 가능한 UI 컴포넌트 (Hero, Projects, etc.)
tests/
├── pages/        # POM (Page Object Model) 정의
├── portfolio.spec.js  # E2E 테스트 시나리오
└── api.spec.js        # API 통합 테스트 시나리오
```

---
Built with ☕ and ❤️ by **Kwon Tae-hun**
