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
} from './';

/**
 * 
 * @export
 * @interface SellPayload
 */
export interface SellPayload {
    /**
     * 
     * @type {Good}
     * @memberof SellPayload
     */
    good: Good;
    /**
     * 
     * @type {number}
     * @memberof SellPayload
     */
    count: number;
}

export function SellPayloadFromJSON(json: any): SellPayload {
    return SellPayloadFromJSONTyped(json, false);
}

export function SellPayloadFromJSONTyped(json: any, ignoreDiscriminator: boolean): SellPayload {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'good': GoodFromJSON(json['good']),
        'count': json['count'],
    };
}

export function SellPayloadToJSON(value?: SellPayload | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'good': GoodToJSON(value.good),
        'count': value.count,
    };
}

