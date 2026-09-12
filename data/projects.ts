export type Media = {
  src: string;
  label: string;
  description?: string;
  type?: "image" | "video" | "diagram";
} | null;

export type Video =
  | { type: "local"; src: string; poster?: string }
  | { type: "youtube"; youtubeId: string }
  | null;

export type Project = {
  slug: string;
  name: string;
  fullName: string;
  category: string;
  description: string;
  tags: string[];
  heroImage: Media;
  github: string | null;
  documentation?: string | null;
  demoVideo?: Video;
  role: string;
  status: string;
  focus: string[];
  tools: string[];
  result: string;
};

export const projects: Record<string, Project> = {
  iris: {
    slug: "iris",
    name: "IRIS",
    fullName: "Intelligent Robotic Identification and Sorting",
    category: "6-DOF robotic manipulator",
    description: "Low-cost 3D-printed robotic manipulator designed for autonomous identification and sorting.",
    tags: ["6-DOF", "Mechanical Design", "Controls", "Computer Vision"],
    heroImage: null,
    github: null,
    role: "Project Lead / Sole Developer",
    status: "Phase 2",
    focus: ["Mechanical Design", "Control Systems", "Computer Vision"],
    tools: ["Fusion 360", "C++", "ROS 2"],
    result: "3rd Place — Engineering · Maine State Science Fair",
  },
  odyssey: {
    slug: "odyssey",
    name: "Odyssey",
    fullName: "Odometry & Motion Control",
    category: "Real-time robot localization",
    description: "Real-time localization and autonomous-motion library for VEX robotics.",
    tags: ["Odometry", "Sensor Fusion", "PID", "Pure Pursuit"],
    heroImage: null,
    github: "https://github.com/jonahchang207/odyssey",
    documentation: "https://jonahchang207.github.io/odyssey/",
    demoVideo: null,
    role: "Software Engineer",
    status: "Active",
    focus: ["Localization", "Motion Control"],
    tools: ["C++", "PROS", "VEX V5"],
    result: "Not yet documented",
  },
  vortex: {
    slug: "vortex",
    name: "Vortex",
    fullName: "Competition Intelligence & Robotics Event Platform",
    category: "Data infrastructure",
    description: "Robotics event data, automation, API integration, competition analytics, and data infrastructure.",
    tags: ["API Integration", "Data Pipeline", "Analytics"],
    heroImage: null,
    github: null,
    documentation: null,
    demoVideo: null,
    role: "Project Developer",
    status: "In development",
    focus: ["Data Systems", "Interface Design"],
    tools: ["Not yet documented"],
    result: "Not yet documented",
  },
  maribotics: {
    slug: "maribotics",
    name: "Maribotics",
    fullName: "Low-Cost Perception for Autonomous Marine Systems",
    category: "Autonomous marine perception",
    description: "Camera-based perception and ranging for autonomous and semi-autonomous marine platforms.",
    tags: ["Stereo Vision", "Object Detection", "Range Estimation"],
    heroImage: null,
    github: "https://github.com/jonahchang207/O.R.B.I.T",
    documentation: null,
    demoVideo: null,
    role: "Perception System Development",
    status: "Exploration",
    focus: ["Camera Integration", "Object Detection", "Range / Position Estimation"],
    tools: ["Python", "YOLO", "Stereo Cameras"],
    result: "Not yet documented",
  },
};
