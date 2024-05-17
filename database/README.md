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
    run_total_distance integer NOT NULL,
    number_of_laps integer NOT NULL,
    run_route json NOT NULL,
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

CREATE TABLE public.diary (
    user_id INT,
    date DATE,
    meal VARCHAR(50),
    food_name VARCHAR(100),
    food_serving DECIMAL(10,2),
    food_calories INT,
    food_carbs DECIMAL(10,2),
    food_protein DECIMAL(10,2),
    food_fat DECIMAL(10,2),
    food_id INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE public.goals (
    user_id INT,
    start_weight DECIMAL(10,2),
    current_weight DECIMAL(10,2),
    goal_weight DECIMAL(10,2),
    weekly_goal DECIMAL(10,2),
    activity_level VARCHAR(50),
    calories_goal INT,
    protein_goal DECIMAL(10,2),
    carbs_goal DECIMAL(10,2),
    fat_goal DECIMAL(10,2),
);
