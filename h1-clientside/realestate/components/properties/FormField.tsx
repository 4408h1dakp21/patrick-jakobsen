import React from 'react'
import { Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { PropertyFormData } from '@/types'

// FormField-komponenten til genbrugelig formularfelt-rendering
export const FormField: React.FC<{
    name: keyof PropertyFormData
    label: string
    control: any
    errors: any
    type?: string
    as?: 'input' | 'select' | 'textarea'
    options?: { value: string; label: string }[]
}> = ({
    name,
    label,
    control,
    errors,
    type = 'text',
    as = 'input',
    options = [],
}) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    switch (as) {
                        case 'select':
                            return (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={`Vælg ${label.toLowerCase()}`}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {options.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )
                        case 'textarea':
                            return <Textarea {...field} />
                        default:
                            return (
                                <Input
                                    {...field}
                                    type={type}
                                    onChange={(e) =>
                                        field.onChange(
                                            type === 'number'
                                                ? parseFloat(e.target.value)
                                                : e.target.value
                                        )
                                    }
                                />
                            )
                    }
                }}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name].message}</p>
            )}
        </div>
    )
}
