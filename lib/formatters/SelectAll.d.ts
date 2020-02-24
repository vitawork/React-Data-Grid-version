import React from 'react';
export interface SelectAllProps {
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}
export declare const SelectAll: React.ForwardRefExoticComponent<SelectAllProps & React.RefAttributes<HTMLInputElement>>;
