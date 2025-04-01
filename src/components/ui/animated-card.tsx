
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  delay?: number;
  hoverEffect?: boolean;
}

const AnimatedCard = ({ 
  children, 
  className, 
  icon, 
  title, 
  description, 
  delay = 0,
  hoverEffect = true
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={hoverEffect ? { y: -10, scale: 1.02 } : undefined}
      className={className}
    >
      {title && description ? (
        <Card className={cn(
          "h-full border-jobfix-100 bg-white shadow-sm hover:shadow-md transition-all duration-300",
          hoverEffect && "hover:border-jobfix-200"
        )}>
          <CardHeader className="pb-2">
            {icon && (
              <motion.div 
                className="mb-4 w-12 h-12 rounded-lg bg-jobfix-50 flex items-center justify-center text-jobfix-600"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {icon}
              </motion.div>
            )}
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      ) : (
        children
      )}
    </motion.div>
  );
};

export default AnimatedCard;
