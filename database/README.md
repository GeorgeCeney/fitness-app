TO CREATE DATABASE LOCALLY

INTALL PostgreSQL 16.2
Default user will be postgres (I made the password = 'password' for ease of remembering)


RUN:

psql -U postgres -d fitness_app -f fitness_schema.sql

psql -U postgres -f global_objects.sql


