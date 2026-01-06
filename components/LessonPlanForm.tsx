
import React, { useState } from 'react';
import { generateLessonPlan } from '../services/geminiService';
import Spinner from './common/Spinner';
import ResultCard from './common/ResultCard';

const LessonPlanForm: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult('');
    setError('');
    try {
      const response = await generateLessonPlan(subject, grade, topic);
      setResult(response);
    } catch (err) {
      setError('No se pudo generar el plan de clase.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Materia</label>
            <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" placeholder="Ej: Matemáticas" />
          </div>
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Nivel / Grado</label>
            <input type="text" id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" placeholder="Ej: 5º de Primaria" />
          </div>
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Tema Principal</label>
            <textarea id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} required rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" placeholder="Ej: Introducción a las fracciones" />
          </div>
          <div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary disabled:bg-gray-400">
              {isLoading ? <Spinner /> : 'Generar Plan de Clase'}
            </button>
          </div>
        </form>
      </div>

      {error && <div className="mt-6 text-red-600 bg-red-100 p-4 rounded-md">{error}</div>}
      {result && <ResultCard content={result} />}
    </div>
  );
};

export default LessonPlanForm;
