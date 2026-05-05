'use client';

import { useState, useEffect } from 'react';

const USERNAME = "Taehun3536";
const REPO_NAMES = ["QA-Study", "Backend-QA-Engineering-Portfolio", "portfolio-web", "web_chatbot"];

const PROJECT_METADATA = {
  "QA-Study": {
    category: "QA",
    title: "QA Test Automation Study",
    description: [
      "Playwright 기반의 UI E2E 및 API 테스트 자동화 연구 프로젝트입니다.",
      "- Playwright를 활용한 시나리오 기반 테스트 자동화 구현",
      "- Page Object Model(POM) 패턴 적용으로 유지보수성 향상"
    ],
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
    tech: "Playwright • Java"
  },
  "Backend-QA-Engineering-Portfolio": {
    category: "QA",
    title: "Backend QA Engineering",
    description: [
      "GCP 인프라와 보안 정책이 적용된 백엔드 프로젝트입니다.",
      "- Spring Boot 기반의 견고한 REST API 설계 및 구현",
      "- JUnit5 및 통합 테스트를 통한 시스템 무결성 검증"
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    tech: "Java • Spring Boot"
  },
  "portfolio-web": {
    category: "Dev",
    title: "GitHub Portfolio Web",
    description: [
      "GitHub API를 연동하여 실시간 데이터를 시각화한 포트폴리오 사이트입니다.",
      "- Next.js 14 App Router 기반의 정적 사이트 최적화",
      "- Vanilla CSS를 활용한 반응형 UI 및 사용자 경험 개선"
    ],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    tech: "Next.js • CSS"
  },
  "web_chatbot": {
    category: "Dev",
    title: "AI Intelligent Web Chatbot",
    description: [
      "Google Gemini API를 활용한 실시간 지능형 챗봇 서비스입니다.",
      "- Gemini Pro 모델 연동 및 스트리밍 응답 시스템 구축",
      "- 프롬프트 엔지니어링을 통한 응답 품질 및 일관성 최적화"
    ],
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80&w=800",
    tech: "React • Gemini API"
  }
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        // Static Export 환경에서는 서버 API Route를 사용할 수 없으므로 브라우저에서 직접 GitHub API 호출
        const responses = await Promise.all(
          REPO_NAMES.map(repoName => 
            fetch(`https://api.github.com/repos/${USERNAME}/${repoName}`, {
              headers: {
                'Accept': 'application/vnd.github.v3+json'
              }
            }).then(res => {
              if (!res.ok) throw new Error(`${repoName} 데이터를 가져오지 못했습니다. (${res.status})`);
              return res.json();
            })
          )
        );

        const formattedProjects = responses.map(repo => {
          const meta = PROJECT_METADATA[repo.name] || {};
          return {
            id: repo.id,
            category: meta.category || "Dev",
            title: meta.title || repo.name,
            description: meta.description || [repo.description],
            image: meta.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
            tech: meta.tech || repo.language || "Engineering",
            url: repo.html_url,
            stars: repo.stargazers_count
          };
        });

        setProjects(formattedProjects);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="projects">
        <div className="loading-container">
          <p>프로젝트 데이터를 불러오는 중입니다...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="projects">
        <div className="error-container">
          <p className="error-message">데이터를 불러오는 데 실패했습니다.</p>
          <p className="error-detail">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-retry">다시 시도</button>
        </div>
      </section>
    );
  }

  const qaProjects = projects.filter(p => p.category === "QA");
  const devProjects = projects.filter(p => p.category === "Dev");

  return (
    <section id="projects" className="projects">
      <h2 className="section-title">Projects</h2>

      <div className="category-group">
        <h3 className="category-title">QA</h3>
        <div className="project-grid">
          {qaProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="category-group">
        <h3 className="category-title">Dev</h3>
        <div className="project-grid">
          {devProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card-link">
      <div className="project-card">
        <div className="project-image-container">
          <img src={project.image} alt={project.title} className="project-image" />
        </div>
        <div className="project-content">
          <h4>{project.title}</h4>
          <div className="project-description">
            {project.description.map((line, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
            ))}
          </div>
          <div className="project-footer">
            <span className="tech-stack">{project.tech}</span>
            {project.stars > 0 && <span className="stars">⭐ {project.stars}</span>}
          </div>
        </div>
      </div>
    </a>
  );
}

