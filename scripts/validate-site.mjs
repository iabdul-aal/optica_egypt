import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const CHARTER_DATE = "2026-09-10";
const VALID_MEMBER_TIERS = new Set(["executive", "operational", "advisory"]);
const VALID_DISPATCH_KINDS = new Set(["announcement", "event", "article", "media"]);
const VALID_PROJECT_TRACKS = new Set(["open-pda", "training", "fellowships", "outreach"]);
const VALID_LIFECYCLES = new Set([
  "planning",
  "seeking-partners",
  "open-for-signup",
  "active",
  "completed",
]);

const FORBIDDEN_SLOP_PHRASES = [
  "world-class",
  "cutting-edge",
  "revolutionary",
  "fastest-growing",
  "most proactive",
  "historic charter",
  "top-tier",
  "premier scientific",
  "unparalleled",
  "revolutionizing",
  "monumental",
];

const results = [];

function toRel(absPath) {
  return path.relative(ROOT, absPath).split(path.sep).join("/");
}

function walkFiles(dir, predicate = () => true) {
  if (!fs.existsSync(dir)) return [];
  const collected = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collected.push(...walkFiles(full, predicate));
    } else if (entry.isFile() && predicate(full)) {
      collected.push(full);
    }
  }
  return collected.sort((a, b) => a.localeCompare(b));
}

function isValidIsoDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const [y, m, d] = value.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  );
}

