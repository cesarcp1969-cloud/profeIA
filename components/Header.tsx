
import React from 'react';
import { View } from '../types';

interface HeaderProps {
    activeView: View;
}

const viewTitles: Record<View, string> = {
    [View.LessonPlan]: 'Generador de Planes de Clase (ABCD)',
    [View.Objectives]: 'Generador de Objetivos de Aprendizaje',
    [View.Activities]: 'Generador de Actividades',
    [View.Rubric]: 'Generador de Rúbricas de Evaluación',
};

const Header: React.FC<HeaderProps> = ({ activeView }) => {
    return (
        <header className="bg-white shadow-sm p-4">
            <h1 className="text-xl font-semibold text-gray-800">{viewTitles[activeView]}</h1>
        </header>
    );
};

export default Header;
