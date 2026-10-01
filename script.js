const PROJECTS = [
  {
    id: "sda",
    title: "Heterogeneous Data Fusion for Space Domain Awareness",
    tagline: "Fusing orbital, imagery, and radio data to flag unusual satellites.",
    date: "May 2026",
    category: "space",
    categoryLabel: "Space & Aerospace",
    badge: "Excellence Award, 2026 Yonsei Aerospace Week Symposium",
    description: [
      "I developed a toolkit that identifies unusual satellite orbits from orbital data, determines whether flagged satellites are observable by optical telescopes, and integrates Earth observation imagery as a third data source.",
      "Following the symposium, I identified bugs in my code that affected the reliability of the initial results. I addressed these issues by rewriting the toolkit as a tested package with <mark class=\"hl\">15 passing tests</mark> and validated it using a demo catalog of 58 objects.",
      "The toolkit integrates TLE orbit records, optical imagery, and RF signals to identify satellites with unusual behavior. The updated version includes TLE checksum validation and epoch-gated comparisons, which prevent invalid data comparisons rather than generating misleading results."
    ],
    links: [{ label: "GitHub", url: "https://github.com/febyoon03/sda-heterogeneous-data-fusion" }],
  },
  {
    id: "stars",
    title: "STARS: Satellite Tracking and Anomaly Response System",
    tagline: "A FastAPI + Streamlit platform for tracking satellites in real time.",
    date: "Spring 2026",
    category: "space",
    categoryLabel: "Space & Aerospace",
    note: "Individual project, open-source software course",
    description: [
      "I created a FastAPI service that stores satellite orbit data and scores anomalies. I also built a Streamlit web app to visualize orbits and highlight any unusual ones.",
      "I used Docker to containerize the API and <mark class=\"hl\">deployed both the API and the web app on AWS EC2</mark>.",
      "The dashboard lets users browse satellites by their purpose, such as weather monitoring or lunar observation, and it automatically sorts new satellites into the right category. I tested it with about 10-15 satellites. It's still an early prototype and not yet a production system."
    ],
    links: [
      { label: "GitHub (API)", url: "https://github.com/febyoon03/sda-api" },
      { label: "GitHub (web app)", url: "https://github.com/febyoon03/sda-viz" },
    ],
  },
  {
    id: "drone-swarm",
    title: "Drone Swarm Consensus Stability",
    tagline: "Why ten drones agree slower than the textbook formula predicts.",
    date: "Fall 2025",
    category: "space",
    categoryLabel: "Space & Aerospace",
    note: "Individual project",
    description: [
      "I used Monte Carlo simulations to examine how ten drones achieve consensus under noisy conditions. My initial theoretical formula differed from the simulation results by a factor of four.",
      "Upon review, I determined the formula was valid only for small step sizes. After correction, the revised formula <mark class=\"hl\">matched the simulation within 1%</mark>.",
      "The simulation modeled ten drones with a discrete-time consensus update rule. The original formula assumed each step was small enough to treat as continuous, which didn't hold at the step size I was using—that gap caused the 4x error. The corrected, exact discrete-time formula brought the error down to about 1%."
    ],
    links: [{ label: "GitHub", url: "https://github.com/febyoon03/drone-swarm-consensus-stability" }],
  },
  {
    id: "mars",
    title: "Mars Terrain Hazard Detection",
    tagline: "Teaching a lightweight model to see hazards in Mars rover images.",
    date: "Aug 2025",
    category: "space",
    categoryLabel: "Space & Aerospace",
    badge: "Excellence Award, robot vision course",
    description: [
      "I trained YOLOv8 models to detect bedrock, large rocks, sand, and soil in Mars images.",
      "On a validation set of 322 images, the smaller model matched the larger model's performance and ran faster. However, it struggled to detect large rocks because only eight relevant training images were available.",
      "I compared YOLOv8n and YOLOv8s on a 322-image dataset with four classes: bedrock, big-rock, sand, and soil. YOLOv8n matched or outperformed YOLOv8s on most metrics, while being <mark class=\"hl\">about 3.5 times smaller and 2.5 times faster</mark> during inference. These findings highlight the importance of model selection for resource-limited systems like flight computers."
    ],
    links: [{ label: "GitHub", url: "https://github.com/febyoon03/mars-terrain-hazard-detection" }],
  },
  {
    id: "job-matching",
    title: "Job Posting Competency Matching",
    tagline: "Matching 13,394 job postings to the skills they actually need.",
    date: "Spring 2026",
    category: "software",
    categoryLabel: "Software & Data",
    note: "Team project of five, team leader and presenter",
    description: [
      "We developed a system to match job postings to relevant skills, using a dataset of 13,394 IT job postings. I ensured data quality, extracted skills, evaluated a transformer model, and created the demo.",
      "A straightforward TF-IDF and SVM model <mark class=\"hl\">outperformed the two transformer models</mark> we tested, so we selected it for the final system.",
      "I led a team of five through the full pipeline: cleaning raw postings, extracting a skills taxonomy, and comparing model options. The simpler TF-IDF + SVM approach outperformed two transformer models. This is a useful reminder that a bigger model is not always the right choice for the data and task."
    ],
    links: [{ label: "GitHub", url: "https://github.com/febyoon03/job-posting-competency-matching" }],
  },
  {
    id: "reservation",
    title: "Coding Consulting Room Reservation System",
    tagline: "A booking system built — and actually used — by the school.",
    date: "Spring 2026",
    category: "software",
    categoryLabel: "Software & Data",
    note: "Team project of four, team leader and presenter",
    description: [
      "We developed a Java-based reservation system for our school's coding consulting and study rooms. The system prevents double bookings when multiple users select the same time slot.",
      "We used it in <mark class=\"hl\">a real trial run at school</mark>.",
      "I led a team of four, helped design the time-slot conflict logic, and presented the completed system. It was rewarding to see other students actively use the system during the trial, rather than evaluating it only for a grade."
    ],
    links: [{ label: "GitHub", url: "https://github.com/febyoon03/coding-consulting-room-reservation" }],
  },
];

