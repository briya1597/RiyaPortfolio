import { useState, useEffect } from 'react';
import imgAspireLens from '../assets/Projects/Aspirelens.png';
import imgEcoRevive from '../assets/Projects/Ecorevive.png';
import imgEcoLocator from '../assets/Projects/EcoLocator.png';
import imgTrackTech from '../assets/Projects/TrackTech.png';

const USERNAME = 'briya1597';

export const useGithubProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        // Try fetching through our Vercel API proxy first, 
        // then direct GitHub API as a secondary, 
        // then finally fallback to local repos.json
        
        let response;
        try {
          // Attempt to use the serverless function if deployed
          response = await fetch('/api/github-repos');
          if (!response.ok) throw new Error('Proxy failed');
        } catch (proxyErr) {
          console.warn('Proxy fetch failed, trying direct GitHub API:', proxyErr);
          response = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`);
        }

        let data;
        if (response.ok) {
          data = await response.json();
        } else {
          throw new Error('All API attempts failed');
        }
        
        processData(data);
      } catch (err) {
        console.error('API Error, falling back to local repos.json:', err);
        try {
          // Dynamic import of local repos.json as final fallback
          const localData = await import('../../repos.json');
          processData(localData.default || localData);
        } catch (fallbackErr) {
          setError('Failed to load projects from any source.');
          setLoading(false);
        }
      }
    };

    const processData = (data) => {
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format');
      }

      // Filter out forks and map to a standardized format
      const mappedProjects = data
        .filter(repo => {
          const name = repo.name.toLowerCase();
          const isAspireLens = name.includes('aspirelens');
          return !repo.fork && (repo.homepage || isAspireLens); 
        })
        .map(repo => {
          const topics = repo.topics || [];
          const lang = repo.language?.toLowerCase() || '';
          const desc = (repo.description || '').toLowerCase();
          const name = repo.name.toLowerCase();

          const isAspireLens = name.includes('aspirelens');
          const isEcoRevive = name.includes('ecorevive');
          const isEcoLocator = name.includes('e_watse_facility') || name.includes('ecolocator');
          const isTrackTech = name.includes('ai_project') || name.includes('tracktech');

          const liveLink = isAspireLens ? 'https://careerwithaspirelens.vercel.app/' : repo.homepage;

          let image = null;
          if (isAspireLens) image = imgAspireLens;
          else if (isEcoRevive) image = imgEcoRevive;
          else if (isEcoLocator) image = imgEcoLocator;
          else if (isTrackTech) image = imgTrackTech;

          let category = 'Others';
          if (isAspireLens || isEcoRevive || isEcoLocator || topics.includes('fullstack')) {
            category = 'Full Stack';
          } else if (topics.includes('react') || lang === 'javascript' || lang === 'typescript') {
            category = 'Frontend';
          } else if (topics.includes('nodejs') || topics.includes('express') || lang === 'python' || desc.includes('backend')) {
            category = 'Backend';
          }

          return {
            id: repo.id,
            title: isAspireLens ? 'AspireLens' : (isEcoRevive ? 'EcoRevive' : (isEcoLocator ? 'EcoLocator' : (isTrackTech ? 'TrackTech' : repo.name.replace(/[-_]/g, ' ')))),
            name: repo.name,
            description: repo.description || 'No description provided.',
            techStack: [...new Set([repo.language, ...topics])].filter(Boolean),
            github: repo.html_url,
            live: liveLink,
            stars: repo.stargazers_count,
            category: category,
            featured: isAspireLens, 
            image: image,
            accent: isAspireLens ? '#0ea5e9' : (category === 'Frontend' ? '#61dafb' : category === 'Backend' ? '#68a063' : '#a855f7')
          };
        });

      const sortedProjects = mappedProjects.sort((a, b) => (b.featured ? 1 : a.featured ? -1 : 0));
      setProjects(sortedProjects);
      setLoading(false);
      setError(null);
    };

    fetchRepos();
  }, []);

  return { projects, loading, error };
};
