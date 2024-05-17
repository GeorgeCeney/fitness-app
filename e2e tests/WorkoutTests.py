from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time

driver = webdriver.Chrome()
driver.maximize_window()
wait = WebDriverWait(driver, 10)

def login_to_site(url, email, password):
    driver.get(url)

    # Wait for the "Sign In/Register" button to be clickable and click button
    sign_in_button = wait.until(
        EC.element_to_be_clickable((By.ID, "login-register-button"))
        
    )
    sign_in_button.click()

    # Wait for the login form to be visible
    wait.until(
        EC.visibility_of_element_located((By.ID, "login-form"))
    )

    # Input Email
    username_field = wait.until(
        EC.element_to_be_clickable((By.ID, "email"))
    )
    username_field.clear()
    username_field.send_keys(email)

    # Input Password
    password_field = wait.until(
        EC.element_to_be_clickable((By.ID, "password"))
    )
    password_field.clear()
    password_field.send_keys(password)

    # Submit login form
    submit_button = wait.until(
        EC.element_to_be_clickable((By.ID, "sign-in-button"))
    )
    submit_button.click()

    wait.until(
        EC.visibility_of_element_located((By.ID, "logout-button"))
    )
    print("Login successful")


def navigate_to_workouts_page(): 
    # Navigate to workouts page
    workouts_link = wait.until(
        EC.element_to_be_clickable((By.LINK_TEXT, "Workouts"))
    )
    workouts_link.click()
    print("Navigated to workouts page")

def navigate_to_create_workout(): 
    # Navigate to create workout page
    add_workout_button = wait.until(
        EC.element_to_be_clickable((By.ID, "add-workout-button"))
    )
    add_workout_button.click()
    print("Clicked on add workout button")

def save_workout():
    save_workout_button = wait.until(
        EC.presence_of_element_located((By.ID, "save-workout-button"))
    )
    driver.execute_script("arguments[0].scrollIntoView();", save_workout_button)
    time.sleep(1)
    try:
        save_workout_button.click()
    except Exception as e:
        print("Click failed, using JS click:", e)
        driver.execute_script("arguments[0].click();", save_workout_button)

def create_workout():
    # Login
    login_to_site("http://localhost:3000/", "test@email.com", "password")

    # Navigate to workouts page
    navigate_to_workouts_page()

    navigate_to_create_workout()

    # Input workout name
    workout_name_field = wait.until(
        EC.element_to_be_clickable((By.ID, "workoutName"))
    )
    workout_name_field.clear()
    workout_name_field.send_keys("Test Workout")
    
    # Select exercise from dropdown
    dropdown = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "react-select-2-input"))
    )
    dropdown.click()
    dropdown.send_keys(Keys.ENTER)
    print("Top exercise selected successfully")

    # Add selected exercise to form
    add_exercise_button = wait.until(
        EC.element_to_be_clickable((By.ID, "add-exercise-button"))
    )
    add_exercise_button.click()
    print("Exercise added successfully")

    # Input exercise details
    exercise_sets_field = wait.until(
        EC.element_to_be_clickable((By.ID, "sets"))
    )
    exercise_sets_field.clear()
    exercise_sets_field.send_keys("5")

    exercise_reps_field = wait.until(
        EC.element_to_be_clickable((By.ID, "reps"))
    )
    exercise_reps_field.clear()
    exercise_reps_field.send_keys("10")

    exercise_weight_field = wait.until(
        EC.element_to_be_clickable((By.ID, "weight"))
    )
    exercise_weight_field.clear()
    exercise_weight_field.send_keys("20")
    print("Exercise details successfully inputted")

    # Save workout
    save_workout()

    wait.until(
        EC.alert_is_present()
    )
    print("Workout saved successfully")
    print("End of test script")

    time.sleep(5)

create_workout()
