import { ComponentPropsWithoutRef, useState } from 'react';
import Image from 'next/image';
import { Reaction } from "../../../../packages/editor/src/index.ts";
import { UIText } from "../../../../packages/ui/src/Text/index.tsx";
import { SuggestionItem, SuggestionRoot } from "../SuggestionList.tsx";
import { useAddFrequentlyUsedReaction, useFrequentlyUsedReactions } from "../../hooks/reactions/useFrequentlyUsedReactions.ts";
import { useReactionsData } from "../../hooks/reactions/useReactionsData.ts";
import { useSearchReactions } from "../../hooks/reactions/useSearchReactions.ts";
import { formatReactionName, isStandardReaction } from "../../utils/reactions/index.ts";
interface ReactionListProps extends Pick<ComponentPropsWithoutRef<typeof SuggestionRoot>, 'editor'> {
    modal?: boolean;
}
export function ReactionList({ editor, modal }: ReactionListProps) {
    const [query, setQuery] = useState('');
    const { addReactionIdToFrequents } = useAddFrequentlyUsedReaction();
    const reactionsData = useReactionsData();
    const { frequentlyUsedReactions } = useFrequentlyUsedReactions();
    const normalizedQuery = (() => {
        if (reactionsData?.emoticons[`:${query}`])
            return `:${query}`;
        if (reactionsData?.emoticons[`:${query.toUpperCase()}`])
            return `:${query.toUpperCase()}`;
        return query;
    })();
    const { reactionSearchResults } = useSearchReactions(normalizedQuery);
    const results = query.length > 0 ? reactionSearchResults : frequentlyUsedReactions;
    return (<SuggestionRoot modal={modal} onControlledQueryChange={setQuery} editor={editor} char=':' allow={({ state, range }) => {
            const $from = state.doc.resolve(range.from);
            const type = state.schema.nodes[Reaction.name];
            const allow = !!$from.parent.type.contentMatch.matchType(type);
            return allow;
        }}>
      {results.map((item) => {
            return (<SuggestionItem editor={editor} value={item.id} key={item.id} onSelect={({ editor, range }) => {
                    addReactionIdToFrequents({ id: item.id });
                    editor.commands.insertReaction({ range, ...item });
                }} className='pl-1.5'>
            {isStandardReaction(item) ? (<span className='mt-0.5 font-["emoji"] text-sm leading-none'>{item.native}</span>) : (<Image className='mb-px h-[15px] w-[15px] object-contain' src={item.file_url} alt={item.name} width={16} height={16}/>)}
            <UIText className='truncate !text-sm font-medium'>{formatReactionName(item.name)}</UIText>
          </SuggestionItem>);
        })}
    </SuggestionRoot>);
}
