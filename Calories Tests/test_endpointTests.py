import pytest
import requests
import datetime

# Test for TC.B.5
def test_delete_diary_entry():
    url = "http://localhost:3001/calories/deleteDiaryEntry"
    food_id = 57
    data = {"id": food_id}
    response = requests.post(url, json=data)
    assert response.status_code == 200, f"Request failed. Status code: {response.status_code}"

# Test for TC.B.1
def test_set_goal():
    url = "http://localhost:3001/calories/setGoal"
    data = {
        "start_weight": 90,
        "current_weight": 85,
        "goal_weight": 80,
        "weekly_goal": "lose05",
        "activity_level": "notActive",
        "calories_goal": "2500",
        "protein_goal": "190",
        "carbs_goal": "240",
        "fats_goal": "90"
    }
    response = requests.post(url, json=data)
    assert response.status_code == 200, f"Request failed. Status code: {response.status_code}"

# Test for TC.B.3
def test_update_diary():
    url = "http://localhost:3001/calories/updateDiary"
    current_datetime = datetime.datetime.today().strftime('%Y-%m-%d %H:%M:%S')  # Convert datetime to string
    data = {
        "date": current_datetime,
        "meal": "breakfast",
        "food_name": "chicken",
        "food_calories": 500,
        "food_serving": 2,
        "food_carbs": 0.5,
        "food_protein": 80,
        "food_fat": 60
    }
    response = requests.post(url, json=data)
    assert response.status_code == 200, f"Request failed. Status code: {response.status_code}"

# Test for TC.B.4
def test_get_diary():
    url = "http://localhost:3001/calories/getDiary"
    response = requests.get(url)
    assert response.status_code == 200, f"Request failed. Status code: {response.status_code}"


# Test for TC.B.2
def test_get_goals():
    url = "http://localhost:3001/calories/getGoals"
    user_id = 1
    response = requests.get(url)
    assert response.status_code == 200, f"Request failed. Status code: {response.status_code}"
