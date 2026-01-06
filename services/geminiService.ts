
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const generateContent = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
    });
    if (response.text) {
        return response.text;
    }
    return "No se pudo generar una respuesta.";

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Ocurrió un error al contactar la IA. Por favor, revisa la consola para más detalles.";
  }
};

export const generateLessonPlan = async (subject: string, grade: string, topic: string): Promise<string> => {
  const prompt = `
    Actúa como un experto diseñador instruccional. Genera un plan de clase detallado utilizando el modelo ABCD (Audience/Audiencia, Behavior/Comportamiento, Condition/Condición, Degree/Grado) para los siguientes datos:
    - Materia: ${subject}
    - Nivel/Grado: ${grade}
    - Tema: ${topic}
    
    Estructura la respuesta claramente, explicando cada componente del modelo ABCD. La salida debe estar en formato Markdown, bien organizada y lista para ser utilizada por un docente. Incluye sugerencias de recursos y evaluación.
    `;
  return generateContent(prompt);
};

export const generateObjectives = async (subject: string, grade: string, topic: string): Promise<string> => {
  const prompt = `
    Actúa como un pedagogo experto. Genera un objetivo general y tres objetivos específicos para una clase sobre el siguiente tema, siguiendo la taxonomía de Bloom.
    - Materia: ${subject}
    - Nivel/Grado: ${grade}
    - Tema: ${topic}

    Los objetivos deben ser claros, medibles, alcanzables, relevantes y tener un tiempo definido (SMART). Formatea la salida en Markdown, separando claramente el objetivo general de los específicos.
    `;
  return generateContent(prompt);
};

export const generateActivities = async (subject: string, grade: string, topic: string, duration: string): Promise<string> => {
  const prompt = `
    Actúa como un docente creativo e innovador. Genera tres actividades de aprendizaje (una de inicio/motivación, una de desarrollo/construcción del conocimiento y una de cierre/evaluación) para una clase.
    - Materia: ${subject}
    - Nivel/Grado: ${grade}
    - Tema: ${topic}
    - Duración de la clase: ${duration} minutos

    Las actividades deben ser atractivas, participativas y adecuadas para el nivel de los estudiantes. Describe cada actividad en detalle, incluyendo los materiales necesarios y el tiempo estimado. Formatea la salida en Markdown.
    `;
  return generateContent(prompt);
};

export const generateRubric = async (taskName: string, description: string, grade: string): Promise<string> => {
  const prompt = `
    Actúa como un experto en evaluación educativa. Crea una rúbrica de evaluación detallada para la siguiente tarea o proyecto.
    - Nombre de la Tarea/Proyecto: ${taskName}
    - Descripción de la Tarea: ${description}
    - Nivel/Grado: ${grade}

    La rúbrica debe tener al menos 4 criterios de evaluación relevantes para la tarea y 4 niveles de desempeño (por ejemplo: Sobresaliente, Notable, Aprobado, Insuficiente). 
    Formatea la salida como una tabla en Markdown, clara y fácil de interpretar.
    `;
  return generateContent(prompt);
};
