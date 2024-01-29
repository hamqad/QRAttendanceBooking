#Student data from those attending specific event
CREATE PROCEDURE StudentsAtEvent ( IN event_id_in INT )
BEGIN
    SELECT * FROM student s WHERE s.student_id IN (
        SELECT a.student_id FROM assigned a WHERE a.event_id = event_id_in
        );
END;

#Student data from those currently on a specific module
CREATE PROCEDURE StudentsOnModule ( IN module_id_in INT )
BEGIN
    SELECT * FROM student s WHERE s.student_id IN (
        SELECT a.student_id FROM assigned a WHERE a.event_id IN (
            SELECT e.event_id FROM event e WHERE module_id IN (
                SELECT m.module_id FROM module m WHERE module_id = module_id_in AND year = YEAR(NOW())
                )
            )
        );
END;

#Get Total, Attended & Late from each student studying a module
CREATE PROCEDURE AttendanceForModule ( IN module_id_in INT )
BEGIN
    SELECT modulelecturer.num_events, attendance.num_attended, attendance.num_late FROM modulelecturer
    INNER JOIN attendance ON modulelecturer.module_id = attendance.module_id
    WHERE modulelecturer.module_id = module_id_in;
END;
