import { Request } from 'express';
import dotenv from 'dotenv';
import { addCategory, deleteCategory, findAllCategories, findCategoryById, findCategoryByTitle, updateCategory } from '../../services/categoryService';

dotenv.config();
const SECRET = process.env.SECRET as string;

interface Response {
  statusCode: number;
  message: string;
  body?: any;
  data?: any;
}

async function add(req: Request): Promise<Response> {
  const categoryData = req.body;
  const emptyFields: string[] = [];

  if (!categoryData.title) {
    emptyFields.push("title");
  }
  if (!categoryData.description) {
    emptyFields.push("description");
  }

  if (emptyFields.length > 0) {
    let response: Response = {
      statusCode: 401,
      message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(", ")}`
    };

    return response;
  }

  const title = req.body.title;
  const data = await findCategoryByTitle(title);

  if (data.length !== 0) {
    let response: Response = {
      statusCode: 401,
      message: "Categoria já cadastrada no banco!",
      data: {
        id: data[0].id,
        title: data[0].title,
        description: data[0].description
      }
    };

    return response;
  }

  const newData = await addCategory(categoryData);

  const response: Response = {
    statusCode: 200,
    message: "Categoria adicionada com sucesso!",
    body: {
      title: categoryData.title,
      description: categoryData.description,
      owner_id: categoryData.owner_id
    }
  };

  return response;
}

async function erase(req: Request): Promise<Response> {
  const id = req.body.id;
  const data = await findCategoryById(id);

  if (data.length === 0) {
    let response: Response = {
      statusCode: 401,
      message: "Categoria inexistente!",
      body: {
        category: id
      }
    };

    return response;
  }

  const dataCategory = data[0];
  await deleteCategory(id);

  const response: Response = {
    statusCode: 200,
    message: "Categoria excluída com sucesso!",
    body: {
      category: dataCategory.id,
      name: dataCategory.name,
      description: dataCategory.description
    }
  };

  return response;
}

async function list(): Promise<Response> {
  const data = await findAllCategories();

  if (data.length === 0) {
    let response: Response = {
      statusCode: 401,
      message: "Não existem categorias cadastradas!"
    };

    return response;
  }

  const response: Response = {
    statusCode: 200,
    message: "Lista de categorias.",
    body: {
      data: data
    }
  };

  return response;
}

async function update(req: Request): Promise<Response> {
  let productData = req.body;
  const emptyFields: string[] = [];

  if (!productData.id) {
    emptyFields.push("id");
  }
  if (!productData.title) {
    emptyFields.push("title");
  }
  if (!productData.description) {
    emptyFields.push("description");
  }

  if (emptyFields.length > 0) {
    let response: Response = {
      statusCode: 401,
      message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(", ")}`
    };

    return response;
  }

  const id = req.body.id;
  const data = await findCategoryById(id);

  if (data.length === 0) {
    let response: Response = {
      statusCode: 401,
      message: "Categoria inexistente.",
      data: {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description
      }
    };

    return response;
  }

  productData.id = data[0].id;
  const updatedData = await updateCategory(productData);

  const response: Response = {
    statusCode: 200,
    message: "Categoria atualizada com sucesso!",
    body: {
      title: updatedData.title,
      description: updatedData.description,
      owner_id: updatedData.owner_id
    }
  };

  return response;
}

export { add, erase, list, update };
