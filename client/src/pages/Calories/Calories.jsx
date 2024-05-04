import React, { useState, useEffect  } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import { useNavigate } from "react-router-dom";
import './Calories.css'; // Import CSS file
import UpdateGoalModal from '../../components/UpdateGoals/UpdateGoalsModal';
import QuickAddItemModal from '../../components/QuickAdd/QuickAddItemModal';
import AddFoodModal from '../../components/AddFoodComponent/AddFoodModal'
import { useAuth } from "../../components/AuthContext/AuthContext";
import axios from 'axios';

const Calories =  () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [modalShow, setShowGoalModal] = useState(false);
    const [quickAddModalShow, setQuickAddModalShow] = useState(false);
    const [foodAddModalShow, setFoodAddModalShow] = useState(false);
    // const [date, setDate] = useState(new Date());
    const defaultDate = new Date().toISOString().substr(0, 10); // Format: YYYY-MM-DD
    const [selectedDate, setSelectedDate] = useState(defaultDate);
    const [goalData, setGoalData] = useState({
      start_weight: 0,
      current_weight: 0,
      goal_weight: 0,
      weekly_goal: '',
      activity_level: '',
      calories_goal: 0,
      protein_goal: 0,
      carbs_goal: 0,
      fat_goal: 0
  });

    const [mealItems, setMealItems] = useState([])

    


    const [totals, setTotals] = useState({
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0
    });

    const handleQuickAddItem = (quickAddMacrosData) => {
      // Append new data to existing array
      // setQuickAddData([...quickAddData, quickAddMacrosData]);
    
      // Add updated data to breakfastItems
      setMealItems([...mealItems, quickAddMacrosData])
      // setMealItems([...mealItems, quickAddMacrosData]);
    
    };

    useEffect(() =>{
      const getFoodData = async () => {
        const backendUrl = 'http://localhost:3001/calories/getDiary?date=' + selectedDate;
        try {
          const response = await axios.get(backendUrl, {
            headers: {
              Authorization: `${token}`
            }
          });
          setMealItems(response.data)
          // console.log(response.data)

        }catch(error){
          console.log(error)
        }
      }

      getFoodData();
    }, [selectedDate]);

    useEffect(() => {
      const fetchGoalData = async () => {
        const backendUrl = "http://localhost:3001/calories/getGoals";
        try {
          const response = await axios.get(backendUrl, {
            headers: {
              Authorization: `${token}`
            }
          });
          if (!response.data){
            setShowGoalModal(true)
            alert("No Goal Data, please complete form!")
          }else{
            const responseData = response.data
            // console.log(response.data)
            setGoalData(responseData[response.data.length - 1]);
            // console.log(responseData[response.data.length - 1]);
          }

        } catch (error) {
          console.error('Error fetching goal data:', error);
        }
      };
  
      fetchGoalData(); 
      // If Goal Data is null set to 0 
      console.log("The goal data is" + goalData)
      if(!goalData){

        setShowGoalModal(true)

    }
  
    }, []);

  const handleDateChange = (e) => {
    // setDate(e.target.value);
    setSelectedDate(e.target.value);

  };



  const handleDeleteItem = async (mealType, itemID) => {
    console.log(itemID)
    const backendUrl = 'http://localhost:3001/calories/deleteDiaryEntry';
    try {
      const response = await axios.post(backendUrl, {
        id: itemID
      } ,{
      headers: {
        Authorization: `${token}`
        }
      });
      console.log(response)
      // window.location.reload(false);
        }catch(error){
          console.log(error)
        }

        const newmealItems = mealItems.filter(item => item.food_id !== itemID);
        setMealItems(newmealItems)
    }
  

  const handleModifyItem = (mealType, index) => {
    // Implement modification logic here
  };

  const handleUpdateGoals = () => {
    // Implement update goals logic here
    
  };


  // console.log("Calorie Goal is" + goalData.calories_goal)
  console.log(mealItems)
  return (
    <div className="calories-container">
      <div className="header">
        <input type="date" class="form-control" value={selectedDate} onChange={handleDateChange}/>
        {/* <DatePicker class="form-control" onChange={handleDateChange} defaultValue={new Date()} ></DatePicker> */}
        <Button variant="primary" onClick={() => setShowGoalModal(true)}>Update Goals</Button>
        <UpdateGoalModal show={modalShow} handleClose={() => setShowGoalModal(false) } />
      </div>
      <div className="actions">
        <Button variant="secondary" onClick={() => setFoodAddModalShow(true)}>Add Food</Button>
        <AddFoodModal show={foodAddModalShow} handleClose={() => setFoodAddModalShow(false)} onAddItem={handleQuickAddItem}></AddFoodModal>
        <Button variant="secondary" onClick={() => setQuickAddModalShow(true)}>Quick Add</Button>
        <QuickAddItemModal show={quickAddModalShow} handleClose={() => setQuickAddModalShow(false)} onAddItem={handleQuickAddItem}></QuickAddItemModal>
      </div>
      <h2>Breakfast Items</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Calories (Kcal)</th>
            <th>Carbs (g)</th>
            <th>Fat (g)</th>
            <th>Protein (g)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mealItems.filter(item => item.meal == 'breakfast').map((item, index) => (
            <tr key={item.food_id}>
              <td>{item.food_name}</td>
              <td>{item.food_serving}</td>
              <td>{item.food_calories}</td>
              <td>{item.food_carbs}</td>
              <td>{item.food_fat}</td>
              <td>{item.food_protein}</td>
              <td>
                <Button variant ="danger" onClick={() => handleDeleteItem('breakfast', item.food_id)}>Delete Entry</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Lunch Items</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Calories (Kcal)</th>
            <th>Carbs (g)</th>
            <th>Fat (g)</th>
            <th>Protein (g)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mealItems.filter(item => item.meal == 'lunch').map((item, index) => (
            <tr key={item.food_id}>
              <td>{item.food_name}</td>
              <td>{item.food_serving}</td>
              <td>{item.food_calories}</td>
              <td>{item.food_carbs}</td>
              <td>{item.food_fat}</td>
              <td>{item.food_protein}</td>
              <td>
                <Button variant ="danger" onClick={() => handleDeleteItem('lunch', item.food_id)}>Delete Entry</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Dinner Items</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Calories (Kcal)</th>
            <th>Carbs (g)</th>
            <th>Fat (g)</th>
            <th>Protein (g)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mealItems.filter(item => item.meal == 'dinner').map((item, index) => (
            <tr key={item.food_id}>
              <td>{item.food_name}</td>
              <td>{item.food_serving}</td>
              <td>{item.food_calories}</td>
              <td>{item.food_carbs}</td>
              <td>{item.food_fat}</td>
              <td>{item.food_protein}</td>
              <td>
                <Button variant ="danger" onClick={() => handleDeleteItem('dinner', item.food_id)}>Delete Entry</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Totals</h2>
      <table>
        <thead>
          <tr>
            <th>*</th>
            <th>Calories (Kcal)</th>
            <th>Carbs (g)</th>
            <th>Fat (g)</th>
            <th>Protein (g)</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>Allowance</td>
            <td>{goalData.calories_goal }</td>
            <td>{goalData.carbs_goal}</td>
            <td>{goalData.fat_goal }</td>
            <td>{goalData.protein_goal }</td>
        </tr>
          <tr>
            <td> - Total Eaten</td>
            <td>{mealItems.reduce((acc, mealItem) => {
              return acc + parseInt(mealItem.food_calories || 0);
            }, 0)}</td>
            <td>{mealItems.reduce((acc, mealItem) => {
              return acc + parseInt(mealItem.food_carbs || 0);
            }, 0)}</td>
            <td>{mealItems.reduce((acc, mealItem) => {
              return acc + parseInt(mealItem.food_fat || 0);
            }, 0)}</td>
            <td>{mealItems.reduce((acc, mealItem) => {
              return acc + parseInt(mealItem.food_protein || 0);
            }, 0)}</td>
          </tr>
          <tr>
            <td> = Total Remaining</td>
            <td>{goalData.calories_goal - mealItems.reduce((acc, mealItem) => {
              return acc + parseInt(mealItem.food_calories || 0);
            }, 0)}</td>
            <td>{goalData.carbs_goal - mealItems.reduce((acc, mealItem) => {
              return acc + parseInt(mealItem.food_carbs || 0);
            }, 0)}</td>
            <td>{goalData.fat_goal - mealItems.reduce((acc, mealItem) => {
              return acc + parseInt(mealItem.food_fat || 0);
            }, 0)}</td>
            <td>{goalData.protein_goal - mealItems.reduce((acc, mealItem) => {
              return acc + parseInt(mealItem.food_protein || 0);
            }, 0)}</td>
          </tr>
        </tbody>

      </table>
    </div>
  );

};
          

export default Calories;



