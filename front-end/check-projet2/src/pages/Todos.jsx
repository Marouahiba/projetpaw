import React from 'react'
import Sidebar from '../components/SIdebar'
import { Route } from 'react-router'
import { Routes } from 'react-router'
import Dashboard from './dashboard'
import AllTasksPage from '../components/AllTasks'
import TaskManager from '../components/TaskManger'

const Todos = () => {
    return (
        <div className='flex gap-10'>
            <Sidebar />
            <Routes>
                <Route path="/onlineCourse" element={<TaskManager category={"Cours en Ligne"} />} />
                <Route path="/admin" element={<TaskManager category={"Cote Administratif"} />} />
                <Route path="/homeWork" element={<TaskManager category={"Devoirs Maison"} />} />

                <Route path="/dashboard" element={<div className='w-full'><Dashboard /></div>} />
                <Route path="/*" element={<AllTasksPage />} />
            </Routes>
        </div>
    )
}

export default Todos
