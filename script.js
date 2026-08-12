document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

const PROJECTS = [
  {
    name: "shufflenet-overlay",
    display_name: "ShuffleNet Overlay",
    description: "A click-through Windows overlay that captures the screen, detects and tracks people with YOLO and ONNX, and can steer a virtual mouse toward a selected target.",
    language: "Python",
    html_url: "https://github.com/jonahchang207/shufflenet-overlay",
    homepage: "",
    stargazers_count: 0
  },
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
    description: "I am building IRIS to coordinate several joints and place its arm where I ask it to go.",
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

const CASE_STUDIES = {
  shufflenet: {
    eyebrow: "Computer vision · Python · DirectML",
    title: "ShuffleNet Overlay",
    lead: "A transparent Windows overlay that detects people on screen, keeps their boxes stable, and can steer a virtual mouse toward a target.",
    challenge: "The overlay needs fresh detections without making boxes flicker or letting old frames pile up. It also has to stay click-through so the Windows apps underneath remain usable.",
    system: "Three threads handle capture, ONNX inference, and drawing. Bounded queues drop stale frames, an IoU tracker smooths detections, and DirectML runs the model on the Radeon GPU.",
    learned: "The model is only one part of a responsive vision tool. Queue depth, coordinate mapping, smoothing, and the mouse safety rules have just as much effect on how it feels.",
    facts: [["Pipeline","Capture → inference → overlay"],["Vision","YOLO26 + ONNX"],["Runtime","DirectML GPU"],["Interface","PyQt5 + virtual mouse"]],
    media: "", link: "https://github.com/jonahchang207/shufflenet-overlay"
  },
  iris: {
    eyebrow: "Flagship build · robotics · joint control",
    title: "IRIS",
    lead: "A traditional articulated arm that I am building to coordinate several joints and place its end effector where I ask it to go.",
    challenge: "An arm does not move as one machine. Every joint has its own range, load, and error, yet all of them must arrive together to place the end effector where it belongs.",
    system: "IRIS combines the mechanical design with the control loop. The software translates a target into joint movement, checks the error, and gives me enough information to tune it.",
    learned: "Hardware exposes bad assumptions quickly. IRIS has made me think more carefully about calibration, joint limits, feedback, and how the mechanical design affects the control code.",
    facts: [["Role","Mechanical + controls"],["Focus","Coordinated joints"],["Status","Active build"],["Next","Demo footage + build log"]],
    media: "assets/iris-kinematics.svg", link: ""
  },
  odyssey: {
    eyebrow: "VEX V5 · C++ · PROS",
    title: "Odyssey",
    lead: "A C++ motion library that lets my competition robot track its position and correct its path while driving.",
    challenge: "Timed autonomous routines break when the robot slips or starts from a slightly different position. Odyssey continually estimates position and corrects the route while the robot drives.",
    system: "Odyssey combines odometry, PID, move-to-pose, and pure pursuit into a practical control stack built for VEX competition code and fast iteration.",
    learned: "Controller math was not enough by itself. The odometry, coordinate conventions, and tuning tools decided whether the robot actually drove well.",
    facts: [["Language","C++"],["Platform","VEX V5 / PROS"],["Systems","Odometry + PID"],["Output","Reusable motion library"]],
    media: "assets/thumbnails/odyssey-sim.png", link: "https://github.com/jonahchang207/odyssey"
  },
  handwave: {
    eyebrow: "Computer vision · Python · MediaPipe",
    title: "Handwave",
    lead: "A gesture interface that turns an open hand, pinches, and swipes into natural Mac cursor controls.",
    challenge: "A useful gesture interface has to distinguish intent from ordinary movement while staying responsive enough to feel direct, not like operating a cursor through a delay.",
    system: "Hand landmarks become a small vocabulary of interaction: movement, click, scroll, drag, and desktop switching, with state logic to keep gestures from firing accidentally.",
    learned: "Human input is noisy and personal. The useful work was in the thresholds, smoothing, and feedback, not just the landmark model.",
    facts: [["Language","Python"],["Vision","MediaPipe"],["Input","Webcam landmarks"],["Output","Native cursor control"]],
    media: "assets/thumbnails/handwave-input.jpg", link: "https://github.com/jonahchang207/handwave"
  }
};

function setupProjectDialog() {
  const dialog = document.querySelector("#projectDialog");
  if (!dialog) return;
  const close = dialog.querySelector(".dialog-close");
  const open = (key) => {
    const project = CASE_STUDIES[key];
    if (!project) return;
    dialog.querySelector("#dialogEyebrow").textContent = project.eyebrow;
    dialog.querySelector("#dialogTitle").textContent = project.title;
    dialog.querySelector("#dialogLead").textContent = project.lead;
    dialog.querySelector("#dialogChallenge").textContent = project.challenge;
    dialog.querySelector("#dialogSystem").textContent = project.system;
    dialog.querySelector("#dialogLearned").textContent = project.learned;
    dialog.querySelector("#dialogFacts").innerHTML = project.facts.map(([label,value]) => `<div class="dialog-fact"><span>${label}</span><strong>${value}</strong></div>`).join("");
    dialog.querySelector("#dialogMedia").innerHTML = project.media ? `<img src="${project.media}" alt="${project.title} project visual">` : `<div class="dialog-live-preview"><div class="detection-box box-one"><span>PERSON 01 · TRACKED</span></div><div class="detection-box box-two"><span>PERSON 02 · TRACKED</span></div><div class="overlay-crosshair" aria-hidden="true"></div><div class="overlay-hud"><span>CAPTURE</span><span>DETECT</span><span>TRACK</span></div></div>`;
    const link = dialog.querySelector("#dialogLink");
    link.hidden = !project.link;
    if (project.link) link.href = project.link;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    dialog.scrollTop = 0;
  };
  document.querySelectorAll("[data-open-project]").forEach(button => button.addEventListener("click", event => { event.stopPropagation(); open(button.dataset.openProject); }));
  document.querySelectorAll(".feature[data-project]").forEach(card => {
    card.addEventListener("click", () => open(card.dataset.project));
    card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(card.dataset.project); } });
  });
  const shut = () => { dialog.close(); document.body.style.overflow = ""; };
  close.addEventListener("click", shut);
  dialog.addEventListener("click", event => { if (event.target === dialog) shut(); });
  dialog.addEventListener("close", () => { document.body.style.overflow = ""; });
  dialog.addEventListener("scroll", () => {
    const max = dialog.scrollHeight - dialog.clientHeight;
    dialog.querySelector(".dialog-progress i").style.width = `${max ? (dialog.scrollTop / max) * 100 : 0}%`;
  }, { passive: true });
}

