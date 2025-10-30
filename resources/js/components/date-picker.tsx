import * as React from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DatePickerProps {
    date?: Date | null;
    onChange?: (date: Date | null) => void;
    placeholder?: string;
}

export function DatePicker({ date, onChange, placeholder = 'Pick a date' }: DatePickerProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<Date | null>(date ?? null);

    React.useEffect(() => setValue(date ?? null), [date]);

    const handleSelect = (d?: Date) => {
        const next = d ?? null;
        setValue(next);
        onChange?.(next);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn('w-[240px] justify-start text-left font-normal', !value && 'text-muted-foreground')}
                >
                    {value ? format(value, 'PPP') : placeholder}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={value ?? undefined} onSelect={handleSelect} initialFocus />
            </PopoverContent>
        </Popover>
    );
}
