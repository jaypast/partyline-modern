import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCompanionSchema, insertCallSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/companions", async (req, res) => {
    try {
      const { online } = req.query;
      
      let companions;
      if (online === "true") {
        companions = await storage.getOnlineCompanions();
      } else {
        companions = await storage.getCompanions();
      }
      
      res.json(companions);
    } catch (error) {
      console.error("Error fetching companions:", error);
      res.status(500).json({ error: "Failed to fetch companions" });
    }
  });

  app.get("/api/companions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const companion = await storage.getCompanion(id);
      
      if (!companion) {
        return res.status(404).json({ error: "Companion not found" });
      }
      
      res.json(companion);
    } catch (error) {
      console.error("Error fetching companion:", error);
      res.status(500).json({ error: "Failed to fetch companion" });
    }
  });

  app.post("/api/companions", async (req, res) => {
    try {
      const validatedData = insertCompanionSchema.parse(req.body);
      const companion = await storage.createCompanion(validatedData);
      res.status(201).json(companion);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating companion:", error);
      res.status(500).json({ error: "Failed to create companion" });
    }
  });

  app.patch("/api/companions/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { isOnline } = req.body;
      
      if (typeof isOnline !== "boolean") {
        return res.status(400).json({ error: "isOnline must be a boolean" });
      }
      
      const companion = await storage.updateCompanionStatus(id, isOnline);
      
      if (!companion) {
        return res.status(404).json({ error: "Companion not found" });
      }
      
      res.json(companion);
    } catch (error) {
      console.error("Error updating companion status:", error);
      res.status(500).json({ error: "Failed to update companion status" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }
      
      const user = await storage.createUser(validatedData);
      res.status(201).json({ id: user.id, username: user.username, nickname: user.nickname });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const { password, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.post("/api/calls", async (req, res) => {
    try {
      const validatedData = insertCallSchema.parse(req.body);
      const call = await storage.createCall(validatedData);
      res.status(201).json(call);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating call:", error);
      res.status(500).json({ error: "Failed to create call" });
    }
  });

  app.get("/api/calls/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const calls = await storage.getCalls(userId);
      res.json(calls);
    } catch (error) {
      console.error("Error fetching calls:", error);
      res.status(500).json({ error: "Failed to fetch calls" });
    }
  });

  app.patch("/api/calls/:id/end", async (req, res) => {
    try {
      const { id } = req.params;
      const { durationMinutes, totalCost } = req.body;
      
      if (typeof durationMinutes !== "number" || typeof totalCost !== "number") {
        return res.status(400).json({ error: "durationMinutes and totalCost must be numbers" });
      }
      
      const call = await storage.endCall(id, durationMinutes, totalCost);
      
      if (!call) {
        return res.status(404).json({ error: "Call not found" });
      }
      
      res.json(call);
    } catch (error) {
      console.error("Error ending call:", error);
      res.status(500).json({ error: "Failed to end call" });
    }
  });

  return httpServer;
}
