import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// POST /generate-api
// Body: { query: string, top_k: number }
app.post('/generate-api', (req, res) => {
  const { query, top_k } = req.body || {};
  if (!query) return res.status(400).json({ error: 'Missing query in body' });

  const k = Number.isInteger(top_k) && top_k > 0 ? top_k : 5;

  // Mocked response: return `k` dummy results containing the query
  const results = Array.from({ length: k }).map((_, i) => ({
    id: i + 1,
    text: `Resultado ${i + 1} para: ${query}`,
    score: (k - i) / k
  }));

  return res.json({ query, top_k: k, results });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
