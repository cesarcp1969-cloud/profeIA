
import React from 'react';
import CopyButton from './CopyButton';

interface ResultCardProps {
  content: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ content }) => {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md relative animate__animated animate__fadeIn">
      <CopyButton textToCopy={content} />
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Resultado Generado</h3>
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-700 whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
};

export default ResultCard;
