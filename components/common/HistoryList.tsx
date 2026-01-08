
import React from 'react';
import { HistoryItem } from '../../types';

interface HistoryListProps {
  history: HistoryItem[];
  onSelect: (result: string) => void;
  onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect, onClear }) => {
  const getTitle = (item: HistoryItem) => {
    return item.inputs.topic || item.inputs.taskName || 'Generación anterior';
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Historial de Generaciones</h3>
        <button
          onClick={onClear}
          className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-200"
        >
          Limpiar Historial
        </button>
      </div>
      <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {history.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onSelect(item.result)}
              className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <p className="font-semibold text-brand-secondary truncate">{getTitle(item)}</p>
              <p className="text-xs text-gray-500">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
