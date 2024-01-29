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

INSERT INTO db_prototype.attendance (module_id, lecturer_id, student_id, num_attended, num_late, score) VALUES (0, 'a1aaaaaa-bbb-ccccc-dddd-eeeeeeeeeeee', '412f16c8-3168-4a74-bd37-4b0d8b1ee802', 0, 10, 0);
INSERT INTO db_prototype.attendance (module_id, lecturer_id, student_id, num_attended, num_late, score) VALUES (0, 'a1aaaaaa-bbb-ccccc-dddd-eeeeeeeeeeee', 'd471dfd8-5be6-485e-85a5-d4095658abbb', 100, 0, 100);
INSERT INTO db_prototype.attendance (module_id, lecturer_id, student_id, num_attended, num_late, score) VALUES (1, 'a2aaaaaa-bbb-ccccc-dddd-eeeeeeeeeeee', '412f16c8-3168-4a74-bd37-4b0d8b1ee802', 2, 20, 20);
INSERT INTO db_prototype.attendance (module_id, lecturer_id, student_id, num_attended, num_late, score) VALUES (1, 'a2aaaaaa-bbb-ccccc-dddd-eeeeeeeeeeee', 'd471dfd8-5be6-485e-85a5-d4095658abbb', 99, 1, 99);
