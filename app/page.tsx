import React from 'react';

const stats = [
  { label: 'Total Sales', value: '$24,580', change: '+12.5%' },
  { label: 'Orders', value: '1,284', change: '+8.2%' },
  { label: 'Customers', value: '892', change: '+15.3%' },
  { label: 'Products', value: '156', change: '+2.1%' },
  ];

export default function Home() {
    return React.createElement('main', { className: 'container' },
                                   React.createElement('header', { className: 'header' },
                                                             React.createElement('h1', null, 'StoreLens'),
                                                             React.createElement('p', { className: 'subtitle' }, 'E-commerce Management Dashboard')
                                                           ),
                                   React.createElement('section', { className: 'stats-grid' },
                                                             stats.map((s, i) => React.createElement('div', { key: i, className: 'stat-card' },
                                                                                                             React.createElement('span', { className: 'stat-label' }, s.label),
                                                                                                             React.createElement('span', { className: 'stat-value' }, s.value),
                                                                                                             React.createElement('span', { className: 'stat-change' }, s.change)
                                                                                                           ))
                                                           ),
                                   React.createElement('section', { className: 'features' },
                                                             React.createElement('h2', null, 'Features'),
                                                             React.createElement('ul', null,
                                                                                         React.createElement('li', null, 'Real-time sales analytics'),
                                                                                         React.createElement('li', null, 'Inventory management'),
                                                                                         React.createElement('li', null, 'Customer insights'),
                                                                                         React.createElement('li', null, 'Order tracking')
                                                                                       )
                                                           )
                                 );
}
