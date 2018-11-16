import { useEffect } from 'react';

export const useOnMount = fn => useEffect(fn, []);
