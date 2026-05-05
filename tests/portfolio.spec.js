import { test, expect } from '@playwright/test';
import { PortfolioPage } from './pages/PortfolioPage';

test.describe('포트폴리오 E2E 테스트 (POM Pattern)', () => {
  let portfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();
  });

  test('네비게이션 바 로고 문구 검증', async () => {
    const logoText = await portfolioPage.getNavbarLogoText();
    expect(logoText).toBe('Engineer Portfolio');
  });

  test('메인 페이지 태그라인 문구 검증', async () => {
    const text = await portfolioPage.getHeroTaglineText();
    expect(text).toContain('권태훈');
    expect(text).toContain('구현을 넘어 검증까지');
  });

  test('프로젝트 카테고리 및 카드 렌더링 검증', async () => {
    await portfolioPage.expectProjectVisible();
    
    // 카테고리 확인
    const categories = await portfolioPage.getCategoryTitles();
    expect(categories).toContain('QA');
    expect(categories).toContain('Dev');

    // 프로젝트 개수 확인
    const count = await portfolioPage.getProjectCount();
    expect(count).toBeGreaterThanOrEqual(3);

    // 프로젝트 카드가 깃허브 링크인지 확인
    const href = await portfolioPage.getFirstProjectHref();
    expect(href).toContain('github.com');
  });

  test('히어로 섹션 버튼 클릭 시 프로젝트 섹션 이동 검증', async () => {
    await portfolioPage.clickHeroButton();
    // URL에 #projects 해시가 포함되는지 확인
    expect(portfolioPage.page.url()).toContain('#projects');
  });
});
