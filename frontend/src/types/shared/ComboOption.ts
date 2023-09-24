export interface ComboOption<TValue = string> {
    value: TValue;
    label: string;
}

export interface TreeComboOption<TValue = string> extends ComboOption<TValue> {
    children: Array<TreeComboOption<TValue>>;
}

export interface ComboOptionWithKey<TValue = string> {
    key: TValue;
    label: string;
}
