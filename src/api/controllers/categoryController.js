const dotenv = require("dotenv");
const { addCategory, deleteCategory, findAllCategories, findCategoryById, findCategoryByTitle, updateCategory } = require('../../services/categoryService.js');

dotenv.config();
const SECRET = process.env.SECRET;

async function add(req) {
    const categoryData = req.body;
    const emptyFields = [];
  
    if(!categoryData.title) { emptyFields.push("title"); }
    if(!categoryData.description) { emptyFields.push("description"); }
  
    if (emptyFields.length > 0) {
        let response = {
            statusCode: 401,
            message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(", ")}`
        };

        return response;
    }
  
    var title = req.body.title;
    var data = await findCategoryByTitle(title);
  
    if (data.length !== 0) {
        let response = {
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

    var data = await addCategory(categoryData);
  
    var response = {
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

async function erase(req) {
    let id = req.body.id;
    var data = await findCategoryById(id);

    if (data.length === 0) {
        let response = {
            statusCode: 401,
            message: "Categoria inexistente!",
            body: {
                category: id
            }
        };

        return response;
    }

    var dataCategory = data[0];

    var data = await deleteCategory(id);

    var response = {
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

async function list() {
    var data = await findAllCategories();

    if (data.length === 0) {
        let response = {
            statusCode: 401,
            message: "Não existem categorias cadastradas!"
        };

        return response;
    }

    var response = {
        statusCode: 200,
        message: "Lista de categorias.",
        body: {
            data: data
        }
    };

    return response;
}

async function update(req){
    var data = productData = req.body;
    const emptyFields = [];

    if (!data.id) { emptyFields.push("id"); }
    if (!data.title) { emptyFields.push("title"); }
    if (!data.description) { emptyFields.push("description"); }

    if(emptyFields.length > 0) {
        let response = {
            statusCode: 401,
            message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(", ")}`
        }

        return response;
    }
    
    let id = req.body.id;
    var data  = await findCategoryById(id);

    if(data.length === 0){
        let response = {
            statusCode: 401,
            message: "Categoria inexistente.",
            data:{
                id: req.body.id,
                title: req.body.title,
                description: req.body.description
            }
        };
    
        return response;
    }

    productData.id = data[0].id;
    var data = await updateCategory(productData);
    data = data[0];

    var response = {
        statusCode: 200,
        message: "Categoria atualizada com sucesso!",
        body : {
            title: data.title,
            description: data.description,
            owner_id: data.owner_id
        }
    };
    
    return response;    
}

module.exports = { add, erase, list, update };