
import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { useAuth } from "../AuthContext/AuthContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddFoodModal = ({ show, handleClose, onAddItem }) => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [query, setQuery] = useState('');
    const [foodData, setFoodData] = useState([]);
    const [error, setError] = useState(null);
    const servingRef = useRef(null); 
    const mealTypeRef = useRef(null); 

    const handleChange = () => {
        if (servingRef.current && mealTypeRef.current) {
            const servingSize = parseFloat(servingRef.current.value) || 1;
            console.log(servingRef.current.value)
            const newData = {
                quantity: servingSize,
                item: foodData[0].name,
                calories: foodData[0].calories * servingSize,
                carbs: foodData[0].carbohydrates_total_g* servingSize,
                fat: foodData[0].fat_total_g * servingSize,
                protein: foodData[0].protein_g * servingSize,
                mealType: mealTypeRef.current.value,
            };
            console.log(newData);
        }
    };

    const handleSubmit = async () => {
        if (servingRef.current && mealTypeRef.current) {
            const servingSize = parseInt(servingRef.current.value) || 1;
            // const newData = {
            //     date: new Date(),
            //     quantity: servingSize,
            //     item: foodData[0].name,
            //     calories: Math.round(foodData[0].calories * servingSize),
            //     carbs: Math.round(foodData[0].carbohydrates_total_g * servingSize),
            //     fat: Math.round(foodData[0].fat_total_g * servingSize),
            //     protein: Math.round(foodData[0].protein_g * servingSize),
            //     mealType: mealTypeRef.current.value,
            // };
            const newData = {
                date: new Date(),
                meal: mealTypeRef.current.value,
                food_serving: servingSize,
                food_name: foodData[0].name,
                food_calories: Math.round(foodData[0].calories * servingSize),
                food_carbs: Math.round(foodData[0].carbohydrates_total_g * servingSize),
                food_protein: Math.round(foodData[0].protein_g * servingSize),
                food_fat: Math.round(foodData[0].fat_total_g * servingSize)
            }
            console.log(new Date)

            console.log(newData);
            // setFoodData(newData)
            // onAddItem(newData)
            // API send to add data to db
            const backendUrl = "http://localhost:3001/calories/updateDiary";
            try {
                const response = await axios.post(backendUrl, newData, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                console.log('Diary Updated:', response.data);
            } catch (error) {
                console.error('Error saving workout:', error.response.data);
            }
            handleClose();
        }
    };
    

    const handleSearch = () => {
        fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
            method: 'GET',
            headers: { 'X-Api-Key': 'IyJrMDSC16bXvUFRVrKvaw==SEE4e3it4q0VKpUF' }, // Replace 'YOUR_API_KEY' with your actual API key
            contentType: 'application/json',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setFoodData(data.items);
            setError(null);
        })
        .catch(error => {
            setError(error.message);
            setFoodData([]);
        });
    };

    return (
                <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Food</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="foodQuery">
                        <Form.Label>Enter Food:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="e.g., 3lb carrots and a chicken sandwich" 
                            value={query} 
                            onChange={(e) => setQuery(e.target.value)} 
                        />
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={handleSearch}>
                    Search
                </Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Table striped bordered hover style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Calories</th>
                            <th>Serving Size (g)</th>
                            <th>Fat (g)</th>
                            <th>Protein (g)</th>
                            <th>Carbohydrates (g)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.calories}</td>
                                <td>{item.serving_size_g}</td>
                                <td>{item.fat_total_g}</td>
                                <td>{item.protein_g}</td>
                                <td>{item.carbohydrates_total_g}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Form>
                    <Form.Group>
                        <Form.Label>Serving(s)</Form.Label>
                        <Form.Control ref={servingRef} type="number" placeholder="Enter Number of Servings" onChange={handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Meal</Form.Label>
                        <Form.Select ref={mealTypeRef} onChange={handleChange}>
                        <option value="">Select The Meal</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        </Form.Select>
                            
                    </Form.Group>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>Add Item</Button>
                <Button variant="danger" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddFoodModal;
