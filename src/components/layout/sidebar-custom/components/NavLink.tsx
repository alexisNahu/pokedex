interface Props {
  icon: string;
  description: string;
}

function NavLink({ icon, description }: Props) {
  return (
    <div className="navLink d-flex align-items-center gap-3">
      <span className="description d-flex flex-end">{description}</span>
      <img
        src={`https://img.pokemondb.net/sprites/black-white/normal/${icon}.png`}
        alt="poke-icon"
        width={90}
        className="d-block"
      />
    </div>
  );
}

export default NavLink;
