import { test, expect } from '@playwright/test';
import { PortfolioPage } from './pages/PortfolioPage';

test.describe('예외 상황 및 엣지 케이스 테스트 고도화', () => {
  let portfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolioPage = new PortfolioPage(page);
  });

  test('GitHub API 호출 실패 시 (500 에러) 에러 UI 검증', async ({ page }) => {
    await page.route('**/api/projects', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error (500)' }),
      });
    });

    await portfolioPage.goto();
    
    // 에러 메시지 확인
    await expect(portfolioPage.errorMessage).toBeVisible();
    const detail = await portfolioPage.getErrorDetailText();
    expect(detail).toContain('500');
  });

  test('GitHub API Rate Limit 초과 시 (403 에러) 대응 검증', async ({ page }) => {
    await page.route('**/api/projects', async route => {
      await route.fulfill({
        status: 403,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'API rate limit exceeded (403)' }),
      });
    });

    await portfolioPage.goto();
    await expect(portfolioPage.errorMessage).toBeVisible();
    expect(await portfolioPage.getErrorDetailText()).toContain('403');
  });

  test('네트워크 지연 상황 (Slow Network) 로딩 상태 검증', async ({ page }) => {
    await page.route('**/api/projects', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.continue();
    });

    await portfolioPage.goto();
    
    // 로딩 메시지 확인
    await expect(portfolioPage.loadingMessage).toBeVisible();
    
    // 이후 데이터가 로드되는지 확인
    await portfolioPage.expectProjectVisible();
  });

  test('다시 시도 버튼 동작 검증', async ({ page }) => {
    let callCount = 0;
    await page.route('**/api/projects', async route => {
      callCount++;
      if (callCount === 1) { 
        await route.fulfill({ status: 500, body: JSON.stringify({ error: 'Fail' }) });
      } else {
        await route.continue();
      }
    });

    await portfolioPage.goto();
    await expect(portfolioPage.errorMessage).toBeVisible();
    
    // 다시 시도 클릭 (페이지 새로고침 시뮬레이션이므로 route 가 다시 설정됨)
    // 실제 Projects.js 에서는 window.location.reload()를 호출함
    // Playwright에서는 reload()를 직접 호출하거나 버튼 클릭을 기다릴 수 있음
    await portfolioPage.clickRetryButton();
    
    // 두 번째 시도에서는 성공해야 함 (새로고침 후 다시 route가 동작함)
    await portfolioPage.expectProjectVisible();
    expect(await portfolioPage.getProjectCount()).toBeGreaterThan(0);
  });
});
