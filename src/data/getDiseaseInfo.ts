import { DISEASES } from "./disease"

export function getDiseaseInfo( slug: string ) {
    return DISEASES[slug] ?? null;
}