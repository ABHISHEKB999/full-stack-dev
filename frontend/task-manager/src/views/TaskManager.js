import React, { useState, useEffect } from 'react';
import SignOut from './SignOut';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import UserProfile from './UserProfile';
import axios from 'axios';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('None');
  
    useEffect(() => {
      axios.get('http:/localhost:3001/tasks')
        .then(response => setTasks(response.data))
        .catch(error => console.error('Error fetching tasks:', error));
    }, []);
  
    const addTask = (task) => {
      axios.post('http:/localhost:3001/tasks', task)
        .then(response => setTasks([...tasks, response.data]))
        .catch(error => console.error('Error adding task:', error));
    };
  
    const updateTask = (updatedTask) => {
      axios.put(`http:/localhost:3001/tasks/${updatedTask.id}`, updatedTask)
        .then(response => {
          const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
          setTasks(updatedTasks);
        })
        .catch(error => console.error('Error updating task:', error));
    };
  
    const deleteTask = (id) => {
      axios.delete(`http:/localhost:3001/tasks/${id}`)
        .then(() => setTasks(tasks.filter(task => task.id !== id)))
        .catch(error => console.error('Error deleting task:', error));
    };
  
    const filteredTasks = tasks.filter(task => {
        const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
        const matchesSearchTerm = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearchTerm;
    });
    
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortBy === 'DueDate') {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (sortBy === 'Title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
    });

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <SignOut />
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Task Manager</h1>
      <UserProfile />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <TaskForm addTask={addTask} />
        </div>
        <div className="md:w-1/2 p-2">
            <TaskFilter 
                filterStatus={filterStatus} 
                setFilterStatus={setFilterStatus} 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
          <TaskList tasks={sortedTasks} updateTask={updateTask} deleteTask={deleteTask} />
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
