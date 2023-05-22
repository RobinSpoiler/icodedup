DELIMITER $$

CREATE FUNCTION homeworkQuestion (
    homework_id CHAR(20),
    student_id CHAR(9))
    RETURNS ROW
    BEGIN
        DECLARE last_attempt ROW;
        --Take the last attempt
        SET last_attempt = (
            SELECT *
            FROM hw_questionAttempts
            WHERE student = student_id AND homework = homework_id
            ORDER BY attempt_date DESC
            LIMIT 1
        );

        IF last_attempt.attempt_status = 'PAS' THEN
        DELIMITER ##
            RETURN NewHWQuestion(homework_id, student_id)
        ELSE
            DECLARE continuousAttempts INT;
            SET continuousAttempts := ContinuousAttempts(homework_id, student_id, last_attempt.question);

            IF continuousAttempts <= 3 THEN
            DELIMITER %%
                DECLARE question ROW;

                SELECT *
                INTO question
                FROM questions
                WHERE id_question = last_attempt.question
                LIMIT 1;

                RETURN question;
            ELSE
                RETURN NewHWQuestion(homework_id, student_id)
            END IF %%
        END IF ##
    END 
END$$
DELIMITER ;


--Function 2
DELIMITER $$
CREATE FUNCTION ContinuousAttempts(
    homework_id CHAR(20),
    student_id CHAR(9),
    question_id CHAR(20)
) RETURN INT
BEGIN
    DECLARE cur CURSOR FOR
        SELECT attempt_status
        FROM hw_questionAttempts
        WHERE student = student_id AND homework = homework_id;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;

    read_loop: LOOP

END$$
DELIMITER ;


-- Obtener modulos de una tarea
-- Checar estatus de cada modulo (con una funcion que tome el modulo, tarea y estudiante y te diga si aun le faltan preguntas de ese modulo)
-- El primer modulo que encuentres que no este terminado, regresa una pregunta que no se haya resuelto de ese modulo (con otra funcion que tome modulo, estudiante y tarea)
-- Function
DELIMITER $$
CREATE FUNCTION NewHWQuestion(
    homework_id CHAR(20),
    student_id CHAR(9)
) RETURNS ROW
BEGIN
    DECLARE result_row ROW;
    SELECT q.* INTO result_row
    FROM questions q
    WHERE 
    
    
    RETURN result_row;
END$$
DELIMITER ;
