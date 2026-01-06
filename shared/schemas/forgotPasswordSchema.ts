import { z } from "zod";

export const forgotPasswordEmailSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
});

export const forgotPasswordResetSchema = z
    .object({
        code: z
            .string()
            .min(1, "Verification code is required")
            .length(6, "Verification code must be 6 digits"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
        passwordConfirmation: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ["passwordConfirmation"],
    });
