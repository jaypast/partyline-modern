import { type User, type InsertUser, type Companion, type InsertCompanion, type Call, type InsertCall } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCompanions(): Promise<Companion[]>;
  getCompanion(id: string): Promise<Companion | undefined>;
  getOnlineCompanions(): Promise<Companion[]>;
  createCompanion(companion: InsertCompanion): Promise<Companion>;
  updateCompanionStatus(id: string, isOnline: boolean): Promise<Companion | undefined>;
  
  getCalls(userId: string): Promise<Call[]>;
  createCall(call: InsertCall): Promise<Call>;
  endCall(id: string, durationMinutes: number, totalCost: number): Promise<Call | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private companions: Map<string, Companion>;
  private calls: Map<string, Call>;

  constructor() {
    this.users = new Map();
    this.companions = new Map();
    this.calls = new Map();
    
    this.seedCompanions();
  }

  private seedCompanions() {
    const seedData: InsertCompanion[] = [
      {
        name: "Eleanor Wilson",
        tagline: "Retired teacher who loves sharing stories and listening to yours.",
        bio: "I spent 35 years as an elementary school teacher, and now I love connecting with people of all ages. Whether you want to discuss books, share memories, or just need someone to listen, I'm here for you. I believe everyone has a story worth hearing, and I consider it a privilege to be part of your day.",
        avatarUrl: "/avatars/eleanor.png",
        pricePerMinute: 2.00,
        interests: ["Books", "History", "Gardening", "Travel"],
        languages: ["English"],
        ageGroup: "60+",
        isOnline: true,
      },
      {
        name: "Marcus Chen",
        tagline: "Tech professional and great listener. Let's chat about anything!",
        bio: "I work in tech but love talking about everything from sports to philosophy. Sometimes we all just need someone to bounce ideas off of or vent to—I'm that person. No judgment, just genuine interest in what's on your mind.",
        avatarUrl: "/avatars/marcus.png",
        pricePerMinute: 1.50,
        interests: ["Technology", "Sports", "Music", "Cooking"],
        languages: ["English", "Mandarin"],
        ageGroup: "30-44",
        isOnline: true,
      },
      {
        name: "Patricia Moore",
        tagline: "Former nurse with a caring heart. Here to listen without judgment.",
        bio: "After 30 years in healthcare, I understand the power of a good conversation. I've seen how talking things through can help people feel better, and I bring that same compassionate ear to our chats. Whatever's on your mind, I'm here.",
        avatarUrl: "/avatars/patricia.png",
        pricePerMinute: 2.50,
        interests: ["Health", "Pets", "Nature", "Spirituality"],
        languages: ["English", "Spanish"],
        ageGroup: "45-59",
        isOnline: false,
      },
      {
        name: "Robert Johnson",
        tagline: "Vietnam veteran and grandfather. Stories to share, ears to listen.",
        bio: "After decades of life experience, I'm here to offer a friendly voice when you need one. I've lived through a lot and learned that connection is what matters most. Let's swap stories or just chat about the day.",
        avatarUrl: "/avatars/robert.png",
        pricePerMinute: 1.00,
        interests: ["History", "Sports", "Travel", "Music"],
        languages: ["English"],
        ageGroup: "60+",
        isOnline: true,
      },
      {
        name: "Sarah Kim",
        tagline: "Social worker by day, friendly ear by night. Let's talk!",
        bio: "I've spent my career helping people navigate life's challenges, and I bring that same compassion here. Whether you need advice, a sounding board, or just friendly conversation, I'm happy to be here with you.",
        avatarUrl: "/avatars/sarah.png",
        pricePerMinute: 3.00,
        interests: ["Health", "Books", "Cooking", "Art"],
        languages: ["English", "Korean"],
        ageGroup: "30-44",
        isOnline: true,
      },
      {
        name: "William Thompson",
        tagline: "Retired pastor offering a compassionate, non-judgmental ear.",
        bio: "Decades of counseling have taught me the art of listening with empathy. I'm not here to preach or advise unless you want it—I'm simply here to be present and to listen. Everyone deserves to be heard.",
        avatarUrl: "/avatars/william.png",
        pricePerMinute: 2.00,
        interests: ["Spirituality", "Books", "History", "Music"],
        languages: ["English"],
        ageGroup: "60+",
        isOnline: false,
      },
      {
        name: "Maria Garcia",
        tagline: "Bilingual companion ready to chat in English or Spanish.",
        bio: "Growing up in a multicultural household taught me the value of diverse perspectives. I love learning about people's backgrounds and sharing stories. Let's have a conversation that leaves us both feeling enriched.",
        avatarUrl: "/avatars/maria.png",
        pricePerMinute: 1.75,
        interests: ["Travel", "Cooking", "Music", "Art"],
        languages: ["English", "Spanish"],
        ageGroup: "45-59",
        isOnline: true,
      },
      {
        name: "James Anderson",
        tagline: "Former corporate executive who learned the value of real talk.",
        bio: "After years in the corporate world, I realized the most meaningful moments came from genuine conversations. Now I'm here to offer that same authentic connection. Business talk or life talk—I'm game for both.",
        avatarUrl: "/avatars/james.png",
        pricePerMinute: 4.00,
        interests: ["Technology", "Books", "Sports", "Travel"],
        languages: ["English"],
        ageGroup: "45-59",
        isOnline: true,
      },
    ];

    seedData.forEach((data, index) => {
      const id = `companion-${index + 1}`;
      const companion: Companion = {
        ...data,
        id,
        totalCalls: Math.floor(Math.random() * 400) + 50,
        rating: Number((4.5 + Math.random() * 0.5).toFixed(1)),
      };
      this.companions.set(id, companion);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCompanions(): Promise<Companion[]> {
    return Array.from(this.companions.values());
  }

  async getCompanion(id: string): Promise<Companion | undefined> {
    return this.companions.get(id);
  }

  async getOnlineCompanions(): Promise<Companion[]> {
    return Array.from(this.companions.values()).filter(c => c.isOnline);
  }

  async createCompanion(insertCompanion: InsertCompanion): Promise<Companion> {
    const id = randomUUID();
    const companion: Companion = {
      ...insertCompanion,
      id,
      totalCalls: 0,
      rating: 5.0,
    };
    this.companions.set(id, companion);
    return companion;
  }

  async updateCompanionStatus(id: string, isOnline: boolean): Promise<Companion | undefined> {
    const companion = this.companions.get(id);
    if (companion) {
      companion.isOnline = isOnline;
      this.companions.set(id, companion);
      return companion;
    }
    return undefined;
  }

  async getCalls(userId: string): Promise<Call[]> {
    return Array.from(this.calls.values()).filter(
      (call) => call.callerId === userId || call.companionId === userId
    );
  }

  async createCall(insertCall: InsertCall): Promise<Call> {
    const id = randomUUID();
    const call: Call = {
      ...insertCall,
      id,
      startTime: new Date(),
    };
    this.calls.set(id, call);
    return call;
  }

  async endCall(id: string, durationMinutes: number, totalCost: number): Promise<Call | undefined> {
    const call = this.calls.get(id);
    if (call) {
      call.endTime = new Date();
      call.durationMinutes = durationMinutes;
      call.totalCost = totalCost;
      this.calls.set(id, call);
      return call;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
