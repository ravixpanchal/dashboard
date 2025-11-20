CREATE DATABASE IF NOT EXISTS student_system;

USE student_system;

CREATE TABLE students (
    roll VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100),
    branch VARCHAR(50),
    course VARCHAR(50),
    attendance INT(3)
);
