import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

function parseCloudinaryUrl(url: string): Partial<CloudinaryConfig> {
  try {
    const parsed = new URL(url);
    return {
      cloudName: decodeURIComponent(parsed.hostname) || undefined,
      apiKey: decodeURIComponent(parsed.username) || undefined,
      apiSecret: decodeURIComponent(parsed.password) || undefined,
    };
  } catch {
    return {};
  }
}

function resolveCloudinaryConfig():
  | { config: CloudinaryConfig; error?: never }
  | { config?: never; error: string } {
  const fromUrl = process.env.CLOUDINARY_URL
    ? parseCloudinaryUrl(process.env.CLOUDINARY_URL.trim())
    : {};

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim() || fromUrl.cloudName;
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim() || fromUrl.apiKey;
  const apiSecret =
    process.env.CLOUDINARY_API_SECRET?.trim() || fromUrl.apiSecret;

  if (!cloudName || !apiKey || !apiSecret) {
    return {
      error:
        'Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are missing in .env.',
    };
  }

  // Cloudinary cloud names are short slugs (e.g. "m2ns7bvs"), never display
  // names with spaces. Catch misconfiguration early with an actionable message.
  if (!/^[A-Za-z0-9_-]+$/.test(cloudName)) {
    return {
      error: `CLOUDINARY_CLOUD_NAME "${cloudName}" is not a valid Cloudinary cloud name. Use the cloud name from your Cloudinary dashboard (Product Environment > Cloud name), not the product/display name.`,
    };
  }

  return { config: { cloudName, apiKey, apiSecret } };
}

export async function POST(request: NextRequest) {
  const session = getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const resolved = resolveCloudinaryConfig();
    if (!resolved.config) {
      return NextResponse.json({ error: resolved.error }, { status: 500 });
    }

    const { cloudName, apiKey, apiSecret } = resolved.config;

    const incoming = await request.formData();
    const file = incoming.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'No image file provided.' },
        { status: 400 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = 'classico-brew-and-grill';
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
      .createHash('sha1')
      .update(paramsToSign)
      .digest('hex');

    const uploadForm = new FormData();
    uploadForm.append('file', file);
    uploadForm.append('api_key', apiKey);
    uploadForm.append('timestamp', timestamp);
    uploadForm.append('folder', folder);
    uploadForm.append('signature', signature);

    const cloudinaryEndpoint = `https://api.cloudinary.com/v1_1/${encodeURIComponent(
      cloudName
    )}/image/upload`;

    const res = await fetch(cloudinaryEndpoint, {
      method: 'POST',
      body: uploadForm,
    });

    const data = (await res.json()) as {
      secure_url?: string;
      public_id?: string;
      error?: { message?: string };
    };

    if (!res.ok || !data.secure_url) {
      return NextResponse.json(
        {
          error:
            data.error?.message ||
            `Cloudinary upload failed (${res.status}). Check CLOUDINARY_CLOUD_NAME in .env.`,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      url: data.secure_url,
      publicId: data.public_id,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : 'Failed to upload to Cloudinary.',
      },
      { status: 500 }
    );
  }
}
