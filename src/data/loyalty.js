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
  chevronLeft:  `${BASE}/e219ddc3-67de-42c2-a472-0174a1e2401d`,
  warning:      `${BASE}/5a22ace1-a8f2-48d8-9722-c85ee71af4fd`,
  searchIcon:     `${BASE}/36988dd8-84fa-41dc-a49a-2f2230a2c859`,
  rewardDripBag:  `${BASE}/6581378c-d56a-4928-b699-93c325aff99a`,
  rewardOnigiri:  `${BASE}/46823361-ec71-4aba-a4d3-8fc0a05ff901`,
  rewardDiscount: `${BASE}/33337a4d-94bf-4f89-a858-7d33823e4865`,
  rewardToteBag:  `${BASE}/6d046049-b9aa-4d50-a5e6-a4fd3abcc2f5`,
  rewardBento:    `${BASE}/3f01bddc-ca49-4140-9577-68eed5c7156e`,
  rewardPourOver: `${BASE}/3fd97d2b-b766-4077-b1ed-658de263a536`,
  closeIcon:      `${BASE}/bd9447fa-7061-4e83-a26c-444a3a499ffa`,
  doneIcon:       `${BASE}/0173bd47-7137-4b66-a0eb-488523306669`,
};

export const USER = {
  name: 'Dona',
  points: '1,250',
  tier: 'Platinum',
  memberId: 'MC-10090',
  memberSince: '12 Jan 2026',
};

export const QUICK_ACTIONS = [
  { id: 'earn',    color: 'blue',   icon: IMAGES.iconEarn,    label: ['Earn', 'points'],    href: '/earn-points' },
  { id: 'redeem',  color: 'orange', icon: IMAGES.iconRedeem,  label: ['Redeem', 'rewards'], href: '/redeem-rewards' },
  { id: 'history', color: 'teal',   icon: IMAGES.iconHistory, label: ['Points', 'history'], href: '/points-history' },
];

export const EARN_POINTS = {
  hero: {
    title: 'Earn points with every purchase',
    description: 'No complicated rules. Buy, get points.\nSpend Rp 10,000 = earn 10 points.',
  },
  sections: [
    {
      id: 'how-it-works',
      title: 'How it works',
      steps: [
        { id: 1, parts: [{ bold: true, text: 'At checkout' }, { bold: false, text: ', tell us your registered phone number or member ID' }] },
        { id: 2, parts: [{ bold: true, text: 'We track it' }, { bold: false, text: ', points automatically add to your account' }] },
        { id: 3, parts: [{ bold: true, text: 'Works everywhere' }, { bold: false, text: ', online purchase? Offline at the cafe? Both count' }] },
      ],
    },
    {
      id: 'redeem',
      title: 'Redeem points for rewards',
      intro: "Once you've got enough points, turn them into vouchers. Here's the flow:",
      steps: [
        { id: 1, parts: [{ bold: false, text: 'Go to Rewards section' }] },
        { id: 2, parts: [{ bold: false, text: 'Pick a voucher' }] },
        { id: 3, parts: [{ bold: false, text: 'Get your unique code' }] },
        { id: 4, parts: [{ bold: false, text: 'Show the code to our barista at checkout' }] },
      ],
      warning: [
        { bold: true, text: 'Vouchers expire 30 days after you redeem them.' },
        { bold: false, text: ' Use them before the clock runs out.' },
      ],
    },
  ],
};

export const POINTS_HISTORY = {
  totalPoints: '1,250 pts',
  groups: [
    {
      id: 'apr-2026',
      month: 'April 2026',
      transactions: [
        { id: 1, title: 'In-store purchase',            date: '24 Apr, 14:22', location: 'Kemang Square', points: '+85'    },
        { id: 2, title: 'Online order #A-44921',         date: '22 Apr, 10:30', location: 'Website',       points: '+120'   },
        { id: 3, title: 'Redeemed: Free drip bag coffee',date: '19 Apr, 17:45', location: null,            points: '-45'    },
        { id: 4, title: 'Welcome bonus',                 date: '19 Apr, 17:30', location: null,            points: '+1,000' },
      ],
    },
  ],
};