function readJson(absPath, errors, label) {
  try {
    const raw = fs.readFileSync(absPath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    errors.push(`${label}: Invalid JSON (${err.message})`);
    return null;
  }
}

function checkPublicAsset(relUrl, sourceLabel, errors) {
  if (typeof relUrl !== "string" || relUrl.trim().length === 0) {
    errors.push(`${sourceLabel}: Missing asset path`);
    return;
  }
  if (/^https?:\/\//i.test(relUrl)) return;
  const normalized = relUrl.replace(/^\/+/, "");
  const absAsset = path.join(ROOT, "public", ...normalized.split("/"));
  if (!fs.existsSync(absAsset)) {
    errors.push(`${sourceLabel}: Asset "${relUrl}" does not exist at public/${normalized}`);
  }
}

function isNonEmptyString(val) {
  return typeof val === "string" && val.trim().length > 0;
}

function recordCheck(name, errors) {
  results.push({ name, errors });
}

// ---------------------------------------------------------------------------
// 1. JSON Integrity, Governance Standing, & Relational Foreign-Key Integrity
// ---------------------------------------------------------------------------
function validateDataSchemas() {
  const errors = [];
  const dataDir = path.join(ROOT, "data");
  const jsonFiles = walkFiles(dataDir, (f) => f.endsWith(".json"));

  const parsedMap = new Map();
  for (const file of jsonFiles) {
    const rel = toRel(file);
    const parsed = readJson(file, errors, rel);
    if (parsed !== null) {
      parsedMap.set(path.basename(file), { rel, data: parsed });
    }
  }

  // Required: data/domains.json
  const domainIds = new Set();
  const domainsEntry = parsedMap.get("domains.json");
  if (!domainsEntry || !Array.isArray(domainsEntry.data) || domainsEntry.data.length === 0) {
    errors.push("data/domains.json: Required non-empty array");
  } else {
    domainsEntry.data.forEach((d, idx) => {
      const tag = `data/domains.json[${idx}]`;
      if (!isNonEmptyString(d?.id)) errors.push(`${tag}: Missing "id"`);
      else domainIds.add(d.id);
      if (!isNonEmptyString(d?.label)) errors.push(`${tag}: Missing "label"`);
    });
  }

  // Required: data/members.json
  const memberIds = new Set();
  let activeMembers = [];
  const membersEntry = parsedMap.get("members.json");
  if (!membersEntry || !Array.isArray(membersEntry.data) || membersEntry.data.length === 0) {
    errors.push("data/members.json: Required non-empty array");
  } else {
    const { rel, data: members } = membersEntry;
    const seenOrders = new Set();
    let prevActiveOrder = 0;

    members.forEach((m, idx) => {
      const tag = `${rel}[${idx}] (${m?.id || "unknown"})`;
      if (!isNonEmptyString(m?.id)) errors.push(`${tag}: Missing "id"`);
      else if (memberIds.has(m.id)) errors.push(`${tag}: Duplicate member id "${m.id}"`);
      else memberIds.add(m.id);

      if (!isNonEmptyString(m?.name)) errors.push(`${tag}: Missing string "name"`);
      if (!isNonEmptyString(m?.role)) errors.push(`${tag}: Missing string "role"`);
      if (!isNonEmptyString(m?.institution)) errors.push(`${tag}: Missing string "institution"`);
      if (!isNonEmptyString(m?.bio)) errors.push(`${tag}: Missing string "bio"`);
      if (!VALID_MEMBER_TIERS.has(m?.tier)) errors.push(`${tag}: Invalid tier "${m?.tier}"`);
      if (typeof m?.active !== "boolean") errors.push(`${tag}: "active" must be boolean`);
      if (!Array.isArray(m?.domainIds)) {
        errors.push(`${tag}: Missing "domainIds" array`);
      } else {
        m.domainIds.forEach((did) => {
          if (!domainIds.has(did)) errors.push(`${tag}: Unknown domainId "${did}"`);
        });
      }

      if (!Number.isInteger(m?.order) || m.order <= 0) {
        errors.push(`${tag}: "order" must be positive integer`);
      } else if (seenOrders.has(m.order)) {
        errors.push(`${tag}: Duplicate order ${m.order}`);
      } else {
        seenOrders.add(m.order);
      }

      if (m?.active === true) {
        if (Number.isInteger(m.order)) {
          if (m.order <= prevActiveOrder) {
            errors.push(`${tag}: Active members must be sorted ascending (${m.order} <= ${prevActiveOrder})`);
          }
          prevActiveOrder = m.order;
        }
        activeMembers.push(m);
      }
    });

    if (activeMembers.length < 8) {
      errors.push(`${rel}: Governance compliance requires at least 8 active members (found ${activeMembers.length})`);
    }
    const opticaCount = activeMembers.filter((m) => isNonEmptyString(m.opticaId)).length;
    if (opticaCount < 5) {
      errors.push(`${rel}: Governance compliance requires at least 5 active Optica IDs (found ${opticaCount})`);
    }
  }

  // Required: data/chapters.json
  const chapterIds = new Set();
  const chaptersEntry = parsedMap.get("chapters.json");
  if (!chaptersEntry || !Array.isArray(chaptersEntry.data?.charteredChapters)) {
    errors.push("data/chapters.json: Missing charteredChapters array");
  } else {
    chaptersEntry.data.charteredChapters.forEach((ch, idx) => {
      const tag = `data/chapters.json[${idx}] (${ch?.id || "unknown"})`;
      if (!isNonEmptyString(ch?.id)) errors.push(`${tag}: Missing "id"`);
      else chapterIds.add(ch.id);
      if (!isNonEmptyString(ch?.name)) errors.push(`${tag}: Missing "name"`);
      if (!isNonEmptyString(ch?.university)) errors.push(`${tag}: Missing "university"`);
      const x = ch?.coordinates?.x;
      const y = ch?.coordinates?.y;
      if (typeof x !== "number" || typeof y !== "number" || x < 0 || x > 100 || y < 0 || y > 100) {
        errors.push(`${tag}: Invalid map coordinates`);
      }
    });
  }

  // Required: data/resources.json
  const resourceIds = new Set();
  const resourcesEntry = parsedMap.get("resources.json");
  if (!resourcesEntry || !Array.isArray(resourcesEntry.data) || resourcesEntry.data.length === 0) {
    errors.push("data/resources.json: Required non-empty array");
  } else {
    resourcesEntry.data.forEach((r, idx) => {
      const tag = `data/resources.json[${idx}] (${r?.id || "unknown"})`;
      if (!isNonEmptyString(r?.id)) errors.push(`${tag}: Missing "id"`);
      else resourceIds.add(r.id);
      if (!isNonEmptyString(r?.title)) errors.push(`${tag}: Missing "title"`);
      if (!isNonEmptyString(r?.description)) errors.push(`${tag}: Missing "description"`);
      if (!isNonEmptyString(r?.url) || !/^https?:\/\//i.test(r.url)) {
        errors.push(`${tag}: Invalid external resource URL`);
      }
      if (!isValidIsoDate(r?.lastVerifiedISO)) {
        errors.push(`${tag}: Missing valid lastVerifiedISO`);
      }
    });
  }

  // Required: data/projects.json (foreign-key checks)
  const projectIds = new Set();
  const projectsEntry = parsedMap.get("projects.json");
  if (!projectsEntry || !Array.isArray(projectsEntry.data) || projectsEntry.data.length === 0) {
    errors.push("data/projects.json: Required non-empty array");
  } else {
    projectsEntry.data.forEach((p, idx) => {
      const tag = `data/projects.json[${idx}] (${p?.id || "unknown"})`;
      if (!isNonEmptyString(p?.id)) errors.push(`${tag}: Missing "id"`);
      else projectIds.add(p.id);
      if (!isNonEmptyString(p?.slug)) errors.push(`${tag}: Missing "slug"`);
      if (!VALID_PROJECT_TRACKS.has(p?.track)) errors.push(`${tag}: Invalid track "${p?.track}"`);
      if (!VALID_LIFECYCLES.has(p?.lifecycle)) errors.push(`${tag}: Invalid lifecycle "${p?.lifecycle}"`);
      if (!isNonEmptyString(p?.title) || !isNonEmptyString(p?.summary)) {
        errors.push(`${tag}: Missing title or summary`);
      }
      (p?.leadMemberIds || []).forEach((mid) => {
        if (!memberIds.has(mid)) errors.push(`${tag}: Unknown leadMemberId "${mid}"`);
      });
      (p?.chapterIds || []).forEach((cid) => {
        if (!chapterIds.has(cid)) errors.push(`${tag}: Unknown chapterId "${cid}"`);
      });
      (p?.resourceIds || []).forEach((rid) => {
        if (!resourceIds.has(rid)) errors.push(`${tag}: Unknown resourceId "${rid}"`);
      });
      (p?.domainIds || []).forEach((did) => {
        if (!domainIds.has(did)) errors.push(`${tag}: Unknown domainId "${did}"`);
      });
    });
  }

  // Required: data/dispatches.json (charter date & foreign-key checks)
  const dispatchesEntry = parsedMap.get("dispatches.json");
  if (!dispatchesEntry || !Array.isArray(dispatchesEntry.data)) {
    errors.push("data/dispatches.json: Required array");
  } else {
    dispatchesEntry.data.forEach((d, idx) => {
      const tag = `data/dispatches.json[${idx}] (${d?.id || "unknown"})`;
      if (!isNonEmptyString(d?.id) || !isNonEmptyString(d?.slug)) errors.push(`${tag}: Missing id or slug`);
      if (!VALID_DISPATCH_KINDS.has(d?.kind)) errors.push(`${tag}: Invalid kind "${d?.kind}"`);
      if (!isNonEmptyString(d?.title) || !isNonEmptyString(d?.summary)) errors.push(`${tag}: Missing title or summary`);
      if (!isValidIsoDate(d?.dateISO)) {
        errors.push(`${tag}: Invalid ISO date "${d?.dateISO}"`);
      } else if (!d.historicalContext && d.dateISO < CHARTER_DATE) {
        errors.push(`${tag}: Pre-charter date "${d.dateISO}" (< ${CHARTER_DATE}) forbidden`);
      }
      if (isNonEmptyString(d?.projectId) && !projectIds.has(d.projectId)) {
        errors.push(`${tag}: Unknown projectId "${d.projectId}"`);
      }
      (d?.authorIds || []).forEach((aid) => {
        if (!memberIds.has(aid)) errors.push(`${tag}: Unknown authorId "${aid}"`);
      });
      (d?.resourceIds || []).forEach((rid) => {
        if (!resourceIds.has(rid)) errors.push(`${tag}: Unknown resourceId "${rid}"`);
      });
    });
  }

  // Required: data/site_config.json
  const siteConfigEntry = parsedMap.get("site_config.json");
  if (!siteConfigEntry) {
    errors.push("data/site_config.json: Missing required file");
  } else {
    const { rel, data: sc } = siteConfigEntry;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!isNonEmptyString(sc?.email) || !emailPattern.test(sc.email.trim())) {
      errors.push(`${rel}: Invalid or missing email`);
    } else if (sc.email.trim().toLowerCase() === "opticaegypt@gmail.com") {
      errors.push(`${rel}: Deprecated personal email "opticaegypt@gmail.com" must not be used`);
    }
    if (!isNonEmptyString(sc?.seo?.siteUrl) || !/^https:\/\/[^/\s]+$/i.test(sc.seo.siteUrl.trim())) {
      errors.push(`${rel}: seo.siteUrl must be https:// origin without trailing slash`);
    }
    if (sc?.social && typeof sc.social === "object") {
      for (const [platform, rawVal] of Object.entries(sc.social)) {
        if (typeof rawVal !== "string") errors.push(`${rel}.social.${platform}: Must be string`);
        else if (rawVal.trim().length > 0 && /\s/.test(rawVal.trim())) {
          errors.push(`${rel}.social.${platform}: Must not contain whitespace`);
        }
      }
    }
  }

  // Optional: data/governance.json contact parity
  const governanceEntry = parsedMap.get("governance.json");
  if (governanceEntry) {
    const contactEmail = governanceEntry.data?.charterRecord?.contactEmail;
    if (!isNonEmptyString(contactEmail) || contactEmail.trim().toLowerCase() === "opticaegypt@gmail.com") {
      errors.push("data/governance.json: charterRecord.contactEmail must use the section domain email");
    }
  }

  recordCheck("JSON Integrity, Schemas, and Relational Graph", errors);
  return { parsedMap, activeMembers };
}

// ---------------------------------------------------------------------------
// 2. Asset Existence Check under public/
// ---------------------------------------------------------------------------
function validateAssetExistence(parsedMap) {
  const errors = [];

  const referencedLeadershipPhotos = new Set();
  const membersEntry = parsedMap.get("members.json");
  if (membersEntry && Array.isArray(membersEntry.data)) {
    membersEntry.data.forEach((m, idx) => {
      const tag = `data/members.json[${idx}] (${m?.id || "unknown"})`;
      if (m?.active && !isNonEmptyString(m?.photo)) {
        errors.push(`${tag}: Active member missing "photo" path`);
      } else if (isNonEmptyString(m?.photo)) {
        checkPublicAsset(m.photo, tag, errors);
        referencedLeadershipPhotos.add(m.photo.replace(/^\/+/, ""));
      }
    });
  }

  const leadershipDir = path.join(ROOT, "public", "people", "leadership");
  walkFiles(leadershipDir).forEach((absFile) => {
    const relFromPublic = path.relative(path.join(ROOT, "public"), absFile).split(path.sep).join("/");
    if (!referencedLeadershipPhotos.has(relFromPublic)) {
      errors.push(
        `public/${relFromPublic}: Orphaned portrait file not referenced in data/members.json`
      );
    }
  });

  const pressEntry = parsedMap.get("press.json");
  if (pressEntry && Array.isArray(pressEntry.data?.mediaKit?.assets)) {
    pressEntry.data.mediaKit.assets.forEach((asset, idx) => {
      const tag = `data/press.json.mediaKit.assets[${idx}] (${asset?.id || "unknown"})`;
      if (isNonEmptyString(asset?.downloadUrl)) {
        checkPublicAsset(asset.downloadUrl, tag, errors);
      }
    });
  }

  recordCheck("Asset Existence Check", errors);
}

// ---------------------------------------------------------------------------
// 3. Strict English-Only, Zero Ampersand, Zero Em-Dash
// ---------------------------------------------------------------------------
function hasForbiddenCodeAmpersand(line) {
  if (/\s&amp;\s/i.test(line)) return true;
  if (!line.includes(" & ")) return false;
  const stripped = line
    .replace(/\bError\s*&\s*\{/g, "Error_INTERSECTION_{")
    .replace(/\bRecord<[^>]*>\s*&\s*/g, "Record_INTERSECTION_")
    .replace(/&\s*Record<[^>]*>/g, "_INTERSECTION_Record")
    .replace(/\s&&\s/g, " ");
  return stripped.includes(" & ");
}

function validateEditorialStyle() {
  const errors = [];

  const proseTargets = [
    ...walkFiles(path.join(ROOT, "data"), (f) => f.endsWith(".json")),
    ...walkFiles(path.join(ROOT, "public", "docs"), (f) => f.endsWith(".html")),
    ...walkFiles(path.join(ROOT, "public"), (f) => /^llms.*\.txt$/.test(path.basename(f))),
  ];

  for (const file of proseTargets) {
    const rel = toRel(file);
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, idx) => {
      const lineNum = idx + 1;
      if (line.includes(" & ") || line.includes("&amp;")) {
        errors.push(`${rel}:${lineNum}: Forbidden ampersand ("&")`);
      }
      if (line.includes("\u2014") || /&mdash;|&#8212;|&#x2014;/i.test(line)) {
        errors.push(`${rel}:${lineNum}: Forbidden Unicode em-dash (U+2014)`);
      }
      if (/[\u0600-\u06FF]/.test(line)) {
        errors.push(`${rel}:${lineNum}: Non-English Arabic script found under strict English-only policy`);
      }
      const lower = line.toLowerCase();
      for (const phrase of FORBIDDEN_SLOP_PHRASES) {
        if (lower.includes(phrase)) {
          errors.push(`${rel}:${lineNum}: Forbidden hype phrase "${phrase}"`);
        }
      }
    });
  }

  const codeFiles = [
    ...walkFiles(path.join(ROOT, "app"), (f) => /\.(tsx?|jsx?)$/.test(f)),
    ...walkFiles(path.join(ROOT, "components"), (f) => /\.(tsx?|jsx?)$/.test(f)),
  ];

  for (const file of codeFiles) {
    const rel = toRel(file);
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, idx) => {
      const lineNum = idx + 1;
      if (hasForbiddenCodeAmpersand(line)) {
        errors.push(`${rel}:${lineNum}: Forbidden " & " in JSX/source`);
      }
      if (line.includes("\u2014") || /&mdash;|&#8212;|&#x2014;/i.test(line)) {
        errors.push(`${rel}:${lineNum}: Forbidden em-dash in JSX/source`);
      }
    });
  }

  if (fs.existsSync(path.join(ROOT, "messages"))) {
    errors.push("messages/: Deprecated multi-locale directory must remain removed under strict English-only policy");
  }

  recordCheck("Strict English, Zero Ampersand/Em-Dash, and Anti-Slop", errors);
}

