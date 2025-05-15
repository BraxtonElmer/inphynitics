export function InfiniteLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M25 10C17 10 12 15 12 20C12 25 17 30 25 30C33 30 38 25 38 20C38 15 33 10 25 10Z"
        stroke="#F8C537"
        strokeWidth="2"
      />
      <circle cx="33" cy="20" r="3" fill="#F8C537" />
      <path d="M10 20C10 13 15 8 20 8C25 8 30 13 30 20" stroke="#F8C537" strokeWidth="2" />
      <path d="M40 20C40 27 35 32 30 32C25 32 20 27 20 20" stroke="#F8C537" strokeWidth="2" />
    </svg>
  );
}
