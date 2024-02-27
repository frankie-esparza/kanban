DO $$
DECLARE board_id_1 uuid;
DECLARE task_id_1 uuid;
DECLARE status_id_1 uuid;

BEGIN
-----------------------
-- GET 1 STATUS ID
-----------------------
SELECT id
INTO status_id_1
FROM statuses
WHERE text = 'Todo';

-----------------------
-- ADD TASKS
-----------------------
-- get 1 board's id
SELECT id
INTO board_id_1
FROM boards
WHERE text = 'Marketing Strategy';

-- add tasks to that board
INSERT INTO tasks (text, status_id, board_id)
VALUES
('Swim with Whales', status_id_1, board_id_1),
('Swim with Sharks', status_id_1, board_id_1),
('Swim with Fish', status_id_1, board_id_1);

-----------------------
-- ADD SUBTASKS
-----------------------
-- get 1 task's id
SELECT id
INTO task_id_1
FROM tasks
WHERE text = 'Swim with Whales';

-- add subtasks to that task
INSERT INTO subtasks (text, status_id, task_id)
VALUES
('Find migration path', status_id_1, task_id_1),
('Count baby whales', status_id_1, task_id_1),
('Listen to whale songs', status_id_1, task_id_1);

END;
$$
