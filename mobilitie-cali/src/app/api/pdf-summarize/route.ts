import { Configuration, OpenAIApi } from "openai-edge";
import { NextResponse } from "next/server";
import pdfParse from "pdf-parse"; // Si usas `pdf-parse` asegúrate de que está instalado

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const fileBuffer = await file.arrayBuffer();
  const pdfData = await pdfParse(Buffer.from(fileBuffer)); // Usamos `pdf-parse` para extraer el texto
  const pdfText = pdfData.text;

  if (!pdfText) {
    return NextResponse.json({ error: "Could not extract text from PDF" });
  }

  // Solicita el resumen usando OpenAI
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `Resume the following text: ${pdfText}` }],
  });

  // Convierte la respuesta a JSON antes de acceder a `choices`
  const responseData = await response.json();
  const summary = responseData.choices[0]?.message?.content || "No summary available.";

  return NextResponse.json({ summary });
}
