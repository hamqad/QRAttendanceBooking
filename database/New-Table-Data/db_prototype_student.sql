create table student
(
    student_id      int         not null
        primary key,
    user_id         char(36)    not null,
    university_code varchar(10) null,
    constraint student_user_fk
        foreign key (user_id) references users (user_id)
);

INSERT INTO db_prototype.student (student_id, user_id, university_code) VALUES (0, '412f16c8-3168-4a74-bd37-4b0d8b1ee802', '00112233');
INSERT INTO db_prototype.student (student_id, user_id, university_code) VALUES (1, 'd471dfd8-5be6-485e-85a5-d4095658abbb', '20288610');
