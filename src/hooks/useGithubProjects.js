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
        const response = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const data = await response.json();
        
        // Filter out forks and map to a standardized format
        const mappedProjects = data
          .filter(repo => {
            const name = repo.name.toLowerCase();
            const isAspireLens = name.includes('aspirelens');
            return !repo.fork && (repo.homepage || isAspireLens); // Live projects OR AspireLens
          })
          .map(repo => {
            const topics = repo.topics || [];
            const lang = repo.language?.toLowerCase() || '';
            const desc = (repo.description || '').toLowerCase();
            const name = repo.name.toLowerCase();

            // Determine specialized visuals & priority
            const isAspireLens = name.includes('aspirelens');
            const isEcoRevive = name.includes('ecorevive');
            const isEcoLocator = name.includes('e_watse_facility') || name.includes('ecolocator');
            const isTrackTech = name.includes('ai_project') || name.includes('tracktech');

            // Set accurate live link for AspireLens
            const liveLink = isAspireLens ? 'https://careerwithaspirelens.vercel.app/' : repo.homepage;

            // Thumbnail Mapping (Explicit Vite Imports)
            let image = null;
            if (isAspireLens) image = imgAspireLens;
            else if (isEcoRevive) image = imgEcoRevive;
            else if (isEcoLocator) image = imgEcoLocator;
            else if (isTrackTech) image = imgTrackTech;

            // Refined Categories
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

        // Ensure featured project is always first
        const sortedProjects = mappedProjects.sort((a, b) => (b.featured ? 1 : a.featured ? -1 : 0));

        setProjects(sortedProjects);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { projects, loading, error };
};
