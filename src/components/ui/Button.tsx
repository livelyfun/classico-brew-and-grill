import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-teal text-white hover:bg-brand-teal-dark shadow-glow hover:shadow-lg border border-transparent',
  secondary:
    'bg-brand-sage text-white hover:bg-brand-sage-dark shadow-soft border border-transparent',
  outline:
    'bg-transparent text-brand-sage border border-brand-sage/40 hover:border-brand-teal hover:text-brand-teal hover:bg-brand-teal/5',
  ghost:
    'bg-transparent text-brand-dark hover:bg-brand-mint-light/30 hover:text-brand-sage',
  white:
    'bg-white text-brand-dark hover:bg-brand-bg shadow-soft border border-brand-mint/30',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs tracking-wide gap-1.5',
  md: 'px-6 py-3 text-sm tracking-wide gap-2',
  lg: 'px-8 py-3.5 text-base tracking-wide gap-2.5',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
