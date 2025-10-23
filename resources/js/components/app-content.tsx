import { SidebarInset } from '@/components/ui/sidebar';
import * as React from 'react';
import { Container } from '@/components/ui/container';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}

export function AppContent({
    variant = 'header',
    children,
    ...props
}: AppContentProps) {
    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

    return (
        <main className="flex h-full w-full flex-1 flex-col gap-4" {...props}>
            <Container>
                <div className="rounded-xl">{children}</div>
            </Container>
        </main>
    );
}
