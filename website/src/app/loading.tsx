import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="animate-spin-slow">
        <Image
          src="/icons8-volleyball-90.png"
          alt="Loading"
          width={96}
          height={96}
        />
      </div>
    </div>
  );
}