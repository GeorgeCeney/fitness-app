TO CREATE DATABASE LOCALLY

INTALL PostgreSQL 16.2


CREATE TABLE public.users (
    user_id SERIAL PRIMARY KEY,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.exercises (
    exercise_id SERIAL,
    exercise_name character varying(255) NOT NULL,
    description text
);

CREATE TABLE public.runs (
    run_id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    run_name character varying(255) NOT NULL,
    run_time float NOT NULL,
    run_total_distnace integer NOT NULL,
    number_of_laps integer NOT NULL,
    run_route object NOT NULL,
    user_weight integer NOT NULL,
    estimated_calories_burnt float NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE public.workout_exercises (
    workout_exercise_id SERIAL PRIMARY KEY,
    workout_id integer NOT NULL,
    exercise_id integer NOT NULL,
    sets integer NOT NULL,
    reps integer NOT NULL,
    weight integer
);


CREATE TABLE public.workouts (
    workout_id SERIAL,
    user_id integer NOT NULL,
    workout_name character varying(255),
    notes text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    start_time timestamp without time zone,
    end_time timestamp without time zone
);