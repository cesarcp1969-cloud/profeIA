import React from 'react';
import { View } from '../types';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  // FIX: Changed icon prop type to be more specific for SVG elements. This allows adding a className prop via 
  // cloneElement without TypeScript errors, ensuring type safety.
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  label: string;
  view: View;
  activeView: View;
  onClick: (view: View) => void;
}> = ({ icon, label, view, activeView, onClick }) => {
  const isActive = activeView === view;
  return (
    <button
      onClick={() => onClick(view)}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-light ${
        isActive
          ? 'bg-brand-primary text-white'
          : 'text-gray-300 hover:bg-brand-dark hover:text-white hover:translate-x-1'
      }`}
    >
      {React.cloneElement(icon, { className: 'h-5 w-5 mr-3' })}
      <span>{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navigationItems = [
    {
      view: View.LessonPlan,
      label: 'Plan de Clase',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      view: View.Objectives,
      label: 'Objetivos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13.333L6.444 18 19 3" />
        </svg>
      ),
    },
    {
      view: View.Activities,
      label: 'Actividades',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      view: View.Rubric,
      label: 'Rúbricas',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-64 bg-brand-dark">
      <div className="flex items-center justify-center h-20 shadow-md bg-brand-dark">
        <h1 className="text-2xl font-bold text-white">Asistente AI</h1>
      </div>
      <nav className="flex-1 mt-5">
        {navigationItems.map((item) => (
          <NavItem
            key={item.view}
            icon={item.icon}
            label={item.label}
            view={item.view}
            activeView={activeView}
            onClick={setActiveView}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;