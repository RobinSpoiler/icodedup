-- SQLBook: Code
DROP DATABASE IF EXISTS iCode;
CREATE DATABASE iCode;

USE iCode;

SET sql_mode = '';

-- Creacion de tablas
CREATE TABLE campus (
    id_campus   CHAR(3)         NOT NULL,
    name_campus VARCHAR(255)    NOT NULL,

    PRIMARY KEY (id_campus)
);

CREATE TABLE terms (
    id_term     CHAR(4)         NOT NULL,
    term_name   VARCHAR(25)     NOT NULL,
    date_start  TIMESTAMP       NOT NULL,
    date_end    TIMESTAMP       NOT NULL,

    PRIMARY KEY (id_term)
);

CREATE TABLE admins (
    id_admin    CHAR(9)         NOT NULL,
    campus      CHAR(3)         NOT NULL,
    first_name  VARCHAR(20)     NOT NULL,
    flast_name  VARCHAR(20)     NOT NULL,
    slast_name  VARCHAR(20),

    PRIMARY KEY (id_admin),
    FOREIGN KEY (campus) REFERENCES campus(id_campus) ON DELETE CASCADE
);

CREATE TABLE students (
    matricula   CHAR(9)         NOT NULL,
    campus      CHAR(3)         NOT NULL,
    first_name  VARCHAR(20)     NOT NULL,
    flast_name  VARCHAR(20)     NOT NULL,
    slast_name  VARCHAR(20),

    PRIMARY KEY (matricula),
    FOREIGN KEY (campus) REFERENCES campus(id_campus) ON DELETE CASCADE
);

CREATE TABLE professors (
    nomina          CHAR(9)         NOT NULL,
    campus          CHAR(3)         NOT NULL,
    first_name      VARCHAR(20)     NOT NULL,
    flast_name      VARCHAR(20)     NOT NULL,
    slast_name      VARCHAR(20),

    PRIMARY KEY (nomina),
    FOREIGN KEY (campus) REFERENCES campus(id_campus) ON DELETE CASCADE
);

CREATE TABLE courses (
    id_course   CHAR(10)    NOT NULL,
    course_name VARCHAR(50) NOT NULL,

    PRIMARY KEY (id_course)
);

CREATE TABLE grupos (
    id_group        CHAR(10)    NOT NULL,
    course          CHAR(10)    NOT NULL,
    main_professor  CHAR(9)     NOT NULL,
    term            CHAR(4)     NOT NULL,

    PRIMARY KEY (id_group),
    FOREIGN KEY (course) REFERENCES courses(id_course) ON DELETE CASCADE,
    FOREIGN KEY (main_professor) REFERENCES professors(nomina) ON DELETE CASCADE,
    FOREIGN KEY (term) REFERENCES terms(id_term) ON DELETE CASCADE
);

CREATE TABLE enrollments (
    grupo       CHAR(10)    NOT NULL,
    student     CHAR(9)     NOT NULL,

    PRIMARY KEY (grupo, student),
    FOREIGN KEY (grupo) REFERENCES grupos(id_group) ON DELETE CASCADE,
    FOREIGN KEY (student) REFERENCES students(matricula) ON DELETE CASCADE
);

CREATE TABLE modules (
    id_module   CHAR(20)    NOT NULL,
    course      CHAR(10)    NOT NULL,
    nombre      VARCHAR(30) NOT NULL,

    PRIMARY KEY (id_module),
    FOREIGN KEY (course) REFERENCES courses(id_course) ON DELETE CASCADE
);

CREATE TABLE moduleConfigs (
    module      CHAR(20)    NOT NULL,
    grupo       CHAR(10)    NOT NULL,
    n_question  INT         NOT NULL,
    locked      boolean     NOT NULL,

    PRIMARY KEY (module, grupo),
    FOREIGN KEY (module) REFERENCES modules(id_module) ON DELETE CASCADE,
    FOREIGN KEY (grupo) REFERENCES grupos(id_group) ON DELETE CASCADE
);

CREATE TABLE questions (
    id_question     CHAR(20)    NOT NULL,
    module          CHAR(20)    NOT NULL,
    q_type          VARCHAR(8)  NOT NULL,
    info            JSON        NOT NULL,
    created_by      CHAR(9)     NOT NULL,
    submittedOn     TIMESTAMP   NOT NULL,
    current_status  CHAR(3)     NOT NULL,

    PRIMARY KEY (id_question),
    FOREIGN KEY (module) REFERENCES modules(id_module) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES professors(nomina) ON DELETE CASCADE
);

CREATE TABLE homework (
    id_homework CHAR(20)        NOT NULL,
    grupo       CHAR(10)        NOT NULL,
    hw_name     VARCHAR(50)     NOT NULL,
    open_date   TIMESTAMP       NOT NULL,
    close_date  TIMESTAMP       NOT NULL,

    PRIMARY KEY (id_homework),
    FOREIGN KEY (grupo) REFERENCES grupos(id_group) ON DELETE CASCADE
);

CREATE TABLE homeworkConfigs (
    homework    CHAR(20)    NOT NULL,
    module      CHAR(20)    NOT NULL,
    n_questions INT         NOT NULL,

    FOREIGN KEY (homework) REFERENCES homework(id_homework) ON DELETE CASCADE,
    FOREIGN KEY (module) REFERENCES modules(id_module) ON DELETE CASCADE
);

CREATE TABLE questionAttempts (
    student         CHAR(9)     NOT NULL,
    grupo           CHAR(10)    NOT NULL,
    question        CHAR(20)    NOT NULL,
    attempt_status  CHAR(3)     NOT NULL,
    attempt_date    TIMESTAMP   NOT NULL,

    FOREIGN KEY (student) REFERENCES students(matricula) ON DELETE CASCADE,
    FOREIGN KEY (grupo) REFERENCES grupos(id_group) ON DELETE CASCADE,
    FOREIGN KEY (question) REFERENCES questions(id_question) ON DELETE CASCADE
);

CREATE TABLE hw_questionAttempts (
    student         CHAR(9)     NOT NULL,
    homework        CHAR(20)    NOT NULL,
    question        CHAR(20)    NOT NULL,
    attempt_status  CHAR(3)     NOT NULL,
    attempt_date    TIMESTAMP   NOT NULL,

    FOREIGN KEY (student) REFERENCES students(matricula) ON DELETE CASCADE,
    FOREIGN KEY (homework) REFERENCES homework(id_homework) ON DELETE CASCADE,
    FOREIGN KEY (question) REFERENCES questions(id_question) ON DELETE CASCADE
);