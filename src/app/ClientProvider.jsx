"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { createContext, useEffect, useRef, useState } from "react";
import Store from "../store/userStore";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useLocalStorage from "use-local-storage";
import useResponsive from "@/hooks/useResponsive";
import { usePathname } from "next/navigation";
import Loader from "@/components/Loader";
import { ReactLenis } from "lenis/react";
import Nav from "@/components/Nav";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const UserContext = createContext({});

const userStore = new Store();
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function ClientProvider({ children }) {
  const lenisRef = useRef();
  const [cart, setCart] = useLocalStorage("cart", []);
  const { isMobile } = useResponsive();
  const [loaded, setLoaded] = useState(false);
  const path = usePathname();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userStore.checkAuth().finally(() => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const update = (time) => lenisRef.current?.lenis?.raf(time * 1000);
      gsap.ticker.add(update);
      return () => gsap.ticker.remove(update);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      ScrollTrigger.clearScrollMemory("manual");
      ScrollTrigger.config({ ignoreMobileResize: true });
      return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    } else history.scrollRestoration = "manual";
  }, [isMobile]);

  if (!loaded) return <Loader />;

  const handleAnimationComplete = () => {
    setTimeout(() => {
      if (!isMobile) lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }, 50);
  };

  return (
    <UserContext.Provider value={{ userStore }}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <>
          {!isMobile ? (
            <ReactLenis
              root
              ref={lenisRef}
              options={{
                duration: 2,
                easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
                direction: "vertical",
                gestureDirection: "vertical",
                smooth: true,
                smoothTouch: true,
                touchMultiplier: 2,
                autoRaf: false,
                prevent: (node) => node.id === "modal",
              }}
            >
              <Nav cart={cart} setCart={setCart} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  onAnimationComplete={handleAnimationComplete}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </ReactLenis>
          ) : (
            <>
              <Nav cart={cart} setCart={setCart} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  onAnimationComplete={handleAnimationComplete}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </>
          )}

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
            hideProgressBar
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </>
      </GoogleOAuthProvider>
    </UserContext.Provider>
  );
}
