import { Button } from "./Button.tsx";
export function DebugButton() {
    return (<Button onClick={() => {
            throw new Error('Throw Exception Test 💥');
        }}>
      Throw from @campsite/ui
    </Button>);
}
