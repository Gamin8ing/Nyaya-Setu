import clsx from "clsx";

export function Card({ className, children, padding = "p-8", ...props }) {
  // padding can be overridden via className if needed
  return (
    <div className={clsx("card", padding, className)} {...props}>
      {children}
    </div>
  );
}
