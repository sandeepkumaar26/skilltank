"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  id?: string
  label?: string
  placeholder?: string
  value?: Date
  onChange?: (date: Date | undefined) => void
  className?: string
  required?: boolean
}

export function DatePicker({
  id,
  label,
  placeholder = "Select date",
  value,
  onChange,
  className,
  required = false
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <Label htmlFor={id} className="text-sm font-medium text-[#1D2939]">
          {label} {required && "*"}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            className={cn(
              "h-11 w-full justify-between font-normal rounded-lg border-[#D0D5DD]",
              !value && "text-muted-foreground"
            )}
          >
            {value ? value.toLocaleDateString() : placeholder}
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange?.(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}