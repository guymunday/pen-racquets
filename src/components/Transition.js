import React from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const Transition = ({ children }) => {
  const ref = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, [location.pathname]);

  return <div ref={ref}>{children}</div>;
};

export default Transition;
