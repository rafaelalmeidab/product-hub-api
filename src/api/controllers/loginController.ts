import { Request } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import md5 from '../../utils/md5';
import { createUser, findAllUsers, findUserByEmail, findUserByUsername } from '../../services/userService';

dotenv.config();
const SECRET = process.env.SECRET as string;

interface Response {
  statusCode: number;
  message: string;
  body?: any;
  data?: any;
}

async function login(req: Request): Promise<Response> {
  let user = req.body.username;
  const data = await findUserByUsername(user);

  if (data.length === 0) {
    let response: Response = {
      statusCode: 401,
      message: "Usuário não encontrado!",
      data: {
        username: user
      }
    };

    return response;
  }

  const validatePassword = md5.comparePassword(req.body.password, data[0].password);
  if (!validatePassword) {
    let response: Response = {
      statusCode: 401,
      message: "Usuário e/ou senha não encontrado(s)!"
    };

    return response;
  }

  const token = jwt.sign({ user: req.body.user, idUser: data[0].id }, SECRET, { expiresIn: "20m" });
  global.loggedInUserId = data[0].id;
  let response: Response = {
    statusCode: 200,
    message: "Login realizado com sucesso!",
    body: {
      token: token
    }
  };

  return response;
}

async function register(req: Request): Promise<Response> {
  let user = req.body.username;
  let data = await findUserByUsername(user);

  if (data.length !== 0) {
    let response: Response = {
      statusCode: 401,
      message: "Nome de usuário se encontra em uso!",
      body: {
        username: user
      }
    };

    return response;
  }

  let email = req.body.email;
  data = await findUserByEmail(email);

  if (data.length !== 0) {
    let response: Response = {
      statusCode: 401,
      message: "Email informado se encontra em uso!",
      body: {
        username: user
      }
    };

    return response;
  }

  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  data = await createUser(userData);

  let response: Response = {
    statusCode: 200,
    message: "Usuário criado com sucesso!",
    body: {
      username: req.body.username,
      email: req.body.email
    }
  };

  return response;
}

export { login, register };
