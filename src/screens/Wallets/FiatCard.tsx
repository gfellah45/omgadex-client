// @ts-nocheck
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import React, { FC } from 'react';
import Deposit from '../../assets/svg/Deposit';
import FiatNaira from '../../assets/svg/FiatNaira';
import Send from '../../assets/svg/Send';
import { TransactionButtons } from '../../components/shared/Buttons';
import { useAppDispatch } from '../../hooks/useStoreHooks';
import { CurrencyFormatter } from '../../lib/currencyFormatter';
import { showModal } from '../../reducers/ui';

interface Props {
  icon?: React.ReactElement;
  currency?: string;
  currencyCode?: string;
  balance?: string;
  action?: () => void;
  show?: boolean;
}

const FiatCard: FC<Props> = ({
  icon,
  currency,
  currencyCode,
  balance,
  action,
  show,
}) => {
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const triggerModal = () => {
    dispatch(
      showModal({
        showModal: true,
        modalType: 'TRX',
      }),
    );
  };

  return (
    <div
      className={clsx(
        ' rounded-lg px-10 py-8',
        theme === 'light' ? 'bg-white' : 'bg-neutral-800',
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          {icon}
          <div>
            <p className="text-lg font-bold ">{currency}</p>
            <p className="text-gray-400">{currencyCode}</p>
          </div>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Available Balance</p>
          <p className="text-3xl font-semibold">
            {show
              ? CurrencyFormatter('USD').format(Number(balance))
              : '*********'}
          </p>
        </div>
      </div>

      <div className="mt-16 w-full">
        <div className="w-full ml-auto grid grid-cols-4 gap-4">
          <TransactionButtons text="Send" icon={<Deposit />} />
          <TransactionButtons text="Recieve" icon={<Deposit />} />
          <TransactionButtons
            text="Fund"
            primary={true}
            icon={<Send />}
            action={action}
          />
          <div>
            <button
              onClick={triggerModal}
              className={clsx(
                'w-full px-4 py-3 flex justify-center items-center space-x-3 font-bold text-[16px] rounded-md lg:px-2 lg:py-3 xl:px-2 xl:py-3 ring-1 text-white bg-primary ring-primary',
                theme === 'dark' && 'text-omgray2',
              )}
            >
              Move to Dollar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiatCard;
