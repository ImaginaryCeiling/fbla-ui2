import { TrendingUp } from "lucide-react"
import { Progress } from "./ui/progress"

interface Skill {
  id: number
  name: string
  progress: number
  relevantJobs: number
}

interface SkillDevelopmentProps {
  skills: Skill[]
}

export function SkillDevelopment({ skills }: SkillDevelopmentProps) {
  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-medium text-gray-800">Skills to Develop</h2>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{skill.name}</span>
              <span className="text-xs text-gray-500">{skill.progress}%</span>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={skill.progress} className="h-2" />
              <span className="flex items-center text-xs text-gray-500">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                {skill.relevantJobs}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

