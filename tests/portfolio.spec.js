import { test, expect } from '@playwright/test';
import { PortfolioPage } from './pages/PortfolioPage';

test.describe('포트폴리오 E2E 테스트 (POM Pattern)', () => {
  let portfolioPage;

  test.beforeEach(async ({ page }) => {
    // GitHub API 모킹
    await page.route('https://api.github.com/repos/**', async route => {
      const url = route.request().url();
      const repoName = url.split('/').pop();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 12345,
          name: repoName,
          html_url: `https://github.com/Taehun3536/${repoName}`,
          description: 'Mocked Description',
          stargazers_count: 10,
          language: 'JavaScript'
        }),
      });
    });

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
    const hrefs = await portfolioPage.getAllProjectHrefs();
    for (const href of hrefs) {
      expect(href).toContain('github.com');
    }
  });

  test('히어로 섹션 버튼 클릭 시 프로젝트 섹션 이동 검증', async () => {
    await portfolioPage.clickHeroButton();
    // URL에 #projects 해시가 포함되는지 확인
    expect(portfolioPage.page.url()).toContain('#projects');
  });

  test('반응형 디자인 검증 (Mobile Viewport)', async ({ page }) => {
    // iPhone 13 Pro 사이즈로 조정
    await page.setViewportSize({ width: 390, height: 844 });
    
    // 네비게이션 바가 여전히 표시되는지 확인
    const isNavbarVisible = await page.locator('.navbar').isVisible();
    expect(isNavbarVisible).toBeTruthy();
    
    // 히어로 텍스트가 줄바꿈되어도 잘 보이는지 확인
    const heroText = page.locator('.hero-main-text h3');
    await expect(heroText).toBeVisible();
  });

  test('접근성 검증 (Basic ARIA)', async ({ page }) => {
    // 모든 프로젝트 링크에 aria-label 또는 명확한 텍스트가 있는지 확인
    const links = page.locator('.project-card-link');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const title = await link.locator('h4').textContent();
      expect(title.length).toBeGreaterThan(0);
    }
  });
});
