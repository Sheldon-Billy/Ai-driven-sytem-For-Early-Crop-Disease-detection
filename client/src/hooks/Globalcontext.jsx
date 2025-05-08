import { createContext, useContext, useEffect, useState } from "react";

const Globalstate = createContext();
export const Globalcontext = ({ children }) => {
  const [screenSize, setscreenSize] = useState({
    HEIGHT: window.innerHeight,
    WIDTH: window.innerWidth,
  });
  console.log("WIDTH: ", screenSize.WIDTH, "HEIGHT: ", screenSize.HEIGHT);

  useEffect(() => {
    const resizeScreen = () =>
      setscreenSize({
        HEIGHT: window.innerHeight,
        WIDTH: window.innerWidth,
      });
    window.addEventListener("resize", resizeScreen);

    return () => {
      window.removeEventListener("resize", resizeScreen);
    };
  }, []);
  return (
    <Globalstate.Provider value={{ screenSize }}>
      {children}
    </Globalstate.Provider>
  );
};

export const useScreenResize = () => {
  const {
    screenSize: { WIDTH, HEIGHT },
  } = useContext(Globalstate);
  return [WIDTH, HEIGHT];
};
