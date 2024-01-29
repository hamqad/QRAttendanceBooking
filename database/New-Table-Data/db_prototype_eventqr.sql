create table eventqr
(
    event_id  int         not null,
    qr_string varchar(60) not null,
    constraint eventqr_event_fk
        foreign key (event_id) references events (event_id)
);

INSERT INTO db_prototype.eventqr (event_id, qr_string) VALUES (0, 'AAAA');
INSERT INTO db_prototype.eventqr (event_id, qr_string) VALUES (1, 'BBBB');
INSERT INTO db_prototype.eventqr (event_id, qr_string) VALUES (2, 'CCCC');
