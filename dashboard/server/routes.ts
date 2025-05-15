import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for email registration
  app.post('/api/register', async (req, res) => {
    try {
      const { email } = req.body;
      
      // Simple validation
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ message: 'Valid email is required' });
      }

      // Log the registration
      console.log(`New registration: ${email}`);
      
      // Return success response
      return res.status(200).json({ 
        message: 'Registration successful',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
