create table lecturer
(
    lecturer_id     int               not null
        primary key,
    user_id         char(36)          not null,
    penalty_default tinyint default 0 not null,
    constraint lecturer_user_fk
        foreign key (user_id) references users (user_id)
);

INSERT INTO db_prototype.lecturer (lecturer_id, user_id, penalty_default) VALUES (0, 'a1aaaaaa-bbb-ccccc-dddd-eeeeeeeeeeee', 0);
INSERT INTO db_prototype.lecturer (lecturer_id, user_id, penalty_default) VALUES (1, 'a2aaaaaa-bbb-ccccc-dddd-eeeeeeeeeeee', 0);
