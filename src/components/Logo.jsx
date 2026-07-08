// Logo oficial FAMEGO (marca "FM" naranja + gris, fondo transparente).
export default function Logo({ className = 'h-9 w-auto' }) {
  return (
    <img
      src="/images/logo-famego.png"
      alt="FAMEGO Ingeniería y Construcción"
      className={className}
      width="120"
      height="47"
    />
  )
}
