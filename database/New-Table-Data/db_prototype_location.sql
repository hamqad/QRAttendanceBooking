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

INSERT INTO db_prototype.location (location_id, building_name, room_name, capacity, latitude, longitude) VALUES (0, 'Computer Science Building', 'A32', 120, null, null);
INSERT INTO db_prototype.location (location_id, building_name, room_name, capacity, latitude, longitude) VALUES (1, 'Exchange Building', 'LT1', 200, null, null);
