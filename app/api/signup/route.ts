// Utils
import {
  JWT_EXPIRES_IN_5_DAYS,
  JWT_SECRET,
  REQUIRED_FIELDS,
  SALT_ROUNDS,
  prisma,
} from '@/_utils/constante.utils';

// Helpers
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Lib Next
import { NextRequest, NextResponse } from 'next/server';

function validateFields(data: Record<string, unknown>): boolean {
  return REQUIRED_FIELDS.every((field) => data[field] !== undefined);
}

async function isUserExists(
  where: { pseudo: string } | { mail: string }
): Promise<boolean> {
  const user = await prisma.user.findUnique({ where });
  return !!user;
}

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

function createToken(userId: string, pseudo: string): string {
  return jwt.sign({ userId, pseudo }, JWT_SECRET!, {
    expiresIn: JWT_EXPIRES_IN_5_DAYS,
  });
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!validateFields(data)) {
    return NextResponse.json(
      { error: 'Tous les champs sont requis.' },
      { status: 400 }
    );
  }

  const {
    firstname,
    lastname,
    pseudo,
    mail,
    password,
    dateOfBirth,
    country,
    is_revoice,
  } = data;

  try {
    if (await isUserExists({ pseudo })) {
      return NextResponse.json(
        { error: 'Le pseudo est déjà utilisé.' },
        { status: 400 }
      );
    }

    if (await isUserExists({ mail })) {
      return NextResponse.json(
        { error: "L'email est déjà utilisé." },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        firstname,
        lastname,
        pseudo,
        mail,
        password: hashedPassword,
        date_of_birth: new Date(dateOfBirth),
        country,
        is_revoice,
        // role: DEFAULT_ROLE,
      },
    });

    const token = createToken(newUser.id, newUser.pseudo);

    return NextResponse.json(
      { token, user: newUser},
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'utilisateur." },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
