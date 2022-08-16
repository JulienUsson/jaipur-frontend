/* tslint:disable */
/* eslint-disable */
/**
 * Jaipur
 * API pour le jeu de société Jaipur
 *
 * The version of the OpenAPI document: 1.0
 * Contact: julien@usson.me
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    Good,
    GoodFromJSON,
    GoodFromJSONTyped,
    GoodToJSON,
    Tokens,
    TokensFromJSON,
    TokensFromJSONTyped,
    TokensToJSON,
} from './';

/**
 * A complete game
 * @export
 * @interface Game
 */
export interface Game {
    /**
     * Identifiant du joueur actuel.
     * @type {number}
     * @memberof Game
     */
    currentPlayerIndex: number;
    /**
     * 
     * @type {string}
     * @memberof Game
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof Game
     */
    id: number;
    /**
     * 
     * @type {Array<Good>}
     * @memberof Game
     */
    market: Array<Good>;
    /**
     * 
     * @type {Tokens}
     * @memberof Game
     */
    tokens: Tokens;
    /**
     * 
     * @type {Array<Good>}
     * @memberof Game
     */
    hand: Array<Good>;
    /**
     * 
     * @type {number}
     * @memberof Game
     */
    camelsCount: number;
    /**
     * 
     * @type {number}
     * @memberof Game
     */
    winnerIndex?: number;
}

export function GameFromJSON(json: any): Game {
    return GameFromJSONTyped(json, false);
}

export function GameFromJSONTyped(json: any, ignoreDiscriminator: boolean): Game {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'currentPlayerIndex': json['currentPlayerIndex'],
        'name': json['name'],
        'id': json['id'],
        'market': ((json['market'] as Array<any>).map(GoodFromJSON)),
        'tokens': TokensFromJSON(json['tokens']),
        'hand': ((json['hand'] as Array<any>).map(GoodFromJSON)),
        'camelsCount': json['camelsCount'],
        'winnerIndex': !exists(json, 'winnerIndex') ? undefined : json['winnerIndex'],
    };
}

export function GameToJSON(value?: Game | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'currentPlayerIndex': value.currentPlayerIndex,
        'name': value.name,
        'id': value.id,
        'market': ((value.market as Array<any>).map(GoodToJSON)),
        'tokens': TokensToJSON(value.tokens),
        'hand': ((value.hand as Array<any>).map(GoodToJSON)),
        'camelsCount': value.camelsCount,
        'winnerIndex': value.winnerIndex,
    };
}


