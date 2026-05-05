import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = "Taehun3536";
const REPOS = ["QA-Study", "Backend-QA-Engineering-Portfolio", "portfolio-web", "web_chatbot"];

export async function GET() {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
  };

  try {
    const responses = await Promise.all(
      REPOS.map(repoName => 
        fetch(`https://api.github.com/repos/${USERNAME}/${repoName}`, { 
          headers,
          next: { revalidate: 3600 } 
        }).then(res => {
          if (!res.ok) throw new Error(`${repoName} 데이터를 가져오지 못했습니다. Status: ${res.status}`);
          return res.json();
        })
      )
    );

    return NextResponse.json(responses);
  } catch (error) {
    console.error("GitHub API Proxy Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
