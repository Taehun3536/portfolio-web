'use client';

import { useState, useEffect } from 'react';

const PROJECT_METADATA = {
  "QA-Study": {
    category: "QA",
    title: "QA Test Automation Study",
    description: "Playwright 기반의 UI E2E 및 API 테스트 자동화 프로젝트입니다. POM 패턴을 적용하여 테스트 효율을 높였습니다.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
    tech: "Playwright • Java"
  },
  "Backend-QA-Engineering-Portfolio": {
    category: "QA",
    title: "Backend QA Engineering",
    description: "GCP 연동 및 보안 정책이 포함된 백엔드 시스템입니다. 정밀한 테스트를 통해 결함 없는 시스템을 구축했습니다.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    tech: "Java • Spring Boot"
  },
  "portfolio-web": {
    category: "Dev",
    title: "My GitHub Portfolio Web",
    description: "Next.js 서버 컴포넌트와 GitHub API를 연동한 포트폴리오 사이트입니다. 깔끔한 UI와 실시간 데이터 연동에 집중했습니다.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    tech: "Next.js • CSS"
  },
  "web_chatbot": {
    category: "Dev",
    title: "AI Web Chatbot",
    description: "Google Gemini API를 연동하여 실시간 대화가 가능한 챗봇 서비스입니다. 프롬프트 엔지니어링을 통해 지능적인 응답 시스템을 구축했습니다.",
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
        // 내부 API 프록시 호출
        const res = await fetch('/api/projects');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || '프로젝트 데이터를 가져오는 데 실패했습니다.');
        }

        const formattedProjects = data.map(repo => {
          const meta = PROJECT_METADATA[repo.name] || {};
          return {
            id: repo.id,
            category: meta.category || "Dev",
            title: meta.title || repo.name,
            description: meta.description || repo.description,
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
          <p className="project-description">{project.description}</p>
          <div className="project-footer">
            <span className="tech-stack">{project.tech}</span>
            {project.stars > 0 && <span className="stars">⭐ {project.stars}</span>}
          </div>
        </div>
      </div>
    </a>
  );
}
