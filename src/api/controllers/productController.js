const dotenv = require("dotenv");
const { addProduct, deleteProduct, findAllProducts, findProductById, findProductByTitle, updateProduct, updateProductCategory } = require('../../services/productService.js');
const { findCategoryById } = require("../../services/categoryService.js");

dotenv.config();
const SECRET = process.env.SECRET;

async function add(req){
    var data = productData = req.body;
    const emptyFields = [];

    if (!data.title) { emptyFields.push("title"); }
    if (!data.description) { emptyFields.push("description"); }
    if (!data.price) { emptyFields.push("price"); }

    if(emptyFields.length > 0) {
        let response = {
            statusCode: 401,
            message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(", ")}`
        }

        return response;
    }
    
    let title = req.body.title;
    var data  = await findProductByTitle(title);

    if(data.length !== 0){
        let response = {
            statusCode: 401,
            message: "Produto já cadastrado no banco!",
            data:{
                id: data[0].id,
                title: data[0].title,
                description: data[0].description
            }
        };
    
        return response;
    }

    var data = await addProduct(productData);
    data = data[0];

    var response = {
        statusCode: 200,
        message: "Produto adicionado com sucesso!",
        body : {
            title: data.title,
            description: data.description,
            price: data.price,
            category_id: data.category_id,
            owner_id: data.owner_id
        }
    };
    
    return response;    
}

async function category(req){
    var data = productData = req.body;
    const emptyFields = [];

    if (!productData.id) { emptyFields.push("id"); }
    if (!productData.category_id) { emptyFields.push("category_id"); }

    if(emptyFields.length > 0) {
        let response = {
            statusCode: 401,
            message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(", ")}`
        }

        return response;
    }
    
    let id   = req.body.id;
    var data = await findProductById(id);
    
    if(data.length == 0){
        let response = {
            statusCode: 401,
            message: "Produto inexistente.",
            data:{
                id: req.body.id
            }
        };
    
        return response;
    }

    if(data[0].category_id){
        let response = {
            statusCode: 401,
            message: "Produto com categoria cadastrada.",
            data:{
                id: data[0].id,
                title: data[0].title,
                description: data[0].description,
                category_id: data[0].category_id
            }
        };
    
        return response;
    }

    let category_id = req.body.category_id;
    var data = await findCategoryById(category_id);

    if(data.length === 0){
        let response = {
            statusCode: 401,
            message: "Categoria inexistente!",
            data:{
                category_id: category_id
            }
        };
    
        return response;
    }   
    
    var data = await updateProductCategory(productData);
    data = data[0];

    var response = {
        statusCode: 200,
        message: "Categoria associada a produto com sucesso!",
        body : {
            title: data.title,
            description: data.description,
            price: data.price,
            category_id: data.category_id,
            owner_id: data.owner_id
        }
    };
    
    return response;    
}

async function erase(req){
    let id = req.body.id;
    var data = await findProductById(id);

    if(data.length === 0){
        let response = {
            statusCode: 401,
            message: "Produto inexistente!",
            data:{
                product: id
            }
        };
    
        return response;
    }

    var dataProduct = data[0];

    var data = await deleteProduct(id);

    var response = {
        statusCode: 200,
        message: "Produto excluído com sucesso!",
        body : {
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


async function list(){
    var data = await findAllProducts();

    if(data.length === 0){
        let response = {
            statusCode: 401,
            message: "Não existem produtos cadastrados!"
        };
    
        return response;
    }

    var response = {
        statusCode: 200,
        message: "Lista de produtos.",
        body : {
            data: data
        }
    };
    
    return response;    
}

async function list2(){
    var data = await findAllProducts(true);

    if(data.length === 0){
        let response = {
            statusCode: 401,
            message: "Não existem produtos sem categoria cadastrados!"
        };
    
        return response;
    }

    var response = {
        statusCode: 200,
        message: "Lista de produtos sem categoria.",
        body : {
            data: data
        }
    };
    
    return response;    
}

async function register(req){
    let user = req.body.username;
    var data = await findUserByUsername(user);

    if(data.length !== 0){
        let response = {
            statusCode: 401,
            message: "Nome de usuário se encontra em uso!",
            data:{
                username: user
            }
        };
    
        return response;
    }


    if(data.length !== 0){
        var response = {
            statusCode: 401,
            message: "Email informado se encontra em uso!",
            body:{
                username: user
            }
        };
    
        return response;
    }

    const userData = {
        username: req.body.username,
        password: req.body.password
    };

    var data = await createUser(userData);

    var response = {
        statusCode: 200,
        body : {
            message: "Usuário criado com sucesso!",
            username: req.body.username,
        }
    };
    
    return response;    
}


async function update(req){
    var data = productData = req.body;
    const emptyFields = [];

    if (!data.id) { emptyFields.push("id"); }

    if(emptyFields.length > 0) {
        let response = {
            statusCode: 401,
            message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(", ")}`
        }

        return response;
    }
    
    let id   = req.body.id;
    var data = await findProductById(id);

    if(data.length === 0){
        let response = {
            statusCode: 401,
            message: "Produto inexistente.",
            data:{
                id: req.body.id
            }
        };
    
        return response;
    }

    productData.id = data[0].id;
    
    const fields = [];
    const values = [];
    
    if (productData.title !== undefined && productData.title !== '') {
        fields.push("title = ?");
        values.push(productData.title);
    }
    
    if (productData.description !== undefined && productData.description !== '') {
        fields.push("description = ?");
        values.push(productData.description);
    }
    
    if (productData.price !== undefined && productData.price !== '') {
        fields.push("price = ?");
        values.push(productData.price);
    }
    
    if (productData.category_id !== undefined && productData.category_id !== '') {
        fields.push("category_id = ?");
        values.push(productData.category_id);
    }
    
    fields.push("owner_id = ?");
    values.push(global.loggedInUserId);
    
    fields.push("updated_at = CURRENT_TIMESTAMP");
    
    values.push(productData.id);
    
    var data = await updateProduct(fields, values, productData.id);
    data = data[0];
    
    var response = {
        statusCode: 200,
        message: "Produto atualizado com sucesso!",
        body : {
            id: data.id,
            title: data.title,
            description: data.description,
            price: data.price,
            category_id: data.category_id
        }
    };
    
    return response;    
}

module.exports = { add, category, erase, list, list2, register, update };