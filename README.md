# ShareDaddy

Effortless text and file sharing – fast, easy, and secure.

## ✨ Features

- Instant text and file sharing via unique short codes
- Cloudflare R2 for fast, secure file uploads
- Temporary storage with Redis caching
- Secure and rate-limited API
- Auto-expiry (30 minutes) with TTL MongoDB documents
- Beautiful, responsive frontend with Tailwind CSS & Next.js <br>
~~- Real-time capabilities via Socket.IO~~

## 📂 Project Structure

```
backend/
│
├── config/              
├── controllers/        
├── middleware/
├── model/       
├── routes/             
├── socket/    
└── server.js
frontend/
│
├── app/          
├── public/     
├── components/ 
│   └── ui
├── hooks
└── utils
```

## 🔧 Tech Stack

### Frontend
- Next.js 13+
- Tailwind CSS
- React Icons & Lucide

### Backend
- Node.js with Express
- MongoDB Atlas with TTL indexes
- Redis (ioredis)
- Cloudflare R2 (S3-compatible storage)
- Multer for in-memory file handling
- Rate limiting with express-rate-limit <br>
~~- Real-time with Socket.IO~~

## 📦 Environment Setup

Set up environment variables  
Create `.env` files in `backend/` and `frontend/` with the following:

**Backend .env**
```
PORT=5001
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_connection
R2_ENDPOINT=https://<your-r2-endpoint>
R2_ACCESS_KEY=your_access_key
R2_SECRET_KEY=your_secret_key
PUBLIC_R2_URL=https://your-public-r2-url
FRONTEND_BASE_URL=https://your-frontend-url
```

**Frontend .env**
```
NEXT_PUBLIC_BACKEND_BASE_URL=https://your-backend-url
```

## 📤 API Endpoints

| Method | Endpoint             | Description                  |
|--------|----------------------|------------------------------|
| POST   | `/api/uploadText`    | Upload text content          |
| POST   | `/api/uploadFile`    | Upload a file                |
| GET    | `/api/getData/:code` | Get text or file by code     |

## 🛡️ Security Features

- CORS with strict domain allowlist
- Redis rate limiting (10 req per min)
- File scanning & safe redirects
- Temporary file access with expiry

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