export const VOUCHERS = [
  {
    id: 'vc1',
    name: 'Free drip bag coffee',
    code: 'VC08282147Q',
    expiry: 'Exp. 15 May 2026',
    thumb: `${BASE}/f04d9a9e-98ea-451e-890b-ffef2036fcca`,
    thumbStyle: { width: '100%', height: '133.51%', top: '-30.59%', left: '0' },
    status: 'Active',
    cost: '45pts',
    redeemedDate: '19 Apr 2026, 17:45',
  },
  {
    id: 'vc2',
    name: 'Enjoy barista choice coffee',
    code: 'UPG-OAT-003',
    expiry: 'Exp. 15 Jun 2026',
    thumb: `${BASE}/76f20b23-85e7-44f4-b2af-6aadc6556760`,
    thumbStyle: { width: '118.31%', height: '157.14%', top: '-38.39%', left: '-0.23%' },
    status: 'Active',
    cost: '80pts',
    redeemedDate: '22 Apr 2026, 10:30',
  },
  {
    id: 'vc3',
    name: 'Free onigiri of the day',
    code: 'ONG2025003X',
    expiry: 'Exp. 19 Mar 2026',
    thumb: `${BASE}/46823361-ec71-4aba-a4d3-8fc0a05ff901`,
    thumbStyle: { width: '99.92%', height: '110%', top: '-5%', left: '0.04%' },
    status: 'Expired',
    cost: '45pts',
    redeemedDate: '17 Feb 2026, 09:12',
  },
  {
    id: 'vc4',
    name: '20% off next purchase',
    code: 'DSC20NEXT01',
    expiry: 'Exp. 2 Mar 2026',
    thumb: `${BASE}/33337a4d-94bf-4f89-a858-7d33823e4865`,
    thumbStyle: null,
    status: 'Expired',
    cost: '200pts',
    redeemedDate: '16 Feb 2026, 14:30',
  },
];

