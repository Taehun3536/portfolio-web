'use client';

import { useState, useEffect } from 'react';

const USERNAME = "Taehun3536";
const REPO_NAMES = ["QA-Study", "Backend-QA-Engineering-Portfolio", "portfolio-web", "web_chatbot"];

const PROJECT_METADATA = {
  "QA-Study": {
    category: "QA",
    title: "QA Test Automation Study",
    description: [
      "Playwright 기반의 UI E2E 및 API 테스트 자동화 연구 프로세스입니다.",
      "• Playwright를 활용한 시나리오 기반 테스트 자동화 구현",
      "• Page Object Model(POM) 패턴을 적용한 코드 재사용성 최적화"
    ],
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
    tech: "Playwright • Java"
  },
  "Backend-QA-Engineering-Portfolio": {
    category: "QA",
    title: "Backend QA Engineering",
    description: [
      "GCP 인프라 기반의 보안 정책이 적용된 고신뢰성 백엔드 시스템입니다.",
      "• Spring Boot를 활용한 견고한 비즈니스 로직 및 REST API 설계",
      "• JUnit5 및 통합 테스트를 통한 무결성 검증 프로세스 구축"
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    tech: "Java • Spring Boot"
  },
  "portfolio-web": {
    category: "Dev",
    title: "GitHub Portfolio Web",
    description: [
      "GitHub API와 Next.js를 연동하여 실시간 프로젝트 데이터를 시각화한 웹사이트입니다.",
      "• Next.js 14 App Router를 활용한 성능 최적화 및 SEO 강화",
      "• Vanilla CSS 및 반응형 디자인을 통한 직관적인 UI/UX 제공"
    ],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    tech: "Next.js • CSS"
  },
  "web_chatbot": {
    category: "Dev",
    title: "AI Intelligent Web Chatbot",
    description: [
      "Google Gemini API를 연동하여 실시간 대화가 가능한 지능형 챗봇 서비스입니다.",
      "• Gemini Pro 모델을 활용한 자연어 처리 및 지능형 응답 시스템 구현",
      "• 프롬프트 엔지니어링 최적화를 통한 답변 정확도 및 일관성 확보"
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
              <p key={index}>{line}</p>
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

