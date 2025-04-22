import express from 'express';
import multer from 'multer';
import { handleUpload } from '../controllers/mcqController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), handleUpload);

export default router;
