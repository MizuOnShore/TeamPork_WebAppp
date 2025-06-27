function Button({ children, className, ...props }) {
  return (
    <button className={`rounded-md px-4 py-2 font-medium transition-colors ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
