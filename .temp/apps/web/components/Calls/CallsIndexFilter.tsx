import { CookieValueTypes } from 'cookies-next';
import { useAtom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { OrganizationCallsGetRequest } from "../../../../packages/types/generated.ts";
import { Button, LayeredHotkeys } from "../../../../packages/ui/src/index.tsx";
import { useScope } from "../../contexts/scope.tsx";
import { atomWithWebStorage } from "../../utils/atomWithWebStorage.ts";
export const callsFilterAtom = atomFamily(({ scope }: {
    scope: CookieValueTypes;
}) => atomWithWebStorage<OrganizationCallsGetRequest['filter']>(`${scope}:calls-index-filter`, undefined), (a, b) => a.scope === b.scope);
export function CallsIndexFilter({ fullWidth = false }: {
    fullWidth?: boolean;
}) {
    const { scope } = useScope();
    const [filter, setFilter] = useAtom(callsFilterAtom({ scope }));
    return (<>
      <LayeredHotkeys keys='1' callback={() => setFilter(undefined)}/>
      <LayeredHotkeys keys='2' callback={() => setFilter('joined')}/>

      <Button size='sm' tooltip='For me' tooltipShortcut='1' onClick={() => setFilter(undefined)} variant={filter === undefined ? 'flat' : 'plain'} fullWidth={fullWidth}>
        For me
      </Button>
      <Button size='sm' tooltip='Joined' tooltipShortcut='2' onClick={() => setFilter('joined')} variant={filter === 'joined' ? 'flat' : 'plain'} fullWidth={fullWidth}>
        Joined
      </Button>
    </>);
}
