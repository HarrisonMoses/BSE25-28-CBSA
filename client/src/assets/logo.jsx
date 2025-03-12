const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#5046E5" />
      <path d="M7 12H10V17H7V12Z" fill="white" />
      <path d="M14 7H17V17H14V7Z" fill="white" />
      <path d="M7 7H10V10H7V7Z" fill="white" />
    </svg>
  )
}

export default Logo

