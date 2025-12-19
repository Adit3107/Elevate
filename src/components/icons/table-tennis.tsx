import type { SVGProps } from 'react';

const TableTennisIcon = (props: SVGProps<SVGSVGElement>) => (
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
        <path d="M14.5 14.5L18 18" />
        <path d="M12.5 12.5L6 6" />
        <circle cx="10" cy="10" r="4" />
        <path d="M16 16l-1.5-1.5" />
        <path d="M21 21l-3-3" />
        <path d="M3 3l3 3" />
    </svg>
);

export default TableTennisIcon;
