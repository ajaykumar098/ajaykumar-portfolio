export const asset = (filename) => `/assets/${filename}`;

export const sectionNavMap = {
  home: "home",
  hero: "home",
  about: "home",
  education: "education",
  skills: "skills",
  skill: "skills",
  projects: "projects",
  project: "projects",
  achievements: "achievements",
  achievement: "achievements",
  certificates: "achievements",
  resume: "resume",
  contact: "contact",
};

export function parseNavigationCommand(text) {
  const lower = text.toLowerCase();
  for (const [keyword, sectionId] of Object.entries(sectionNavMap)) {
    if (lower.includes(keyword) && (lower.includes("go") || lower.includes("show") || lower.includes("navigate") || lower.includes("section") || lower.includes("take me"))) {
      return sectionId;
    }
    if (lower.includes(`to ${keyword}`) || lower.includes(`${keyword} section`)) {
      return sectionId;
    }
  }
  if (lower.includes("top") || lower.includes("beginning")) return "home";
  if (lower.includes("bottom") || lower.includes("contact")) return "contact";
  return null;
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
