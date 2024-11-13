import { NextApiRequest, NextApiResponse } from "next";
import pdfParse from "pdf-parse";
import multer from "multer";
import * as nextConnect from "next-connect";

// Configuración de multer para manejar archivos en la solicitud
const upload = multer({
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(500).json({ error: `Error en el servidor: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Método ${req.method} no permitido` });
  },
});

// Middleware para manejar la carga de archivos
apiRoute.use(upload.single("file"));

// Ruta de extracción de texto
apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Archivo no proporcionado" });
    }

    const pdfData = await pdfParse(file.buffer);
    const extractedText = pdfData.text;

    res.status(200).send(extractedText);
  } catch (error) {
    console.error("Error al procesar el PDF:", error);
    res.status(500).json({ error: "Error al procesar el PDF" });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
