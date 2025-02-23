"use client"

import { FieldValues } from "react-hook-form"

import { FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectFormFieldProps {
  form: FieldValues
  name: string
}

export function SelectFormField({ form, name }: SelectFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger aria-label="trip-budget">
                <SelectValue placeholder="Select your budget" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Budget">💰 Budget</SelectItem>
              <SelectItem value="Mid-range">💵 Mid-range</SelectItem>
              <SelectItem value="Luxury">💎 Luxury</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}
