/**
 * Learner "records" — curated packages of credentials and skills a learner
 * assembles to tell a specific story and unlock an opportunity.
 * Content mirrors the Figma "My records" listing page.
 */
export const recordById = (id) => RECORDS.find((r) => r.id === id);

/**
 * Shared detail content for the drill-down Record view. Representative of the
 * Figma "Record — Self view (detailed)" screen; reused for any opened record.
 */
/** The block types shown in the "Add block" menu (spec §4.4). */
export const BLOCK_TYPES = [
  "Credentials & achievements",
  "Skills",
  "Rich text",
  "Work history",
  "Portfolio links",
];

/** Starting points offered in the create flow (spec §7, Step 0). */
export const RECORD_TEMPLATES = [
  {
    id: "blank",
    name: "Blank",
    desc: "Start from scratch. No pre-built structure — build your sections freely after creation.",
  },
  {
    id: "timeline",
    name: "Timeline",
    desc: "Sections organized chronologically from your credential dates. Best for a story that follows your journey.",
  },
  {
    id: "context",
    name: "Context",
    desc: "Sections organized by purpose, not time. Best for tailoring a record to a specific role or application.",
  },
];

/** Unified item picker source list used in the create flow (spec §7, Step 1). */
export const PICKER_ITEMS = [
  { id: "boe", source: "Parchment credentials", title: "Bachelor of Engineering", meta: "Diploma · Mount Elbert University" },
  { id: "ae", source: "Parchment credentials", title: "Academic Excellence", meta: "Certificate · Mount Elbert University" },
  { id: "aiux", source: "Parchment credentials", title: "AI & UX Design Proficiency", meta: "Badge · School of Engineering" },
  { id: "agile", source: "Parchment credentials", title: "Agile Development", meta: "Badge · School of Engineering" },
  { id: "hda", source: "Canvas completions", title: "Health Data Analytics", meta: "Course completion · San José City College" },
  { id: "pcc", source: "Canvas completions", title: "Patient Care Coordination", meta: "Outcome mastery · San José City College" },
  { id: "ccs", source: "Canvas artifacts", title: "Care Coordination Case Study", meta: "Assignment · San José City College" },
  { id: "rrr", source: "Canvas artifacts", title: "Predicting Readmission Risk", meta: "Research · San José City College" },
];

/**
 * Shared detail content for the drill-down Record view. Models the block
 * structure from the LER spec (see [[ler-my-records-spec]]); reused for any
 * opened record.
 */
