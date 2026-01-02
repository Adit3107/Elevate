import VolleyballIcon from '@/components/icons/volleyball';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="animate-spin-slow">
        <VolleyballIcon className="h-24 w-24 text-primary" />
      </div>
    </div>
  );
}