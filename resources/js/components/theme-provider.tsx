import * as React from 'react';
import { initializeTheme, useAppearance } from '@/hooks/use-appearance';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { appearance } = useAppearance();

    React.useEffect(() => {
        initializeTheme();
    }, [appearance]);

    return <>{children}</>;
}
