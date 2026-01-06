import type { SVGProps } from 'react';

const VolleyballIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M12 2a10 10 0 0 0-3.5 19.3" />
    <path d="M22 12a10 10 0 0 0-19.3-3.5" />
    <path d="M2 12a10 10 0 0 1 19.3 3.5" />
  </svg>
);

export default VolleyballIcon;
