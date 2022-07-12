import Swift from '../../public/assets/swift.svg';
import Secure from '../../public/assets/secure.svg';
import Safe from '../../public/assets/safe.svg';
import buylocally from '../../public/assets/buy_locally.svg';
import ecoomerce from '../../public/assets/eccomerce.svg';
import cardpurchase from '../../public/assets/card_purchase.svg';
import DashboadIcon from '../assets/svg/DashboadIcon';
import WalletIcon from '../assets/svg/WalletIcon';
import Transaction from '../assets/svg/Transaction';
import Settings from '../assets/svg/Settings';
import Vouch from '../assets/svg/Vouch';

export const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Exchange', link: '#' },
  { name: 'Sell', link: '#' },
  { name: 'Merchant', link: '#' },
  { name: 'Blog', link: '#' },
  { name: 'Redeem Voucher', link: '#' },
];

export const service = [
  {
    title: 'Trade Crypto',
    text: 'Easily purchase and trade crypto currencies on our platform',
  },
  {
    title: 'Get a Secure Wallet',
    text: 'Store your crypto in our secure wallet and easily transfer crypto from your wallet.',
  },
  {
    title: 'Zero Transaction Fees',
    text: 'No transaction fees to send cryptocurrencies across wallets',
  },
  {
    title: 'Investment Advice',
    text: 'Speak and chat with a professional on the best investments to make.',
  },
  {
    title: 'Real Estate Investment',
    text: 'Invest in real estate properties with ease using Omega Dex.',
  },
  {
    title: 'Portfolio',
    text: 'Manage your portfolio online and keep track of your holdings.',
  },
];

export const rates = [
  {
    currency: 'USD',
    exchage: 'BTC',
    percentage: '-0.7',
    amount: '36,641.20',
    oldAmount: '36,641.20',
  },
  {
    currency: 'USD',
    exchage: 'BTC',
    percentage: '0.7',
    amount: '36,641.20',
    oldAmount: '36,641.20',
  },
  {
    currency: 'USD',
    exchage: 'BTC',
    percentage: '0.7',
    amount: '36,641.20',
    oldAmount: '36,641.20',
  },
  {
    currency: 'USD',
    exchage: 'BTC',
    percentage: '0.7',
    amount: '36,641.20',
    oldAmount: '36,641.20',
  },
];

export const voucherList = [
  {
    id: 1,
    icon: Swift,
    heading: 'Swift',
    text: 'Swift is a cryptocurrency that is used to pay for internet services.',
  },
  {
    id: 2,
    icon: Secure,
    heading: 'Secure',
    text: 'Secure is a cryptocurrency that is used to pay for internet services.',
  },
  {
    id: 3,
    icon: Safe,
    heading: 'Safe',
    text: 'Safe is a cryptocurrency that is used to pay for internet services.',
  },
];

export const usage = [
  {
    icon: buylocally,
    heading: 'Buy Locally',
    text: 'Buy Locally is a cryptocurrency that is used to pay for internet services.',
  },
  {
    icon: ecoomerce,
    heading: 'Ecomerce',
    text: 'Ecomerce is a cryptocurrency that is used to pay for internet services.',
  },
  {
    icon: cardpurchase,
    heading: 'Card Purchase',
    text: 'Card Purchase is a cryptocurrency that is used to pay for internet services.',
  },
];

export const sideBarItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: DashboadIcon,
  },
  {
    name: 'Wallets',
    href: '/wallets',
    icon: WalletIcon,
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: Transaction,
  },
  {
    name: 'Vouchers',
    href: '/vouchers',
    icon: Vouch,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export const tableHeader = [
  {
    title: 'Type',
    icon: '',
  },
  {
    title: 'Amount',
    icon: '',
  },
  {
    title: 'Address',
    icon: '',
  },
  {
    title: 'Transcation ID',
    icon: '',
  },
  {
    title: 'Date',
    icon: '',
  },
];
