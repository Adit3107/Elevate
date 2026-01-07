"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { EnhancedInput } from "@/components/ui/enhanced-input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Mail,
    Lock,
    AlertCircle,
    Eye,
    EyeOff,
    ArrowLeft,
    KeyRound,
} from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";

// Schema for forgot password email step
const forgotPasswordEmailSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

// Schema for reset password step
const resetPasswordSchema = z.object({
    code: z.string().min(6, "Verification code must be at least 6 characters"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
});

type FormState = "SIGN_IN" | "FORGOT_PASSWORD_EMAIL" | "FORGOT_PASSWORD_RESET";

export default function SignInForm() {
    const router = useRouter();
    const { signIn, isLoaded, setActive } = useSignIn();
    const [formState, setFormState] = useState<FormState>("SIGN_IN");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");

    // Sign-in form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    // Forgot password email form
    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        formState: { errors: errorsEmail },
    } = useForm<z.infer<typeof forgotPasswordEmailSchema>>({
        resolver: zodResolver(forgotPasswordEmailSchema),
    });

    // Reset password form
    const {
        register: registerReset,
        handleSubmit: handleSubmitReset,
        formState: { errors: errorsReset },
    } = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSignInSubmit = async (data: z.infer<typeof signInSchema>) => {
        if (!isLoaded || !signIn) return;

        setIsSubmitting(true);
        setAuthError(null);

        try {
            const result = await signIn.create({
                identifier: data.identifier,
                password: data.password,
            });

            if (result.status === "complete") {
                if (!result.createdSessionId) {
                    setAuthError("Sign-in completed but no session was created. Please try again.");
                    return;
                }
                await setActive({ session: result.createdSessionId });
                router.push("/");
            } else {
                setAuthError("Sign-in could not be completed. Please check your credentials and try again.");
            }
        } catch (error: any) {
            console.error("Sign-in error:", error);
            setAuthError(
                error.errors?.[0]?.message ||
                "An error occurred during sign-in. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const onForgotPasswordEmailSubmit = async (data: z.infer<typeof forgotPasswordEmailSchema>) => {
        if (!isLoaded || !signIn) return;

        setIsSubmitting(true);
        setAuthError(null);

        try {
            await signIn.create({
                identifier: data.email,
                strategy: "reset_password_email_code",
            });

            setResetEmail(data.email);
            setFormState("FORGOT_PASSWORD_RESET");
        } catch (error: any) {
            console.error("Forgot password error:", error);
            setAuthError(
                error.errors?.[0]?.message ||
                "Failed to send reset code. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const onResetPasswordSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
        if (!isLoaded || !signIn) return;

        setIsSubmitting(true);
        setAuthError(null);

        try {
            const result = await signIn.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code: data.code,
                password: data.password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/");
            } else {
                setAuthError("Password reset could not be completed. Please try again.");
            }
        } catch (error: any) {
            console.error("Reset password error:", error);
            setAuthError(
                error.errors?.[0]?.message ||
                "Failed to reset password. Please check the code and try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render: Forgot Password - Email Input
    if (formState === "FORGOT_PASSWORD_EMAIL") {
        return (
            <Card className="w-full max-w-md border border-border bg-card shadow-xl mx-4">
                <CardHeader className="flex flex-col gap-1 items-center pb-2">
                    <CardTitle className="text-2xl font-bold text-foreground">
                        Forgot Password
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-center">
                        Enter your email to receive a verification code
                    </CardDescription>
                </CardHeader>

                <Separator className="my-4" />

                <CardContent className="py-6">
                    {authError && (
                        <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            <p className="text-sm">{authError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmitEmail(onForgotPasswordEmailSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-foreground"
                            >
                                Email
                            </label>
                            <EnhancedInput
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                startContent={<Mail className="h-4 w-4 text-muted-foreground" />}
                                isInvalid={!!errorsEmail.email}
                                errorMessage={errorsEmail.email?.message}
                                {...registerEmail("email")}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Sending Code..." : "Send Verification Code"}
                        </Button>
                    </form>
                </CardContent>

                <Separator className="my-4" />

                <CardFooter className="flex flex-col items-center gap-4 py-4">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setFormState("SIGN_IN");
                            setAuthError(null);
                        }}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Sign In
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    // Render: Forgot Password - Reset Password
    if (formState === "FORGOT_PASSWORD_RESET") {
        return (
            <Card className="w-full max-w-md border border-border bg-card shadow-xl mx-4">
                <CardHeader className="flex flex-col gap-1 items-center pb-2">
                    <CardTitle className="text-2xl font-bold text-foreground">
                        Reset Password
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-center">
                        Enter the code sent to <strong>{resetEmail}</strong> and your new password
                    </CardDescription>
                </CardHeader>

                <Separator className="my-4" />

                <CardContent className="py-6">
                    {authError && (
                        <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            <p className="text-sm">{authError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmitReset(onResetPasswordSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="code"
                                className="text-sm font-medium text-foreground"
                            >
                                Verification Code
                            </label>
                            <EnhancedInput
                                id="code"
                                type="text"
                                placeholder="Enter 6-digit code"
                                startContent={<KeyRound className="h-4 w-4 text-muted-foreground" />}
                                isInvalid={!!errorsReset.code}
                                errorMessage={errorsReset.code?.message}
                                {...registerReset("code")}
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="new-password"
                                className="text-sm font-medium text-foreground"
                            >
                                New Password
                            </label>
                            <EnhancedInput
                                id="new-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                startContent={<Lock className="h-4 w-4 text-muted-foreground" />}
                                endContent={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </button>
                                }
                                isInvalid={!!errorsReset.password}
                                errorMessage={errorsReset.password?.message}
                                {...registerReset("password")}
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="passwordConfirmation"
                                className="text-sm font-medium text-foreground"
                            >
                                Confirm New Password
                            </label>
                            <EnhancedInput
                                id="passwordConfirmation"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                startContent={<Lock className="h-4 w-4 text-muted-foreground" />}
                                endContent={
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="hover:text-foreground transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </button>
                                }
                                isInvalid={!!errorsReset.passwordConfirmation}
                                errorMessage={errorsReset.passwordConfirmation?.message}
                                {...registerReset("passwordConfirmation")}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Resetting..." : "Reset Password"}
                        </Button>
                    </form>
                </CardContent>

                <Separator className="my-4" />

                <CardFooter className="flex flex-col items-center gap-4 py-4">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setFormState("SIGN_IN");
                            setAuthError(null);
                        }}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Sign In
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    // Render: Sign In
    return (
        <Card className="w-full max-w-md border border-border bg-card shadow-xl mx-4">
            <CardHeader className="flex flex-col gap-1 items-center pb-2">
                <CardTitle className="text-2xl font-bold text-foreground">
                    Welcome Back
                </CardTitle>
                <CardDescription className="text-muted-foreground text-center">
                    Sign in to access Elevate 2026
                </CardDescription>
            </CardHeader>

            <Separator className="my-4" />

            <CardContent className="py-6">
                {authError && (
                    <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm">{authError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSignInSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="identifier"
                            className="text-sm font-medium text-foreground"
                        >
                            Email
                        </label>
                        <EnhancedInput
                            id="identifier"
                            type="email"
                            placeholder="your.email@example.com"
                            startContent={<Mail className="h-4 w-4 text-muted-foreground" />}
                            isInvalid={!!errors.identifier}
                            errorMessage={errors.identifier?.message}
                            {...register("identifier")}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-foreground"
                            >
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => setFormState("FORGOT_PASSWORD_EMAIL")}
                                className="text-sm text-primary hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <EnhancedInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            startContent={<Lock className="h-4 w-4 text-muted-foreground" />}
                            endContent={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="hover:text-foreground transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </button>
                            }
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                            {...register("password")}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </CardContent>

            <Separator className="my-4" />

            <CardFooter className="flex flex-col items-center gap-4 py-4">
                <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                        href="/sign-up"
                        className="text-primary hover:underline font-medium"
                    >
                        Sign up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
