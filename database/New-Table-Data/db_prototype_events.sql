create table events
(
    event_id    int               not null
        primary key,
    module_id   int               not null,
    lecturer_id char(36)          not null,
    location_id int               not null,
    event_date  date              not null,
    event_start time              not null,
    event_end   time              not null,
    event_title varchar(64)       not null,
    event_type  varchar(24)       not null,
    attending   int     default 0 not null,
    penalty     tinyint default 0 not null,
    constraint event_lecturer_fk
        foreign key (lecturer_id) references users (user_id),
    constraint event_location_fk
        foreign key (location_id) references location (location_id),
    constraint event_module_fk
        foreign key (module_id) references module (module_id)
);

INSERT INTO db_prototype.events (event_id, module_id, lecturer_id, location_id, event_date, event_start, event_end, event_title, event_type, attending, penalty) VALUES (0, 0, 'a1aaaaaa-bbb-ccccc-dddd-eeeeeeeeeeee', 0, '2022-03-29', '09:00:00', '10:00:00', 'C++ Programming', 'LAB', 0, 0);
INSERT INTO db_prototype.events (event_id, module_id, lecturer_id, location_id, event_date, event_start, event_end, event_title, event_type, attending, penalty) VALUES (1, 1, 'a2aaaaaa-bbb-ccccc-dddd-eeeeeeeeeeee', 0, '2022-03-30', '13:00:00', '14:00:00', 'Algorithms Correctness and Efficiency', 'LECTURE', 10, 0);
INSERT INTO db_prototype.events (event_id, module_id, lecturer_id, location_id, event_date, event_start, event_end, event_title, event_type, attending, penalty) VALUES (2, 1, 'a2aaaaaa-bbb-ccccc-dddd-eeeeeeeeeeee', 1, '2022-03-31', '14:00:00', '16:00:00', 'Algorithms Correctness and Efficiency', 'LECTURE', 8, 0);
