import { Bot } from 'lucide-react';
import AnalysisForm from './analysis-form';

export default function AnalyzePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="flex flex-col items-center text-center mb-12">
        <Bot className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold tracking-tight text-primary sm:text-5xl">
          AI Volleyball Analyst
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Get expert analysis on any volleyball play. Describe the situation, the play, and the rules, and our AI will explain if an advantage was gained, in simple terms.
        </p>
      </div>

      <AnalysisForm />
    </div>
  );
}
