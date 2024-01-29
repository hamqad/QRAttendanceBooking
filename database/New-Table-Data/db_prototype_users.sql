use db_prototype;

create table users
(
    user_id       char(36)    not null
        primary key,
    username      varchar(12) not null,
    email         varchar(32) not null,
    pref_email    varchar(32) null,
    first_name    varchar(24) null,
    last_name     varchar(24) null,
    notifications tinyint(1)  not null
);

INSERT INTO db_prototype.users (user_id, username, email, pref_email, first_name, last_name, notifications) VALUES ('412f16c8-3168-4a74-bd37-4b0d8b1ee802', 'efyjc12', 'eyfjc12@nottingham.ac.uk', null, 'Jeremy', 'Cheung', 0);
INSERT INTO db_prototype.users (user_id, username, email, pref_email, first_name, last_name, notifications) VALUES ('a1aaaaaa-bbb-ccccc-dddd-eeeeeeeeeeee', 'lecaa1', 'lecaa1@nottingham.ac.uk', null, 'Bob', 'Smart', 0);
INSERT INTO db_prototype.users (user_id, username, email, pref_email, first_name, last_name, notifications) VALUES ('a2aaaaaa-bbb-ccccc-dddd-eeeeeeeeeeee', 'lecbb2', 'lecbb2@nottingham.ac.uk', null, 'Annet', 'Clever', 0);
INSERT INTO db_prototype.users (user_id, username, email, pref_email, first_name, last_name, notifications) VALUES ('d471dfd8-5be6-485e-85a5-d4095658abbb', 'psyhi1', 'psyhi1@nottingham.ac.uk', null, 'Haydn', 'Ingram', 0);
