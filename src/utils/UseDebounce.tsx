import { useRef } from 'react';

export default function UseDebounce(func: any, delay: number) {
    const timeOutRef: any = useRef(null);

    function ddebounceFn(...args: any) {
        window.clearTimeout(timeOutRef.current);
        timeOutRef.current = window.setTimeout(() => {
            func(...args);
        }, delay);
    }
    return ddebounceFn;
}
