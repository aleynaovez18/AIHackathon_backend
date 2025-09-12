# 📋 VakaÇöz API Documentation

## 🎯 **API Overview**

This document provides complete API specifications for the VakaÇöz medical education platform. The API follows RESTful principles with JWT authentication.

**Base URL:** `https://api.vakacoz.com/api/v1`

## 🔐 **Authentication**

### **JWT Token System**
- **Access Token**: Short-lived (15 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), used to get new access tokens
- **Header**: `Authorization: Bearer {access_token}`

### **Token Endpoints**

#### **POST** `/auth/login`
Login user and get tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "firstName": "Ahmet",
      "lastName": "Yılmaz",
      "email": "user@example.com",
      "university": "İstanbul Üniversitesi",
      "faculty": "Tıp Fakültesi",
      "isEmailVerified": true,
      "createdAt": "2024-01-01T00:00:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
      "expiresIn": 900
    }
  },
  "message": "Login successful"
}
```

#### **POST** `/auth/register`
Register new user.

**Request Body:**
```json
{
  "firstName": "Ahmet",
  "lastName": "Yılmaz",
  "email": "user@example.com",
  "password": "password123",
  "university": "İstanbul Üniversitesi",
  "faculty": "Tıp Fakültesi"
}
```

**Response (201):** Same as login

#### **POST** `/auth/refresh`
Refresh access token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
      "expiresIn": 900
    }
  }
}
```

## 👤 **User Management**

#### **GET** `/users/profile`
Get current user profile.

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "Ahmet",
    "lastName": "Yılmaz",
    "email": "user@example.com",
    "university": "İstanbul Üniversitesi",
    "faculty": "Tıp Fakültesi",
    "avatar": "https://cdn.vakacoz.com/avatars/user_123.jpg",
    "isEmailVerified": true,
    "preferences": {
      "language": "tr",
      "notifications": {
        "email": true,
        "push": false,
        "newCases": true,
        "achievements": true
      }
    }
  }
}
```

#### **PUT** `/users/profile`
Update user profile.

**Request Body:**
```json
{
  "firstName": "Mehmet",
  "university": "Hacettepe Üniversitesi"
}
```

## 🏥 **Faculty & Departments**

#### **GET** `/faculty/departments`
Get departments list.

**Query Parameters:**
- `faculty` (optional): Filter by faculty (e.g., "Tıp Fakültesi")

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "cardiology",
      "name": "Kardiyoloji",
      "description": "Kalp ve damar hastalıkları ile ilgili vakalar.",
      "color": "#fee2e2",
      "iconName": "heart",
      "iconColor": "#ef4444",
      "caseCount": 45,
      "targetFaculty": ["Tıp Fakültesi"],
      "difficulty": "Intermediate"
    }
  ]
}
```

## 📚 **Cases**

#### **GET** `/cases`
Get cases list with pagination and filters.

**Query Parameters:**
- `page` (default: 1): Page number
- `limit` (default: 20): Items per page
- `departmentId`: Filter by department
- `difficulty`: Filter by difficulty (Beginner, Intermediate, Advanced)
- `search`: Search in title/description
- `isCompleted`: Filter by completion status

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "case_456",
      "title": "45 Yaşında Erkek - Göğüs Ağrısı",
      "description": "Ani başlayan şiddetli göğüs ağrısı...",
      "departmentId": "cardiology",
      "difficulty": "Intermediate",
      "estimatedTime": 30,
      "symptoms": [
        "Göğüs ağrısı",
        "Nefes darlığı",
        "Terleme"
      ],
      "patientInfo": {
        "age": 45,
        "gender": "Male",
        "medicalHistory": ["Hipertansiyon", "Diyabet"],
        "currentMedications": ["Metformin", "Lisinopril"]
      },
      "isCompleted": false,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### **GET** `/cases/{caseId}`
