import type { ReactElement } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";
import { useCallback, useRef, useState } from "react";
import type { ListRowProps, Index, InfiniteLoaderChildProps } from "react-virtualized";
import { CellMeasurer, CellMeasurerCache, InfiniteLoader, WindowScroller, AutoSizer, List } from "react-virtualized";
import { timeout } from "@/src/common/utils/promise";

interface ListElement {
  // Each element of the list has a random height
  height: number;
}

// Creates new element with random height
const createListElement = (): ListElement => ({ height: Math.max(Math.random() * 200, 20) });

// Creates a list of elements with random heights
const createMoreElements = (length = 20): ListElement[] => Array.from({ length }).map(() => createListElement());

const TOTAL_COUNT = 10_000;

// Renders an Instagram-style infinite scroll page with virtualized elements.
export function InfiniteScrollPage() {
  // List of elements to render
  const [elements, setElements] = useState<ListElement[]>([]);
  // Cache with the height of each virtualized element
  const cache = useRef(new CellMeasurerCache({ defaultHeight: 100, fixedWidth: true }));
  // Control variable that prevents new elements from loading twice
  const isLoading = useRef(false);

  // Checks if an element of a certain index exists in the list of elements.
  const isRowLoaded = useCallback(({ index }: Index) => index < elements.length, [elements]);

  // Updates the list with new elements
  const loadMoreRows = useCallback(async () => {
    if (isLoading.current) {
      return;
    }
    isLoading.current = true;
    console.log("Loading more elements...");
    await timeout(1000);
    setElements(elements.concat(createMoreElements()));
    isLoading.current = false;
    console.log("Loading has finished.");
  }, [isLoading, elements]);

  // If element of index is loaded, it shows the element. If not, it shows a loading sign.
  const rowRenderer = useCallback(
    ({ key, index, parent, style }: ListRowProps) => {
      return (
        <CellMeasurer cache={cache.current} columnIndex={0} key={key} parent={parent} rowIndex={index} width={0}>
          <div key={key} style={style}>
            {index < elements.length ? (
              <div style={{ height: elements[index].height, backgroundColor: `hsl(${elements[index].height}, 80%, 70%)`, padding: "4px" }}>
                {index}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </CellMeasurer>
      );
    },
    [elements]
  );

  return (
    <>
      <h1>Infinite Scroll (Instagram style)</h1>
      <p>With react-virtualized window scroller</p>
      <hr />
      <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreRows} rowCount={TOTAL_COUNT}>
        {({ onRowsRendered, registerChild }: InfiniteLoaderChildProps) => {
          return (
            <WindowScroller>
              {({ height, isScrolling, onChildScroll, scrollTop }) => (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <List
                      ref={registerChild}
                      autoHeight
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      overscanRowCount={2}
                      rowCount={Math.min(elements.length + 1, TOTAL_COUNT)}
                      rowHeight={cache.current.rowHeight}
                      deferredMeasurementCache={cache.current}
                      rowRenderer={rowRenderer}
                      scrollTop={scrollTop}
                      width={width}
                      onRowsRendered={onRowsRendered}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          );
        }}
      </InfiniteLoader>
    </>
  );
}

InfiniteScrollPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <AppErrorBoundary>{page}</AppErrorBoundary>
    </BaseLayout>
  );
};
