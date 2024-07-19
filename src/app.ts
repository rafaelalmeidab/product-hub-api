import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './api/routes/routes';

dotenv.config();
const SECRET = process.env.SECRET;

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
    secret: SECRET || 'default_secret',  // Adiciona um valor padrão caso o SECRET não esteja definido
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Defina como true se estiver usando HTTPS
}));

// Declaração global para TypeScript
declare global {
    var loggedInUserId: number | null;
}
global.loggedInUserId = null;

app.use(express.json());
app.use("", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;