// 서버 컴포넌트: 보안을 위해 서버에서 GitHub API를 호출합니다.
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = "Taehun3536";

// 사용자 맞춤 메타데이터 (이미지 및 전문적인 상세 설명)
const PROJECT_METADATA = {
  "QA-Study": {
    title: "QA Test Automation Study",
    description: "실무 QA 경험(1년 5개월)을 바탕으로 수동 테스트를 Playwright로 자동화한 프로젝트입니다. POM 패턴을 적용한 UI E2E 테스트와 API 통합 테스트를 구현하며, 반복적인 Smoke Test의 공수 절감을 목표로 학습한 결과물입니다.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
    tech: "Java 17 • Playwright • JUnit5"
  },
  "Backend-QA-Engineering-Portfolio": {
    title: "Backend QA Engineering",
    description: "결함 예방(Defect Prevention) 관점에서 백엔드 로직을 설계하고 검증한 포트폴리오입니다. GCP Cloud Storage 기반의 미디어 에셋 처리 로직과 가변 만료 시간 보안 정책을 구현하였으며, AssertJ와 Mockito를 활용한 정밀한 화이트박스 테스팅을 수행했습니다.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    tech: "Spring Boot 3.x • GCP • AssertJ"
  }
};

const REPO_NAMES = Object.keys(PROJECT_METADATA);

async function getSpecificProjects() {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
  };

  try {
    const responses = await Promise.all(
      REPO_NAMES.map(repoName => 
        fetch(`https://api.github.com/repos/${USERNAME}/${repoName}`, { 
          headers,
          next: { revalidate: 3600 } 
        }).then(res => {
          if (!res.ok) throw new Error(`${repoName} 데이터를 가져오지 못했습니다.`);
          return res.json();
        })
      )
    );

    return responses.map(repo => {
      const meta = PROJECT_METADATA[repo.name];
      return {
        id: repo.id,
        title: meta.title || repo.name,
        description: meta.description || repo.description,
        image: meta.image,
        tech: meta.tech || repo.language || "Engineering",
        url: repo.html_url,
        stars: repo.stargazers_count
      };
    });
  } catch (error) {
    console.error("GitHub API 호출 에러:", error);
    return [];
  }
}

export default async function Projects() {
  const projects = await getSpecificProjects();

  if (projects.length === 0) {
    return <section className="projects"><p>프로젝트 데이터를 불러오는 중입니다...</p></section>;
  }

  return (
    <section id="projects" className="projects">
      <h2>Featured Projects</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-image-container">
              <img src={project.image} alt={project.title} className="project-image" />
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-footer">
                <span className="tech-stack">{project.tech}</span>
                <div className="project-meta">
                  {project.stars > 0 && <span className="stars">⭐ {project.stars}</span>}
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-github">
                    GitHub →
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
