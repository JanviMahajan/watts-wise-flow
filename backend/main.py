from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import pandas as pd
import io
import sqlite3
import json
import jwt
import bcrypt
from datetime import datetime, timedelta
import os
from typing import Optional, List
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures

app = FastAPI()
security = HTTPBearer()

# Secret key for JWT tokens
SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect('greenops.db')
    cursor = conn.cursor()
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT NOT NULL,
            user_type TEXT NOT NULL,
            electricity_rate REAL DEFAULT 0.12,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Energy data table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS energy_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            kwh_consumed REAL NOT NULL,
            branch_name TEXT,
            period_type TEXT DEFAULT 'daily',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    conn.commit()
    conn.close()

init_db()

# Pydantic models
class UserRegister(BaseModel):
    email: str
    password: str
    name: str
    user_type: str
    electricity_rate: Optional[float] = 0.12

class UserLogin(BaseModel):
    email: str
    password: str

class EnergyEntry(BaseModel):
    date: str
    kwh_consumed: float
    branch_name: Optional[str] = None
    period_type: str = 'daily'

class UserSettings(BaseModel):
    electricity_rate: float

# Helper functions
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        conn = sqlite3.connect('greenops.db')
        cursor = conn.cursor()
        cursor.execute("SELECT id, email, name, user_type, electricity_rate FROM users WHERE id = ?", (user_id,))
        user = cursor.fetchone()
        conn.close()
        
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        
        return {
            "id": user[0],
            "email": user[1], 
            "name": user[2],
            "user_type": user[3],
            "electricity_rate": user[4]
        }
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def generate_predictions(user_id: int, branch_name: Optional[str] = None) -> dict:
    """Generate simple predictions based on historical data"""
    conn = sqlite3.connect('greenops.db')
    cursor = conn.cursor()
    
    query = """
        SELECT date, kwh_consumed FROM energy_data 
        WHERE user_id = ? 
    """
    params = [user_id]
    
    if branch_name:
        query += " AND branch_name = ?"
        params.append(branch_name)
    
    query += " ORDER BY date DESC LIMIT 30"
    
    cursor.execute(query, params)
    data = cursor.fetchall()
    conn.close()
    
    if len(data) < 7:
        # Not enough data for prediction
        return {
            "predictions": [],
            "message": "Not enough historical data for predictions. Upload more data to see predictions."
        }
    
    # Convert to DataFrame and generate predictions
    df = pd.DataFrame(data, columns=['date', 'kwh_consumed'])
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date')
    
    # Simple linear regression for prediction
    X = np.arange(len(df)).reshape(-1, 1)
    y = df['kwh_consumed'].values
    
    model = LinearRegression()
    model.fit(X, y)
    
    # Predict next 7 days
    future_X = np.arange(len(df), len(df) + 7).reshape(-1, 1)
    predictions = model.predict(future_X)
    
    # Generate future dates
    last_date = df['date'].max()
    future_dates = [last_date + timedelta(days=i+1) for i in range(7)]
    
    prediction_data = []
    for date, pred in zip(future_dates, predictions):
        prediction_data.append({
            "date": date.strftime("%Y-%m-%d"),
            "predicted_kwh": max(0, round(pred, 2))  # Ensure non-negative
        })
    
    return {"predictions": prediction_data}

