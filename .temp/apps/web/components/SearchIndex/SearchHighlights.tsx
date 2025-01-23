import React from 'react';
import { SearchMixedItem } from "../../../../packages/types/index.ts";
import { UIText } from "../../../../packages/ui/src/index.tsx";
import { HTMLRenderer } from "../HTMLRenderer/index.tsx";
interface SearchHighlightsProps {
    highlights?: SearchMixedItem['highlights'];
}
export function SearchHighlights({ highlights }: SearchHighlightsProps) {
    if (!highlights || highlights.length === 0)
        return null;
    return (<div className='flex flex-col gap-px'>
      {highlights.slice(0, 3).map((highlight, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <UIText quaternary key={`highlight-${index}`}>
          <HTMLRenderer className='inline-highlight' text={'...' + highlight + '...'}/>
        </UIText>))}
    </div>);
}
