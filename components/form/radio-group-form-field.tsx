"use client"

import { FieldValues } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface RadioGroupOption {
  label: string
  value: string
}

interface RadioGroupFormFieldProps {
  form: FieldValues
  name: string
  options: RadioGroupOption[]
}

export const options: RadioGroupOption[] = [
  { label: "Solo Trip", value: "1" },
  { label: "Couple", value: "2" },
  { label: "Family", value: "4+" },
]

export function RadioGroupFormField({
  form,
  name,
  options,
}: RadioGroupFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-3"
              aria-label="trip-size"
            >
              {options.map((option) => (
                <FormItem key={option.value}>
                  <FormLabel className="flex items-center justify-between rounded-md border-2 border-muted bg-popover px-4 py-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                    <FormControl>
                      <RadioGroupItem
                        aria-label={option.label}
                        value={option.value}
                        className="sr-only"
                      />
                    </FormControl>
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
