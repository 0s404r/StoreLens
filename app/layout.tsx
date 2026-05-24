import type { Metadata } from 'next';
import { createElement } from 'react';
import './globals.css';

export const metadata: Metadata = {
    title: 'StoreLens',
    description: 'Audit your e-commerce store in minutes.',
};

export default function RootLayout(props: { children: React.ReactNode }) {
    return createElement(
          'html',
      { lang: 'ar', dir: 'rtl' },
          createElement(
                  'body',
            { className: 'bg-neutral-950 text-neutral-100 antialiased min-h-screen' },
                  props.children
                )
        );
}
