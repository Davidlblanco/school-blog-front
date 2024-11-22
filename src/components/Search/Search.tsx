import Input from '../Input/Input';
interface SearchProps {
    value: string;
    set: React.Dispatch<React.SetStateAction<string>>;
}
export default function Search(props: SearchProps) {
    const { value, set } = props;
    return <Input type="text" set={set} value={value} label="search"></Input>;
}