import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js";
import { existCategory, existProduct, existsEmail,existsUser, uniqueCategory } from "../utils/db.validators.js";

export const userValidator=[
    body('name','Name cannot be empty').notEmpty(),
    body('surname','Surname cannot be empty').notEmpty(),
    body('email','Email cannot be empty').notEmpty().isEmail().custom(existsEmail),
    body('username','Username cannot be empty').notEmpty().toLowerCase(),
    body('password','Password cannot be empty').notEmpty().isStrongPassword().withMessage('Password must be Strong').isLength({min:8, max:100}).withMessage('Password must be at least 8 characters long'),
    body('username').notEmpty().toLowerCase().custom(existsUser),
    validateErrors
]
export const updateUserValidator=[
    body('name','Name cannot be empty').optional().notEmpty(),
    body('surname','Surname cannot be empty').optional().notEmpty(),
    body('email','Email cannot be empty').optional().notEmpty().isEmail().custom(existsEmail),
    body('username','Username cannot be empty').optional().notEmpty().toLowerCase().custom(existsUser),
    validateErrors
]
export const productValidator=[
    body('name','Name cannot be empty').notEmpty().isLength({max:30}).custom(existProduct),
    body('description','Description cannot be empty').notEmpty().isLength({max:200}),
    body('stock','Stock cannot be empty').notEmpty(),
    body('price','Price cannot be empty').notEmpty(),
    body('category','Category cannot be empty').notEmpty().isArray({max:2}).withMessage('Cant overcome more than 2 categories').custom(existCategory),
    validateErrors
]
export const updateProductValidator=[
    body('name','Name cannot be empty').optional().notEmpty().isLength({max:30}).custom(existProduct),
    body('description','Description cannot be empty').optional().notEmpty().isLength({max:200}),
    body('stock','Stock cannot be empty').optional().notEmpty(),
    body('sales','Sales cannot be empty').optional().notEmpty(),
    body('price','Price cannot be empty').optional().notEmpty(),
    body('category','Category cannot be empty').optional().notEmpty().isArray({max:2}).withMessage('Cant overcome more than 2 categories').custom(existCategory),
    validateErrors
]

export const categoryValidator=[
    body('name','Category Name is required').notEmpty().custom(uniqueCategory),
    validateErrors
]