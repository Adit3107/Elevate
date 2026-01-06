import type { SVGProps } from 'react';

const BasketballIcon = (props: SVGProps<SVGSVGElement>) => (
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
        <circle cx="12" cy="12" r="10" />
        <path d="M4.2 16.8c1.4 2.4 4.1 4 7.2 4s5.8-1.6 7.2-4" />
        <path d="M16.8 4.2c-1.4-2.4-4.1-4-7.2-4S3.8 1.8 2.4 4.2" />
        <path d="M12 2v20" />
        <path d="M2 12h20" />
    </svg>
);

export default BasketballIcon;
