import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import type { ProfileValues } from "@/lib/validation";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  frequency: "weekly" | "monthly";
  emailUpdates: boolean;
  createdAt: string;
}

interface UserRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  phone: string;
  bio: string;
  frequency: "weekly" | "monthly";
  email_updates: number;
  created_at: string;
}

function toUser(row: UserRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    bio: row.bio,
    frequency: row.frequency,
    emailUpdates: row.email_updates === 1,
    createdAt: row.created_at,
  };
}

export function findUserById(id: string): User | null {
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as UserRow | undefined;
  return row ? toUser(row) : null;
}

export function emailExists(email: string): boolean {
  return !!db.prepare("SELECT 1 FROM users WHERE email = ?").get(email.toLowerCase());
}

export async function createUser(input: { name: string; email: string; password: string }): Promise<User> {
  const id = randomUUID();
  const hash = await bcrypt.hash(input.password, 12);
  db.prepare("INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)").run(
    id,
    input.name,
    input.email.toLowerCase(),
    hash,
  );
  return findUserById(id)!;
}

export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase()) as UserRow | undefined;
  if (!row) return null;
  const ok = await bcrypt.compare(password, row.password_hash);
  return ok ? toUser(row) : null;
}

export function updateProfile(id: string, values: ProfileValues): User | null {
  db.prepare(
    "UPDATE users SET name = ?, phone = ?, bio = ?, frequency = ?, email_updates = ? WHERE id = ?",
  ).run(values.name, values.phone, values.bio, values.frequency, values.emailUpdates ? 1 : 0, id);
  return findUserById(id);
}
