-- Clear all data from database tables (keeps table structure)
-- WARNING: This will delete ALL data from all tables!

-- Delete in correct order to respect foreign key constraints
DELETE FROM projects;
DELETE FROM purchases;
DELETE FROM samples;
DELETE FROM models;
DELETE FROM credits;
DELETE FROM users;

-- Reset sequences to start from 1
ALTER SEQUENCE IF EXISTS projects_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS purchases_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS users_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS models_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS samples_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS credits_id_seq RESTART WITH 1;

-- Verify tables are empty
SELECT 
    'users' as table_name, COUNT(*) as row_count FROM users
UNION ALL
SELECT 'purchases', COUNT(*) FROM purchases
UNION ALL
SELECT 'projects', COUNT(*) FROM projects
UNION ALL
SELECT 'models', COUNT(*) FROM models
UNION ALL
SELECT 'samples', COUNT(*) FROM samples
UNION ALL
SELECT 'credits', COUNT(*) FROM credits;

