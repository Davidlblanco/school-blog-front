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
            const finalValue = e.target.value;
            set(finalValue);
        } catch (e) {
            console.log(e);
            setError(true);
        }
    };
    return (
        <label>
            <p>
                {label}
                {required ? '*' : null}
            </p>
            <input
                type={type}
                onError={() => console.log('error')}
                placeholder={placeHolder}
                required={required}
                onChange={handleChange}
                value={value}
                disabled={disabled}
                maxLength={maxLength}
                minLength={minLength}
            ></input>
            {message ? <p className="message">{message}</p> : null}
            {errorMessage && error ? (
                <p className="errorMessage">{errorMessage}</p>
            ) : null}
        </label>
    );
}
