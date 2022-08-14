'use strict'
const ProductsModel = use('App/Models/Product')
const Auth = require('../app/Middleware/Auth.js')
const auth = new Auth()
const ProductController = require('../App/Controllers/Http/ProductController');
const productController = new ProductController();

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')

Route.get('/', () => "Hello  World!")

Route.get('/products', 'ProductController.getProducts');

Route.post('/products', 'ProductController.saveProduct');
