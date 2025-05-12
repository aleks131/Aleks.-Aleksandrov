export interface Project {
  name: string;
  path: string;
}

export const projects: Project[] = [
  {
    name: "Carbon Footprint Tracker",
    path: "/projects/carbon-tracker",
  },
  {
    name: "Smart Gallery & Screen",
    path: "/projects/smart-gallery",
  },
  {
    name: "Data Visualization Dashboard",
    path: "/projects/data-viz",
  },
  {
    name: "SustainovationHub",
    path: "/projects/sustainovationhub",
  },
  {
    name: "Solar Panel Monitoring",
    path: "/projects/solar-monitoring",
  },
  {
    name: "WasteWise",
    path: "/projects/wastewise",
  },
  {
    name: "IMS",
    path: "/projects/ims",
  },
  {
    name: "Handmade",
    path: "/projects/handmade",
  },
];

export const getProjectNavigation = (currentPath: string) => {
  const currentIndex = projects.findIndex((p) => p.path === currentPath);
  
  return {
    previousProject: currentIndex > 0 ? projects[currentIndex - 1] : undefined,
    nextProject: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined,
  };
}; 