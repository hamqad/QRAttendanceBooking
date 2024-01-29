use db_prototype;

#Holds records of all students and needed addressing information
create table Student (
    student_id INT PRIMARY KEY,     #10 Digit unique ID assigned by the University
    username VARCHAR(8) NOT NULL,
    email VARCHAR(50),
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL
);

#Holds each module to provide display information
create table Module (
    module_id INT PRIMARY KEY,
    module_code VARCHAR(10) NOT NULL,
    module_name VARCHAR(50) NOT NULL,
    year INT NOT NULL                   #Distinguish modules from each year
);

#Holds records of all lecturers
create table Lecturer (
    lecturer_id INT PRIMARY KEY,        #Unique ID assigned by the University
    email VARCHAR(50),
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL
);

#Provides many-many relationship between lecturer & module
create table ModuleLecturer (
    module_id INT NOT NULL,
    FOREIGN KEY (module_id) REFERENCES Module(module_id),
    lecturer_id INT NOT NULL,
    FOREIGN KEY (lecturer_id) REFERENCES Lecturer(lecturer_id),
    CONSTRAINT PRIMARY KEY (module_id,lecturer_id),
    penalisation_setting TINYINT NOT NULL,  #Default setting of Strict, Lenient, etc.
    num_events INT NOT NULL         #Compared with Attendance to generate statistics
);

#Links a student to a module-lecture to hold attendance information
create table Attendance (
    module_id INT NOT NULL,
    FOREIGN KEY (module_id) REFERENCES Module(module_id),
    lecturer_id INT NOT NULL,
    FOREIGN KEY (lecturer_id) REFERENCES Lecturer(lecturer_id),
    student_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    CONSTRAINT PRIMARY KEY (module_id,lecturer_id,student_id),
    num_attended INT NOT NULL,      #Used for report statistics
    num_late INT NOT NULL
);

#Stores event locations and their data
create table Location (
    location_id INT PRIMARY KEY,
    building_name VARCHAR(25) NOT NULL,
    room_name VARCHAR(10) NOT NULL,
    capacity INT NOT NULL,
    latitude DECIMAL(6,4),          #16m Resolution
    longitude DECIMAL(7,4)
);

#Contains all events and their date, name, lecturer, module & location
create table Event (
    event_id INT PRIMARY KEY,
    module_id INT NOT NULL,
    FOREIGN KEY (module_id) REFERENCES Module(module_id),
    lecturer_id INT NOT NULL,
    FOREIGN KEY (lecturer_id) REFERENCES Lecturer(lecturer_id),
    location_id INT NOT NULL,
    FOREIGN KEY (location_id) REFERENCES Location(location_id),
    datetime datetime NOT NULL,
    name VARCHAR(25) NOT NULL,
    penalisation TINYINT NOT NULL   #Strict, Lenient, etc.
);

#Establishes many-many between student and event. Holds attendance & booking status
create table Assigned (
    student_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Event(event_id),
    CONSTRAINT PRIMARY KEY (student_id,event_id),
    booking_status TINYINT NOT NULL,        #Not Booked, Applied, Accepted, Rejected
    attendance_status TINYINT NOT NULL,     #Not Attended, Attended, Late
    attendance_time DATETIME
);

