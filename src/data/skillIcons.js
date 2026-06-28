import {
  SiPython,
  SiMysql,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiFlask,
  SiFastapi,
  SiNodedotjs,
  SiTensorflow,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiMongodb,
  SiGit,
  SiGithub,
  SiJupyter,
  SiPostman,
  SiFigma,
  SiHtml5,
  SiPytorch,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa6";
import { DiVisualstudio } from "react-icons/di";
import { LuBrainCircuit, LuEye, LuLayers, LuChartBar, LuDatabase, LuUsers, LuPuzzle, LuLightbulb } from "react-icons/lu";

// Maps a skill's display name to { Icon, color }. Color is the brand color
// where one exists; otherwise a theme accent so the icon still reads as
// intentional rather than missing.
export const skillIcons = {
  Python: { Icon: SiPython, color: "#3776AB" },
  SQL: { Icon: LuDatabase, color: "#0891b2" },
  Java: { Icon: FaJava, color: "#EA2D2E" },

  HTML: { Icon: SiHtml5, color: "#E34F26" },
  CSS: { Icon: SiTailwindcss, color: "#38BDF8" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  "React.js": { Icon: SiReact, color: "#61DAFB" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#38BDF8" },

  Flask: { Icon: SiFlask, color: "#7c3aed" },
  FastAPI: { Icon: SiFastapi, color: "#059669" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },

  "Machine Learning": { Icon: LuBrainCircuit, color: "#0891b2" },
  "Deep Learning": { Icon: LuLayers, color: "#7c3aed" },
  "Generative AI": { Icon: LuLightbulb, color: "#d97706" },
  "Computer Vision": { Icon: LuEye, color: "#0891b2" },
  "Reinforcement Learning": { Icon: LuPuzzle, color: "#7c3aed" },

  Pandas: { Icon: SiPandas, color: "#150458" },
  NumPy: { Icon: SiNumpy, color: "#4DABCF" },
  "Scikit-learn": { Icon: SiScikitlearn, color: "#F7931E" },
  TensorFlow: { Icon: SiTensorflow, color: "#FF6F00" },
  PyTorch: { Icon: SiPytorch, color: "#EE4C2C" },
  Matplotlib: { Icon: LuChartBar, color: "#0891b2" },
  "Power BI": { Icon: LuChartBar, color: "#F2C811" },

  MySQL: { Icon: SiMysql, color: "#4479A1" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },

  Git: { Icon: SiGit, color: "#F05032" },
  GitHub: { Icon: SiGithub, color: "#181717" },
  "VS Code": { Icon: DiVisualstudio, color: "#007ACC" },
  "Jupyter Notebook": { Icon: SiJupyter, color: "#F37626" },
  "MySQL Workbench": { Icon: SiMysql, color: "#4479A1" },
  Postman: { Icon: SiPostman, color: "#FF6C37" },
  Figma: { Icon: SiFigma, color: "#F24E1E" },

  "AWS (EC2, S3)": { Icon: FaAws, color: "#FF9900" },

  "Problem Solving": { Icon: LuPuzzle, color: "#7c3aed" },
  "Team Collaboration": { Icon: LuUsers, color: "#0891b2" },
  "Analytical Thinking": { Icon: LuBrainCircuit, color: "#d97706" },
};

export function getSkillIcon(name) {
  return skillIcons[name] || { Icon: LuLightbulb, color: "#64748b" };
}
