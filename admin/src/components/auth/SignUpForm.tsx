"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Button } from './button";
import { EnhancedInput } from './enhanced-input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './card";
import { Separator } from './separator";
import {
    Mail,
    Lock,
    AlertCircle,
    CheckCircle,
    Eye,
    EyeOff,
    User,
} from "lucide-react";
import { signUpSchema } from '../schemas/signUpSchema";

export default function SignUpForm() {
    const router = useRouter();
    const { signUp, isLoaded, setActive } = useSignUp();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [verifying, setVerifying] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [verificationError, setVerificationError] = useState<string | null>(
        null
    );
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        if (!isLoaded) return;

        setIsSubmitting(true);
        setAuthError(null);

        try {
            await signUp.create({
                firstName: data.firstName,
                lastName: data.lastName,
                emailAddress: data.email,
                password: data.password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setVerifying(true);
        } catch (error: any) {
            console.error("Sign-up error:", error);
            setAuthError(
                error.errors?.[0]?.message ||
                "An error occurred during sign-up. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerificationSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (!isLoaded || !signUp) return;

        setIsSubmitting(true);
        setVerificationError(null);

        try {
            const result = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/");
            } else {
                console.error("Verification incomplete:", result);
                setVerificationError(
                    "Verification could not be completed. Please try again."
                );
            }
        } catch (error: any) {
            console.error("Verification error:", error);
            setVerificationError(
                error.errors?.[0]?.message ||
                "An error occurred during verification. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (verifying) {
        return (
            <Card className="w-full max-w-md border border-border bg-card shadow-xl">
                <CardHeader className="flex flex-col gap-1 items-center pb-2">
                    <CardTitle className="text-2xl font-bold text-foreground">
                        Verify Your Email
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-center">
                        We've sent a verification code to your email
                    </CardDescription>
                </CardHeader>

                <Separator className="my-4" />

                <CardContent className="py-6">
                    {verificationError && (
                        <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            <p className="text-sm">{verificationError}</p>
                        </div>
                    )}

                    <form onSubmit={handleVerificationSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="verificationCode"
                                className="text-sm font-medium text-foreground"
                            >
                                Verification Code
                            </label>
                            <EnhancedInput
                                id="verificationCode"
                                type="text"
                                placeholder="Enter the 6-digit code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Verifying..." : "Verify Email"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Didn't receive a code?{" "}
                            <button
                                onClick={async () => {
                                    if (signUp) {
                                        await signUp.prepareEmailAddressVerification({
                                            strategy: "email_code",
                                        });
                                    }
                                }}
                                className="text-primary hover:underline font-medium"
                            >
                                Resend code
                            </button>
                        </p>
                    </div>
                </CardContent>

                <Separator className="my-4" />

                <CardFooter className="flex justify-center py-4">
                    <div className="text-xs text-muted-foreground text-center">
                        Secured by <span className="font-semibold">Clerk</span>
                    </div>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md border border-border bg-card shadow-xl">
            <CardHeader className="flex flex-col gap-1 items-center pb-2">
                <CardTitle className="text-2xl font-bold text-foreground">
                    Create Your Account
                </CardTitle>
                <CardDescription className="text-muted-foreground text-center">
                    Sign up to join Elevate 2026
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

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="firstName"
                                className="text-sm font-medium text-foreground"
                            >
                                First Name
                            </label>
                            <EnhancedInput
                                id="firstName"
                                type="text"
                                placeholder="John"
                                startContent={<User className="h-4 w-4 text-muted-foreground" />}
                                isInvalid={!!errors.firstName}
                                errorMessage={errors.firstName?.message}
                                {...register("firstName")}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="lastName"
                                className="text-sm font-medium text-foreground"
                            >
                                Last Name
                            </label>
                            <EnhancedInput
                                id="lastName"
                                type="text"
                                placeholder="Doe"
                                startContent={<User className="h-4 w-4 text-muted-foreground" />}
                                isInvalid={!!errors.lastName}
                                errorMessage={errors.lastName?.message}
                                {...register("lastName")}
                            />
                        </div>
                    </div>

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
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                            {...register("email")}
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-foreground"
                        >
                            Password
                        </label>
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

                    <div className="space-y-2">
                        <label
                            htmlFor="passwordConfirmation"
                            className="text-sm font-medium text-foreground"
                        >
                            Confirm Password
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
                            isInvalid={!!errors.passwordConfirmation}
                            errorMessage={errors.passwordConfirmation?.message}
                            {...register("passwordConfirmation")}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">
                                By signing up, you agree to our Terms of Service and Privacy
                                Policy
                            </p>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating account..." : "Create Account"}
                    </Button>
                </form>
            </CardContent>

            <Separator className="my-4" />

            <CardFooter className="flex flex-col items-center gap-4 py-4">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/sign-in"
                        className="text-primary hover:underline font-medium"
                    >
                        Sign in
                    </Link>
                </p>

                <div className="text-xs text-muted-foreground text-center">
                    Secured by <span className="font-semibold">Clerk</span>
                </div>
            </CardFooter>
        </Card>
    );
}
