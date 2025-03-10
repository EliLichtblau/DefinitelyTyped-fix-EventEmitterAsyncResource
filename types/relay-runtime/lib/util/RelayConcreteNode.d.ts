import { NormalizationOperation, NormalizationSplitOperation } from "./NormalizationNode";
import { ReaderFragment, ReaderInlineDataFragment } from "./ReaderNode";
import { OperationType } from "./RelayRuntimeTypes";

/**
 * Represents a common GraphQL request that can be executed, an `operation`
 * containing information to normalize the results, and a `fragment` derived
 * from that operation to read the response data (masking data from child
 * fragments).
 */
export interface ConcreteRequest {
    readonly kind: "Request";
    readonly fragment: ReaderFragment;
    readonly operation: NormalizationOperation;
    readonly params: RequestParameters;
}

/**
 * Represents the minimal information necessary to identify and execute
 * a particular GraphQL request.
 */
// Note: the phantom type parameter here helps ensures that the
// $Parameters.js value matches the type param provided to preloadQuery.
export interface PreloadableConcreteRequest<TQuery extends OperationType> {
    readonly kind: "PreloadableConcreteRequest";
    readonly params: RequestParameters;
}

export interface ConcreteUpdatableQuery {
    readonly kind: "UpdatableQuery";
    readonly fragment: ReaderFragment;
}

/**
 * Contains the parameters required for executing a GraphQL request.
 * The operation can either be provided as a persisted `id` or `text`. If given
 * in `text` format, a `cacheID` as a hash of the text should be set to be used
 * for local caching.
 */
export type RequestParameters =
    | {
        readonly id: string;
        readonly text: null;
        // common fields
        readonly name: string;
        readonly operationKind: "mutation" | "query" | "subscription";
        readonly providedVariables?: ProvidedVariablesType;
        readonly metadata: { [key: string]: unknown };
    }
    | {
        readonly cacheID: string;
        readonly id: null;
        readonly text: string | null;
        // common fields
        readonly name: string;
        readonly operationKind: "mutation" | "query" | "subscription";
        readonly providedVariables?: ProvidedVariablesType;
        readonly metadata: { [key: string]: unknown };
    };

export type GeneratedNode =
    | ConcreteRequest
    | ReaderFragment
    | ReaderInlineDataFragment
    | NormalizationSplitOperation
    | ConcreteUpdatableQuery;

export const RelayConcreteNode: {
    ACTOR_CHANGE: "ActorChange";
    CONDITION: "Condition";
    CLIENT_COMPONENT: "ClientComponent";
    CLIENT_EDGE_TO_SERVER_OBJECT: "ClientEdgeToServerObject";
    CLIENT_EDGE_TO_CLIENT_OBJECT: "ClientEdgeToClientObject";
    CLIENT_EXTENSION: "ClientExtension";
    DEFER: "Defer";
    CONNECTION: "Connection";
    FLIGHT_FIELD: "FlightField";
    FRAGMENT: "Fragment";
    FRAGMENT_SPREAD: "FragmentSpread";
    INLINE_DATA_FRAGMENT_SPREAD: "InlineDataFragmentSpread";
    INLINE_DATA_FRAGMENT: "InlineDataFragment";
    INLINE_FRAGMENT: "InlineFragment";
    LINKED_FIELD: "LinkedField";
    LINKED_HANDLE: "LinkedHandle";
    LITERAL: "Literal";
    LIST_VALUE: "ListValue";
    LOCAL_ARGUMENT: "LocalArgument";
    MODULE_IMPORT: "ModuleImport";
    ALIASED_FRAGMENT_SPREAD: "AliasedFragmentSpread";
    ALIASED_INLINE_FRAGMENT_SPREAD: "AliasedInlineFragmentSpread";
    RELAY_RESOLVER: "RelayResolver";
    RELAY_LIVE_RESOLVER: "RelayLiveResolver";
    REQUIRED_FIELD: "RequiredField";
    OBJECT_VALUE: "ObjectValue";
    OPERATION: "Operation";
    REQUEST: "Request";
    ROOT_ARGUMENT: "RootArgument";
    SCALAR_FIELD: "ScalarField";
    SCALAR_HANDLE: "ScalarHandle";
    SPLIT_OPERATION: "SplitOperation";
    STREAM: "Stream";
    TYPE_DISCRIMINATOR: "TypeDiscriminator";
    UPDATABLE_QUERY: "UpdatableQuery";
    VARIABLE: "Variable";
};

export interface ProvidedVariablesType {
    readonly [key: string]: { get(): unknown };
}
