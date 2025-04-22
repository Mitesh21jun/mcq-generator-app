import fs from 'fs/promises';
import pdfParse from 'pdf-parse';
import Tesseract from 'tesseract.js';
import { exec as execCb } from 'child_process';
import path from 'path';
import { promisify } from 'util';
import os from 'os';

const exec = promisify(execCb);

export const processFile = async (filePath, mimeType) => {
  if (mimeType === 'application/pdf') {
    const dataBuffer = await fs.readFile(filePath);
    const { text } = await pdfParse(dataBuffer);

    const cleanedText = text.replace(/\s/g, '');
    if (cleanedText.length < 20) {
      // Fallback to OCR if text extraction is too weak
      return await extractTextFromScannedPDF(filePath);
    }

    return text;
  } else if (mimeType.startsWith('image/')) {
    return await extractHandwrittenText(filePath);
  } else {
    throw new Error('Unsupported file format.');
  }
};

// For multi-page scanned PDFs
async function extractTextFromScannedPDF(pdfPath) {
  const baseName = path.basename(pdfPath, path.extname(pdfPath));
  const tempDir = path.join(os.tmpdir(), `ocr-${baseName}-${Date.now()}`);
  await fs.mkdir(tempDir, { recursive: true });

  try {
    // Convert each PDF page to a PNG
    await exec(`pdftoppm -png -r 300 "${pdfPath}" "${tempDir}/page"`);

    const files = (await fs.readdir(tempDir)).filter(f => f.endsWith('.png'));
    files.sort(); // Ensure proper page order

    let combinedText = '';
    for (const file of files) {
      const text = await extractHandwrittenText(path.join(tempDir, file));
      combinedText += '\n' + text;
    }

    return combinedText.trim();
  } catch (err) {
    console.error('OCR multi-page fallback failed:', err);
    throw new Error('Failed to extract text from scanned PDF.');
  } finally {
    // Clean up the image files
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

// Optimized for handwriting
async function extractHandwrittenText(imagePath) {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(imagePath, 'eng', {
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ',
      preserve_interword_spaces: 1,
    });
    console.log(text)
    return text.trim();
  } catch (err) {
    console.error('Handwritten OCR failed:', err);
    throw new Error('Failed to extract handwritten text.');
  }
}
