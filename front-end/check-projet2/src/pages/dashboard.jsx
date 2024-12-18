import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import useAsyncFunction from '../hooks/useAsyncFunction';
import { getStatistics } from '../utils/api';
import { useState } from 'react';
import { useEffect } from 'react';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const StatisticsPage = () => {
    const { success, loading, error, execute: getStat } = useAsyncFunction(getStatistics)
    const [statisticsData, setStaticData] = useState({
        'Cours en Ligne': { réalisés: 0, nonRéalisés: 0 },
        'Devoirs Maison': { réalisés: 50, nonRéalisés: 50 },
        'Cote Administratif': { réalisés: 40, nonRéalisés: 60 },
    })
    const fetch = async () => {
        const { data } = await getStat();
        console.log("stat", data);
        setStaticData(data);

    }
    useEffect(
        () => {
            fetch();
        }
        , [])
    // Example data for each category with percentages
    // const statisticsData = {
    //     'Cours en Ligne': { réalisés: 70, nonRéalisés: 30 },
    //     'Devoirs Maison': { réalisés: 50, nonRéalisés: 50 },
    //     'Cote Administratif': { réalisés: 40, nonRéalisés: 60 },
    // };

    // Function to create chart data dynamically
    const createChartData = (realises, nonRealises, color1, color2) => {
        return {
            labels: ['Réalisés', 'Non Réalisés'],
            datasets: [
                {
                    label: 'Tâches',
                    data: [realises, nonRealises],
                    backgroundColor: [color1, color2], // Dynamic colors
                },
            ],
        };
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-purple-600">Statistiques des catégories</h1>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Cours en Ligne */}
                {<div className="w-full h-48 md:h-72 bg-white shadow-md rounded-lg p-4 flex items-center justify-center">
                    <div className="w-3/4 h-3/4">
                        <h2 className="text-center font-semibold text-green-600 mb-2">Cours en Ligne</h2>
                        {statisticsData['Cours en Ligne'] && <Doughnut
                            data={createChartData(
                                statisticsData['Cours en Ligne'].réalisés,
                                statisticsData['Cours en Ligne'].nonRéalisés,
                                '#34D399',
                                '#E0EAF2'
                            )}
                            options={options}
                        />}
                    </div>
                </div>
                }

                {/* Devoirs Maison */}
                {<div className="w-full h-48 md:h-72 bg-white shadow-md rounded-lg p-4 flex items-center justify-center">
                    <div className="w-3/4 h-3/4">
                        <h2 className="text-center font-semibold text-red-600 mb-2">Devoirs Maison</h2>
                        {statisticsData['Devoirs Maison'] && <Doughnut
                            data={createChartData(
                                statisticsData['Devoirs Maison']?.réalisés,
                                statisticsData['Devoirs Maison'].nonRéalisés,
                                '#EF4444',
                                '#FFB3B3'
                            )}
                            options={options}
                        />}
                    </div>
                </div>
                }
                {/* Cote Administratif */}
                {<div className="w-full h-48 md:h-72 bg-white shadow-md rounded-lg p-4 flex items-center justify-center">
                    <div className="w-3/4 h-3/4">
                        <h2 className="text-center font-semibold text-blue-600 mb-2">Cote Administratif</h2>
                        {statisticsData['Cote Administratif'] && <Doughnut
                            data={createChartData(
                                statisticsData['Cote Administratif'].réalisés,
                                statisticsData['Cote Administratif'].nonRéalisés,
                                '#3B82F6',
                                '#A0C4FF'
                            )}
                            options={options}
                        />}
                    </div>
                </div>}

                {/* Statistics Overall Purple */}
                {/* <div className="w-full h-48 md:h-72 bg-white shadow-md rounded-lg p-4 flex items-center justify-center">
                    <div className="w-3/4 h-3/4">
                        <h2 className="text-center font-semibold text-purple-600 mb-2">Statistiques Globales</h2>
                        <Doughnut
                            data={createChartData(60, 40, '#9333EA', '#E0BBE4')}
                            options={options}
                        />
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default StatisticsPage;
