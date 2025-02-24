import { FormLabel } from "@/components/ui/form"

interface TripFormLabelProps {
  stepIndex: string
  labelIndex: string
}

export function TripFormLabel({ stepIndex, labelIndex }: TripFormLabelProps) {
  return (
    <FormLabel className="font-semibold">
      <span className="mr-2 rounded-full bg-primary px-2 font-bold text-background">
        {stepIndex}
      </span>
      {labelIndex}
    </FormLabel>
  )
}
