import projectsData from '../data/projects.json';

// 🔥 Import images EXACTLY as file names
import aspire from '../assets/Projects/Aspirelens.png';
import eco from '../assets/Projects/EcoLocator.png';
import revive from '../assets/Projects/Ecorevive.png';
import track from '../assets/Projects/TrackTech.png';

export const useGithubProjects = () => {

  // 🧠 Map using shortTitle (JSON stays same)
  const imageMap = {
    AspireLens: aspire,
    Ecolocator: eco,
    EcoRevive: revive,
    TrackTech: track
  };

  const projects = projectsData.map((project) => ({
    ...project,
    image: imageMap[project.shortTitle] || null
  }));

  return {
    projects,
    loading: false,
    error: null
  };
};