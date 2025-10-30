import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster(props: ToasterProps) {
    return (
        <Sonner
            position="top-right"
            closeButton
            theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
            toastOptions={{
                unstyled: false,
                classNames: {
                    toast: 'group pointer-events-auto relative flex w-full items-center justify-between gap-2 overflow-hidden rounded-md border bg-background p-3 text-foreground shadow-sm',
                    title: 'text-sm font-medium',
                    description: 'text-xs text-muted-foreground',
                    actionButton:
                        'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-secondary px-2 text-xs font-medium transition-colors hover:bg-secondary/80',
                    cancelButton:
                        'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-background px-2 text-xs font-medium transition-colors hover:bg-muted',
                },
            }}
            {...props}
        />
    );
}
