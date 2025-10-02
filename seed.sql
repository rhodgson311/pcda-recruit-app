insert into updates (month, title, summary_md, status)
values (date_trunc('month', now()), 'October Update', 'Welcome coaches! This is a sample update.', 'published');

insert into players (first_name, last_name, grad_year, position, gpa, primary_highlight_url, visibility, source, verified)
values ('Taylor', 'Jordan', 2026, 'G', 3.70, 'https://example.com/highlight', 'registered', 'PCDA', true);

insert into update_items (update_id, player_id, blurb_md, media_links, metrics_json)
select u.id, p.id, 'Floor general with vision.', array[p.primary_highlight_url], '{"assists_per_game": 7}'::jsonb
from updates u, players p
where u.status='published' limit 1;
