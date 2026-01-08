
import { useState } from 'react';

type GeminiExecutor<T> = () => Promise<T>;

export const useGemini = <T extends string>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<T | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const execute = async (generatorFn: GeminiExecutor<T>): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setIsSuccess(false);

    try {
      const response = await generatorFn();
      setResult(response);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
      return response;
    } catch (err) {
      console.error("Error en la ejecución de Gemini:", err);
      setError('No se pudo generar el contenido. Por favor, inténtelo de nuevo.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, result, isSuccess, execute };
};