// ---------------------------------------------------------------------------
// 4. Roster Parity Check (data/members.json <-> public/llms.txt & llms-full.txt)
// ---------------------------------------------------------------------------
function validateRosterParity(activeMembers) {
  const errors = [];
  const count = activeMembers.length;
  const countPattern = new RegExp(`\\b${count}\\b`);

  for (const docName of ["llms.txt", "llms-full.txt"]) {
    const docPath = path.join(ROOT, "public", docName);
    const rel = toRel(docPath);
    if (!fs.existsSync(docPath)) {
      errors.push(`${rel}: Missing LLM summary file`);
      continue;
    }
    const content = fs.readFileSync(docPath, "utf8");
    if (!countPattern.test(content)) {
      errors.push(`${rel}: Must state exact active count (${count})`);
    }
    for (const member of activeMembers) {
      if (isNonEmptyString(member?.name) && !content.includes(member.name)) {
        errors.push(`${rel}: Missing active member "${member.name}"`);
      }
    }
  }

  recordCheck("Roster Parity Check", errors);
}

// ---------------------------------------------------------------------------
// 5. In-Page Form Security (No mailto: or localStorage intake)
// ---------------------------------------------------------------------------
function validateInteractiveForms() {
  const errors = [];
  const formDir = path.join(ROOT, "components", "sections");
  const formFiles = walkFiles(formDir, (f) => /Form.*\.tsx$/.test(path.basename(f)));

  for (const file of formFiles) {
    const rel = toRel(file);
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, idx) => {
      const lower = line.toLowerCase();
      if (lower.includes("mailto:")) {
        errors.push(`${rel}:${idx + 1}: Form must not use "mailto:"`);
      }
      if (lower.includes("localstorage")) {
        errors.push(`${rel}:${idx + 1}: Form must not store submissions in localStorage`);
      }
    });
  }

  recordCheck("In-Page Form Security", errors);
}

