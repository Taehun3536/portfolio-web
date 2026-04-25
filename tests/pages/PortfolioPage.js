export class PortfolioPage {
  constructor(page) {
    this.page = page;
    this.heroTitle = page.locator('h1');
    this.projectsSection = page.locator('#projects');
    this.projectCards = page.locator('.project-card');
  }

  async goto() {
    await this.page.goto('/');
  }

  async getHeroTitleText() {
    return await this.heroTitle.textContent();
  }

  async getProjectCount() {
    return await this.projectCards.count();
  }

  async expectProjectVisible() {
    await this.projectsSection.scrollIntoViewIfNeeded();
    await this.projectCards.first().waitFor({ state: 'visible' });
  }
}
