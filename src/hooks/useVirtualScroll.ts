import { useState, useRef, useEffect, useCallback } from 'react';

import { VirtualScrollProps } from '@/types';
import { INITIAL_START } from '@/utils/defaults';

const useVirtualScroll = (props: VirtualScrollProps) => {
  const { optionHeight, selectHeight, visibilitySize, bufferSize } = props;
  const [itemSlice, setItemSlice] = useState({
    start: INITIAL_START,
    end: visibilitySize + bufferSize,
  });
  const [listNode, setListNode] = useState<HTMLDivElement | null>(null);

  const resetItemSlice = useCallback(() => {
    setItemSlice({
      start: INITIAL_START,
      end: visibilitySize + bufferSize,
    });
  }, [visibilitySize, bufferSize]);

  const scrollHandler = useCallback(() => {
    if (!listNode) return;

    const { scrollTop } = listNode;
    const start = Math.max(
      INITIAL_START,
      Math.floor(scrollTop / optionHeight) - bufferSize
    );
    const end = start + Math.ceil(selectHeight + bufferSize);
    setItemSlice({
      start,
      end,
    });
  }, [bufferSize, optionHeight, selectHeight, listNode]);

  useEffect(() => {
    if (listNode) {
      listNode.addEventListener('scroll', scrollHandler);
      return () => {
        listNode.removeEventListener('scroll', scrollHandler);
      };
    }
  }, [scrollHandler, listNode]);

  return { itemSlice, setListNode, resetItemSlice };
};

export default useVirtualScroll;
