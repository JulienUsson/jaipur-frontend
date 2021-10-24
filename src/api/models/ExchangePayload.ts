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
    GoodOrCamel,
    GoodOrCamelFromJSON,
    GoodOrCamelFromJSONTyped,
    GoodOrCamelToJSON,
} from './';

/**
 * 
 * @export
 * @interface ExchangePayload
 */
export interface ExchangePayload {
    /**
     * 
     * @type {Array<Good>}
     * @memberof ExchangePayload
     */
    take?: Array<Good>;
    /**
     * 
     * @type {Array<GoodOrCamel>}
     * @memberof ExchangePayload
     */
    give?: Array<GoodOrCamel>;
}

export function ExchangePayloadFromJSON(json: any): ExchangePayload {
    return ExchangePayloadFromJSONTyped(json, false);
}

export function ExchangePayloadFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExchangePayload {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'take': !exists(json, 'take') ? undefined : ((json['take'] as Array<any>).map(GoodFromJSON)),
        'give': !exists(json, 'give') ? undefined : ((json['give'] as Array<any>).map(GoodOrCamelFromJSON)),
    };
}

export function ExchangePayloadToJSON(value?: ExchangePayload | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'take': value.take === undefined ? undefined : ((value.take as Array<any>).map(GoodToJSON)),
        'give': value.give === undefined ? undefined : ((value.give as Array<any>).map(GoodOrCamelToJSON)),
    };
}