function setupDelight() {
  const loader = document.querySelector(".page-loader");
  window.setTimeout(() => loader?.classList.add("is-gone"), reducedMotion ? 0 : 1250);

  const cursor = document.querySelector(".cursor-orbit");
  if (cursor && matchMedia("(pointer:fine)").matches && !reducedMotion) {
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
    addEventListener("pointermove", e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    const follow = () => { x += (tx-x)*.16; y += (ty-y)*.16; cursor.style.left=x+"px"; cursor.style.top=y+"px"; requestAnimationFrame(follow); }; follow();
    document.querySelectorAll("a,button,.feature").forEach(el => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
    });
  }

  if (!reducedMotion && window.gsap && window.ScrollTrigger) {
    document.querySelectorAll(".section-heading,.systems-heading,.network-copy,.about-heading,.about-copy,.contact>h2,.project-card").forEach(el => el.classList.add("reveal-item"));
    window.gsap.utils.toArray(".reveal-item").forEach(el => window.gsap.to(el,{opacity:1,y:0,rotate:0,duration:1.05,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}}));
    window.gsap.to(".kinetic-strip div",{xPercent:-18,ease:"none",scrollTrigger:{trigger:".kinetic-strip",start:"top bottom",end:"bottom top",scrub:1}});
    window.gsap.to("[data-parallax]",{yPercent:22,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
    window.gsap.utils.toArray(".feature").forEach((card,index) => window.gsap.from(card,{y:120,rotate:index%2?2:-2,opacity:0,duration:1.1,ease:"power3.out",scrollTrigger:{trigger:card,start:"top 90%"}}));
  }
}

setupProjectDialog();
window.addEventListener("load", setupDelight, { once: true });

