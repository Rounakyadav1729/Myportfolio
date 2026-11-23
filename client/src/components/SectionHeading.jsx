export default function SectionHeading({ kicker, title, description }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">{kicker}</p>
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-mute">{description}</p> : null}
    </div>
  );
}
