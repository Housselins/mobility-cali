import { useState } from "react";

function PdfExtractor() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const extractText = async () => {
    if (!file) {
      alert("Por favor, selecciona un archivo PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log("formData", formData);

    try {
      const response = await fetch("/api/extract-text", {
        method: "POST",
        body: formData,
      });

      // Manejo de respuesta como texto o JSON, según el contenido que devuelve el servidor
      const responseText = await response.text();
      setText(responseText);

      // Si sabes que debería ser JSON, puedes analizarlo y manejar posibles errores
      try {
        const data = JSON.parse(responseText);
        setText(data.text);
      } catch (jsonError) {
        // Si no es JSON, simplemente muestra el texto de la respuesta
        setText(responseText);
      }

    } catch (error) {
      console.error("Error al extraer texto:", error);
      setText("Error al extraer texto del PDF.");
    }
  };

  return (
    <div>
      <h2>Extracción de Texto desde PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={extractText}>Extraer Texto</button>
      {text && (
        <div>
          <h3>Texto extraído:</h3>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}

export default PdfExtractor;
