import type { ReactElement } from "react";
import { BaseLayout } from "@/src/ui/components/base_layout/base_layout";
import { AppErrorBoundary } from "@/src/ui/components/app_error_boundary/app_error_boundary";
import { useCallback, useRef, useState } from "react";
import type { ListRowProps, Index, InfiniteLoaderChildProps } from "react-virtualized";
import { CellMeasurer, CellMeasurerCache, InfiniteLoader, WindowScroller, AutoSizer, List } from "react-virtualized";
import type { DummyPost } from "@/src/core/dummy/domain/models/dummy_post";
import { locator } from "@/src/core/app/ioc";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { GetDummyPostsUseCase } from "@/src/core/dummy/domain/use_cases/get_dummy_posts_use_case";
import { TYPES } from "@/src/core/app/ioc/types";
import { InfiniteScrollPageSimpleCardStyled } from "@/src/ui/features/dummy/components/infinite_scroll/infinite_scroll_page.styled";

const TOTAL_COUNT = 10_000;

// Renders an Instagram-style infinite scroll page with virtualized elements.
export function InfiniteScrollPage() {
  // List of posts to render
  const [posts, setPosts] = useState<DummyPost[]>([]);
  // Cache with the height of each virtualized element
  const cache = useRef(new CellMeasurerCache({ defaultHeight: 100, fixedWidth: true }));
  // Control variable that prevents new posts from loading twice
  const isLoading = useRef(false);

  // Checks if an element of a certain index exists in the list of posts.
  const isRowLoaded = useCallback(({ index }: Index) => index < posts.length, [posts]);

  // Updates the list with new posts
  const loadMoreRows = useCallback(async () => {
    if (isLoading.current) {
      return;
    }
    isLoading.current = true;
    console.log("Loading...");
    const getDummyPostsUseCase = await locator.get<IocProvider<GetDummyPostsUseCase>>(TYPES.GetDummyPostsUseCase)();
    const newPosts = await getDummyPostsUseCase.execute({ userId: Math.round(Math.random() * 10) + 1 });
    const prevLength = posts.length;
    setPosts(posts.concat(newPosts));
    cache.current.clear(prevLength, 0);
    isLoading.current = false;
    console.log("Finished loading");
  }, [posts]);

  // If element of index is loaded, it shows the element. If not, it shows a loading sign.
  const rowRenderer = useCallback(
    ({ key, index, parent, style }: ListRowProps) => {
      return (
        <CellMeasurer cache={cache.current} columnIndex={0} key={key} parent={parent} rowIndex={index} width={0}>
          <div key={key} style={style}>
            {index < posts.length ? (
              <InfiniteScrollPageSimpleCardStyled title={posts[index].title} subtitle={posts[index].body.repeat(3)} />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </CellMeasurer>
      );
    },
    [posts]
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
                      rowCount={Math.min(posts.length + 1, TOTAL_COUNT)}
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
