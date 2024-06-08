import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL } from "firebase/storage";  
import { getDocs, collection, addDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext';
import SignOut from './SignOut';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import StatusCounts from './StatusCounts';
import TaskRemindersAndDueDates from './TaskRemindersAndDueDates';
import { firestore, storage } from '../firebase';

const TaskManager = () => {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('None');
    const [avatarURL, setAvatarURL] = useState(null);
    const [showAddSnackbar, setShowAddSnackbar] = useState(false);
    const [showUpdateSnackbar, setShowUpdateSnackbar] = useState(false);
    const [showDeleteSnackbar, setShowDeleteSnackbar] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const q = query(collection(firestore, 'tasks'), where('ownerId', '==', currentUser.uid));
                const querySnapshot = await getDocs(q);
                const res = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setTasks(res);
            } catch (e) {
                console.error("Error fetching tasks: ", e);
                setTasks([]);
            }
        };

        if (currentUser) {
            fetchTasks();
        }

        const fetchAvatar = async () => {
            try {
                const avatarRef = ref(storage, `avatars/${currentUser.uid}/avatar.jpg`);
                const url = await getDownloadURL(avatarRef);
                setAvatarURL(url);
            } catch (error) {
                console.error('Error fetching avatar:', error);
            }
        };

        if (currentUser) {
            fetchAvatar();
        }
    }, [currentUser]);

    const addTask = async (task) => {
        try {
            const docRef = await addDoc(collection(firestore, 'tasks'), { ...task, ownerId: currentUser.uid });
            setTasks([...tasks, { id: docRef.id, ...task }]);
            setShowAddSnackbar(true);
            setTimeout(() => {
                setShowAddSnackbar(false);
            }, 3000); // Hide the snackbar after 3 seconds
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTask = async (updatedTask) => {
        try {
            await updateDoc(doc(firestore, 'tasks', updatedTask.id), updatedTask);
            const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
            setTasks(updatedTasks);
            setShowUpdateSnackbar(true);
            setTimeout(() => {
                setShowUpdateSnackbar(false);
            }, 3000); // Hide the snackbar after 3 seconds
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await deleteDoc(doc(firestore, 'tasks', id));
            setTasks(tasks.filter(task => task.id !== id));
            setShowDeleteSnackbar(true);
            setTimeout(() => {
                setShowDeleteSnackbar(false);
            }, 3000); // Hide the snackbar after 3 seconds
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const avatarContent = avatarURL ? (
        <img src={avatarURL} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
    ) : (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold mr-2">
            {currentUser.email[0].toUpperCase()}
        </div>
    );

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

    const dueDates = tasks.filter(task => task.dueDate);

    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-white text-xl font-bold">Task Manager</h1>
                    <div className="flex items-center">
                        {avatarContent}
                        <SignOut />
                    </div>
                </div>
            </nav>
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-2">
                        <TaskForm addTask={addTask} />
                        <TaskRemindersAndDueDates dueDates={dueDates} />
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
                        <StatusCounts tasks={tasks} />
                        <TaskList tasks={sortedTasks} updateTask={updateTask} deleteTask={deleteTask} />
                    </div>
                </div>
            </div>
            {showAddSnackbar && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-4 fixed bottom-0 left-0 right-0">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M11.293 3.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L12 6.414l-4.793 4.793a1 1 0 01-1.414-1.414l5-5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0L3.293 8.707a1 1 0 010-1.414l5-5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">Task added successfully!</p>
                  </div>
                </div>
              </div>
            )}
            {showUpdateSnackbar && (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md mb-4 fixed bottom-0 left-0 right-0">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M11.293 3.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L12 6.414l-4.793 4.793a1 1 0 01-1.414-1.414l5-5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0L3.293 8.707a1 1 0 010-1.414l5-5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm">Task updated successfully!</p>
                    </div>
                  </div>
                </div>
            )}
            {showDeleteSnackbar && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4 fixed bottom-0 left-0 right-0">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M11.293 3.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L12 6.414l-4.793 4.793a1 1 0 01-1.414-1.414l5-5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0L3.293 8.707a1 1 0 010-1.414l5-5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">Task deleted successfully!</p>
                  </div>
                </div>
              </div>
            )}
        </div>
    );
};

export default TaskManager;
