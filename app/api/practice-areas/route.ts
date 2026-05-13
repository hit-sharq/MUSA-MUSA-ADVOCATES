import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Shield, Target, Eye, Heart, Award, Users, Clock, Globe, Briefcase, Building2, Scale, Map } from "lucide-react"

export async function GET() {
  try {
    const practiceAreas = await prisma.practiceArea.findMany({
      orderBy: { order: "asc" },
    })
    
    // Map string icons to actual icon components
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      Shield: Shield,
      Target: Target,
      Eye: Eye,
      Heart: Heart,
      Award: Award,
      Users: Users,
      Clock: Clock,
      Globe: Globe,
      Briefcase: Briefcase,
      Building2: Building2,
      Scale: Scale,
      Map: Map,
    };

    const mappedPracticeAreas = practiceAreas.map(area => ({
      ...area,
      icon: area.icon ? iconMap[area.icon] || null : null
    }));

    return NextResponse.json(mappedPracticeAreas);
  } catch (error) {
    console.error("Error fetching practice areas:", error)
    return NextResponse.json({ error: "Failed to fetch practice areas" }, { status: 500 })
  }
}