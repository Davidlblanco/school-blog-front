import { ChangeEvent, useState } from 'react';
interface InputProps {
    label: string;
    type: string;
    value: any;
    set: React.Dispatch<React.SetStateAction<any>>;
    required?: boolean;
    message?: string;
    errorMessage?: string;
    placeHolder?: string;
    disabled?: boolean;
    minLength?: number;
    maxLength?: number;
    onlyNumbers?: boolean;
}

export default function Input(props: InputProps) {
    const {
        label,
        type,
        message,
        errorMessage,
        placeHolder,
        required,
        set,
        value,
        disabled,
        maxLength,
        minLength,
        // onlyNumbers,
    } = props;
    const [error, setError] = useState(false);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            let finalValue: any = e.target.value;
            if (type === 'checkbox') {
                finalValue = e.target.checked;
            }
            set(finalValue);
        } catch (e) {
            console.log(e);
            setError(true);
        }
    };
    return (
        <label className="block mb-4">
            {label !== '' && (
                <p className="mb-2 text-sm font-medium text-gray-700">
                    {label}
                    {required ? '*' : null}
                </p>
            )}
            <input
                type={type}
                onError={() => console.log('error')}
                placeholder={placeHolder}
                required={required}
                onChange={handleChange}
                value={value}
                checked={value}
                disabled={disabled}
                maxLength={maxLength}
                minLength={minLength}
                className={`${
                    type != 'checkbox' ? 'w-full' : ''
                } px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {message ? (
                <p className="mt-2 text-sm text-gray-500">{message}</p>
            ) : null}
            {errorMessage && error ? (
                <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            ) : null}
        </label>
    );
}
