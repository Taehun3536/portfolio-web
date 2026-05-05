import { test, expect } from '@playwright/test';

test.describe('GitHub API 통합 테스트 고도화', () => {
  const USERNAME = 'Taehun3536';
  const REPOS = ['QA-Study', 'Backend-QA-Engineering-Portfolio', 'portfolio-web', 'web_chatbot'];

  test('GitHub API 레포지토리 정보 상세 검증', async ({ request }) => {
    for (const repoName of REPOS) {
      const response = await request.get(`https://api.github.com/repos/${USERNAME}/${repoName}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && { 'Authorization': `token ${process.env.GITHUB_TOKEN}` })
        }
      });

      expect(response.status()).toBe(200);
      
      const data = await response.json();
      
      // 기본 정보 검증
      expect(data.name).toBe(repoName);
      expect(data.owner.login).toBe(USERNAME);
      expect(data.html_url).toBe(`https://github.com/${USERNAME}/${repoName}`);
      
      // 데이터 타입 및 필수 필드 검증 (Strict Schema Check)
      expect(typeof data.id).toBe('number');
      expect(typeof data.stargazers_count).toBe('number');
      expect(data.stargazers_count).toBeGreaterThanOrEqual(0);
      expect(data.visibility).toBe('public');
      
      // 토픽 또는 언어 정보 확인 (존재하는 경우)
      if (data.language) {
        expect(typeof data.language).toBe('string');
      }
    }
  });

  test('존재하지 않는 레포지토리 접근 시 404 응답 검증', async ({ request }) => {
    const response = await request.get(`https://api.github.com/repos/${USERNAME}/non-existent-repo`);
    expect(response.status()).toBe(404);
  });

  test('잘못된 사용자명 접근 시 404 응답 검증', async ({ request }) => {
    const response = await request.get(`https://api.github.com/users/this-user-should-not-exist-123456789`);
    expect(response.status()).toBe(404);
  });

  test('API 응답 헤더 검증', async ({ request }) => {
    const response = await request.get(`https://api.github.com/repos/${USERNAME}/${REPOS[0]}`);
    const headers = response.headers();
    
    // GitHub API는 content-type으로 application/json을 반환해야 함
    expect(headers['content-type']).toContain('application/json');
    // 캐싱 관련 헤더 존재 확인
    expect(headers['cache-control']).toBeDefined();
  });
});
