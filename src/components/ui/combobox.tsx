'use client';
import { useState, useEffect } from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

import { ComboBoxProps, Dictionary } from '@/types';

import useVirtualScroll from '@/hooks/useVirtualScroll';
import {
  OPTION_HEIGHT,
  SELECT_HEIGHT,
  VISIBILITY_SIZE,
  BUFFER_SIZE,
} from '@/utils/defaults';
import { cn } from '@/lib/utils';

const Combobox: React.FC<ComboBoxProps> = (props) => {
  const { data } = props;
  const [selectedValue, setSelectedValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<Dictionary>(data);
  const [open, setOpen] = useState(false);

  const {
    itemSlice: { start, end },
    setListNode,
    resetItemSlice,
  } = useVirtualScroll({
    optionHeight: OPTION_HEIGHT,
    selectHeight: SELECT_HEIGHT,
    visibilitySize: VISIBILITY_SIZE,
    bufferSize: BUFFER_SIZE,
  });

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const selectValueHandler = (value: string) => {
    setSelectedValue((prevWord) => {
      return value === prevWord ? '' : value;
    });
    setOpen(false);
  };

  const popoverHandler = (value: boolean) => {
    setOpen(value);
    resetItemSlice();
  };

  useEffect(() => {
    const filtered = data.filter((word) =>
      word.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    resetItemSlice();
  }, [data, searchQuery, resetItemSlice]);

  return (
    <Popover open={open} onOpenChange={popoverHandler}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='flex m-auto justify-between min-w-[150px]'
        >
          {selectedValue || 'Select Word'}
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] px-0'>
        <div className='px-2 pb-2'>
          <Input
            placeholder='Search word...'
            className='rounded-sm'
            value={searchQuery}
            onChange={searchHandler}
          />
        </div>
        {!filteredData.length && (
          <span className='text-sm px-2 text-center w-full block'>
            No matching word
          </span>
        )}
        <div
          ref={setListNode}
          style={{ maxHeight: `${SELECT_HEIGHT}px`, overflowY: 'auto' }}
          className='px-2'
        >
          <div
            style={{
              height: `${filteredData.length * OPTION_HEIGHT}px`,
              paddingTop: `${start * OPTION_HEIGHT}px`,
            }}
          >
            {filteredData.slice(start, end).map((word, index) => (
              <Button
                onClick={selectValueHandler.bind(null, word)}
                variant='outline'
                className='flex w-full border-none text-left shadow-none'
                key={start + index}
                style={{ height: `${OPTION_HEIGHT}px` }}
              >
                {word}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    selectedValue === word ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
