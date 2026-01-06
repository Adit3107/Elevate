import type { SVGProps } from 'react';

const CarromIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="6" cy="6" r="1" />
        <circle cx="18" cy="6" r="1" />
        <circle cx="6" cy="18" r="1" />
        <circle cx="18" cy="18" r="1" />
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="2" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />
    </svg>
);

export default CarromIcon;
