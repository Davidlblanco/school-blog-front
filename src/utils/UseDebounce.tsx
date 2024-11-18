import { useRef } from "react"

export default function UseDebounce(func: any, delay: number) {
    //variable to store setTimeOut reference (id of timeout)
    const timeOutRef: any = useRef(null);

    function ddebounceFn(...args: any) {
        // clearing timeout 
        window.clearTimeout(timeOutRef.current)
        // asigningreference from the first variable
        timeOutRef.current =
            window.setTimeout(() => {
                func(...args)

            }, delay)
    }
    return ddebounceFn
}