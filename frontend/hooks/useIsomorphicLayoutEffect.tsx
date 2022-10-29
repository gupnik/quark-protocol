import { useLayoutEffect, useEffect } from 'react';

/* istanbul ignore next */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
