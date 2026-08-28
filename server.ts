import express from 'express';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

interface TempFileRecord {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
  createdAt: number;
  expiresAt: number;
}

// In-memory / temporary buffer storage with strict TTL expiration
const tempFilesStore = new Map<string, TempFileRecord>();

// TTL: 48 hours (in milliseconds)
const FILE_TTL_MS = 48 * 60 * 60 * 1000;
// Max file size: 10MB
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

// Periodic cleanup of expired files every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [id, record] of tempFilesStore.entries()) {
    if (now > record.expiresAt) {
      tempFilesStore.delete(id);
    }
  }
}, 15 * 60 * 1000);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parser with up to 15MB payload for base64 file transfer
  app.use(express.json({ limit: '15mb' }));

  // API Health Check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: Date.now() });
  });

  // POST /api/upload - Temporary document upload
  app.post('/api/upload', (req, res) => {
    try {
      const { filename, mimeType, base64 } = req.body;

      if (!filename || !mimeType || !base64) {
        return res.status(400).json({
          error: 'Parâmetros incompletos. Nome, tipo e conteúdo do arquivo são obrigatórios.',
        });
      }

      // Allowed MIME types
      const allowedMimes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'application/pdf',
      ];

      const cleanMime = mimeType.toLowerCase();
      if (!allowedMimes.includes(cleanMime)) {
        return res.status(400).json({
          error: 'Formato não permitido. Formatos aceitos: JPG, JPEG, PNG, WEBP e PDF.',
        });
      }

      // Convert base64 to buffer
      const base64Data = base64.replace(/^data:.*?;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      if (buffer.length > MAX_FILE_SIZE_BYTES) {
        return res.status(400).json({
          error: 'O arquivo excede o limite máximo permitido de 10 MB.',
        });
      }

      // Generate unique random secure ID
      const fileId = crypto.randomBytes(12).toString('hex');
      const now = Date.now();
      const expiresAt = now + FILE_TTL_MS;

      // Sanitize filename for URL
      const sanitizedFilename = filename
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .substring(0, 80);

      tempFilesStore.set(fileId, {
        id: fileId,
        filename: sanitizedFilename,
        mimeType: cleanMime,
        size: buffer.length,
        data: buffer,
        createdAt: now,
        expiresAt,
      });

      // Construct public link
      const host = req.get('x-forwarded-host') || req.get('host') || 'localhost:3000';
      const protocol = req.get('x-forwarded-proto') || req.protocol || 'https';
      const baseUrl = process.env.APP_URL || `${protocol}://${host}`;
      const downloadUrl = `${baseUrl.replace(/\/$/, '')}/api/temp-file/${fileId}/${encodeURIComponent(sanitizedFilename)}`;

      return res.json({
        success: true,
        fileId,
        filename: sanitizedFilename,
        expiresIn: '48 horas',
        url: downloadUrl,
      });
    } catch (err: any) {
      console.error('Erro no upload temporário:', err);
      return res.status(500).json({
        error: 'Erro interno ao processar o arquivo.',
      });
    }
  });

  // GET /api/temp-file/:id/:filename - Stream or view the temporary file
  app.get('/api/temp-file/:id/:filename', (req, res) => {
    const { id } = req.params;
    const record = tempFilesStore.get(id);

    if (!record) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Documento Expirado — DR MULTAS NOVA ODESSA</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #09090b; color: #f4f4f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
            .card { max-width: 480px; background: #18181b; border: 2px solid #27272a; border-radius: 16px; padding: 32px 24px; }
            h1 { font-size: 20px; font-weight: 800; color: #facc15; margin: 0 0 12px; }
            p { font-size: 14px; color: #a1a1aa; line-height: 1.6; margin: 0 0 20px; }
            .badge { display: inline-block; padding: 6px 12px; background: #27272a; border-radius: 999px; font-size: 12px; color: #e4e4e7; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Documento Expirado ou Não Encontrado</h1>
            <p>Este arquivo foi removido automaticamente após o prazo de expiração ou o link é inválido, respeitando as diretrizes de privacidade e retenção temporária.</p>
            <div class="badge">DR MULTAS NOVA ODESSA</div>
          </div>
        </body>
        </html>
      `);
    }

    if (Date.now() > record.expiresAt) {
      tempFilesStore.delete(id);
      return res.status(410).send('Este arquivo temporário expirou e foi excluído.');
    }

    res.setHeader('Content-Type', record.mimeType);
    res.setHeader('Content-Length', record.size);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${encodeURIComponent(record.filename)}"`
    );
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.send(record.data);
  });

  // Vite middleware in development vs Static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
