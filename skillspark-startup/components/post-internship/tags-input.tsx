"use client"

import { useState, KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface TagsInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
}

export function TagsInput({ value, onChange, placeholder }: TagsInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()])
      }
      setInputValue("")
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="min-h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-black focus-within:ring-opacity-20">
      <div className="flex flex-wrap gap-2">
        {value.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="bg-gray-100 text-black border-gray-300 border-opacity-20 rounded-full px-3 py-1 text-sm flex items-center gap-1"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-1 hover:bg-black hover:bg-opacity-20 rounded-full p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-32 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
        />
      </div>
    </div>
  )
}