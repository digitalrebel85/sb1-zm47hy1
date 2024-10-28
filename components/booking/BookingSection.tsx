"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TimeSlots } from "@/components/booking/TimeSlots"
import { BookingForm } from "@/components/booking/BookingForm"
import type { Advisor } from "@/lib/types"

interface BookingSectionProps {
  advisor: Advisor
}

export function BookingSection({ advisor }: BookingSectionProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [step, setStep] = useState<"date" | "time" | "form">("date")

  const handleDateSelect = (selected: Date | undefined) => {
    setDate(selected)
    if (selected) {
      setStep("time")
    }
  }

  const handleTimeSelect = (selected: string) => {
    setTime(selected)
    setStep("form")
  }

  const handleBack = () => {
    if (step === "form") {
      setStep("time")
      setTime(undefined)
    } else if (step === "time") {
      setStep("date")
      setDate(undefined)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book a Consultation</CardTitle>
      </CardHeader>
      <CardContent>
        {step === "date" && (
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
        )}

        {step === "time" && date && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {format(date, "EEEE, MMMM do")}
              </p>
              <Button variant="ghost" size="sm" onClick={handleBack}>
                Change Date
              </Button>
            </div>
            <TimeSlots onSelect={handleTimeSelect} />
          </div>
        )}

        {step === "form" && date && time && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {format(date, "EEEE, MMMM do")}
                </p>
                <p className="text-sm font-medium">{time}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleBack}>
                Change Time
              </Button>
            </div>
            <BookingForm
              advisor={advisor}
              date={date}
              time={time}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}