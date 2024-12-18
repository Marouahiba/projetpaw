import React, { useState } from 'react';
import { useEffect } from 'react';
import useAsyncFunction from '../hooks/useAsyncFunction';
import { addUserTask, deleteTask, fetchUserTasks, setTerminate, updateTask } from '../utils/api';

const TaskManager = ({ category }) => {
    const [tasks, setTasks] = useState([]);
    const [editingTaskIndex, setEditingTaskIndex] = useState(null);
    const [editingTaskName, setEditingTaskName] = useState('');
    const [editingTaskPriority, setEditingTaskPriority] = useState('Élevé');
    const [tasksFiltered, setTasksFiltered] = useState([]); // New state to hold the filtered & sorted tasks
    const { success, error, loading, execute: getTasks } = useAsyncFunction(fetchUserTasks);
    const { success: s2, error: e2, loading: l2, execute: add } = useAsyncFunction(addUserTask);
    const { success: s3, loading: l3, error: e3, execute: deleteT } = useAsyncFunction(deleteTask);
    const { success: s4, loading: l4, error: e4, execute: updateT } = useAsyncFunction(updateTask);

    const fetch = async () => {
        const data = await getTasks(category);
        console.log("tasks", data)
        setTasks(data);
    }
    useEffect(() => {
        fetch();
    }, [category])
    const filterAndSortTasks = (tasks) => {
        // 1. Filter tasks by active status
        const activeTasks = tasks.filter((task) => task.status === 'Active');
        const nonActiveTasks = tasks.filter(task => task.status !== 'Active');
        // 2. Sort by priority in the order: 'élevée' > 'moyenne' > 'faible'
        const priorityOrder = {
            Élevé: 3,
            Moyenne: 2,
            Faible: 1,
        };

        const sortedTasks = activeTasks.sort((a, b) => {
            console.log("a , b", a, b);
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
        const concat = sortedTasks.concat(nonActiveTasks);

        return concat;
    };
    useEffect(() => {
        const filteredTasks = filterAndSortTasks(tasks);
        setTasksFiltered(filteredTasks);
        console.log("Filtered and Sorted Tasks: ", filteredTasks);
    }, [tasks]);

    const addTask = async (task) => {
        if (editingTaskIndex === null && editingTaskName) {
            const data = await add({ title: editingTaskName, category: category, status: 'Active', priority: editingTaskPriority })
            console.log("data", data);
            setTasks([
                { ...data.data.data[0] },
                ...tasks,

            ]);
        } else if (editingTaskIndex !== null) {
            const data = await updateT({ status: task.status, id: task.id, title: editingTaskName, priority: editingTaskPriority, category: task.category });
            console.log("after task update", data);
            setTasks((prev) => prev.map((e, i) => (e.id === task.id ? data.data.data[0] : e)));
        }
        resetEditingState();
    };

    const resetEditingState = () => {
        setEditingTaskIndex(null);
        setEditingTaskName('');
        setEditingTaskPriority('Élevé');
    };

    const startEditTask = (index) => {
        setEditingTaskIndex(index);
        setEditingTaskName(tasks[index].task_name);
        setEditingTaskPriority(tasks[index].priority);
    };

    const updateTaskStatus = async (index, status) => {
        const response = await setTerminate(tasks[index].id);
        const updatedTasks = tasksFiltered.map((task, i) =>
            i === index ? { ...task, status } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTache = async (id) => {
        const response = await deleteT(id);
        setTasks((prev) => prev.filter((task) => task.id !== id));

    };
    const isActive = (task) => {
        return task.status === "Active"
    }

    return (
        <div className="w-full mt-6 p-6 bg-white shadow-md rounded-lg border border-purple-200">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Tâches pour la catégorie {category}</h2>
            {/* Add Task Section */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Ajouter une tâche</h3>
                <div className="flex items-center gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Nom de la tâche"
                        value={editingTaskIndex === null ? editingTaskName : ''}
                        onChange={(e) => setEditingTaskName(e.target.value)}
                        className="flex-grow p-2 border rounded-lg"
                    />
                    <select
                        value={editingTaskIndex === null ? editingTaskPriority : ''}
                        onChange={(e) => setEditingTaskPriority(e.target.value)}
                        className="p-2 border rounded-lg"
                    >
                        <option value={"Élevé"}>Élevé</option>
                        <option value={"Moyenne"}>Moyenne</option>
                        <option value={"Faible"}>Faible</option>
                    </select>
                    <button
                        onClick={addTask}
                        className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                    >
                        Ajouter
                    </button>
                </div>
            </div>
            {/* Task List Section */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Liste des tâches</h3>
                {tasksFiltered.length === 0 ? (
                    <p className="text-gray-500">Aucune tâche pour cette catégorie.</p>
                ) : (
                    <ul className="space-y-4 transition duration-200">
                        {tasksFiltered.map((task, index) => (
                            <li key={index} className="flex flex-col items-start p-3 border rounded-lg">
                                {editingTaskIndex === index ? (
                                    <div className="flex flex-col gap-2 w-full">
                                        <input
                                            type="text"
                                            value={editingTaskName}
                                            onChange={(e) => setEditingTaskName(e.target.value)}
                                            className="p-2 border rounded-lg"
                                        />
                                        <select
                                            value={editingTaskPriority}
                                            onChange={(e) => setEditingTaskPriority(e.target.value)}
                                            className="p-2 border rounded-lg"
                                        >
                                            <option value="Élevé">Élevé</option>
                                            <option value="Moyenne">Moyenne</option>
                                            <option value="Faible">Faible</option>
                                        </select>
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={() => { addTask(task) }}
                                                className="bg-purple-600 text-white py-1 px-3 rounded-lg hover:bg-purple-700 transition"
                                            >
                                                Enregistrer
                                            </button>
                                            <button
                                                onClick={resetEditingState}
                                                className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600 transition"
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={`relative ${!isActive(task) && "opacity-50"}  w-full flex justify-between items-center`}>
                                        {!isActive(task) && <div className='absolute  w-full h-[3px] bg-black '></div>}

                                        <div>
                                            <h4 className="font-semibold">{task.task_name}</h4>
                                            <p className="text-sm text-gray-500">Priorité : {task.priority}</p>
                                            <p className="text-sm text-gray-500">Statut : {task.status}</p>
                                        </div>
                                        {!isActive(task) && <button button
                                            onClick={() => deleteTache(task.id)}
                                            className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
                                        >
                                            Supprimer
                                        </button>
                                        }
                                        {task.status === "Active" &&
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => deleteTache(task.id)}
                                                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
                                                >
                                                    Supprimer
                                                </button>
                                                <button
                                                    onClick={() => updateTaskStatus(index, 'Terminé')}
                                                    className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition"
                                                >
                                                    Terminer
                                                </button>
                                                <button
                                                    onClick={() => startEditTask(index)}
                                                    className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition"
                                                >
                                                    Modifier
                                                </button>

                                            </div>}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>


        </div >
    );
};
export default TaskManager
// const AllTasksPage = () => {
//     const taskCategories = [
//         { title: 'Cours en Ligne', description: 'Tâches liées aux cours en ligne' },
//         { title: 'Devoirs Maison', description: 'Tâches associées aux devoirs maison' },
//         { title: 'Cote Administratif', description: 'Tâches administratives' },
//     ];

//     const [selectedCategory, setSelectedCategory] = useState(null);

//     return (
//         <div className="min-h-screen bg-gray-100 p-8">
//             <h1 className="text-3xl font-bold text-center mb-8 text-purple-600">Toutes les Tâches</h1>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {taskCategories.map((category, index) => (
//                     <div
//                         key={index}
//                         className="bg-white shadow-md rounded-lg p-6 text-center border border-purple-200"
//                     >
//                         <h2 className="text-xl font-semibold text-purple-600 mb-4">{category.title}</h2>
//                         <p className="text-gray-700 mb-6">{category.description}</p>
//                         <button
//                             onClick={() => setSelectedCategory(category.title)}
//                             className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
//                         >
//                             Voir toutes les tâches
//                         </button>
//                     </div>
//                 ))}
//             </div>

//             {selectedCategory && <TaskManager category={selectedCategory} />}
//         </div>
//     );
// };

// export default AllTasksPage;
