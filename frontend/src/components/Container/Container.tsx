import type { ReactNode } from "react";
import "./Container.scss";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className="container">{children}</div>;
}
