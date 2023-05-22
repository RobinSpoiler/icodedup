USE iCode;

SET GLOBAL log_bin_trust_function_creators = 1;

DELIMITER $$
CREATE FUNCTION successful_mod_attempts(matricula CHAR(9), mod_id CHAR(20), group_id CHAR(10))
RETURNS INT
BEGIN
    DECLARE successful_attempts INT;
    SELECT COUNT(*) INTO successful_attempts FROM questionAttempts qa
    JOIN questions q ON qa.question = q.id_question
    WHERE student = matricula AND module = mod_id AND grupo = group_id AND attempt_status = 'PAS';
    RETURN successful_attempts;
END$$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION successful_hw_attempts(matricula CHAR(9), hw_id CHAR(20))
RETURNS INT
BEGIN
    DECLARE success_count INT;
    SELECT COUNT(*) INTO success_count
    FROM hw_questionAttempts hqa
    WHERE student = matricula AND homework = hw_id AND attempt_status = 'PAS';
    RETURN success_count;
END$$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION hw_needed_questions(homework_id CHAR(20)) RETURNS INT
BEGIN
    DECLARE total_questions INT DEFAULT 0;
    SELECT SUM(n_questions) INTO total_questions
    FROM homeworkConfigs
    WHERE homework = homework_id;
    RETURN total_questions;
END $$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION count_modules(course_id CHAR(10))
RETURNS INT
BEGIN
    DECLARE count INT;
    SELECT COUNT(*) INTO count FROM modules WHERE course = course_id;
    RETURN count;
END$$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION mod_question_status(group_id CHAR(20), question_id CHAR(20), student CHAR(9))
RETURNS CHAR(3)
BEGIN
    DECLARE question_status CHAR(3);
    DECLARE done BOOLEAN DEFAULT FALSE;
    
    DECLARE cur CURSOR FOR
        SELECT attempt_status
        FROM questionAttempts
        WHERE student = student
        AND grupo = group_id
        AND question = question_id;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    SET question_status = 'PEN';

    OPEN cur;
        read_loop: LOOP
        FETCH cur INTO question_status;
        IF done THEN
            LEAVE read_loop;
        END IF;
        IF question_status = 'PAS' THEN
            CLOSE cur;
            RETURN 'PAS';
        END IF;
        END LOOP;
    CLOSE cur;

    IF question_status = 'PEN' THEN
        RETURN question_status;
    ELSE
        RETURN 'FAI';
    END IF;
END$$
DELIMITER ;