--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE fitness;
ALTER ROLE fitness WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:RsWUas47UNlQ/0x77015WA==$CvicepAWwpUzRdvWfSGMUS4nK5AenBVQZ5q0qUgpSyk=:eEUKk0L/uMGDuBcGtOzMZtza4yvItueL5fw83y17xXY=';
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:lBl9ksCgUw3o9lKnGbEUHA==$h10K1cESD6ZEdKv7YMjpTRGRuU1cG4vTZVaQM064tMM=:QfJ98/Hq0MUZ0bg5lGvskQkXo+zEroFIXC/rc5wQDTk=';

--
-- User Configurations
--








--
-- PostgreSQL database cluster dump complete
--

