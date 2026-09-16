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
  assemblyImage?: Media;
  github: string | null;
  documentation?: string | null;
  demoVideo?: Video;
  secondaryVideo?: Video;
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
    // Put files in public/media/iris, then replace these nulls (see MEDIA_GUIDE.md).
    assemblyImage: null,
    demoVideo: {
      type: "local",
      src: "/media/iris/iris-demo.mp4",
    },
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
    demoVideo: {
      type: "local",
      src: "/media/odyssey/odyssey-lab-solo-awp.mp4",
    },
    secondaryVideo: {
      type: "local",
      src: "/media/odyssey/odyssey-worlds-right.mp4",
    },
    role: "Software Engineer",
    status: "Active",
    focus: ["Localization", "Motion Control"],
    tools: ["C++", "PROS", "VEX V5"],
    result: "Not yet documented",
  },
  vortex: {
    slug: "vortex",
    name: "VEXVortex",
    fullName: "Competition Intelligence & Robotics Event Platform",
    category: "VEX competition software",
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
    name: "O.R.B.I.T.",
    fullName: "Low-Cost 360° Perception and Ranging",
    category: "Computer vision / edge perception",
    description: "Low-cost perception research combining stereo cameras, YOLO, ranging, bearing, and persistent target tracking.",
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
  sourcesight: {
    slug: "sourcesight",
    name: "SourceSight",
    fullName: "Not yet documented",
    category: "Not yet documented",
    description: "SourceSight is in active development — full project details coming soon.",
    tags: ["Not yet documented"],
    heroImage: null,
    github: null,
    documentation: null,
    demoVideo: null,
    role: "Not yet documented",
    status: "In development",
    focus: ["Not yet documented"],
    tools: ["Not yet documented"],
    result: "Not yet documented",
  },
};

export type ArchiveProject = {
  name: string;
  area: string;
  description: string;
  href: string | null;
};

// Verified descriptions and links retained from the original portfolio source.
export const archiveProjects: ArchiveProject[] = [
  {
    name: "Team 56S / Override",
    area: "VEX V5 · C++ · PROS",
    description: "Competition code for VEX team 56S: Odyssey-powered autonomous movement, driver control, and a state-based intake coordinating motors and pneumatics.",
    href: "https://github.com/jonahchang207/56S-Override",
  },
  {
    name: "Odyssey Simulator",
    area: "TypeScript · Simulation",
    description: "Browser tool for writing autonomous routines, testing them on a virtual VEX field, and copying the generated C++ back to the robot.",
    href: "https://github.com/jonahchang207/odyssey-sim",
  },
  {
    name: "Handwave",
    area: "Python · MediaPipe",
    description: "Webcam gesture input for macOS cursor movement, clicks, scrolling, dragging, and desktop switching.",
    href: "https://github.com/jonahchang207/handwave",
  },
  {
    name: "FrameSight",
    area: "Python · YOLO11n",
    description: "Real-time on-screen object detection rendered through a transparent, click-through Windows overlay.",
    href: "https://github.com/jonahchang207/FrameSight",
  },
  {
    name: "Harbor",
    area: "C# · .NET",
    description: "Local media download and conversion utility built with YoutubeExplode and ffmpeg.",
    href: "https://github.com/jonahchang207/Harbor",
  },
];
