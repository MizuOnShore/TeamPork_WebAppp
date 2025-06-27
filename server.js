import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use('/api', createProxyMiddleware({
  target: 'http://localhost:5058',
  changeOrigin: true,
}));

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});
