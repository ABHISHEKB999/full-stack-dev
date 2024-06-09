import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';
import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import {
  SignOut,
  SnackBar,
  StatusCounts,
  TaskFilter,
  TaskForm,
  TaskList,
  TaskRemindersAndDueDates,
} from './components';
import { firestore, storage } from '../../firebase';
import { useTheme } from '../../providers/ThemeProvider';

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
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [caughtError, setCaughtError] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.getElementById('root').classList.add('dark');
    } else {
      document.getElementById('root').classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    setShowErrorSnackbar(true);
    setTimeout(() => {
      setShowErrorSnackbar(false);
    }, 3000);
  }, [caughtError]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const q = query(
          collection(firestore, 'tasks'),
          where('ownerId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const res = querySnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setTasks(res);
      } catch (e) {
        setCaughtError('Error fetching tasks');
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
        setCaughtError('Error fetching avatar');
      }
    };

    if (currentUser) {
      fetchAvatar();
    }
  }, [currentUser]);

  const addTask = async (task) => {
    try {
      const docRef = await addDoc(collection(firestore, 'tasks'), {
        ...task,
        ownerId: currentUser.uid,
      });
      setTasks([...tasks, { id: docRef.id, ...task }]);
      setShowAddSnackbar(true);
      setTimeout(() => {
        setShowAddSnackbar(false);
      }, 3000);
    } catch (error) {
      setCaughtError('Error adding task');
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      await updateDoc(doc(firestore, 'tasks', updatedTask.id), updatedTask);
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(updatedTasks);
      setShowUpdateSnackbar(true);
      setTimeout(() => {
        setShowUpdateSnackbar(false);
      }, 3000);
    } catch (error) {
      setCaughtError('Error updating task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'tasks', id));
      setTasks(tasks.filter((task) => task.id !== id));
      setShowDeleteSnackbar(true);
      setTimeout(() => {
        setShowDeleteSnackbar(false);
      }, 3000);
    } catch (error) {
      setCaughtError('Error deleting task');
    }
  };

  const avatarContent = avatarURL ? (
    <img
      src={avatarURL}
      alt="User Avatar"
      className="w-8 h-8 rounded-full mr-2"
    />
  ) : (
    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold mr-2">
      {currentUser.email[0].toUpperCase()}
    </div>
  );

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filterStatus === 'All' || task.status === filterStatus;
    const matchesSearchTerm = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
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

  const dueDates = tasks.filter((task) => task.dueDate);

  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
      <div className="bg-white dark:bg-gray-800">
        <nav className="bg-gray-800 dark:bg-gray-900 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-white dark:text-gray-100 text-xl font-bold">
              Task Manager
            </h1>
            <div className="flex items-center">
              {avatarContent}
              <SignOut />
              <button
                onClick={toggleTheme}
                className="text-white dark:text-gray-100 ml-4"
                type="button"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        </nav>
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-2 bg-light-container dark:bg-dark-container">
              <TaskForm addTask={addTask} />
              <TaskRemindersAndDueDates dueDates={dueDates} />
            </div>
            <div className="md:w-1/2 p-2 bg-light-container dark:bg-dark-container">
              <TaskFilter
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
              <StatusCounts tasks={tasks} />
              <TaskList
                tasks={sortedTasks}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            </div>
          </div>
        </div>
        {showAddSnackbar && <SnackBar color="green" message="added" />}
        {showUpdateSnackbar && <SnackBar color="blue" message="updated" />}
        {showDeleteSnackbar && <SnackBar color="red" message="deleted" />}
        {showErrorSnackbar && <SnackBar color="red" message={caughtError} />}
      </div>
    </div>
  );
};

export default TaskManager;
