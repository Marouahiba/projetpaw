// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router'

const Hero = () => {
    return (
        <section className="flex flex-col    md:flex-row items-center justify-center min-h-screen bg-gray-100 px-4">
            {/* Left Section with Text */}
            <div className="md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Gestionnaire de Tâches Étudiant
                </h1>
                <p className="text-gray-600 text-lg mb-6 leading-6">
                    Optimisez votre routine d'études grâce à notre plateforme intuitive de gestion des tâches.
                    Créez, suivez et accomplissez vos listes de tâches facilement, et atteignez vos objectifs académiques avec efficacité.
                </p>
                <Link
                    to="/taches"
                    className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
                >
                    Commencer
                </Link>
            </div>

            {/* Right Section with Illustration */}
            <div className="hidden md:flex md:w-1/2 justify-center items-center">
                <img
                    src="/landingPage.svg"
                    alt="Étudiant To-Do List Illustration"
                    className="w-3/4"
                />
            </div>
        </section>
    )
}

export default Hero
