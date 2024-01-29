create table module
(
    module_id   int         not null
        primary key,
    module_code varchar(10) not null,
    module_name varchar(50) not null,
    module_year int         not null
);

INSERT INTO db_prototype.module (module_id, module_code, module_name, module_year) VALUES (0, 'COMP2006', 'C++ Programming', 2022);
INSERT INTO db_prototype.module (module_id, module_code, module_name, module_year) VALUES (1, 'COMP2009', 'Algorithms Correctness and Efficiency', 2022);
