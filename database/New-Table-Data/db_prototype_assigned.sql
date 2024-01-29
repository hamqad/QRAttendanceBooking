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

INSERT INTO db_prototype.assigned (student_id, event_id, booking_status, attendance_time) VALUES ('412f16c8-3168-4a74-bd37-4b0d8b1ee802', 0, 0, null);
INSERT INTO db_prototype.assigned (student_id, event_id, booking_status, attendance_time) VALUES ('412f16c8-3168-4a74-bd37-4b0d8b1ee802', 1, 1, null);
INSERT INTO db_prototype.assigned (student_id, event_id, booking_status, attendance_time) VALUES ('412f16c8-3168-4a74-bd37-4b0d8b1ee802', 2, 1, null);
INSERT INTO db_prototype.assigned (student_id, event_id, booking_status, attendance_time) VALUES ('d471dfd8-5be6-485e-85a5-d4095658abbb', 0, 0, null);
INSERT INTO db_prototype.assigned (student_id, event_id, booking_status, attendance_time) VALUES ('d471dfd8-5be6-485e-85a5-d4095658abbb', 1, 1, null);
