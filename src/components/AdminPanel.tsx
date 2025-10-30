import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { MessageSquare, Users, Calendar, Activity, DollarSign } from "lucide-react";
import ChatWindow from "./ChatWindow";

type Patient = {
  id: string;
  name: string;
  condition: string;
  status: string;
  email?: string;
};

type Doctor = {
  id: string;
  name: string;
  email: string;
};

export default function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  // Mock doctor info (replace with real user info in production)
  const doctor: Doctor = {
    id: "doc1",
    name: "Dr. John Doe",
    email: "doctor@example.com",
  };

  const patients: Patient[] = [
    { id: "1", name: "Mehedi Hasan", condition: "Hypertension", status: "Active", email: "mehedi@example.com" },
    { id: "2", name: "Aparna Chowdhury", condition: "Diabetes", status: "Active", email: "aparna@example.com" },
    { id: "3", name: "Munira Sultana", condition: "Obesity", status: "Inactive", email: "munira@example.com" },
  ];

  const messages = [
    { id: 1, patient: "Mehedi Hasan", preview: "Can I eat rice twice a day?" },
    { id: 2, patient: "Aparna Chowdhury", preview: "Need to change my diet plan." },
  ];

  const earnings = {
    total: 12500,
    thisMonth: 3800,
    consultations: 32,
  };

  // Simulate getting/creating a chat session ID
  const getChatSessionId = (patient: Patient) => {
    // In production, fetch from backend
    return `session-${doctor.id}-${patient.id}`;
  };

  const handleStartChat = () => {
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Doctor Dashboard</h1>

      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-4 w-full mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        {/* 🩺 Overview */}
        <TabsContent value="overview">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={18} /> Active Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{patients.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity size={18} /> Consultations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{earnings.consultations}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign size={18} /> This Month’s Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{earnings.thisMonth} BDT</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 👩‍⚕️ Patients */}
        <TabsContent value="patients">
          <div className="grid gap-4">
            {patients.map((p) => (
              <Card key={p.id} className="flex justify-between items-center p-4">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-muted-foreground">{p.condition}</p>
                </div>
                <Button
                  onClick={() => setSelectedPatient(p)}
                  variant="secondary"
                  size="sm"
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>

          {selectedPatient && (
            <Card className="mt-6 p-4">
              <h2 className="text-xl font-semibold mb-2">
                {selectedPatient.name}'s Health Report
              </h2>
              <p>Condition: {selectedPatient.condition}</p>
              <p>Status: {selectedPatient.status}</p>
              <Button className="mt-3" onClick={handleStartChat}>
                Start Chat
              </Button>
            </Card>
          )}

          {chatOpen && selectedPatient && (
            <ChatWindow
              sessionId={getChatSessionId(selectedPatient)}
              patient={selectedPatient}
              doctor={doctor}
              onClose={handleCloseChat}
            />
          )}
        </TabsContent>

        {/* 📅 Appointments */}
        <TabsContent value="appointments">
          <Card className="p-4">
            <CardTitle className="mb-3 flex items-center gap-2">
              <Calendar size={18} /> Upcoming Appointments
            </CardTitle>
            <p>No upcoming appointments.</p>
          </Card>
        </TabsContent>

        {/* 💬 Messages */}
        <TabsContent value="messages">
          <div className="grid gap-4">
            {messages.map((m) => (
              <Card key={m.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{m.patient}</p>
                  <p className="text-sm text-muted-foreground">{m.preview}</p>
                </div>
                <Button size="sm" variant="secondary">
                  <MessageSquare size={16} className="mr-2" /> Reply
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
