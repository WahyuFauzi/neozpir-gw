interface Plan {
  name: string;
  price: { monthly: number } | string;
  features: string[];
}

const plans: Plan[] = [
  {
    name: 'Basic',
    price: {
      monthly: 25,
    },
    features: [
      'eCommerce Website',
      'Unlimited Products',
      '2 Staff Accounts',
      '2.9% + 30¢ transaction fee',
    ],
  },
  {
    name: 'Shopify',
    price: {
      monthly: 65,
    },
    features: [
      'Professional Reports',
      'Gift Cards',
      '5 Staff Accounts',
      '2.6% + 30¢ transaction fee',
    ],
  },
  {
    name: 'Advanced',
    price: {
      monthly: 399,
    },
    features: [
      'Advanced Reporting',
      'Lower Transaction Fees',
      '15 Staff Accounts',
      '2.4% + 30¢ transaction fee',
    ],
  },
  {
    name: 'Plus',
    price: 'Contact Our Team',
    features: ['Everything in Advanced with additional features according to client needs'],
  },
];

export const onRequestGet = async () => {
  return new Response(JSON.stringify(plans), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
