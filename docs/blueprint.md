# **App Name**: Elevate Tournament Hub

## Core Features:

- Team Registration: Captains can register teams with team details, player information (max 12), and document uploads.
- Secure Document Upload: Players' Aadhaar card and college ID are uploaded directly to Cloudinary, with secure URLs stored in the database.
- Role-Based Access Control: Captain (USER), Admin, and Public roles with distinct permissions enforced across the application.
- Admin Verification: Admins can view team details, player documents, and approve or reject teams with optional rejection reasons.
- Payment Integration: Integration with Razorpay for secure payment processing during team registration.
- Public Content Display: Display of fixtures, results, announcements, gallery, and approved teams for public users (read-only).
- Automated content tool: LLM uses game stats and rules to decide when/if an advantage occurred, then explains in language understandable to novice volleyball viewers.

## Style Guidelines:

- Primary color: Dark navy blue (#1A237E) for a professional and official look.
- Background: Light gray (#F5F5F5) for a clean and modern feel.
- Accent: Subtle red (#E53935) and gold (#FFC107) accents for highlights and important actions.
- Body and headline font: 'Inter' sans-serif for a modern, objective, neutral look; used throughout.
- Minimal, clear icons representing different actions (e.g., register, view, upload) using a consistent style.
- Content-first layout with card-based designs for displaying teams, fixtures, and results. Accordion-style UI for player details.
- Subtle animations and transitions for a smooth user experience (e.g., loading indicators, form transitions).