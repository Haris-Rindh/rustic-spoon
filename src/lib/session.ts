const encoder = new TextEncoder();

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const keyData = encoder.encode(secret);
  return crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign', 'verify']
  );
}

// Signs a username and returns a base64Token.signatureHex string
export async function signSession(username: string, secret: string): Promise<string> {
  const payload = {
    username,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours session
  };
  const payloadStr = JSON.stringify(payload);
  const key = await getCryptoKey(secret);
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payloadStr)
  );

  // Convert buffer to hex string
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

  // Encode payload to base64
  // We use standard btoa, wrapping it for compatibility in Edge/Browser/Node environments
  const payloadB64 = typeof window !== 'undefined'
    ? window.btoa(payloadStr)
    : Buffer.from(payloadStr).toString('base64');

  return `${payloadB64}.${signatureHex}`;
}

// Verifies session token, returning username if valid, or null if invalid/expired
export async function verifySession(token: string, secret: string): Promise<string | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadB64, signatureHex] = parts;
  try {
    const payloadStr = typeof window !== 'undefined'
      ? window.atob(payloadB64)
      : Buffer.from(payloadB64, 'base64').toString('utf-8');

    const payload = JSON.parse(payloadStr);

    // Check expiration
    if (payload.expiresAt < Date.now()) {
      return null;
    }

    // Verify signature
    const key = await getCryptoKey(secret);
    const expectedBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(payloadStr)
    );

    const expectedArray = Array.from(new Uint8Array(expectedBuffer));
    const expectedHex = expectedArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (signatureHex === expectedHex) {
      return payload.username;
    }
  } catch (err) {
    // Decoding or parsing error
  }
  return null;
}
