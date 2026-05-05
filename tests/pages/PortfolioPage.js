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
    this.loadingMessage = page.locator('.loading-container p:has-text("프로젝트 데이터를 불러오는 중입니다")');
    this.errorMessage = page.locator('.error-message');
    this.errorDetail = page.locator('.error-detail');
    this.retryButton = page.locator('.btn-retry');
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
    await this.projectCards.first().waitFor({ state: 'visible', timeout: 15000 });
  }

  async getFirstProjectHref() {
    return await this.projectLinks.first().getAttribute('href');
  }

  async isLoadingMessageVisible() {
    return await this.loadingMessage.isVisible();
  }

  async isErrorMessageVisible() {
    return await this.errorMessage.isVisible();
  }

  async getErrorDetailText() {
    return await this.errorDetail.textContent();
  }

  async clickRetryButton() {
    await this.retryButton.click();
  }

  async getAllProjectHrefs() {
    return await this.projectLinks.allAttribute('href');
  }
}
