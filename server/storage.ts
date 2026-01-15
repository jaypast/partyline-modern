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
        tagline: "Ask her about the time she accidentally taught the wrong Civil War for a week.",
        bio: "Former high school history teacher with 35 years of stories. I once spent an entire week teaching my students about the English Civil War instead of the American one—and didn't realize until a parent called. Now I'm here to listen to your stories too.",
        avatarUrl: "/avatars/eleanor.png",
        pricePerMinute: 2.00,
        interests: ["Books", "History", "Gardening", "Travel"],
        languages: ["English"],
        ageGroup: "60+",
        isOnline: true,
      },
      {
        name: "Marcus Chen",
        tagline: "The guy who debugged code at his own wedding reception.",
        bio: "Yes, I really did fix a production bug during my first dance. My wife still brings it up. I work in tech but love talking about everything—sports, philosophy, that weird dream you had. No judgment, just genuine curiosity.",
        avatarUrl: "/avatars/marcus.png",
        pricePerMinute: 1.50,
        interests: ["Technology", "Sports", "Music", "Cooking"],
        languages: ["English", "Mandarin"],
        ageGroup: "30-44",
        isOnline: true,
      },
      {
        name: "Patricia Moore",
        tagline: "30 years as an ER nurse. She's heard everything—try her.",
        bio: "Nothing shocks me anymore. I've held hands through the scariest moments and celebrated the happiest ones. Now I bring that same calm, compassionate presence to our chats. Whatever's on your mind, I've probably heard wilder.",
        avatarUrl: "/avatars/patricia.png",
        pricePerMinute: 2.50,
        interests: ["Health", "Pets", "Nature", "Spirituality"],
        languages: ["English", "Spanish"],
        ageGroup: "45-59",
        isOnline: false,
      },
      {
        name: "Robert Johnson",
        tagline: "Vietnam vet who hitchhiked across America in '72. Ask him anything.",
        bio: "I've lived through things that would make a good movie—and some that definitely wouldn't. After decades of life, I've learned the best conversations happen with strangers. Let's swap stories.",
        avatarUrl: "/avatars/robert.png",
        pricePerMinute: 1.00,
        interests: ["History", "Sports", "Travel", "Music"],
        languages: ["English"],
        ageGroup: "60+",
        isOnline: true,
      },
      {
        name: "Sarah Kim",
        tagline: "Will discuss your existential crisis or your Netflix queue. Both valid.",
        bio: "Social worker by day, night owl by night. I've helped people through actual emergencies, so your 2 AM thoughts about whether you're living your best life? Totally manageable. Let's talk about the big stuff or the small stuff.",
        avatarUrl: "/avatars/sarah.png",
        pricePerMinute: 3.00,
        interests: ["Health", "Books", "Cooking", "Art"],
        languages: ["English", "Korean"],
        ageGroup: "30-44",
        isOnline: true,
      },
      {
        name: "William Thompson",
        tagline: "Retired pastor who's been counseling longer than you've been alive.",
        bio: "40 years of listening to people's deepest thoughts. I'm not here to preach unless you want that—mostly I'm here to be present. Everyone deserves to be heard without a to-do list attached.",
        avatarUrl: "/avatars/william.png",
        pricePerMinute: 2.00,
        interests: ["Spirituality", "Books", "History", "Music"],
        languages: ["English"],
        ageGroup: "60+",
        isOnline: false,
      },
      {
        name: "Maria Garcia",
        tagline: "Raised in three countries. Fluent in code-switching and empanada recipes.",
        bio: "My grandmother spoke only Spanish, my dad only English, and somehow I became the family translator at age 6. Now I love learning about everyone's backgrounds. Bonus: I can teach you the secret to perfect masa.",
        avatarUrl: "/avatars/maria.png",
        pricePerMinute: 1.75,
        interests: ["Travel", "Cooking", "Music", "Art"],
        languages: ["English", "Spanish"],
        ageGroup: "45-59",
        isOnline: true,
      },
      {
        name: "James Anderson",
        tagline: "Ex-Fortune 500 exec. Now he just wants to talk about movies.",
        bio: "Spent 25 years in boardrooms before realizing the best conversations happened in elevators. Retired early to do more of those. Happy to discuss business strategy, but honestly I'd rather hear your hot take on Dune.",
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
        id,
        name: data.name,
        tagline: data.tagline,
        bio: data.bio,
        avatarUrl: data.avatarUrl ?? null,
        pricePerMinute: data.pricePerMinute,
        interests: data.interests,
        languages: data.languages,
        ageGroup: data.ageGroup,
        isOnline: data.isOnline ?? false,
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
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
      nickname: insertUser.nickname ?? null,
      ageGroup: insertUser.ageGroup ?? null,
      phone: insertUser.phone ?? null,
      email: insertUser.email ?? null,
    };
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
      id,
      name: insertCompanion.name,
      tagline: insertCompanion.tagline,
      bio: insertCompanion.bio,
      avatarUrl: insertCompanion.avatarUrl ?? null,
      pricePerMinute: insertCompanion.pricePerMinute,
      interests: insertCompanion.interests,
      languages: insertCompanion.languages,
      ageGroup: insertCompanion.ageGroup,
      isOnline: insertCompanion.isOnline ?? false,
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
      id,
      callerId: insertCall.callerId,
      companionId: insertCall.companionId ?? null,
      startTime: new Date(),
      endTime: insertCall.endTime ?? null,
      durationMinutes: insertCall.durationMinutes ?? null,
      callType: insertCall.callType,
      isPaid: insertCall.isPaid ?? false,
      totalCost: insertCall.totalCost ?? null,
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
