document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

const PROJECTS = [
  {
    name: "odyssey",
    description: "Odyssey helps a VEX V5 robot keep track of where it is, then uses that position to drive precise autonomous routes with PID, move-to-pose, and pure pursuit.",
    language: "C++",
    html_url: "https://github.com/jonahchang207/odyssey",
    homepage: "https://jonahchang207.github.io/odyssey/",
    stargazers_count: 0,
    thumbnail: "assets/thumbnails/odyssey-banner.svg",
    thumbnail_alt: "Odyssey repository banner",
    thumbnail_fit: "contain"
  },
  {
    name: "odyssey-sim",
    display_name: "Odyssey Simulator",
    description: "Write an autonomous routine in the browser, watch it run on a virtual VEX field, then copy the generated C++ back to the robot.",
    language: "TypeScript",
    html_url: "https://github.com/jonahchang207/odyssey-sim",
    homepage: "",
    stargazers_count: 0,
    thumbnail: "assets/thumbnails/odyssey-sim.png",
    thumbnail_alt: "Odyssey Simulator path planner running on a virtual VEX field",
    thumbnail_fit: "cover"
  },
  {
    name: "IRIS",
    description: "IRIS is my traditional articulated robot arm—a hands-on project for coordinating joints so the arm can reach, position, and manipulate objects.",
    language: "Robotics",
    html_url: "",
    homepage: "",
    stargazers_count: 0
  },
  {
    name: "handwave",
    description: "Raise your hand to take control of a Mac. MediaPipe turns pinches and swipes from the webcam into cursor movement, clicks, scrolling, dragging, and desktop switching.",
    language: "Python",
    html_url: "https://github.com/jonahchang207/handwave",
    homepage: "",
    stargazers_count: 0,
    thumbnail: "assets/thumbnails/handwave-input.jpg",
    thumbnail_alt: "Open palm, the gesture Handwave uses to begin controlling the cursor",
    thumbnail_fit: "cover"
  },
  {
    name: "VEXVortex",
    description: "VEXVortex puts competition information and robot analysis in one focused companion app, so the useful details are easier to reach between matches.",
    language: "Dart",
    html_url: "",
    homepage: "",
    stargazers_count: 0
  },
  {
    name: "FrameSight",
    description: "FrameSight watches what is happening on a Windows screen, runs YOLO detection in real time, and draws the results in a transparent click-through overlay for assistive research.",
    language: "Python",
    html_url: "https://github.com/jonahchang207/FrameSight",
    homepage: "",
    stargazers_count: 1,
    thumbnail: "assets/thumbnails/framesight-overlay.svg",
    thumbnail_alt: "Annotated FrameSight overlay with detections, guide lines, and magnifier",
    thumbnail_fit: "cover"
  },
  {
    name: "O.R.B.I.T",
    description: "O.R.B.I.T is a low-cost 360° perception research project that combines stereo cameras, YOLO, ranging, bearing, and persistent tracking into a normalized target stream.",
    language: "HTML",
    html_url: "https://github.com/jonahchang207/O.R.B.I.T",
    homepage: "https://azynt.vercel.app",
    stargazers_count: 0,
    thumbnail: "assets/thumbnails/orbit-reader.png",
    thumbnail_alt: "O.R.B.I.T research reader showing perception notes and project documents",
    thumbnail_fit: "cover"
  },
  {
    name: "Harbor",
    description: "Paste a YouTube link, choose a format and quality, and Harbor downloads and converts the file locally with YoutubeExplode and ffmpeg.",
    language: "C#",
    html_url: "https://github.com/jonahchang207/Harbor",
    homepage: "",
    stargazers_count: 0,
    thumbnail: "assets/thumbnails/harbor.png",
    thumbnail_alt: "Harbor interface with URL, file type, quality, and convert controls",
    thumbnail_fit: "cover"
  },
  {
    name: "56S-Override",
    display_name: "56S Override",
    description: "The competition code for VEX team 56S: Odyssey-powered autonomous movement, driver control, and a state-based intake that coordinates motors and pneumatics.",
    language: "C++",
    html_url: "https://github.com/jonahchang207/56S-Override",
    homepage: "",
    stargazers_count: 0
  }
];