def get_usage_alerts(user_id: int) -> List[dict]:
    """Generate alerts based on usage patterns"""
    conn = sqlite3.connect('greenops.db')
    cursor = conn.cursor()
    
    # Get recent data
    cursor.execute("""
        SELECT date, kwh_consumed, branch_name FROM energy_data 
        WHERE user_id = ? 
        ORDER BY date DESC LIMIT 30
    """, (user_id,))
    
    data = cursor.fetchall()
    conn.close()
    
    if len(data) < 7:
        return []
    
    df = pd.DataFrame(data, columns=['date', 'kwh_consumed', 'branch_name'])
    df['date'] = pd.to_datetime(df['date'])
    
    alerts = []
    
    # Calculate average usage
    avg_usage = df['kwh_consumed'].mean()
    recent_usage = df.head(3)['kwh_consumed'].mean()
    
    # High usage alert
    if recent_usage > avg_usage * 1.2:
        alerts.append({
            "id": 1,
            "type": "high_usage",
            "severity": "warning",
            "title": "Increased Energy Usage Detected",
            "description": f"Your recent usage ({recent_usage:.1f} kWh) is {((recent_usage/avg_usage-1)*100):.0f}% above your average",
            "timestamp": "Recent",
            "location": "Overall"
        })
    
    # Low usage compliment
    elif recent_usage < avg_usage * 0.8:
        alerts.append({
            "id": 2,
            "type": "efficiency",
            "severity": "info", 
            "title": "Great Energy Efficiency!",
            "description": f"You're using {((1-recent_usage/avg_usage)*100):.0f}% less energy than usual. Keep it up!",
            "timestamp": "Recent",
            "location": "Overall"
        })
    
    # Branch-specific alerts for shops
    if 'branch_name' in df.columns and df['branch_name'].notna().any():
        for branch in df['branch_name'].dropna().unique():
            branch_data = df[df['branch_name'] == branch]
            if len(branch_data) > 3:
                branch_avg = branch_data['kwh_consumed'].mean()
                branch_recent = branch_data.head(2)['kwh_consumed'].mean()
                
                if branch_recent > branch_avg * 1.3:
                    alerts.append({
                        "id": len(alerts) + 3,
                        "type": "high_usage",
                        "severity": "warning", 
                        "title": f"High Usage at {branch}",
                        "description": f"Usage is {((branch_recent/branch_avg-1)*100):.0f}% above normal for this location",
                        "timestamp": "Recent",
                        "location": branch
                    })
    
    return alerts

# API Routes
@app.get("/")
def root():
    return {"message": "GreenOps backend is running 🚀"}

