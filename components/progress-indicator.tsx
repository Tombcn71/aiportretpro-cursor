"use client"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps?: number
}

export function ProgressIndicator({ currentStep, totalSteps = 3 }: ProgressIndicatorProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-6 md:mb-8">
      <div className="flex items-center gap-2 justify-center">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1
          const isCompleted = step <= currentStep
          
          return (
            <div
              key={step}
              className={`h-2 w-16 rounded-full transition-colors ${
                isCompleted ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}

