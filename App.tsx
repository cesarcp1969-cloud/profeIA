
import React, { useState } from 'react';
import { View } from './types';
import Sidebar from './components/Sidebar';
import LessonPlanForm from './components/LessonPlanForm';
import ObjectivesForm from './components/ObjectivesForm';
import ActivitiesForm from './components/ActivitiesForm';
import RubricForm from './components/RubricForm';
import Header from './components/Header';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.LessonPlan);

  const renderContent = () => {
    switch (activeView) {
      case View.LessonPlan:
        return <LessonPlanForm />;
      case View.Objectives:
        return <ObjectivesForm />;
      case View.Activities:
        return <ActivitiesForm />;
      case View.Rubric:
        return <RubricForm />;
      default:
        return <LessonPlanForm />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeView={activeView} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
