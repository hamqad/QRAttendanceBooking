create table modulelecturer
(
    module_id       int               not null,
    lecturer_id     char(36)          not null,
    penalty_default tinyint default 0 not null,
    num_events      int               not null,
    primary key (module_id, lecturer_id),
    constraint modulelecturer_lecturer_fk
        foreign key (lecturer_id) references users (user_id),
    constraint modulelecturer_module_fk
        foreign key (module_id) references module (module_id)
);

INSERT INTO db_prototype.modulelecturer (module_id, lecturer_id, penalty_default, num_events) VALUES (0, 'a1aaaaaa-bbb-ccccc-dddd-eeeeeeeeeeee', 1, 100);
INSERT INTO db_prototype.modulelecturer (module_id, lecturer_id, penalty_default, num_events) VALUES (1, 'a2aaaaaa-bbb-ccccc-dddd-eeeeeeeeeeee', 2, 100);
