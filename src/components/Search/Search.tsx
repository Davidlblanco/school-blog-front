import { useMainContext } from '../../contexts/useMainContext';
import Input from '../Input/Input';

export default function Search() {
    const { search, setSearch } = useMainContext();
    return (
        <Input
            type="text"
            set={setSearch}
            value={search}
            label="search"
        ></Input>
    );
}