export const REDEEM_REWARDS = {
  filters: ['All', 'Coffee', 'Matcha', 'Breakfast', 'Bento', 'Merch', 'Discount'],
  rewards: [
    {
      id: 'r1', name: 'Free drip bag coffee', category: 'Coffee', points: '45pts', locked: false,
      thumbKey: 'rewardDripBag', thumbStyle: { width: '100%', height: '133.51%', top: '-30.59%', left: '0' },
      description: 'Any hot or iced drip bag coffee (16oz).',
      terms: ['Valid for 30 days.', 'One per transaction.', 'Not combinable with other promos.'],
      voucherCode: 'VC08282147Q', voucherExpiry: 'Expires 15 May 2026',
    },
    {
      id: 'r2', name: 'Free onigiri of the day', category: 'Onigiri', points: '45pts', locked: false,
      thumbKey: 'rewardOnigiri', thumbStyle: { width: '99.92%', height: '110%', top: '-5%', left: '0.04%' },
      description: 'Choice of any onigiri flavor of the day, served fresh.',
      terms: ['Valid for 30 days.', 'One per transaction.', 'Subject to availability.'],
      voucherCode: 'ONG2025003X', voucherExpiry: 'Expires 15 May 2026',
    },
    {
      id: 'r3', name: '20% off next purchase', category: 'Discount', points: '200pts', locked: false,
      thumbKey: 'rewardDiscount', thumbStyle: null,
      description: 'Get 20% off your entire next order, online or in-store.',
      terms: ['Valid for 14 days.', 'Applies to one transaction.', 'Cannot be combined with other discounts.'],
      voucherCode: 'DSC20NEXT01', voucherExpiry: 'Expires 9 May 2026',
    },
    {
      id: 'r4', name: 'Signature tote bag', category: 'Merch', points: '1.200pts', locked: false,
      thumbKey: 'rewardToteBag', thumbStyle: null,
      description: 'Limited edition canvas tote bag with the machimoto logo.',
      terms: ['While stocks last.', 'One per member.', 'In-store pickup only.'],
      voucherCode: 'TOTE-MM-2025', voucherExpiry: 'Expires 25 Jun 2026',
    },
    {
      id: 'r5', name: 'Free bento set', category: 'Bento', points: '500pts', locked: false,
      thumbKey: 'rewardBento', thumbStyle: null,
      description: 'A full bento set with your choice of main, two sides, and rice.',
      terms: ['Valid for 30 days.', 'One per transaction.', 'Available at participating stores.'],
      voucherCode: 'BNT-FREE-005', voucherExpiry: 'Expires 25 May 2026',
    },
    {
      id: 'r6', name: 'Ceramic pour-over kit', category: 'Merch', points: '2.400pts', locked: true, lockLabel: 'Unlock at platinum+',
      thumbKey: 'rewardPourOver', thumbStyle: null,
      description: 'Handcrafted ceramic dripper and server set for home brewing.',
      terms: ['Requires Platinum tier or above.', 'One per member.', 'While stocks last.'],
      voucherCode: 'POUR-PLT-006', voucherExpiry: 'Expires 30 Jun 2026',
    },
    {
      id: 'r7', name: 'Iced matcha latte', category: 'Matcha', points: '90pts', locked: false,
      thumbKey: 'rewardDripBag', thumbStyle: { width: '100%', height: '133.51%', top: '-30.59%', left: '0' },
      description: 'Classic iced matcha latte made with ceremonial grade matcha.',
      terms: ['Valid for 30 days.', 'One per transaction.', 'Hot option available on request.'],
      voucherCode: 'MCH-ICED-007', voucherExpiry: 'Expires 25 May 2026',
    },
    {
      id: 'r8', name: 'Breakfast platter', category: 'Breakfast', points: '350pts', locked: false,
      thumbKey: 'rewardBento', thumbStyle: null,
      description: 'Morning platter with toast, eggs, seasonal fruit, and a drink.',
      terms: ['Valid for 30 days.', 'Available until 11am only.', 'Dine-in only.'],
      voucherCode: 'BRK-PLT-2025', voucherExpiry: 'Expires 25 May 2026',
    },
    {
      id: 'r9', name: 'Barista choice coffee', category: 'Coffee', points: '80pts', locked: false,
      thumbKey: 'rewardOnigiri', thumbStyle: { width: '99.92%', height: '110%', top: '-5%', left: '0.04%' },
      description: "Today's barista pick — a seasonal specialty drink, hot or iced.",
      terms: ['Valid for 30 days.', 'One per transaction.', 'Menu subject to change daily.'],
      voucherCode: 'BAR-CHC-009X', voucherExpiry: 'Expires 25 May 2026',
    },
    {
      id: 'r10', name: 'Classic bento box', category: 'Bento', points: '180pts', locked: false,
      thumbKey: 'rewardDiscount', thumbStyle: null,
      description: 'A classic bento box with rice, protein, and three sides.',
      terms: ['Valid for 30 days.', 'One per transaction.', 'Available at lunch hours only.'],
      voucherCode: 'BNT-CLS-010A', voucherExpiry: 'Expires 25 May 2026',
    },
    {
      id: 'r11', name: 'Mochimoto tote bag', category: 'Merch', points: '800pts', locked: false,
      thumbKey: 'rewardToteBag', thumbStyle: null,
      description: 'Heavyweight cotton tote with an embroidered machimoto crest.',
      terms: ['While stocks last.', 'One per member.', 'In-store pickup only.'],
      voucherCode: 'TOTE-MCH-011', voucherExpiry: 'Expires 30 Jun 2026',
    },
    {
      id: 'r12', name: 'Limited edition tumbler', category: 'Merch', points: '3.000pts', locked: true, lockLabel: 'Unlock at platinum+',
      thumbKey: 'rewardPourOver', thumbStyle: null,
      description: 'Insulated stainless steel tumbler, keeps drinks cold for 24 hours.',
      terms: ['Requires Platinum tier or above.', 'One per member.', 'While stocks last.'],
      voucherCode: 'TUM-LTD-PLT2', voucherExpiry: 'Expires 30 Jun 2026',
    },
  ],
};
