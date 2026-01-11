import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePasswords, generateToken } from '@/lib/auth';
import { signInSchema } from '@/schemas/signInSchema';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = signInSchema.parse(body);

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: validatedData.identifier },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not registered. Please sign up first.' },
                { status: 401 }
            );
        }

        // Verify password
        const isValidPassword = await comparePasswords(
            validatedData.password,
            user.password
        );

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = generateToken({
            userId: user.id,
            email: user.email,
        });

        // Create response with cookie
        const response = NextResponse.json(
            {
                success: true,
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
            },
            { status: 200 }
        );

        // Set HTTP-only cookie
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return response;
    } catch (error: any) {
        console.error('Signin error:', error);

        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Invalid input data', details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'An error occurred during signin' },
            { status: 500 }
        );
    }
}
