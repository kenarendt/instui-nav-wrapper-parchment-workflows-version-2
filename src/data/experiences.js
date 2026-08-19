/**
 * Account, experiences, and services model for the prototype.
 *
 * One account login can carry several experiences. At the top level they fall
 * into two categories: a Learner experience and an Admin experience. If the
 * account has both, sign-in lands on the Admin experience. Each experience
 * lands on a "Connect" dashboard (a welcome-mat dashboard). Connect modules
 * deep-link into detailed experiences that open in new (simulated) browser tabs.
 *
 * Admin services are grouped, per the design, into:
 *   - Parchment Award Services: Transcript Services, Diploma Services, Dual Enrollment
 *   - Parchment Pathways Services: Receive
 * All admin service dashboards share one common dashboard pattern.
 */

export const account = {
  name: "Peter Panda",
  email: "peter_panda@bambusa-university.edu",
  institution: "Bambusa University",
  learnerRole: "student",
  adminRole: "Super user",
};

export const SERVICES = {
  transcript: {
    id: "transcript",
    name: "Transcript Services",
    short: "Transcript",
    group: "award",
    icon: "file-text",
    description:
      "Manage learners and credentials, and fulfill orders for academic credentials.",
    badge: { count: 12, label: "Open Orders" },
    dashboard: {
      openOrders: 12,
      metrics: [
        { value: "24", label: "Unmatched credentials", hint: "Credentials that are not matched to a learner record." },
        { value: "2%", label: "Unmatched accounts", hint: "Parchment accounts that are not tied to a learner record." },
        { value: "6%", label: "Unverified", hint: "Learner records with verified IDs." },
      ],
      fulfillment: { total: "4,894", segments: [
        { label: "Transcripts", value: 55, color: "#273540" },
        { label: "Diplomas", value: 30, color: "#c02a6e" },
        { label: "Verifications", value: 15, color: "#0f7b74" },
      ] },
    },
  },
  diploma: {
    id: "diploma",
    name: "Diploma Services",
    short: "Diploma",
    group: "award",
    icon: "award",
    description: "Issue digital and printed diplomas.",
    badge: { count: 187, label: "Ready to issue" },
    dashboard: {
      openOrders: 187,
      metrics: [
        { value: "187", label: "Ready to issue", hint: "Diplomas prepared and awaiting release." },
        { value: "1.4k", label: "Issued this year", hint: "Digital and printed diplomas issued." },
        { value: "3%", label: "Returned", hint: "Diplomas returned or undeliverable." },
      ],
      fulfillment: { total: "1,402", segments: [
        { label: "Digital", value: 62, color: "#273540" },
        { label: "Printed", value: 38, color: "#c02a6e" },
      ] },
    },
  },
  dualEnrollment: {
    id: "dualEnrollment",
    name: "Dual Enrollment",
    short: "Dual Enrollment",
    group: "award",
    icon: "users",
    description:
      "Enroll learners into dual enrollment courses along with comprehensive enrollment management tools.",
    badge: { count: 3, label: "New applications" },
    dashboard: {
      openOrders: 3,
      metrics: [
        { value: "3", label: "New applications", hint: "Applications awaiting review." },
        { value: "248", label: "Active enrollments", hint: "Learners currently enrolled." },
        { value: "12", label: "Partner courses", hint: "Courses open for dual enrollment." },
      ],
      fulfillment: { total: "263", segments: [
        { label: "Approved", value: 70, color: "#273540" },
        { label: "Pending", value: 20, color: "#c02a6e" },
        { label: "Waitlist", value: 10, color: "#0f7b74" },
      ] },
    },
  },
  receive: {
    id: "receive",
    name: "Receive",
    short: "Receive",
    group: "pathways",
    icon: "cloud-download",
    description: "Automate receiving academic credentials and documents.",
    badge: { count: 4, label: "New documents" },
    dashboard: {
      openOrders: 4,
      metrics: [
        { value: "4", label: "New documents", hint: "Documents received and awaiting processing." },
        { value: "96%", label: "Auto-matched", hint: "Documents matched automatically." },
        { value: "1.1k", label: "Received this month", hint: "Total inbound documents." },
      ],
      fulfillment: { total: "1,120", segments: [
        { label: "Processed", value: 82, color: "#273540" },
        { label: "In review", value: 12, color: "#c02a6e" },
        { label: "Flagged", value: 6, color: "#0f7b74" },
      ] },
    },
  },
};

export const SERVICE_GROUPS = [
  {
    id: "award",
    name: "Parchment Award Services",
    brand: "Parchment Award",
    services: ["transcript", "diploma", "dualEnrollment"],
  },
  {
    id: "pathways",
    name: "Parchment Pathways Services",
    brand: "Parchment Pathways",
    services: ["receive"],
  },
];

/**
 * Experiences this account can access. Order matters for default landing:
 * if an Admin experience is present it wins over Learner.
 */
export const EXPERIENCES = [
  {
    id: "admin",
    type: "admin",
    label: "Admin",
    sublabel: account.adminRole,
    landing: { kind: "adminHub", title: "Admin Connect" },
  },
  {
    id: "learner",
    type: "learner",
    label: "Learner",
    sublabel: account.learnerRole,
    landing: { kind: "learnerHub", title: "Learner Connect" },
  },
];

export function defaultLanding(experiences = EXPERIENCES) {
  const admin = experiences.find((e) => e.type === "admin");
  return admin ?? experiences[0];
}

/**
 * Switchable profiles listed in the account overlay. Each maps to the tab that
 * opens (or is focused) when the user switches to it. `avatar` selects the
 * avatar treatment: "pp" (initials) or "learner" (photo stand-in).
 */
export const PROFILES = [
  {
    id: "learner",
    role: "Learner",
    sub: null,
    avatar: "learner",
    tab: { kind: "learnerHub", title: "Learner Connect", dedupeKey: "learnerHub" },
  },
  {
    id: "transcript",
    role: "Admin",
    sub: "Transcript Services",
    avatar: "pp",
    tab: { kind: "service", title: "Transcript", params: { serviceId: "transcript" }, dedupeKey: "service:transcript" },
  },
  {
    id: "diploma",
    role: "Admin",
    sub: "Diploma Services",
    avatar: "pp",
    tab: { kind: "service", title: "Diploma", params: { serviceId: "diploma" }, dedupeKey: "service:diploma" },
  },
  {
    id: "dualEnrollment",
    role: "Admin",
    sub: "Dual Enrollment",
    avatar: "pp",
    tab: { kind: "service", title: "Dual Enrollment", params: { serviceId: "dualEnrollment" }, dedupeKey: "service:dualEnrollment" },
  },
  {
    id: "receive",
    role: "Admin",
    sub: "Receive",
    avatar: "pp",
    tab: { kind: "service", title: "Receive", params: { serviceId: "receive" }, dedupeKey: "service:receive" },
  },
  {
    id: "platform",
    role: "Admin",
    sub: "Platform Settings",
    avatar: "pp",
    tab: { kind: "platformSettings", title: "Platform Settings", dedupeKey: "platformSettings" },
  },
];

export function serviceById(id) {
  return SERVICES[id];
}
