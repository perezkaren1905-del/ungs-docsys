-- Crear esquema
CREATE SCHEMA IF NOT EXISTS dictamen;

-- Crear tabla
CREATE TABLE IF NOT EXISTS dictamen.dictamen_data
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    data VARCHAR(255)
);

-- Datos iniciales
INSERT INTO dictamen.dictamen_data (name, data)
VALUES ('Dictamen 1', 'Data for dictamen 1'),
       ('Dictamen 2', 'Data for dictamen 2'),
       ('Dictamen 3', 'Data for dictamen 3');
