import { isType } from 'graphql'
import { AllNamedTypeDefs, isNexusStruct, NexusListableTypes } from './wrapping'
import { NexusTypes, withNexusSymbol } from './_types'
/**
 * list()
 */
export type NexusListDefConfig<TypeName extends AllNamedTypeDefs> = {
  type: TypeName
}

export class NexusListDef<TypeName extends NexusListableTypes> {
  // @ts-ignore
  // Required field for TS to differentiate NonNull from Null from List
  private _isNexusListDef: boolean = true

  constructor(readonly ofNexusType: TypeName) {
    /* istanbul ignore if */
    if (typeof ofNexusType !== 'string' && !isNexusStruct(ofNexusType) && !isType(ofNexusType)) {
      throw new Error('Cannot wrap unknown types in list(). Saw ' + ofNexusType)
    }
  }
}

withNexusSymbol(NexusListDef, NexusTypes.List)

export function list<TypeName extends NexusListableTypes>(type: TypeName): NexusListDef<TypeName> {
  return new NexusListDef(type)
}
