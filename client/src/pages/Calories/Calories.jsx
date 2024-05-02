import React, { useState, useEffect  } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import './Calories.css'; // Import CSS file
import UpdateGoalModal from '../../components/UpdateGoals/UpdateGoalsModal';
import QuickAddItemModal from '../../components/QuickAdd/QuickAddItemModal';
import AddFoodModal from '../../components/AddFoodComponent/AddFoodModal'

const Calories = () => {
    const [modalShow, setShowGoalModal] = useState(false);
    const [quickAddModalShow, setQuickAddModalShow] = useState(false);
    const [foodAddModalShow, setFoodAddModalShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [quickAddData, setQuickAddData] = useState([])

    const [mealItems, setMealItems] = useState([{

      }])

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
      setMealItems([...mealItems, quickAddMacrosData]);
    
    };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleNewItem = () => {

  }

  const handleDeleteItem = (mealType, index) => {
    return null
  };

  const handleModifyItem = (mealType, index) => {
    // Implement modification logic here
  };

  const handleUpdateGoals = () => {
    // Implement update goals logic here
  };



  return (
    <div className="calories-container">
      <div className="header">
        <input type="date" class="form-control" value={date} onChange={handleDateChange} />
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
          {mealItems.filter(mealItems => mealItems.mealType == 'breakfast').map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.quantity}</td>
              <td>{item.calories}</td>
              <td>{item.carbs}</td>
              <td>{item.fat}</td>
              <td>{item.protein}</td>
              <td>
                <Button variant = "warning" onClick={() => handleModifyItem('breakfast', index)}>Modify Entry</Button>
                <Button variant ="danger" onClick={() => handleDeleteItem('breakfast', index)}>Delete Entry</Button>
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
          {mealItems.filter(mealItems => mealItems.mealType == 'lunch').map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.quantity}</td>
              <td>{item.calories}</td>
              <td>{item.carbs}</td>
              <td>{item.fat}</td>
              <td>{item.protein}</td>
              <td>
                <Button variant = "warning" onClick={() => handleModifyItem('lunch', index)}>Modify Entry</Button>
                <Button variant = "danger" onClick={() => handleDeleteItem('lunch', index)}>Delete Entry</Button>
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
          {mealItems.filter(mealItems => mealItems.mealType === 'dinner').map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.quantity}</td>
              <td>{item.calories}</td>
              <td>{item.carbs}</td>
              <td>{item.fat}</td>
              <td>{item.protein}</td>
              <td>
                <Button variant = "warning" onClick={() => handleModifyItem('dinner', index)}>Modify Entry</Button>
                <Button variant = "danger" onClick={() => handleDeleteItem('dinner', index)}>Delete Entry</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Totals</h2>
      <table>
        <thead>
          <tr>
            <th>Totals</th>
            <th>Calories (Kcal)</th>
            <th>Carbs (g)</th>
            <th>Fat (g)</th>
            <th>Protein (g)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Totals</td>
            <td>{mealItems.reduce((acc, mealItem) => {
              return acc + mealItem.calories || 0;
              }, 0)}</td>
            <td>{mealItems.reduce((acc, mealItem) => {
              return acc + mealItem.carbs || 0;
              }, 0)}</td>
            <td>{mealItems.reduce((acc, mealItem) => {
              return acc + mealItem.fat || 0;
              }, 0)}</td>
            <td>{mealItems.reduce((acc, mealItem) => {
              return acc + mealItem.protein || 0;
              }, 0)}</td>
          </tr>
          <tr>
            <td>Your Daily Goal</td>
            <td>2500</td>
            <td>156</td>
            <td>70</td>
            <td>312</td>
          </tr>
          <tr>
            <td>Reamaining</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Calories;



