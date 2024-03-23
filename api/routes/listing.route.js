import express from 'express'
import { createListings, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import {verifyToken} from '../utils/verifyToken.js';

const router = express.Router();

router.post('/create',verifyToken, createListings);
router.delete('/delete/:id',verifyToken, deleteListing);
router.post(`/update/:id`, verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);



export default router;

