export interface IUser {
    _id: string;
    name: string;
    email: string;
    // password is stored hashed; include it to match the Mongoose schema
    password?: string;
    role: 'user' | 'nutritionist' | 'admin';
    createdAt: Date;
}

export interface IHealthMetrics {
    bloodPressure: {
        systolic: number;
        diastolic: number;
    };
    cholesterol: number;
    bloodSugar: number;
    heartRate: number;
    bmi: number;
}

export interface IChatMessage {
    sessionId: string;
    senderId: string;
    content: string;
    timestamp: Date;
}