function renderProjectGrid(container, filterCategory) {
  const items = PROJECTS.filter((p) => p.category === filterCategory);
  container.innerHTML = items
    .map(
      (p) => `
    <button class="project-card" data-id="${p.id}" aria-haspopup="dialog">
      <div class="tag-row">
        <span class="tag tag-${p.category}">${p.categoryLabel}</span>
      </div>
      <h3>${p.title}</h3>
      <p class="tagline">${p.tagline}</p>
      ${p.badge ? `<p class="badge">&#10022; ${p.badge}</p>` : ""}
      <p class="meta">${p.date}${p.note ? " &middot; " + p.note : ""}</p>
      <span class="open-hint">View details &rarr;</span>
    </button>
  `
    )
    .join("");

  container.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => openProject(card.dataset.id));
  });
}

function openProject(id) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return;
  const dialog = document.getElementById("project-detail");

  document.getElementById("dialog-title").textContent = p.title;
  document.getElementById("dialog-category").className = `tag tag-${p.category}`;
  document.getElementById("dialog-category").textContent = p.categoryLabel;
  document.getElementById("dialog-meta").textContent =
    p.date + (p.note ? " · " + p.note : "");

  const badgeEl = document.getElementById("dialog-badge");
  if (p.badge) {
    badgeEl.textContent = "✦ " + p.badge;
    badgeEl.style.display = "block";
  } else {
    badgeEl.style.display = "none";
  }

  document.getElementById("dialog-body").innerHTML = p.description
    .map((para) => `<p>${para}</p>`)
    .join("");

  document.getElementById("dialog-links").innerHTML = p.links
    .map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`)
    .join("");

  dialog.showModal();
}

document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementById("project-detail");
  if (dialog) {
    const closeBtn = document.getElementById("dialog-close");
    if (closeBtn) closeBtn.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  const spaceGrid = document.getElementById("space-grid");
  if (spaceGrid) renderProjectGrid(spaceGrid, "space");

  const softwareGrid = document.getElementById("software-grid");
  if (softwareGrid) renderProjectGrid(softwareGrid, "software");

  // Deep link support: projects/#sda opens that project's modal directly
  if (dialog) {
    const hashId = window.location.hash.replace("#", "");
    if (hashId && PROJECTS.some((p) => p.id === hashId)) {
      openProject(hashId);
    }
  }
});