import { ReactNode } from "react";
import "./index.scss";

function Content({ children }: { children: ReactNode }) {
  return <div className="ic-content">{children}</div>;
}

export default Content;
