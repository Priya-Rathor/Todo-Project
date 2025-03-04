import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from "react-icons/bs";

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
            .then(result => {
                // Find the updated todo and update the state
                setTodos(todos.map(todo => todo._id === id ? { ...todo, done: !todo.done } : todo));
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(result => {
                // Remove the deleted todo from the state
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create />
            {
                todos.length === 0
                    ? <div><h2>No Record</h2></div>
                    : todos.map(todo => (
                        <div className="task" key={todo._id}>
                            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                                {
                                    todo.done
                                        ? <BsFillCheckCircleFill className='icon' />
                                        : <BsCircleFill className='icon' />
                                }
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default Home;
