import konteks_redux_ttt from "@/hooks";
import {Provider} from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import "@/styles/globals.css";
import type { AppProps } from "next/app";



export default function App({ Component, pageProps, router }: AppProps) {
  return(
  <AnimatePresence mode="wait">
      <motion.div
        key={router.route}
        initial={{ opacity: 0, x: -50}}
        animate={{ opacity: 1, x: 0}}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        >

      <Provider store={konteks_redux_ttt}>
      <Component {...pageProps} />
      </Provider>

    </motion.div>
  </AnimatePresence>
  ) 
  
}
