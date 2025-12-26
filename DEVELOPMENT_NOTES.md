## 📃 Descripción del desarrollo
Partí de los requisitos provistos en el desafío y, una vez cubiertos, incorporé algunas mejoras que considero necesarias para el manejo correcto de una aplicación en producción.
En un contexto de trabajo real, el segundo punto habría sido abordado en una etapa previa al desarrollo, validando definiciones y supuestos con los distintos equipos involucrados antes de avanzar con la implementación.

### Estados de la aplicación
Implementé **empty states** y **error states**, ya que son fundamentales para una buena experiencia de usuario y para evitar comportamientos ambiguos ante fallos o ausencia de datos. Las decisiones se basaron en experiencias previas en proyectos similares; idealmente, estos estados podrían refinarse con una investigación de UX más profunda.
También, para el toast, sería prudente el uso de alguna librería como react-toastify, pero como el uso estaba muy controlado por el tamaño del proyecto, no la agregué.

### Validaciones del input `Amount`
Agregué reglas adicionales al input de monto:

- Máximo de **dos decimales** (configurable).
- Máximo de **15 dígitos enteros** (configurable).

Estas validaciones ayudan a prevenir errores de formato, mejorar la consistencia de los datos y reducir lógica defensiva en otras capas de la aplicación.

### Idioma e internacionalización
Algunos textos se mantuvieron en inglés para respetar el diseño original.
No tomé una decisión definitiva entre inglés o español, pero para una iteración futura considero importante unificar el idioma o incorporar una solución de internacionalización (por ejemplo, `i18n`).

### Arquitectura
La estructura del proyecto sigue el enfoque de **Atomic Design**, que resulta útil para organizar componentes por nivel de responsabilidad. Para una aplicación de este tamaño, sin demasiada complejidad funcional, esta arquitectura aporta claridad, escalabilidad y fácil navegación del código.

### Estado global y data fetching
Para el manejo de estado y requests utilicé **React Query**, principalmente porque fue una de las librerías mencionadas durante la entrevista técnica y me pareció una buena oportunidad para aplicarla en un caso real.
Otras alternativas viables podrían haber sido Redux Toolkit o Context API, pero mi objetivo fue revisar y consolidar conceptos.

### Testing
Aunque no era un requisito explícito, el proyecto quedó configurado para soportar tests. Se incluyeron algunos tests de referencia para dejar asentado el enfoque y facilitar futuras extensiones.

## ⚠️ Consideración sobre el diseño de comparación de monedas
Hubo un punto del diseño en PDF que me resultó inconsistente.

La sección que muestra:

- `1.00 USD = 0.858885 EUR`
- `1 EUR = 1.164300 USD`

parece calcular cada conversión con una **base distinta** (USD en la primera, EUR en la segunda). Esto puede resultar confuso desde el punto de vista de UX, ya que las cuentas no cierran de forma intuitiva para el usuario.

Para reflejar ambas interpretaciones:

- Implementé `ComparisonSection`, donde ambas conversiones usan la **misma base** (lo que considero correcto).
- Implementé `ComparisonSectionAsInDesign`, que replica exactamente la lógica del diseño original.

Ambos componentes son equivalentes a nivel estructural y se puede alternar entre ellos desde `Form.tsx`.

## 📎Uso de IA
La documentación, algunos textos y la generación de tests fueron asistidos con IA (ChatGPT en su versión gratuita), utilizada como una herramienta de apoyo para acelerar ciertos procesos y mejorar la claridad de la comunicación. En todos los casos, el resultado final fue revisado, validado y ajustado manualmente.
En un contexto de trabajo real, evito compartir información sensible o código confidencial con este tipo de herramientas. Si bien existen agentes de IA más avanzados y eficientes, actualmente me encuentro en una etapa de aprendizaje y adopción progresiva, utilizando estas tecnologías de forma medida y consciente.