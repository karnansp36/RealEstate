import express from 'express'
import { createListings, deleteListing, updateListing } from '../controllers/listing.controller.js';
import {verifyToken} from '../utils/verifyToken.js';

const router = express.Router();

router.post('/create',verifyToken, createListings);
router.delete('/delete/:id',verifyToken, deleteListing);
router.post(`/update/:id`, verifyToken, updateListing);


export default router;

