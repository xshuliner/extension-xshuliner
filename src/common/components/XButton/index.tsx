// import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type React from 'react';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[inherit] disabled:active:scale-100 disabled:active:shadow-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-95 active:shadow-inner",
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 disabled:hover:bg-primary disabled:active:bg-primary',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 active:bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 dark:active:bg-destructive/50 disabled:hover:bg-destructive disabled:active:bg-destructive dark:disabled:hover:bg-destructive/60 dark:disabled:active:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground active:bg-accent/80 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 dark:active:bg-input/40 disabled:hover:bg-background disabled:active:bg-background disabled:hover:text-foreground disabled:active:text-foreground dark:disabled:hover:bg-input/30 dark:disabled:active:bg-input/30',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70 disabled:hover:bg-secondary disabled:active:bg-secondary',
        accent:
          'bg-accent text-accent-foreground hover:bg-accent/80 active:bg-accent/70 disabled:hover:bg-accent disabled:active:bg-accent',
        muted:
          'bg-muted text-muted-foreground hover:bg-muted/80 active:bg-muted/70 disabled:hover:bg-muted disabled:active:bg-muted',
        ghost:
          'bg-transparent text-foreground hover:bg-accent active:bg-accent/80 disabled:hover:bg-transparent disabled:active:bg-transparent',
        link: 'text-primary underline-offset-4 hover:underline active:text-primary/80 disabled:hover:no-underline disabled:active:text-primary',
        gradient:
          'group/btn relative overflow-hidden bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-base font-semibold text-white shadow-lg shadow-blue-500/30 duration-300 hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98] active:shadow-lg active:shadow-blue-500/30 disabled:hover:scale-100 disabled:active:shadow-lg',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        'text-xs': 'text-xs px-0.5',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

function XButton({
  className,
  variant,
  size,
  asChild = false,
  onClick,
  disabled,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  const content = (
    <>
      {children}
      {variant === 'gradient' && (
        <div className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full' />
      )}
    </>
  );

  return (
    <Comp
      data-slot='button'
      className={buttonVariants({ variant, size, className })}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {content}
    </Comp>
  );
}

export { buttonVariants, XButton };
