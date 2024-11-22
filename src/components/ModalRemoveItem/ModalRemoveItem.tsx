import { useMainContext } from '../../contexts/useMainContext';
import { apiUrl } from '../../utils/variables';
interface ModalProps {
    id: string;
    type: 'article' | 'user';
    onDeleteSuccess: () => void;
}
export default function ModalRemoveItem(props: ModalProps) {
    const { id, type, onDeleteSuccess } = props;
    const {
        openModalId,
        setOpenModalId,
        jwtToken,
        setContextSuccess,
        setContextError,
    } = useMainContext();
    async function handleDelete() {
        if (!jwtToken) return;
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${jwtToken}`);

        try {
            const response = await fetch(`${apiUrl}/${type}s/${id}`, {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow',
            });
            console.log(1);
            if (!response.ok) {
                const error = await response.json();
                setContextError(error.message);
                console.error('ERROR:', error);
                return;
            }
            const result = await response.text();
            setContextSuccess(result);
            setOpenModalId('');
            onDeleteSuccess();
        } catch (error) {
            setContextError('Failed to delete item');
            console.error('ERROR:', error);
        }
    }

    if (openModalId !== id) return null;
    return (
        <div>
            <div>
                <p>{`Are you shure you want to remove this ${type}?`}</p>
                <button onClick={handleDelete}>yes</button>
                <button onClick={() => setOpenModalId('')}>no</button>
            </div>
        </div>
    );
}
