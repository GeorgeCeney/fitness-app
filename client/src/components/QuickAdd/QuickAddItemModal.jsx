import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import { useAuth } from "../AuthContext/AuthContext";
import axios from 'axios';
const QuickAddItemModal = ({ show, handleClose, onAddItem }) => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const calorieRef = useRef(null); // Create a ref for the form element
    const fatRef = useRef(null);
    const carbRef = useRef(null);
    const proteinRef = useRef(null);
    const mealTypeRef = useRef(null); 

    const [quickAddMacrosData, setMacros] = useState({
        item: 'Quick Add',
        mealType: '',
        quantity: '1',
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0

    })

    const handleChange = () =>{
        const newData = {
            item: 'Quick Add',
            quantity: '1',
            mealType: mealTypeRef.current.value,
            calories: parseInt(calorieRef.current.value) || 0,
            carbs: parseInt(carbRef.current.value) || 0,
            fat: parseInt(fatRef.current.value) || 0,
            protein: parseInt(proteinRef.current.value) || 0
        }
        console.log(newData)
        setMacros(newData)
    }

    const handleSubmit = async () => {
        console.log("Calories:", calorieRef.current.value);
        // const newData = {
        //     date: new Date(),
        //     item: 'Quick Add',
        //     quantity: '1',
        //     mealType: mealTypeRef.current.value,
        //     calories: parseInt(calorieRef.current.value) || 0,
        //     carbs: parseInt(carbRef.current.value) || 0,
        //     fat: parseInt(fatRef.current.value) || 0,
        //     protein: parseInt(proteinRef.current.value) || 0
        // }
        const newData = {
            date: new Date(),
            meal: mealTypeRef.current.value,
            food_name: 'Quick Add',
            food_serving: '1',
            food_calories: parseInt(calorieRef.current.value) || 0,
            food_carbs: parseInt(carbRef.current.value) || 0,
            food_protein: parseInt(proteinRef.current.value) || 0,
            food_fat: parseInt(fatRef.current.value) || 0
        }
        console.log(newData)
        setMacros(newData)

        // onAddItem(newData)

        /*
        SEND API Request Saving this data, or save data as part of Calories.jsx file in the handleQuickAddItem function
        */
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


        handleClose()


    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Quick Add</Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="calories">
                        <Form.Label>Calories</Form.Label>
                        <Form.Control ref={calorieRef} type="number" placeholder="Enter calories"  onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="carbs">
                        <Form.Label>Carbs</Form.Label>
                        <Form.Control ref={carbRef} type="number" placeholder="Enter carbs in grams" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="fat">
                        <Form.Label>Fat</Form.Label>
                        <Form.Control ref={fatRef} type="number" placeholder="Enter fat in grams" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="protein">
                        <Form.Label>Protein</Form.Label>
                        <Form.Control ref={proteinRef} type="number" placeholder="Enter protein in grams" onChange={handleChange} />
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
    

}
export default QuickAddItemModal;

