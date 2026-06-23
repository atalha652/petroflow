export default function AuthFormHeader({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="m-0 text-2xl font-semibold tracking-tight text-fg sm:text-3xl lg:text-4xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="text-sm leading-relaxed text-fg-muted">{subtitle}</p>
      ) : null}
    </div>
  )
}
