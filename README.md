# 📚 AI MCQ Generator - Backend

This is the backend for an AI-powered app that generates multiple-choice questions (MCQs) from uploaded study material. It supports PDF and image files, including handwritten notes, and uses OCR and AI to generate questions.

## 🔧 Features

- ✅ Upload PDF or image files
- ✅ Support for handwritten notes using OCR (`tesseract.js`)
- ✅ Extract text from multi-page PDFs using `pdf-parse`
- ✅ Generate MCQs using OpenRouter AI API (ChatGPT-like models)
- ✅ Easy integration with frontend apps

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mcq-generator-backend.git
cd mcq-generator-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root directory and add your OpenRouter API key:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

Get your API key from: [https://openrouter.ai](https://openrouter.ai)

---

## 🧪 Usage

### Start the Server

```bash
npm start
```

By default, the app will run on:  
📍 `http://localhost:5000`

---

## 📄 API Endpoint

### `POST /api/upload`

**Description**: Uploads a file and returns generated MCQs.

#### Request (Form-Data)

- `file`: PDF or image file

#### Example using `curl`:

```bash
curl -X POST http://localhost:5000/api/upload \
  -H "Content-Type: multipart/form-data" \
  -F "file=@./sample.pdf"
```

#### Response

```json
{
  "mcqs": [
    {
      "question": "What is the purpose of auscultation in respiratory assessment?",
      "options": [
        "A. Inspection",
        "B. Listening to breath sounds",
        "C. Tapping the chest",
        "D. Feeling for masses"
      ],
      "answer": "B"
    }
  ]
}
```

---

## 📦 Built With

- Node.js
- Express
- Multer (for file uploads)
- pdf-parse
- tesseract.js
- OpenRouter API (ChatGPT-like models)

---

## 💡 Future Improvements

- Add file size/type validation
- Save MCQs to a database
- Add user authentication for history tracking
- Add language support for OCR

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 🤛 Contact

For support, feedback, or questions:  
📧 mitesh21jun@gmail.com

