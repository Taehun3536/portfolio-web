import { test, expect } from '@playwright/test';

test.describe('GitHub API 통합 테스트', () => {
  const USERNAME = 'Taehun3536';
  const REPOS = ['QA-Study', 'Backend-QA-Engineering-Portfolio', 'portfolio-web'];

  test('GitHub API 레포지토리 정보 조회 검증', async ({ request }) => {
    for (const repoName of REPOS) {
      const response = await request.get(`https://api.github.com/repos/${USERNAME}/${repoName}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // 로컬 테스트 시에는 process.env.GITHUB_TOKEN이 필요할 수 있습니다.
          ...(process.env.GITHUB_TOKEN && { 'Authorization': `token ${process.env.GITHUB_TOKEN}` })
        }
      });

      expect(response.ok()).toBeTruthy();
      
      const data = await response.json();
      expect(data.name).toBe(repoName);
      expect(data.owner.login).toBe(USERNAME);
      expect(data.html_url).toContain(`github.com/${USERNAME}/${repoName}`);
      
      // 필수 필드 존재 여부 확인 (Schema Validation)
      expect(data).toHaveProperty('stargazers_count');
      expect(data).toHaveProperty('language');
    }
  });
});
