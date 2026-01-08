
import React, { useState, useEffect } from 'react';
import { generateRubric } from '../services/geminiService';
import Spinner from './common/Spinner';
import ResultCard from './common/ResultCard';
import { HistoryItem } from '../types';
import HistoryList from './common/HistoryList';
import { useGemini } from '../hooks/useGemini';

const LOCAL_STORAGE_KEY = 'rubricHistory';

const RubricForm: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { isLoading, error, result, isSuccess, execute } = useGemini<string>();
  const [displayedResult, setDisplayedResult] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await execute(() => generateRubric(taskName, description, grade));
    
    if (response) {
      setDisplayedResult(response);
      const newHistoryItem: HistoryItem = {
        id: Date.now(),
        inputs: { taskName, description, grade },
        result: response,
        timestamp: Date.now(),
      };
      const updatedHistory = [newHistoryItem, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
    }
  };
  
  const handleSelectHistory = (selectedResult: string) => {
    setDisplayedResult(selectedResult);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className={`bg-white p-8 rounded-lg shadow-lg border border-gray-200/75 transition-all duration-300 ${isSuccess ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="taskName" className="block text-sm font-semibold text-gray-800 mb-2">Nombre de la Tarea o Proyecto</label>
            <input type="text" id="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} required className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:border-brand-secondary hover:border-gray-400 transition-all duration-200 sm:text-sm" placeholder="Ej: Ensayo sobre el cambio climático" />
          </div>
          <div>
            <label htmlFor="grade" className="block text-sm font-semibold text-gray-800 mb-2">Nivel / Grado</label>
            <input type="text" id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:border-brand-secondary hover:border-gray-400 transition-all duration-200 sm:text-sm" placeholder="Ej: Bachillerato" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-2">Descripción de la Tarea</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:border-brand-secondary hover:border-gray-400 transition-all duration-200 sm:text-sm" placeholder="Describe brevemente qué deben hacer los estudiantes, los requisitos principales, etc." />
          </div>
          <div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-brand-primary hover:bg-brand-dark hover:shadow-lg hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary transition-all duration-300 ease-in-out disabled:opacity-75 disabled:cursor-not-allowed">
              {isLoading ? <Spinner /> : 'Generar Rúbrica'}
            </button>
          </div>
        </form>
      </div>
      
      {history.length > 0 && (
        <HistoryList history={history} onSelect={handleSelectHistory} onClear={handleClearHistory} />
      )}

      {error && <div className="mt-6 text-red-600 bg-red-100 p-4 rounded-md">{error}</div>}
      {displayedResult && <ResultCard content={displayedResult} />}
    </div>
  );
};

export default RubricForm;
