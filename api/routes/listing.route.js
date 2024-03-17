import express from 'express'
import { createListings } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create', createListings);

export default router;

