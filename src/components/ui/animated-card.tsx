
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnimatedCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const AnimatedCard = ({ icon, title, description, delay = 0 }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      <Card className="h-full border-jobfix-100 bg-gradient-to-br from-white to-jobfix-50/30 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <motion.div 
            className="mb-4 w-16 h-16 rounded-full bg-jobfix-50 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
          </motion.div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;
