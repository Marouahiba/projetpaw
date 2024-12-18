import React from 'react';
import TaskManager from './TaskManger';
import { useState } from 'react';

const AllTasksPage = () => {
    const taskCategories = [
        { title: 'Cours en Ligne', description: 'Tâches liées aux cours en ligne' },
        { title: 'Devoirs Maison', description: 'Tâches associées aux devoirs maison' },
        { title: 'Cote Administratif', description: 'Tâches administratives' },
    ];

    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-purple-600">Toutes les Tâches</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {taskCategories.map((category, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-6 text-center border border-purple-200"
                    >
                        <h2 className="text-xl font-semibold text-purple-600 mb-4">{category.title}</h2>
                        <p className="text-gray-700 mb-6">{category.description}</p>
                        <button
                            onClick={() => setSelectedCategory(category.title)}
                            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
                        >
                            Voir toutes les tâches
                        </button>
                    </div>
                ))}
            </div>

            {selectedCategory && <TaskManager category={selectedCategory} />}
        </div>
    );
};
export default AllTasksPage;