Get specific case details.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "case_456",
    "title": "45 Yaşında Erkek - Göğüs Ağrısı",
    "description": "Detaylı vaka açıklaması...",
    "departmentId": "cardiology",
    "difficulty": "Intermediate",
    "symptoms": ["Göğüs ağrısı", "Nefes darlığı"],
    "patientInfo": {
      "age": 45,
      "gender": "Male",
      "medicalHistory": ["Hipertansiyon"],
      "currentMedications": ["Metformin"]
    },
    "diagnosticTests": [
      {
        "name": "EKG",
        "result": "ST elevasyonu V2-V5 derivasyonlarda",
        "normalRange": "Normal sinüs ritmi"
      }
    ],
    "possibleDiagnoses": [
      {
        "id": "stemi",
        "name": "ST Elevasyonlu Miyokart Enfarktüsü",
        "isCorrect": true
      },
      {
        "id": "unstable_angina",
        "name": "Kararsız Anjina",
        "isCorrect": false
      }
    ]
  }
}
```

#### **POST** `/cases/{caseId}/diagnosis`
Submit diagnosis for a case.

**Request Body:**
```json
{
  "selectedDiagnosis": "stemi",
  "reasoning": "ST elevasyonu ve semptomlar STEMI ile uyumlu",
  "aiHintUsed": false
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "isCorrect": true,
    "score": 100,
    "correctDiagnosis": "ST Elevasyonlu Miyokart Enfarktüsü",
    "explanation": "Doğru tanı. ST elevasyonu akut STEMI'nin klasik bulgusudur.",
    "learningPoints": [
      "STEMI'da erken reperfüzyon kritiktir",
      "EKG bulguları tanıda en önemli kriterdir"
    ],
    "nextRecommendations": [
      "Benzer kardiyoloji vakalarını çözmeye devam edin",
      "Acil durum protokollerini gözden geçirin"
    ]
  }
}
```

## 📊 **Progress & Statistics**

#### **GET** `/progress/stats`
Get user progress statistics.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalCases": 150,
    "completedCases": 45,
    "correctDiagnoses": 38,
    "averageScore": 84.2,
    "currentStreak": 5,
    "longestStreak": 12,
    "totalTimeSpent": 1800,
    "level": 8,
    "experiencePoints": 3420,
    "nextLevelProgress": 0.65,
    "departmentStats": [
      {
        "departmentId": "cardiology",
        "casesCompleted": 15,
        "averageScore": 88.5,
        "timeSpent": 450
      }
    ]
  }
}
```

#### **GET** `/progress/leaderboard`
Get leaderboard.

**Query Parameters:**
- `period`: daily, weekly, monthly, all-time
- `faculty`: Filter by faculty
- `limit` (default: 50): Number of entries

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "userId": "user_123",
      "firstName": "Ahmet",
      "lastName": "Y.",
      "avatar": "https://cdn.vakacoz.com/avatars/user_123.jpg",
      "faculty": "Tıp Fakültesi",
      "score": 2450,
      "casesCompleted": 78,
      "rank": 1
    }
  ],
  "meta": {
    "page": 1,
    "limit": 50,
    "total": 1250
  }
}
```

## 🤖 **AI Services**

#### **POST** `/ai/diagnosis-hint`
Get AI-powered diagnosis hint.

**Request Body:**
```json
{
  "caseId": "case_456",
  "currentSymptoms": ["Göğüs ağrısı", "Nefes darlığı"],
  "userProgress": {
    "level": 8,
    "completedCases": 45
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "hint": "EKG bulgularına odaklanın. ST segment değişiklikleri önemli ipuçları verebilir.",
    "suggestedQuestions": [
      "Ağrı karakteri nasıl?",
      "Fizik muayene bulguları neler?",
      "Risk faktörleri var mı?"
    ],
    "confidence": 0.85,
    "reasoning": "Semptom profili akut koroner sendrom ile uyumlu"
  }
}
```

#### **POST** `/ai/drug-interactions`
Check drug interactions.

**Request Body:**
```json
{
  "medications": ["Aspirin 325mg", "Metoprolol 50mg"],
  "patientInfo": {
    "age": 45,
    "weight": 80,
    "allergies": [],
    "conditions": ["Hipertansiyon"]
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "interactions": [
      {
        "drug1": "Aspirin",
        "drug2": "Metoprolol",
        "severity": "Low",
        "description": "Minimal etkileşim. Güvenle birlikte kullanılabilir.",
        "recommendations": ["Düzenli takip yapın"]
      }
    ],
    "overallRisk": "Low",
    "recommendations": [
      "İlaç dozları uygun",
      "Hasta yaşı ve kilosu için güvenli"
    ]
  }
}
```

## ❌ **Error Responses**

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Specific error 1", "Specific error 2"],
  "code": "ERROR_CODE"
}
```

### **Common Status Codes:**
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/expired token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `422` - Unprocessable Entity (validation failed)
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

## 🔧 **Implementation Notes**

### **Database Schema Requirements:**
```sql
-- Users table
CREATE TABLE users (
  id VARCHAR(50) PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  university VARCHAR(200),
  faculty VARCHAR(100),
  avatar_url TEXT,
  is_email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cases table
CREATE TABLE cases (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  department_id VARCHAR(50),
  difficulty ENUM('Beginner', 'Intermediate', 'Advanced'),
  estimated_time INT,
  symptoms JSON,
  patient_info JSON,
  diagnostic_tests JSON,
  correct_diagnosis VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User progress table
CREATE TABLE user_progress (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) REFERENCES users(id),
  case_id VARCHAR(50) REFERENCES cases(id),
  selected_diagnosis VARCHAR(50),
  is_correct BOOLEAN,
  score INT,
  time_spent INT,
  ai_hint_used BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Security Requirements:**
- JWT tokens with RSA256 signing
- Password hashing with bcrypt (min 10 rounds)
- Rate limiting: 100 requests/minute per user
- CORS enabled for app domains only
- Input validation and sanitization
- SQL injection protection

### **Performance Requirements:**
- Response time < 200ms for simple queries
- Response time < 500ms for complex queries
- Support 1000+ concurrent users
- Database connection pooling
- Redis caching for frequently accessed data

This documentation serves as the complete specification for backend development and frontend integration.