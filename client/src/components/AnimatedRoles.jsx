import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedRoles({ roles = [] }) {
  const list = roles.length ? roles : ["Developer"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % list.length), 2400);
    return () => clearInterval(id);
  }, [list.length]);

  return (
    <div className="h-8 overflow-hidden text-accent">
      <AnimatePresence mode="wait">
        <motion.p
          key={list[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="font-medium"
        >
          {list[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
