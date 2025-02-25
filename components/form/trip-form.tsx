"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { defaultValues, formSchema, type FormData } from "@/types/types"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider, SliderThumb } from "@/components/ui/slider"
import { TripFormLabel } from "@/components/form/label-form-field"
import {
  options,
  RadioGroupFormField,
} from "@/components/form/radio-group-form-field"
import { SelectFormField } from "@/components/form/select-form-field"
import { SwitchFormField } from "@/components/form/switch-form-field"
import { Icons } from "@/components/icons"

export interface TripFormProps {
  isLoading: boolean;
  onSubmit: (values: FormData) => Promise<void>;
}

export function TripForm({ onSubmit, isLoading }: TripFormProps) {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              {showAdditionalFields && (
                <TripFormLabel
                  stepIndex="1"
                  labelIndex="What destinations are you considering?"
                />
              )}
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Paris, Tokyo, New York"
                    {...field}
                    onClick={() => setShowAdditionalFields(true)}
                    className="rounded-xl bg-primary text-secondary shadow-lg placeholder:text-secondary/70"
                  />

                  <Icons.input className="absolute right-2.5 top-3 size-4 text-secondary" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {showAdditionalFields && (
          <>
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <TripFormLabel
                    stepIndex="2"
                    labelIndex="How many days can you travel?"
                  />
                  <FormControl>
                    <Slider
                      id="trip-duration"
                      aria-label="Choose trip duration"
                      defaultValue={[5]}
                      max={30}
                      step={1}
                      min={1}
                      onValueChange={(value) => field.onChange(value[0])}
                      {...field}
                      value={[field.value]}
                    >
                      <SliderThumb aria-label="Trip duration" />
                    </Slider>
                  </FormControl>
                  <FormDescription className="flex flex-row-reverse">
                    📅 {field.value} days
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormItem>
              <TripFormLabel
                stepIndex="3"
                labelIndex="How many people are traveling?"
              />
              <RadioGroupFormField
                form={form}
                name="people"
                options={options}
              />
            </FormItem>
            <FormItem>
              <TripFormLabel
                stepIndex="4"
                labelIndex="What is your preferred travel style?"
              />
              <SelectFormField form={form} name="difficulty" />
            </FormItem>
            <FormItem>
              <TripFormLabel
                stepIndex="5"
                labelIndex="Any specific preferences for your trip?"
              />
              <SwitchFormField
                form={form}
                name="adventure"
                label="🚀 Adventure"
              />
              <SwitchFormField form={form} name="luxury" label="💎 Luxury" />
              <SwitchFormField form={form} name="nature" label="🌿 Nature" />
            </FormItem>
            {isLoading ? (
              <Button disabled size="lg" className="w-full font-semibold">
                <Icons.loader
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
                Generating trip plan
              </Button>
            ) : (
              <Button type="submit" size="lg" className="w-full font-semibold">
                Generate trip plan
                <Icons.generate className="ml-2 size-4" aria-hidden="true" />
              </Button>
            )}
          </>
        )}
      </form>
    </Form>
  )
}
