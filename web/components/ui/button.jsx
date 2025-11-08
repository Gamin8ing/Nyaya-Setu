import clsx from "clsx";

export function Button({ className, variant = "accent", size = "md", ...props }) {
  const base = "btn";
  const variants = {
    accent: "btn-accent",
    primary: "btn-primary",
    muted: "btn-muted",
    ghost: "btn-ghost",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };
  return <button className={clsx(base, variants[variant], sizes[size], className)} {...props} />;
}
