import { PokemonDescription } from "@components/index"
import { DescriptionProvider } from "@contexts/description.context"

function DescriptionPage() {
    return <DescriptionProvider> 
        <PokemonDescription />
    </DescriptionProvider>
}
export default DescriptionPage