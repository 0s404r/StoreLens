import { createElement as h } from 'react';

const t = {
    badge: 'StoreLens',
    brand: 'StoreLens',
    tagline: 'E-commerce Audit Tool',
    hero: 'Find out exactly where your store is losing money, and how to fix it.',
    cta: 'Start Free Scan',
    plan1Name: 'Free Scan',
    plan1Price: 'Free',
    plan1Desc: 'One scan for new visitors. See where your store stands before you pay.',
    plan2Name: 'Single Scan',
    plan2Price: '$2',
    plan2Desc: 'Extra scan to audit another store or re-check after improvements.',
    plan3Name: 'Pack of 10',
    plan3Price: '$15',
    plan3Desc: 'Best value. 10 scans for $1.50 each. For media buyers and agencies.',
    dfyTitle: 'Need help fixing your store?',
    dfyDesc: 'Our team implements the fixes for you. Message us on WhatsApp and we will send a quotation within an hour.',
    dfyCta: 'Chat on WhatsApp',
    footer: 'StoreLens (c) 2026',
};

const WHATSAPP_URL = 'https://wa.me/201000000000';

function Card(props: { name: string; price: string; desc: string }) {
    return h(
          'div',
      { className: 'rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 flex flex-col gap-3' },
          h('div', { className: 'text-sm text-neutral-400' }, props.name),
          h('div', { className: 'text-3xl font-bold text-white' }, props.price),
          h('p', { className: 'text-sm text-neutral-300 leading-relaxed' }, props.desc)
        );
}

export default function HomePage() {
    return h(
          'main',
      { className: 'mx-auto max-w-5xl px-6 py-16 md:py-24' },
          h(
                  'section',
            { className: 'text-center flex flex-col items-center gap-6' },
                  h('span', { className: 'inline-flex items-center rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs text-neutral-300' }, t.tagline),
                  h('h1', { className: 'text-4xl md:text-6xl font-bold tracking-tight text-white' }, t.brand),
                  h('p', { className: 'text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed' }, t.hero),
                  h('a', { href: WHATSAPP_URL, target: '_blank', rel: 'noopener noreferrer', className: 'mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-base font-semibold text-neutral-950 hover:bg-emerald-400 transition' }, t.cta)
                ),
          h(
                  'section',
            { className: 'mt-20 grid gap-4 md:grid-cols-3' },
                  h(Card, { key: 'p1', name: t.plan1Name, price: t.plan1Price, desc: t.plan1Desc }),
                  h(Card, { key: 'p2', name: t.plan2Name, price: t.plan2Price, desc: t.plan2Desc }),
                  h(Card, { key: 'p3', name: t.plan3Name, price: t.plan3Price, desc: t.plan3Desc })
                ),
          h(
                  'section',
            { className: 'mt-20 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 text-center' },
                  h('h2', { className: 'text-2xl font-bold text-white mb-3' }, t.dfyTitle),
                  h('p', { className: 'text-neutral-300 mb-5' }, t.dfyDesc),
                  h('a', { href: WHATSAPP_URL, target: '_blank', rel: 'noopener noreferrer', className: 'inline-flex items-center gap-2 rounded-xl border border-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/10 transition' }, t.dfyCta)
                ),
          h('footer', { className: 'mt-20 text-center text-xs text-neutral-500' }, t.footer)
        );
}
