-- Add existing announcements to database
INSERT INTO "Announcement" (id, title, content, "fullDescription", "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'Registration Now Open!', 'Team registration for Elevate 2026 is officially open. Register your team now!', 'We are excited to announce that registration for Elevate 2026 is now open! Teams can register for Volleyball, Basketball, and Carrom tournaments. Don''t miss this opportunity to showcase your skills and compete with the best teams. Visit the registration page to sign up your team today!', NOW(), NOW()),
  (gen_random_uuid(), 'About Fixtures', 'Fixtures of the Tournament will be announced soon. Check the fixtures page for details.', 'The tournament fixtures will be released shortly. Once published, you can view the complete schedule, match timings, and venue details on our fixtures page. Stay tuned for updates!', NOW(), NOW());
