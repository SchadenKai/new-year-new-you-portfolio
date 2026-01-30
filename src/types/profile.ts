import { z } from 'zod';

export const ProfileSchema = z.object({
  basics: z.object({
    name: z.string(),
    label: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    url: z.string().url().optional(),
    summary: z.string(),
    location: z.object({
      city: z.string().optional(),
      countryCode: z.string().optional(),
      region: z.string().optional(),
    }).optional(),
    profiles: z.array(z.object({
      network: z.string(),
      username: z.string(),
      url: z.string().url(),
    })).optional(),
  }),
  work: z.array(z.object({
    name: z.string(),
    position: z.string(),
    url: z.string().url().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    summary: z.string().optional(),
    highlights: z.array(z.string()),
    location: z.string().optional(),
  })),
  education: z.array(z.object({
    institution: z.string(),
    area: z.string(),
    studyType: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    score: z.string().optional(),
    courses: z.array(z.string()).optional(),
    honors: z.string().optional(), // Changed to string as per resume "Dean's Lister"
  })),
  skills: z.array(z.object({
    name: z.string(),
    level: z.string().optional(),
    keywords: z.array(z.string()),
  })),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    highlights: z.array(z.string()),
    keywords: z.array(z.string()).optional(),
    url: z.string().url().optional(),
    roles: z.array(z.string()).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    type: z.string().optional(), // e.g. "Commission", "College Project"
  })),
  achievements: z.array(z.object({
    title: z.string(),
    event: z.string(),
    date: z.string(),
    summary: z.string(),
    location: z.string().optional(),
  })).optional(),
});

export type Profile = z.infer<typeof ProfileSchema>;
