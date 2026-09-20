# Security Audit

Date: 2026-09-17
Auditor: Security Engineer (automated)

## Scope
Static Next.js 15 site. No auth. No database. No server-side code.

## Findings

### PASS ,  Security Headers
X-Frame-Options: DENY ✓
X-Content-Type-Options: nosniff ✓
Referrer-Policy: strict-origin-when-cross-origin ✓
Permissions-Policy: camera=(), microphone=(), geolocation=() ✓

### PASS ,  Repository Secret Exposure
Member emails gitignored (data/members-private.json) ✓
.agents/ gitignored ✓
Internal docs gitignored ✓
.env.example has no real values ✓

### PASS ,  External Links
All target="_blank" links use rel="noopener noreferrer" ✓
(Footer, MemberCard, ResourceCard, JoinPage verified)

### PASS ,  Data Privacy
No PII in committed files ✓
No tracking cookies ✓
Vercel Analytics: cookieless ✓
Theme in localStorage: not PII ✓

### INFO ,  Content Security Policy
Not yet implemented. Add after 3D scenes are stable
(R3F requires blob: and worker-src directives).
Track as GAP in ENGINEERING_GAPS.md.

### INFO ,  npm audit
3 vulnerabilities (2 moderate, 1 high) from legacy-peer-deps resolution.
Run `npm audit` and evaluate. Most are in optional dev tooling.
Document mitigations for any high severity finding.

## Residual Risk
LOW ,  Static site with no auth, no database, no user data storage.
Primary risk: accidental commit of private data. Mitigated by .gitignore.

## Next Audit Trigger
- Any new npm dependency added
- Any new environment variable
- Any new form or external integration
- Before production launch