export const RECORD_DETAIL = {
  views: "12,131",
  glance: {
    items: 12,
    verifiedSkills: 10,
    selfReportedSkills: 3,
    donut: {
      total: "12",
      segments: [
        { label: "Diplomas", value: 4, color: "#349ed2" },
        { label: "Certificates", value: 4, color: "#f16824" },
        { label: "Badges", value: 4, color: "#116d94" },
      ],
    },
  },
  aiSummary:
    "Experienced healthcare professional with a nursing certificate from San José City College and verified competencies in patient care coordination and health data analysis. Holds an Associate of Science degree with academic honors and a workforce development badge in Agile Development.",
  // Credentials & achievements — one flexible, learner-named container mixing
  // Parchment credentials with Canvas completions and artifacts.
  credentialBlock: {
    name: "Academic background",
    description: "Credentials, achievements, and evidence from my degree and early career.",
    items: [
      { kind: "Diploma", source: "parchment", verified: true, title: "Bachelor of Engineering", issuer: "Mount Elbert University School of Engineering", date: "August 29, 2028", thumb: "diploma" },
      { kind: "Diploma Verification", source: "parchment", verified: true, title: "Bachelor of Engineering", issuer: "Mount Elbert University School of Engineering", date: "September 12, 2028", thumb: "verification" },
      { kind: "Certificate", source: "parchment", verified: true, title: "Academic Excellence", issuer: "Mount Elbert University", date: "May 22, 2029", thumb: "certificate" },
      { kind: "Badge", source: "parchment", verified: true, title: "AI & UX Design Proficiency", issuer: "Mount Elbert University School of Engineering", date: "May 22, 2025", thumb: "badge" },
      { kind: "Badge", source: "parchment", verified: true, title: "Agile Development", issuer: "School of Engineering", date: "May 22, 2025", thumb: "badge" },
      { kind: "Course completion", source: "canvas", verified: false, title: "Health Data Analytics", issuer: "San José City College", date: "December 15, 2027", thumb: "course" },
      { kind: "Assignment", source: "canvas", verified: false, title: "Care Coordination Case Study", issuer: "San José City College", date: "March 3, 2028", thumb: "evidence", desc: "A patient-journey analysis mapping handoffs across three care teams." },
      { kind: "Presentation", source: "canvas", verified: false, title: "Health Data Analytics Symposium", issuer: "San José City College", date: "May 1, 2028", thumb: "evidence" },
    ],
  },
  verifiedSkills: [
    { name: "Patient care coordination", backedBy: "Health Data Analytics", demand: "High demand · +18% projected growth" },
    { name: "Health data analysis", backedBy: "Bachelor of Engineering", demand: "High demand · +24% projected growth" },
    { name: "HIPAA compliance", backedBy: "Academic Excellence", demand: "Steady demand" },
    { name: "Clinical documentation", backedBy: "Health Data Analytics", demand: "Steady demand" },
    { name: "Agile methodology", backedBy: "Agile Development", demand: "High demand · +15% projected growth" },
    { name: "Quality assurance", backedBy: "AI & UX Design Proficiency", demand: "Steady demand" },
  ],
  selfReportedSkills: ["Bilingual (English/Spanish)", "Public speaking", "Grant writing"],
  workHistory: {
    employment: [
      { role: "Health Data Analyst Intern", org: "Bay Area Medical Group", dates: "Jun 2028 – Present", desc: "Build dashboards tracking patient outcomes and care-team throughput." },
      { role: "Patient Services Coordinator", org: "San José Community Clinic", dates: "Aug 2026 – May 2028", desc: "Coordinated scheduling and intake for a 12-provider primary care practice." },
    ],
    volunteering: [
      { role: "Health Screening Volunteer", org: "Valley Free Clinic", dates: "2025 – Present", desc: "Support intake and vitals at monthly community health fairs." },
    ],
  },
  portfolioLinks: [
    { title: "Personal portfolio", type: "External portfolio site", url: "peterpanda.example.com", desc: "Case studies from my care-coordination projects." },
    { title: "Readmission risk model", type: "GitHub repository", url: "github.com/peterpanda/readmit", desc: "Code and notebooks for the research project." },
    { title: "Care coordination article", type: "Publication", url: "medium.com/@peterpanda", desc: "A short piece on reducing care-team handoff errors." },
  ],
  applied: [
    { role: "Healthcare Administration Manager", org: "Bay Area Medical Group", date: "Applied Feb 12, 2029" },
    { role: "Clinical Data Coordinator", org: "San José Community Clinic", date: "Applied Jan 28, 2029" },
    { role: "Health Informatics Fellow", org: "Mount Elbert University", date: "Applied Jan 9, 2029" },
  ],
  opportunities: [
    { title: "Care Operations Analyst", org: "Northgate Health", match: "92% match" },
    { title: "Patient Experience Lead", org: "Riverside Clinics", match: "88% match" },
    { title: "Health Systems Coordinator", org: "Summit Medical", match: "85% match" },
  ],
  blockTypes: BLOCK_TYPES,
};

export const RECORDS = [
  {
    id: "healthcare-admin",
    title: "Healthcare Administration Application",
    targetedFor: "Healthcare Administration Manager",
    lastEdited: "3 days ago",
    credentials: 5,
    skills: 12,
    visibility: "public",
    description:
      "Experienced healthcare professional with a nursing certificate from San José City College and verified competencies in patient care coordination and health data analysis. Holds an Associate of Science…",
  },
  {
    id: "record-2",
    title: "Name of the record",
    lastEdited: "3 days ago",
    credentials: 5,
    skills: 12,
    visibility: "private",
    description:
      "Experienced healthcare professional with a nursing certificate from San José City College and verified competencies in patient care coordination and health data analysis. Holds an Associate of Science degree with academic honours and a workforce development badge…",
  },
  {
    id: "record-3",
    title: "Name of the record",
    lastEdited: "3 days ago",
    credentials: 5,
    skills: 12,
    visibility: "private",
    description:
      "Experienced healthcare professional with a nursing certificate from San José City College and verified competencies in patient care coordination and health data analysis. Holds an Associate of Science…",
  },
];