const FEATURED_ORDER = ["IRIS", ...PROJECTS.map((project) => project.name).filter((name) => name !== "IRIS")];
const PROJECT_BY_NAME = new Map(PROJECTS.map((project) => [project.name, project]));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function readableName(name) {
  return name.replace(/[_-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function createProjectCard(project) {
  const hasLink = Boolean(project.html_url);
  const card = document.createElement(hasLink ? "a" : "article");
  card.className = "project-card";
  if (project.name === "IRIS") card.classList.add("project-card-iris");
  const projectName = project.display_name || readableName(project.name);
  if (hasLink) {
    card.href = project.html_url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", `${projectName} on GitHub`);
  }

  const media = document.createElement("div");
  media.className = "project-card-media";
  const fallbackClasses = {
    odyssey: "project-fallback-odyssey",
    IRIS: "project-fallback-iris",
    handwave: "project-fallback-handwave",
    VEXVortex: "project-fallback-vexvortex",
    FrameSight: "project-fallback-framesight",
    "56S-Override": "project-fallback-56s"
  };
  if (fallbackClasses[project.name]) media.classList.add(fallbackClasses[project.name]);
  if (project.thumbnail) {
    const image = document.createElement("img");
    image.src = project.thumbnail;
    image.alt = project.thumbnail_alt || `${projectName} project thumbnail`;
    image.loading = "lazy";
    if (project.thumbnail_fit) image.classList.add(`media-${project.thumbnail_fit}`);
    image.addEventListener("error", () => {
      image.remove();
      media.setAttribute("aria-hidden", "true");
    });
    media.append(image);
  } else {
    media.setAttribute("aria-hidden", "true");
  }

  const copy = document.createElement("div");
  copy.className = "project-card-copy";
  const meta = document.createElement("span");
  meta.className = "project-meta";
  const details = [project.language, project.stargazers_count ? `${project.stargazers_count} star${project.stargazers_count === 1 ? "" : "s"}` : ""].filter(Boolean);
  meta.textContent = details.join(" · ") || "Public repository";

  const title = document.createElement("h3");
  title.textContent = projectName;
  const description = document.createElement("p");
  description.textContent = project.description || "Open the repository to explore the project.";
  const link = document.createElement("span");
  link.className = hasLink ? "text-link" : "project-note";
  link.innerHTML = hasLink
    ? `Open repository <b aria-hidden="true">↗</b>`
    : project.name === "IRIS" ? "Featured private project" : "Private project";

  copy.append(meta, title, description, link);
  card.append(media, copy);
  return card;
}

function sortProjects(repositories) {
  return repositories
    .filter((repo) => !repo.fork && repo.description && repo.name !== "jonahchang207" && repo.name !== "docs" && repo.name !== "Vortex")
    .sort((a, b) => {
      const aIndex = FEATURED_ORDER.indexOf(a.name);
      const bIndex = FEATURED_ORDER.indexOf(b.name);
      if (aIndex !== -1 || bIndex !== -1) {
        return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
      }
      return new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0);
    });
}

function renderProjects(projects, live = false) {
  const track = document.querySelector("#projectTrack");
  const status = document.querySelector("#projectStatus");
  if (!track || !status) return;
  track.replaceChildren(...projects.map(createProjectCard));
  track.dataset.source = live ? "refreshed from GitHub" : "resilient fallback";
  window.requestAnimationFrame(updateCarouselState);
}

function updateCarouselState() {
  const track = document.querySelector("#projectTrack");
  const previous = document.querySelector("#prevProject");
  const next = document.querySelector("#nextProject");
  const status = document.querySelector("#projectStatus");
  if (!track || !previous || !next || !status) return;
  const cards = track.querySelectorAll(".project-card");
  if (!cards.length) {
    previous.disabled = true;
    next.disabled = true;
    status.textContent = "No projects available";
    return;
  }
  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
  const current = Math.max(0, Math.min(cards.length - 1, Math.round(track.scrollLeft / (cardWidth + gap))));
  previous.disabled = current === 0;
  next.disabled = current === cards.length - 1;
  status.textContent = `${current + 1} of ${cards.length} · ${track.dataset.source || "selected projects"}`;
}

function setupProjectCarousel() {
  const track = document.querySelector("#projectTrack");
  const previous = document.querySelector("#prevProject");
  const next = document.querySelector("#nextProject");
  if (!track || !previous || !next) return;

  const move = (direction) => {
    const card = track.querySelector(".project-card");
    if (!card) return;
    const amount = card.getBoundingClientRect().width + 20;
    track.scrollBy({ left: amount * direction, behavior: reducedMotion ? "auto" : "smooth" });
  };

  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  let updateQueued = false;
  track.addEventListener("scroll", () => {
    if (updateQueued) return;
    updateQueued = true;
    window.requestAnimationFrame(() => {
      updateCarouselState();
      updateQueued = false;
    });
  }, { passive: true });
  window.addEventListener("resize", updateCarouselState);
  updateCarouselState();
}

function setupAccordion() {
  const panels = [...document.querySelectorAll("[data-panel]")];
  const activate = (selected) => {
    panels.forEach((panel) => {
      const active = panel === selected;
      panel.classList.toggle("is-active", active);
      panel.querySelector(".system-trigger")?.setAttribute("aria-expanded", String(active));
      const detail = panel.querySelector(".system-detail");
      if (detail) {
        detail.hidden = !active;
        if ("inert" in detail) detail.inert = !active;
      }
    });
  };

  panels.forEach((panel) => {
    const trigger = panel.querySelector(".system-trigger");
    trigger?.addEventListener("click", () => activate(panel));
    panel.addEventListener("mouseenter", () => {
      if (window.matchMedia("(hover: hover) and (min-width: 761px)").matches) activate(panel);
    });
    trigger?.addEventListener("focus", () => activate(panel));
  });
  activate(panels.find((panel) => panel.classList.contains("is-active")) || panels[0]);
}

function setupMotion() {
  if (reducedMotion || !window.gsap || !window.ScrollTrigger) return;
  window.gsap.registerPlugin(window.ScrollTrigger);

  window.gsap.fromTo(
    "#heroRoute",
    { strokeDasharray: 1, strokeDashoffset: 1 },
    { strokeDashoffset: 0, duration: 2.2, delay: .25, ease: "power4.out" }
  );

  const manifesto = document.querySelector(".manifesto-copy");
  if (manifesto) {
    const words = manifesto.textContent.trim().split(/\s+/);
    manifesto.replaceChildren(...words.flatMap((word, index) => {
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = word;
      return index === words.length - 1 ? [span] : [span, document.createTextNode(" ")];
    }));
    window.gsap.to(manifesto.querySelectorAll(".word"), {
      opacity: 1,
      stagger: .08,
      ease: "none",
      scrollTrigger: {
        trigger: ".manifesto",
        start: "top 55%",
        end: "bottom 58%",
        scrub: .5
      }
    });
  }

}

function loadLiveProjects() {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 5000);
  fetch("https://api.github.com/users/jonahchang207/repos?per_page=100", {
    signal: controller.signal,
    headers: { Accept: "application/vnd.github+json" }
  })
    .then((response) => {
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
      return response.json();
    })
    .then((repositories) => {
      const liveNames = new Set(repositories.map((repository) => repository.name));
      const enrichedRepositories = repositories.map((repository) => {
        const curated = PROJECT_BY_NAME.get(repository.name);
        if (!curated) return repository;
        return {
          ...repository,
          ...curated,
          html_url: repository.html_url || curated.html_url,
          homepage: repository.homepage || curated.homepage,
          language: curated.language || repository.language,
          stargazers_count: repository.stargazers_count
        };
      });
      const curatedOnly = PROJECTS.filter((project) => !liveNames.has(project.name));
      const projects = sortProjects([...enrichedRepositories, ...curatedOnly]);
      if (projects.length) renderProjects(projects, true);
    })
    .catch(() => {})
    .finally(() => window.clearTimeout(timeout));
}

renderProjects(sortProjects(PROJECTS));
setupProjectCarousel();
setupAccordion();
window.addEventListener("load", setupMotion, { once: true });
loadLiveProjects();
document.querySelector("#year").textContent = String(new Date().getFullYear());
