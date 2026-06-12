import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API endpoint for AI Optimization
app.post("/api/optimize", async (req, res) => {
  const { rocket, mission } = req.body;

  if (!rocket || !mission) {
    return res.status(400).json({ error: "Missing rocket or mission data" });
  }

  try {
    const prompt = `
      You are the OPLANIUM Intergalactic Mission Optimization AI.
      Analyze the following mission parameters and suggest optimizations.
      
      Rocket: ${JSON.stringify(rocket)}
      Mission: ${JSON.stringify(mission)}
      
      Provide a highly detailed optimization strategy focusing on reducing travel time, fuel consumption, and cost while maximizing safety.
      The response must be a valid JSON object matching the following structure:
      {
        "engineUpdates": string[],
        "fuelOptimization": string,
        "materialImprovements": string[],
        "structuralModifications": string[],
        "payloadBalancing": string,
        "trajectoryOptimization": string,
        "original": {
          "fuelUsage": number,
          "duration": number,
          "efficiency": number,
          "thrust": number,
          "payload": number
        },
        "optimized": {
          "fuelUsage": number,
          "duration": number,
          "efficiency": number,
          "thrust": number,
          "payload": number
        },
        "riskFactors": [{"factor": string, "probability": number}],
        "successRate": number,
        "savings": {
          "fuel": number,
          "time": number,
          "cost": number
        }
      }
      
      Current statistics for the rocket and mission are provided in the inputs.
      Use realistic space engineering concepts (e.g., Hohmann transfers, slingshots, composite materials, regenerative cooling).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "engineUpdates", "fuelOptimization", "materialImprovements", 
            "structuralModifications", "payloadBalancing", "trajectoryOptimization",
            "original", "optimized", "riskFactors", "successRate", "savings"
          ],
          properties: {
            engineUpdates: { type: Type.ARRAY, items: { type: Type.STRING } },
            fuelOptimization: { type: Type.STRING },
            materialImprovements: { type: Type.ARRAY, items: { type: Type.STRING } },
            structuralModifications: { type: Type.ARRAY, items: { type: Type.STRING } },
            payloadBalancing: { type: Type.STRING },
            trajectoryOptimization: { type: Type.STRING },
            original: {
              type: Type.OBJECT,
              required: ["fuelUsage", "duration", "efficiency", "thrust", "payload"],
              properties: {
                fuelUsage: { type: Type.NUMBER },
                duration: { type: Type.NUMBER },
                efficiency: { type: Type.NUMBER },
                thrust: { type: Type.NUMBER },
                payload: { type: Type.NUMBER }
              }
            },
            optimized: {
              type: Type.OBJECT,
              required: ["fuelUsage", "duration", "efficiency", "thrust", "payload"],
              properties: {
                fuelUsage: { type: Type.NUMBER },
                duration: { type: Type.NUMBER },
                efficiency: { type: Type.NUMBER },
                thrust: { type: Type.NUMBER },
                payload: { type: Type.NUMBER }
              }
            },
            riskFactors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["factor", "probability"],
                properties: {
                  factor: { type: Type.STRING },
                  probability: { type: Type.NUMBER }
                }
              }
            },
            successRate: { type: Type.NUMBER },
            savings: {
              type: Type.OBJECT,
              required: ["fuel", "time", "cost"],
              properties: {
                fuel: { type: Type.NUMBER },
                time: { type: Type.NUMBER },
                cost: { type: Type.NUMBER }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }
    
    // Clean up response if it contains markdown code blocks
    const jsonStr = text.includes("```json") 
      ? text.split("```json")[1].split("```")[0].trim()
      : text.trim();

    const result = JSON.parse(jsonStr);
    res.json(result);
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate optimization strategy" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
