"use client"

import { Button } from "@/components/ui/button"

interface TimeSlotsProps {
  onSelect: (time: string) => void
}

const AVAILABLE_TIMES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00"
]

export function TimeSlots({ onSelect }: TimeSlotsProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {AVAILABLE_TIMES.map((time) => (
        <Button
          key={time}
          variant="outline"
          className="w-full"
          onClick={() => onSelect(time)}
        >
          {time}
        </Button>
      ))}
    </div>
  )
}