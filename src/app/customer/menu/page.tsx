'use client';

import { FC, useState } from 'react';

import { Button, Paragraph, SearchInput } from '@/_libs/components';
import { useParams, useSearch } from '@/_libs/hooks';
import { IMeal } from '@/_libs/types';
import { useCartStore } from '@/app/(stores)';

import { MealDetailsDrawer } from '../(components)/MealDetailsDrawer';
import LanguageSwitcher from '../(components)/LanguageSwitcher';
import CategoriesList from '../(components)/CategoriesList';
import MealsList from '../(components)/MealsList';
import PlaceOrderDrawer from '../(components)/PlaceOrderDrawer';

const Menu: FC = () => {
  const [selectedItem, setSelectedItem] = useState<IMeal | null>(null);

  const { changeParams } = useParams();
  const { query, setSearchQuery } = useSearch('query');

  const items = useCartStore((s) => s.items);

  const onSelectItem = (item: IMeal) => {
    setSelectedItem(item);
    changeParams('item', item.id.toString());
  };

  return (
    <div className='container mx-auto p-2 md:p-5 lg:p-8'>
      {items?.length > 0 ? (
        <Button
          className='fixed bottom-5 right-5 z-20 rounded-full'
          variant='gradient'
          onClick={() => changeParams('place-order', 'place-order')}
        >
          Place Order
        </Button>
      ) : null}

      <MealDetailsDrawer item={selectedItem || null} />

      <PlaceOrderDrawer />

      <Paragraph className='text-5xl w-full text-center font-bold text-primary! mb-5'>
        The Oba Restaurant
      </Paragraph>

      <LanguageSwitcher />

      <CategoriesList />

      <div className='mt-3 px-2 lg:px-5'>
        <SearchInput
          placeholder='Search for a meal'
          defaultValue={query}
          onSearch={(q) => setSearchQuery(q)}
        />
        <MealsList onSelectItem={onSelectItem} />
      </div>
    </div>
  );
};

export default Menu;
