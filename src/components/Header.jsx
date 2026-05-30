export default function Header() {
  return (
    <header className="navbar bg-dark text-white p-3">
      <div className="navbar-brand">
        <img src="/images/Logo_Footer.jpg" alt="Logo UNO" className="navbar-logo" />
        <h1>UNO - Sede Informática</h1>
      </div>
      <nav>
        <a href="#carreras">Carreras</a>
        <a href="#facultad">Nuestra Facultad</a>
        <a href="#contacto">Contacto</a>
        <a href="#inscripcion">Inscribite</a>
      </nav>
    </header>
  );
}
