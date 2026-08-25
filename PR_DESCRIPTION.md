# Add My Records, rename Hub to Connect, and rebuild admin dashboards

## Summary

This branch builds out the Parchment learner and admin experiences in the
prototype. It adds the My Records (LER) surfaces, renames the "Hub" concept to
"Connect," and replaces three shared admin service dashboards with bespoke
designs from Figma references.

## What's included

### My Records (learner)
- New "My Records" page on the Parchment Credentials screen, with record tiles
  showing the target, status, counts, and an AI-summary excerpt, plus a kebab
  menu (Preview public view, Duplicate, Delete).
- Full record detail view: AI summary with regenerate, a flexible Credentials &
  achievements block, verified and self-reported skills, work history, portfolio
  links, applied history, and an opportunities teaser.
- Share flow with four methods (email, public link, secured link with PIN, and
  LinkedIn) and a three-step Create-new-record wizard.
- Nav update: Dashboard, My Records, Orders, and Settings.

### Hub to Connect rename
- Renames the user-facing "Hub" terminology to "Connect" (Learner Connect, Admin
  Connect, the sign-in landing toggle, and the dashboard titles).
- Removes the Professional/Personal tabs from both Connect dashboards.
- Adds an Account-menu link to jump between the Learner and Admin Connect
  experiences, opening the other one in a new tab.

### Admin service dashboards
- Rebuilds the Receive, Diploma, and Dual Enrollment dashboards as dedicated
  screens matching their Figma references. Transcript still uses the shared
  pattern.
- Adds a reusable label-first MetricStat block and a tertiary (white-outline)
  button variant.
- Routes the Admin "My Credentials" Open button into the learner Parchment
  Credentials experience.

## Notes and follow-ups
- Screens use the hand-built InstUI-aligned components and 2026 tokens; icon and
  illustration stand-ins replace the Figma image assets so the static build works
  offline.
- The share and create flows are representative (no real sending or persistence
  beyond the session).
- The Access control tab is a placeholder. Admin dashboard nav labels are best
  guesses since the references show a collapsed rail.
- Internal identifiers (file names, the `adminHub`/`learnerHub` route keys, and
  `adminhub__*` CSS classes) still read "Hub" by design, since renaming them is
  churn with no user-facing benefit.

## Testing
- `npm install && npm run dev` to run locally.
- `npm run package` to refresh the single-file `prototype.html`.
