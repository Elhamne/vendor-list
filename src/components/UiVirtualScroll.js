import React, { useRef, useState } from 'react';

const UiVirtualScroll = ({
  offset = 0,
  // buffer,
  limit,
  rowHeight,
  height,
  onPrevCallback,
  onNextCallback,
  children,
}) => {
  // create overlay reference to trigger the change scroll position
  const overlayRef = useRef(null);

  // create two cursors of lower and upper boundary of cached items indices
  // initial upper boundary index is 0
  // const [upperBoundary, setUpperBoundary] = useState(offset);
  // initial lower boundary index is 300-1 = 299
  // const [lowerBoundary, setLowerBoundary] = useState(limit - 1);
  const [currentPage, setCurrentPage] = useState(offset);
  const [lastChangePageIncrement, setLastChangePageIncrement] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // current scroll position starting with 0
  const [currentScrollTopPosition, setCurrentScrollTopPosition] = useState(0);

  const handleScroll = (target) => {
    // ignore the scroll if data is loading
    if (isLoading) {
      return;
    }

    // get the current position of the scroll
    const scrollTop = Math.round(target.scrollTop);
    // extracting the client height and scroll height to calculate the top scroll maximum position
    // where is highest scroll position is scrollHeight = clientHeight + scrollTop
    const clientHeight = Math.round(target.clientHeight);
    const scrollHeight = Math.round(target.scrollHeight);

    // defining if we currently scrolling up or down
    const isUp = scrollTop < currentScrollTopPosition;

    if (isUp && scrollTop === 0 && currentPage !== 0) {
      setIsLoading(true);
      const updatePage = lastChangePageIncrement
        ? currentPage - 3
        : currentPage - 1;

      if (updatePage >= 0) {
        onPrevCallback(updatePage);
        // update current page
        setCurrentPage(updatePage);

        // move scroll position to 1 limit height
        if (overlayRef !== null) {
          const scrollPos = limit * rowHeight;
          overlayRef.current.scrollTo(0, scrollPos);
        }
        setLastChangePageIncrement(false);
      }

      setIsLoading(false);
    } else if (!isUp && scrollTop + clientHeight >= scrollHeight) {
      setIsLoading(true);
      const updatePage = lastChangePageIncrement
        ? currentPage + 1
        : currentPage + 3;

      onNextCallback(updatePage);
      // update current page
      setCurrentPage(updatePage);

      if (overlayRef !== null) {
        const scrollPos = limit * rowHeight;
        // move scroll position to 2 limits height
        overlayRef.current.scrollTo(0, scrollPos * 2);
      }
      setLastChangePageIncrement(true);
      setIsLoading(false);
    }
    // update the current cursor position
    setCurrentScrollTopPosition(scrollTop);
  };

  return (
    <div
      ref={overlayRef}
      style={{ height, overflowY: 'scroll' }}
      onScroll={(e) => handleScroll(e.target)}
    >
      {children}
    </div>
  );
};

export default UiVirtualScroll;
