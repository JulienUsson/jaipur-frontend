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


import * as runtime from '../runtime';
import {
    Healthstatus,
    HealthstatusFromJSON,
    HealthstatusToJSON,
} from '../models';

/**
 * 
 */
export class HealthApi extends runtime.BaseAPI {

    /**
     * Récupérer le status de l\'application
     */
    async getHealthRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Healthstatus>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/health`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HealthstatusFromJSON(jsonValue));
    }

    /**
     * Récupérer le status de l\'application
     */
    async getHealth(initOverrides?: RequestInit): Promise<Healthstatus> {
        const response = await this.getHealthRaw(initOverrides);
        return await response.value();
    }

}
