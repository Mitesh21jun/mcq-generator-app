import { processFile } from '../utils/fileProcessor.js';
import { generateMCQs } from '../services/mcqService.js';
import { promises as fs } from 'fs';

export const handleUpload = async (req, res) => {
  const filePath = req.file?.path;

  try {
    const extractedText = await processFile(filePath, req.file.mimetype);
    const mcqs = await generateMCQs(extractedText);
    res.json({ mcqs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process file.' });
  } finally {
    // Clean up file (success or error)
    if (filePath) {
      try {
        await fs.unlink(filePath);
      } catch (unlinkErr) {
        console.error('Failed to delete uploaded file:', unlinkErr);
      }
    }
  }
};
