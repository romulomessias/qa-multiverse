import { useState, useEffect } from 'react';
import { onNetworkStatusChange } from '../../utils/ServiceWorker';

const useIsOnline = () => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const setOnline = () => setIsOnline(true);
        const setOffline = () => setIsOnline(false);
        onNetworkStatusChange(setOnline, setOffline);
    }, []);

    return isOnline;
};

export default useIsOnline;
