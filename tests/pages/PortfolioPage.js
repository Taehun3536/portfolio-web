export class PortfolioPage {
  constructor(page) {
    this.page = page;
    this.navbarLogo = page.locator('.navbar .logo');
    this.heroTagline = page.locator('.hero-main-text h3');
    this.projectsSection = page.locator('#projects');
    this.categoryTitles = page.locator('.category-title');
    this.projectCards = page.locator('.project-card');
    this.projectLinks = page.locator('.project-card-link');
    this.heroButton = page.locator('.hero-btns .btn-primary');
  }

  async clickHeroButton() {
    await this.heroButton.click();
  }

  async isProjectsSectionInViewport() {
    return await this.projectsSection.isVisible();
  }

  async goto() {
    await this.page.goto('/');
  }

  async getNavbarLogoText() {
    return await this.navbarLogo.textContent();
  }

  async getHeroTaglineText() {
    return await this.heroTagline.textContent();
  }

  async getCategoryTitles() {
    return await this.categoryTitles.allTextContents();
  }

  async getProjectCount() {
    return await this.projectCards.count();
  }

  async expectProjectVisible() {
    await this.projectsSection.scrollIntoViewIfNeeded();
    await this.projectCards.first().waitFor({ state: 'visible' });
  }

  async getFirstProjectHref() {
    return await this.projectLinks.first().getAttribute('href');
  }
}
