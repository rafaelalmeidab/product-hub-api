import dotenv from 'dotenv';
import { Request } from 'express';
import { findCategoryById } from '../../services/categoryService';
import { addProduct, deleteProduct, findAllProducts, findProductById, findProductByTitle, updateProduct, updateProductCategory } from '../../services/productService';

dotenv.config();

interface ProductData {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  category_id?: number;
}

async function add(req: Request<any, any, ProductData>) {
  const productData = req.body!;
  const emptyFields: string[] = [];

  if (!req.body.title) {
    emptyFields.push('title');
  }
  if (!req.body.description) {
    emptyFields.push('description');
  }
  if (!req.body.price) {
    emptyFields.push('price');
  }

  if (emptyFields.length > 0) {
    let response = {
      statusCode: 401,
      message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(', ')}`
    };

    return response;
  }

  let title = req.body.title! as string;

  if (!title) {
    // Lidar com o caso onde title é undefined
    throw new Error('Title is required');
  }

  let data = await findProductByTitle(title);

  if (data !== null) {
    let response = {
      statusCode: 401,
      message: 'Produto já cadastrado no banco!',
      data: {
        id: data.id,
        title: data.title,
        description: data.description
      }
    };

    return response;
  }

  data = await addProduct(productData);
  
  let response = {
    statusCode: 200,
    message: 'Produto adicionado com sucesso!',
    body: {
      title: data.title,
      description: data.description,
      price: data.price,
      category_id: data.category_id,
      owner_id: data.owner_id
    }
  };

  return response;
}

async function category(req: Request<any, any, ProductData>) {
  const productData = req.body;
  const emptyFields: string[] = [];

  if (!productData.id) {
    emptyFields.push('id');
  }
  if (!productData.category_id) {
    emptyFields.push('category_id');
  }

  if (emptyFields.length > 0) {
    let response = {
      statusCode: 401,
      message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(', ')}`
    };

    return response;
  }

  let id = req.body.id;
  let data = await findProductById(id);

  if (data.length == 0) {
    let response = {
      statusCode: 401,
      message: 'Produto inexistente.',
      data: {
        id: req.body.id
      }
    };

    return response;
  }

  if (data.category_id) {
    let response = {
      statusCode: 401,
      message: 'Produto com categoria cadastrada.',
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        category_id: data.category_id
      }
    };

    return response;
  }

  let category_id = req.body.category_id;
  data = await findCategoryById(category_id);

  if (data.length === 0) {
    let response = {
      statusCode: 401,
      message: 'Categoria inexistente!',
      data: {
        category_id: category_id
      }
    };

    return response;
  }

  data = await updateProductCategory(productData);
  data = data;

  let response = {
    statusCode: 200,
    message: 'Categoria associada a produto com sucesso!',
    body: {
      title: data.title,
      description: data.description,
      price: data.price,
      category_id: data.category_id,
      owner_id: data.owner_id
    }
  };

  return response;
}

async function erase(req: Request<any, any, { id: number }>) {
  let id = req.body.id;
  let data = await findProductById(id);

  if (data.length === 0) {
    let response = {
      statusCode: 401,
      message: 'Produto inexistente!',
      data: {
        product: id
      }
    };

    return response;
  }

  let dataProduct = data;

  data = await deleteProduct(id);

  let response = {
    statusCode: 200,
    message: 'Produto excluído com sucesso!',
    body: {
      product: dataProduct.id,
      title: dataProduct.title,
      description: dataProduct.description,
      price: dataProduct.price,
      category_id: dataProduct.category_id,
      owner: dataProduct.owner
    }
  };

  return response;
}

async function list() {
  let data = await findAllProducts();

  if (data.length === 0) {
    let response = {
      statusCode: 401,
      message: 'Não existem produtos cadastrados!'
    };

    return response;
  }

  let response = {
    statusCode: 200,
    message: 'Lista de produtos.',
    body: {
      data: data
    }
  };

  return response;
}

async function list2() {
  let data = await findAllProducts(true);

  if (data.length === 0) {
    let response = {
      statusCode: 401,
      message: 'Não existem produtos sem categoria cadastrados!'
    };

    return response;
  }

  let response = {
    statusCode: 200,
    message: 'Lista de produtos sem categoria.',
    body: {
      data: data
    }
  };

  return response;
}

async function register(req: Request<any, any, { username: string; password: string }>) {
  let user = req.body.username;
  let data = await findUserByUsername(user);

  if (data !== null) {
    let response = {
      statusCode: 401,
      message: 'Nome de usuário se encontra em uso!',
      data: {
        username: user
      }
    };

    return response;
  }

  let email = req.body.email;
  data = await findUserByUsername(user);

  if (data !== null) {
    let response = {
      statusCode: 401,
      message: 'Email informado se encontra em uso!',
      data: {
        username: user
      }
    };

    return response;
  }

  const userData = {
    username: req.body.username,
    password: req.body.password
  };

  data = await createUser(userData);

  let response = {
    statusCode: 200,
    body: {
      message: 'Usuário criado com sucesso!',
      username: req.body.username
    }
  };

  return response;
}

async function update(req: Request<any, any, ProductData>) {
  const productData = req.body;
  const emptyFields: string[] = [];

  if (!productData.id) {
    emptyFields.push('id');
  }

  if (emptyFields.length > 0) {
    let response = {
      statusCode: 401,
      message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(', ')}`
    };

    return response;
  }

  let id = req.body.id;
  let data = await findProductById(id);

  if (data.length === 0) {
    let response = {
      statusCode: 401,
      message: 'Produto inexistente.',
      data: {
        id: req.body.id
      }
    };

    return response;
  }

  productData.id = data.id;

  const fields: string[] = [];
  const values: any[] = [];

  if (productData.title !== undefined && productData.title !== '') {
    fields.push('title = ?');
    values.push(productData.title);
  }

  if (productData.description !== undefined && productData.description !== '') {
    fields.push('description = ?');
    values.push(productData.description);
  }

  if (productData.price !== undefined && productData.price !== '') {
    fields.push('price = ?');
    values.push(productData.price);
  }

  if (productData.category_id !== undefined && productData.category_id !== '') {
    fields.push('category_id = ?');
    values.push(productData.category_id);
  }

  fields.push('owner_id = ?');
  values.push(global.loggedInUserId);

  fields.push('updated_at = CURRENT_TIMESTAMP');

  values.push(productData.id);

  data = await updateProduct(fields, values, productData.id);
  data = data;

  let response = {
    statusCode: 200,
    message: 'Produto atualizado com sucesso!',
    body: {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      category_id: data.category_id
    }
  };

  return response;
}

export { add, category, erase, list, list2, register, update };