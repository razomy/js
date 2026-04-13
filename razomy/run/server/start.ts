import express from 'express';
import {resolveAndRun, type RunRequest} from "../resolve_and_run";

const app = express();
app.use(express.json());

/*

curl -X POST http://localhost:3000/run \
  -H "Content-Type: application/json" \
  -d '{
    "filePathOrPackageName": "@razomy/string-case",
    "pathWithFunctionName": "camelCase",
    "params": ["sadas asd asSDS"]
  }'

 */
export async function start() {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.post('/run', async (req, res) => {
    try {
      const {
        filePathOrPackageName,
        pathWithFunctionName,
        params = []
      } = req.body as RunRequest;

      // Валидация входных данных
      if (!filePathOrPackageName || !pathWithFunctionName) {
        return res.status(400).json({
          status: "error",
          message: "Missing filePathOrPackageName or functionName"
        });
      }

      // Логика из вашего оригинального скрипта
      const result = await resolveAndRun(filePathOrPackageName, pathWithFunctionName, params);

      // Отправляем результат обратно клиенту
      return res.json({
        status: "success",
        result: result
      });

    } catch (error: any) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(JSON.stringify({status: "error", message}));

      return res.status(500).json({
        status: "error",
        message: message
      });
    }
  });

  app.listen(port, () => {
    console.log(`__SERVER_READY__ Server started on http://localhost:${port}`);
  });
}

start();
