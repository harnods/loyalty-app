const BASE = 'https://www.figma.com/api/mcp/asset';

export const IMAGES = {
  logo:         `${BASE}/a08efa6a-98eb-44bf-b65f-4c09657a2a26`,
  avatar:       `${BASE}/02c803c3-f29c-4b35-9ae3-96caa1116c27`,
  crown:        `${BASE}/5455cf0e-a335-4729-95d0-350e0b11fab9`,
  heroCoins:    `${BASE}/5cb3fc8e-fa1e-4862-8c39-31b5fbcb0c20`,
  iconEarn:     `${BASE}/69511a8c-4027-4b74-a4a9-e29dcb5db48c`,
  iconRedeem:   `${BASE}/7b687360-966b-4f6c-93b9-62b461949b9c`,
  iconHistory:  `${BASE}/007479f7-43a8-4be2-936e-d696e709ed83`,
  arrow:        `${BASE}/bc6b9046-4cb1-470b-801e-e976cf8a59c8`,
  mekariQontak: `${BASE}/1ceeadf7-c5fc-4956-b824-f38abd737d04`,
};

export const USER = {
  name: 'Dona',
  points: '1,250',
  tier: 'Platinum',
  lastUpdated: 'Last updated just now',
};

export const QUICK_ACTIONS = [
  { id: 'earn',    color: 'blue',   icon: IMAGES.iconEarn,    label: ['Earn', 'points']    },
  { id: 'redeem',  color: 'orange', icon: IMAGES.iconRedeem,  label: ['Redeem', 'rewards'] },
  { id: 'history', color: 'teal',   icon: IMAGES.iconHistory, label: ['Points', 'history'] },
];

export const VOUCHERS = [
  {
    id: 'vc1',
    name: 'Free drip bag coffee',
    code: 'VC08282147Q',
    expiry: 'Exp. 15 May 2026',
    thumb: `${BASE}/f04d9a9e-98ea-451e-890b-ffef2036fcca`,
    thumbStyle: { width: '100%', height: '133.51%', top: '-30.59%', left: '0' },
  },
  {
    id: 'vc2',
    name: 'Enjoy barista choice coffee',
    code: 'UPG-OAT-003',
    expiry: 'Exp. 15 Jun 2026',
    thumb: `${BASE}/76f20b23-85e7-44f4-b2af-6aadc6556760`,
    thumbStyle: { width: '118.31%', height: '157.14%', top: '-38.39%', left: '-0.23%' },
  },
];
