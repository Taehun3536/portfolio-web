import { test, expect } from '@playwright/test';

test('메인 페이지 헤더 문구 확인', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // 권태훈 이름이 포함된 h1 태그 확인
  const title = page.locator('h1');
  await expect(title).toContainText('권태훈');
  await expect(title).toContainText('구현을 넘어 검증까지');
});

test('프로젝트 카드 노출 확인', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Featured Projects 섹션 확인
  const projectsSection = page.locator('#projects');
  await expect(projectsSection).toBeVisible();
  
  // 최소 1개 이상의 프로젝트 카드가 로드되는지 확인
  const projectCards = page.locator('.project-card');
  await expect(projectCards.first()).toBeVisible();
});
