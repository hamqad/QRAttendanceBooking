create table location
(
    location_id   int           not null
        primary key,
    building_name varchar(25)   not null,
    room_name     varchar(10)   not null,
    capacity      int           not null,
    latitude      decimal(6, 4) null,
    longitude     decimal(7, 4) null
);

create table module
(
    module_id   int         not null
        primary key,
    module_code varchar(10) not null,
    module_name varchar(50) not null,
    module_year int         not null
);

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

create table attendance
(
    module_id    int      not null,
    lecturer_id  char(36) not null,
    student_id   char(36) not null,
    num_attended int      not null,
    num_late     int      not null,
    score        int      not null,
    primary key (module_id, lecturer_id, student_id),
    constraint attendance_lecturer_fk
        foreign key (lecturer_id) references users (user_id),
    constraint attendance_module_fk
        foreign key (module_id) references module (module_id),
    constraint attendance_student_fk
        foreign key (student_id) references users (user_id)
);

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
    event_title varchar(24)       not null,
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

create table assigned
(
    student_id      char(36)   not null,
    event_id        int        not null,
    booking_status  tinyint(1) not null,
    attendance_time time       null,
    primary key (student_id, event_id),
    constraint assigned_event_fk
        foreign key (event_id) references events (event_id),
    constraint assigned_student_fk
        foreign key (student_id) references users (user_id)
);

create table eventqr
(
    event_id  int         not null,
    qr_string varchar(60) not null,
    constraint eventqr_event_fk
        foreign key (event_id) references events (event_id)
);

create table lecturer
(
    lecturer_id     int               not null
        primary key,
    user_id         char(36)          not null,
    penalty_default tinyint default 0 not null,
    constraint lecturer_user_fk
        foreign key (user_id) references users (user_id)
);

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

create table student
(
    student_id      int         not null
        primary key,
    user_id         char(36)    not null,
    university_code varchar(10) null,
    constraint student_user_fk
        foreign key (user_id) references users (user_id)
);

