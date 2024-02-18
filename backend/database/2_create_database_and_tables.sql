CREATE DATABASE kanban;

CREATE TABLE statuses (
    id uuid DEFAULT gen_random_uuid(),
    text VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE boards (
    id uuid DEFAULT gen_random_uuid(),
    text VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tasks (
    id uuid DEFAULT gen_random_uuid(),
    text VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    status_id uuid REFERENCES statuses(id) ON DELETE RESTRICT,
    board_id uuid REFERENCES boards(id) ON DELETE CASCADE
);

CREATE TABLE subtasks (
    id uuid DEFAULT gen_random_uuid(),
    text VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    status_id uuid REFERENCES statuses(id) ON DELETE RESTRICT,
    task_id uuid REFERENCES tasks(id) ON DELETE CASCADE
);