// ---------------------------------------------------------------------------
// 6. Agentic Skills Frontmatter Check
// ---------------------------------------------------------------------------
function validateAgenticFiles() {
  const errors = [];
  const skillsDir = path.join(ROOT, ".agents", "skills");
  if (!fs.existsSync(skillsDir)) {
    recordCheck("Agentic Skills Frontmatter", errors);
    return;
  }
  const skillFiles = walkFiles(skillsDir, (f) => path.basename(f) === "SKILL.md");

  if (skillFiles.length === 0) {
    errors.push(".agents/skills: Expected SKILL.md definitions, found none");
  } else {
    for (const file of skillFiles) {
      const rel = toRel(file);
      const text = fs.readFileSync(file, "utf8");
      const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!fmMatch) {
        errors.push(`${rel}: Missing YAML frontmatter block`);
        continue;
      }
      const fm = fmMatch[1];
      if (!/^name:\s*\S+/m.test(fm)) errors.push(`${rel}: Missing "name:"`);
      if (!/^description:\s*\S+/m.test(fm)) errors.push(`${rel}: Missing "description:"`);
    }
  }

  recordCheck("Agentic Skills Frontmatter", errors);
}

function main() {
  console.log("Optica Egypt Local Section - Deterministic Site Validation");
  console.log("=".repeat(60));

  const { parsedMap, activeMembers } = validateDataSchemas();
  validateAssetExistence(parsedMap);
  validateEditorialStyle();
  validateRosterParity(activeMembers);
  validateInteractiveForms();
  validateAgenticFiles();

  let totalErrors = 0;
  for (const { name, errors } of results) {
    if (errors.length === 0) {
      console.log(`[PASS] ${name}`);
    } else {
      totalErrors += errors.length;
      console.error(`[FAIL] ${name} (${errors.length} issue${errors.length === 1 ? "" : "s"})`);
      for (const err of errors) {
        console.error(`  - ${err}`);
      }
    }
  }

  console.log("=".repeat(60));
  if (totalErrors > 0) {
    console.error(`Validation failed with ${totalErrors} error(s).`);
    process.exit(1);
  }
  console.log("All deterministic validation checks passed cleanly.");
}

main();
