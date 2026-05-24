import React from 'react';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'StoreLens',
    description: 'E-commerce management tool for business owners',
};

export default function RootLayout(props: { children: React.ReactNode }) {
    return React.createElement('html', { lang: 'en' }, React.createElement('body', null, props.children));
}
