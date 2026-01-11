"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    User,
} from "lucide-react";
import { signUpSchema } from "@/schemas/signUpSchema";

export default function SignUpForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true);
        setAuthError(null);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setAuthError(result.error || 'An error occurred during sign-up');
                return;
            }

            // Redirect to home page on success
            router.push('/');
            router.refresh();
        } catch (error: any) {
            console.error("Sign-up error:", error);
            setAuthError("An error occurred during sign-up. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full max-w-md border border-border bg-card shadow-xl mx-4">
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
            </CardFooter>
        </Card>
    );
}
