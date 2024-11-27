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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <p className="mb-4">{`Are you sure you want to remove this ${type}?`}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => setOpenModalId('')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