@app.post("/auth/register")
async def register(user: UserRegister):
    conn = sqlite3.connect('greenops.db')
    cursor = conn.cursor()
    
    # Check if user exists
    cursor.execute("SELECT id FROM users WHERE email = ?", (user.email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password and create user
    hashed_password = hash_password(user.password)
    cursor.execute("""
        INSERT INTO users (email, password_hash, name, user_type, electricity_rate)
        VALUES (?, ?, ?, ?, ?)
    """, (user.email, hashed_password, user.name, user.user_type, user.electricity_rate))
    
    user_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    # Create token
    access_token = create_access_token(data={"sub": user_id})
    
    return {
        "token": access_token,
        "user": {
            "id": user_id,
            "email": user.email,
            "name": user.name,
            "user_type": user.user_type,
            "electricity_rate": user.electricity_rate
        }
    }

@app.post("/auth/login")
async def login(user: UserLogin):
    conn = sqlite3.connect('greenops.db')
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, email, password_hash, name, user_type, electricity_rate FROM users WHERE email = ?", (user.email,))
    db_user = cursor.fetchone()
    conn.close()
    
    if not db_user or not verify_password(user.password, db_user[2]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": db_user[0]})
    
    return {
        "token": access_token,
        "user": {
            "id": db_user[0],
            "email": db_user[1],
            "name": db_user[3],
            "user_type": db_user[4],
            "electricity_rate": db_user[5]
        }
    }

@app.post("/upload-csv/")
async def upload_csv(
    file: UploadFile = File(...),
    branch_name: Optional[str] = Form(None),
    current_user = Depends(get_current_user)
):
    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
        
        # Validate CSV format
        required_columns = ['date', 'kwh_consumed']
        if not all(col in df.columns for col in required_columns):
            raise HTTPException(status_code=400, detail=f"CSV must contain columns: {required_columns}")
        
        # Store data in database
        conn = sqlite3.connect('greenops.db')
        cursor = conn.cursor()
        
        for _, row in df.iterrows():
            cursor.execute("""
                INSERT INTO energy_data (user_id, date, kwh_consumed, branch_name)
                VALUES (?, ?, ?, ?)
            """, (current_user["id"], row['date'], row['kwh_consumed'], branch_name))
        
        conn.commit()
        conn.close()
        
        # Generate predictions for the uploaded data
        predictions = generate_predictions(current_user["id"], branch_name)
        
        return {
            "success": True,
            "message": f"Successfully uploaded {len(df)} records",
            "rows": len(df),
            "columns": list(df.columns),
            "predictions": predictions
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/manual-entry")
async def add_manual_entry(entry: EnergyEntry, current_user = Depends(get_current_user)):
    conn = sqlite3.connect('greenops.db')
    cursor = conn.cursor()
    
    cursor.execute("""
        INSERT INTO energy_data (user_id, date, kwh_consumed, branch_name, period_type)
        VALUES (?, ?, ?, ?, ?)
    """, (current_user["id"], entry.date, entry.kwh_consumed, entry.branch_name, entry.period_type))
    
    conn.commit()
    conn.close()
    
    return {"success": True, "message": "Energy data added successfully"}

@app.get("/energy-data")
async def get_energy_data(
    branch_id: Optional[str] = None,
    current_user = Depends(get_current_user)
):
    conn = sqlite3.connect('greenops.db')
    cursor = conn.cursor()
    
    query = """
        SELECT date, kwh_consumed, branch_name, period_type 
        FROM energy_data WHERE user_id = ?
    """
    params = [current_user["id"]]
    
    if branch_id:
        query += " AND branch_name = ?"
        params.append(branch_id)
    
    query += " ORDER BY date DESC"
    
    cursor.execute(query, params)
    data = cursor.fetchall()
    conn.close()
    
    energy_data = []
    for row in data:
        energy_data.append({
            "date": row[0],
            "kwh_consumed": row[1],
            "branch_name": row[2],
            "period_type": row[3]
        })
    
    return {"data": energy_data}

@app.get("/predictions")
async def get_predictions(
    branch_id: Optional[str] = None,
    current_user = Depends(get_current_user)
):
    return generate_predictions(current_user["id"], branch_id)

@app.get("/alerts")
async def get_alerts(current_user = Depends(get_current_user)):
    alerts = get_usage_alerts(current_user["id"])
    return {"alerts": alerts}

@app.get("/optimization-tips")
async def get_optimization_tips(
    user_type: Optional[str] = None,
    current_user = Depends(get_current_user)
):
    user_type = user_type or current_user["user_type"]
    
    if user_type == "house":
        tips = [
            {
                "id": 1,
                "category": "lighting",
                "title": "Switch to LED Bulbs",
                "description": "LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs",
                "potential_saving": "10-15%",
                "difficulty": "Easy"
            },
            {
                "id": 2,
                "category": "hvac",
                "title": "Optimize Thermostat Settings",
                "description": "Set thermostat 7-10°F higher in summer and lower in winter when away",
                "potential_saving": "5-10%",
                "difficulty": "Easy"
            },
            {
                "id": 3,
                "category": "appliances",
                "title": "Unplug Devices When Not in Use",
                "description": "Electronics continue to draw power even when turned off",
                "potential_saving": "5-8%",
                "difficulty": "Easy"
            }
        ]
    else:  # shop
        tips = [
            {
                "id": 1,
                "category": "scheduling",
                "title": "Schedule Heavy Equipment During Off-Peak Hours",
                "description": "Run energy-intensive operations during off-peak electricity rates",
                "potential_saving": "15-25%",
                "difficulty": "Medium"
            },
            {
                "id": 2,
                "category": "lighting",
                "title": "Install Motion Sensors",
                "description": "Automatically turn off lights in unoccupied areas",
                "potential_saving": "20-30%",
                "difficulty": "Medium"
            },
            {
                "id": 3,
                "category": "hvac",
                "title": "Regular HVAC Maintenance",
                "description": "Clean filters and maintain systems for optimal efficiency",
                "potential_saving": "10-20%",
                "difficulty": "Easy"
            }
        ]
    
    return {"tips": tips}

@app.get("/branches")
async def get_branches(current_user = Depends(get_current_user)):
    conn = sqlite3.connect('greenops.db')
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT DISTINCT branch_name FROM energy_data 
        WHERE user_id = ? AND branch_name IS NOT NULL
    """, (current_user["id"],))
    
    branches = [{"name": row[0], "id": row[0]} for row in cursor.fetchall()]
    conn.close()
    
    return {"branches": branches}

@app.put("/user-settings")
async def update_user_settings(
    settings: UserSettings,
    current_user = Depends(get_current_user)
):
    conn = sqlite3.connect('greenops.db')
    cursor = conn.cursor()
    
    cursor.execute("""
        UPDATE users SET electricity_rate = ? WHERE id = ?
    """, (settings.electricity_rate, current_user["id"]))
    
    conn.commit()
    conn.close()
    
    return {"success": True, "message": "Settings updated successfully"}