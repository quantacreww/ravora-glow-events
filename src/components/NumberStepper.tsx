import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
  id?: string;
};

export default function NumberStepper({ value, onChange, min = 0, max = Number.MAX_SAFE_INTEGER, step = 1, id }: Props) {
  const clamp = (n: number) => Math.max(min, Math.min(max, n));
  const set = (n: number) => onChange(clamp(n));
  return (
    <div className="flex items-stretch gap-2">
      <Button
        type="button"
        variant="outline"
        className="h-10 w-10 rounded-full p-0 hover:glow-pink"
        onClick={() => set(value - step)}
        aria-label="decrement"
        disabled={value <= min}
      >
        <Minus className="h-5 w-5" />
      </Button>
      <Input
        id={id}
        type="number"
        className="w-24 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => set(parseInt(e.target.value || "0", 10))}
      />
      <Button
        type="button"
        variant="outline"
        className="h-10 w-10 rounded-full p-0 hover:glow-pink"
        onClick={() => set(value + step)}
        aria-label="increment"
        disabled={value >= max}
      >
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  );
}
