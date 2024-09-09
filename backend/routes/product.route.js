import express from 'express';

import { getProducts , deleteProduct,postProduct,updateProduct} from '../controller/product.controller.js';
const router = express.Router();

router.get('/',getProducts)
router.post('/',postProduct )

router.delete('/:id',deleteProduct )

router.put('/:id',updateProduct )


export default router;
