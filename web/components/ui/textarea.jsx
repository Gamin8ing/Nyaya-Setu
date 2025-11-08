import clsx from "clsx";

export function Textarea({ className, ...props }) {
  return <textarea className={clsx("input", className)} {...props} />;
}
