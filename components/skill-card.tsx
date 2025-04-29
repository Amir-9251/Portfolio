"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface SkillCardProps {
  name: string
}

export function SkillCard({ name }: SkillCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
      <Card className="border-0 bg-card/30 backdrop-blur-sm hover:shadow-md transition-shadow duration-300 h-full skill-card">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="w-16 h-16 flex items-center justify-center mb-4 bg-primary/10 rounded-full p-3">
            <Image src={`/${name}.svg`} alt={name} width={64} height={64} />
          </div>
          <h3 className="font-medium">{name}</h3>
        </CardContent>
      </Card>
    </motion.div>
  )
}
