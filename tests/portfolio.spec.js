import { test, expect } from '@playwright/test';
import { PortfolioPage } from './pages/PortfolioPage';

test.describe('포트폴리오 E2E 테스트 (POM Pattern)', () => {
  let portfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolioPage = new PortfolioPage(page);
    await portfolioPage.goto();
  });

  test('메인 페이지 헤더 문구 검증', async () => {
    const text = await portfolioPage.getHeroTitleText();
    expect(text).toContain('권태훈');
    expect(text).toContain('구현을 넘어 검증까지');
  });

  test('지정된 3개 프로젝트 카드 렌더링 검증', async () => {
    await portfolioPage.expectProjectVisible();
    const count = await portfolioPage.getProjectCount();
    // 우리가 지정한 3개의 프로젝트가 모두 나오는지 확인
    expect(count).toBeGreaterThanOrEqual(3);
  });
});
