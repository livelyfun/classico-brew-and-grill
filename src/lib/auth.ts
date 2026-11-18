import crypto from 'crypto';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export const ADMIN_COOKIE_NAME = 'classico_admin_session';

export function getAdminPath(): string {
  const configured = process.env.ADMIN_PATH?.trim() || '/classic-admin';
  return configured.startsWith('/') ? configured : `/${configured}`;
}

function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    'classico-brew-grill-session-secret-2026'
  );
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPasswordHash(password: string, stored: string): boolean {
  const parts = stored.split(':');
  if (parts.length !== 2) return false;
  const [salt, keyHex] = parts;
  const derived = crypto.scryptSync(password, salt, 64);
  const keyBuf = Buffer.from(keyHex, 'hex');
  if (derived.length !== keyBuf.length) return false;
  return crypto.timingSafeEqual(derived, keyBuf);
}

export function createSessionToken(username: string): string {
  const payload = JSON.stringify({
    u: username,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  const encoded = Buffer.from(payload).toString('base64url');
  const sig = crypto
    .createHmac('sha256', getSessionSecret())
    .update(encoded)
    .digest('base64url');
  return `${encoded}.${sig}`;
}

export function verifySessionToken(token: string | undefined | null): {
  valid: boolean;
  username?: string;
} {
  if (!token || !token.includes('.')) return { valid: false };
  const [encoded, sig] = token.split('.');
  if (!encoded || !sig) return { valid: false };

  const expectedSig = crypto
    .createHmac('sha256', getSessionSecret())
    .update(encoded)
    .digest('base64url');

  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return { valid: false };
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return { valid: false };

  try {
    const parsed = JSON.parse(
      Buffer.from(encoded, 'base64url').toString('utf8')
    ) as { u?: string; exp?: number };
    if (!parsed.u || !parsed.exp || Date.now() > parsed.exp) {
      return { valid: false };
    }
    return { valid: true, username: parsed.u };
  } catch {
    return { valid: false };
  }
}

export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const envUser = process.env.ADMIN_USERNAME?.trim();
  const envPass = process.env.ADMIN_PASSWORD;

  // Check .env configured credentials first
  if (envUser && envPass && username === envUser && password === envPass) {
    return true;
  }

  // Fallback to User table in Neon DB
  try {
    const dbUser = await prisma.user.findUnique({
      where: { username },
    });
    if (!dbUser || !dbUser.published) return false;
    return verifyPasswordHash(password, dbUser.passwordHash);
  } catch {
    return false;
  }
}

export function getAdminSession(): { authenticated: boolean; username?: string } {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const verified = verifySessionToken(token);
  if (!verified.valid) return { authenticated: false };
  return { authenticated: true, username: verified.username };
}
