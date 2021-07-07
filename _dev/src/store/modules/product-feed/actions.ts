/**
 * 2007-2021 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2021 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
import MutationsTypes from './mutations-types';
import ActionsTypes from './actions-types';
import HttpClientError from '../../../utils/HttpClientError';

export default {
  async [ActionsTypes.GET_PRODUCT_FEED_SYNC_STATUS]({commit, rootState}) {
    try {
      const response = await fetch(
        `${rootState.app.psGoogleShoppingApiUrl}/incremental-sync/status`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${rootState.accounts.tokenPsAccounts}`,
          },
        },
      );
      if (!response.ok) {
        throw new HttpClientError(response.statusText, response.status);
      }
      const json = await response.json();
      commit(MutationsTypes.SET_LAST_SYNCHRONISATION, {name: 'jobEndedAt', data: json.jobEndedAt});
      commit(MutationsTypes.SET_LAST_SYNCHRONISATION, {name: 'nextJobAt', data: json.nextJobAt});
      commit(MutationsTypes.SET_LAST_SYNCHRONISATION, {name: 'enabled', data: json.enabled});
      commit(MutationsTypes.SET_LAST_SYNCHRONISATION, {name: 'successfulSyncs', data: json.successfulSyncs});
      commit(MutationsTypes.SET_LAST_SYNCHRONISATION, {name: 'failedSyncs', data: json.failedSyncs});
    } catch (error) {
      console.error(error);
    }
  },

  async [ActionsTypes.GET_PRODUCT_FEED_SETTINGS]({commit, state, rootState}) {
    try {
      const response = await fetch(`${rootState.app.psGoogleShoppingApiUrl}/incremental-sync/settings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${rootState.accounts.tokenPsAccounts}`,
        },
      });
      if (!response.ok) {
        throw new HttpClientError(response.statusText, response.status);
      }
      const json = await response.json();
      commit(MutationsTypes.SET_SELECTED_PRODUCT_FEED_SETTINGS, {
        name: 'autoImportShippingSettings', data: json.autoImportShippingSettings,
      });
      commit(MutationsTypes.SET_SELECTED_PRODUCT_FEED_SETTINGS, {
        name: 'targetCountries', data: json.targetCountries,
      });
      commit(MutationsTypes.SET_SELECTED_PRODUCT_FEED_SETTINGS, {
        name: 'autoImportTaxSettings', data: json.autoImportTaxSettings,
      });
      commit(MutationsTypes.SET_SELECTED_PRODUCT_FEED_SETTINGS, {
        // ! Not send by API yet
        name: 'productsPerBatchSync', data: json.productsPerBatchSync,
      });
      commit(MutationsTypes.SET_SELECTED_PRODUCT_FEED_SETTINGS, {
        // ! Not send by API yet
        name: 'syncSchedule', data: json.syncSchedule,
      });
      commit(MutationsTypes.SET_SELECTED_PRODUCT_FEED_SETTINGS, {
        name: 'attributeMapping',
        data: Object.assign(
          (json.attributeMapping?.exportProductsWithShortDescription) ? {
            exportProductsWithShortDescription:
            json.attributeMapping?.exportProductsWithShortDescription,
          } : {},
          (json.attributeMapping?.customColorAttribute) ? {
            customColorAttribute: json.attributeMapping?.customColorAttribute,
          } : {},
          (json.attributeMapping?.customAgeGroupAttribute) ? {
            customAgeGroupAttribute: json.attributeMapping?.customAgeGroupAttribute,
          } : {},
          (json.attributeMapping?.customSizeAttribute) ? {
            customSizeAttribute: json.attributeMapping?.customSizeAttribute,
          } : {},
          (json.attributeMapping?.customGenderGroupAttribute) ? {
            customGenderGroupAttribute:
            json.attributeMapping?.customGenderGroupAttribute,
          } : {},
          (json.attributeMapping?.customConditionAttribute) ? {
            customConditionAttribute: json.attributeMapping?.customConditionAttribute,
          } : {},
        ),
      });
      commit(MutationsTypes.TOGGLE_CONFIGURATION_FINISHED, true);
    } catch (error) {
      console.error(error);
    }
  },

  async [ActionsTypes.SEND_PRODUCT_FEED_SETTINGS]({state, rootState}) {
    const productFeedSettings = state.settings;
    const newSettings = {
      autoImportTaxSettings: productFeedSettings.autoImportTaxSettings,
      autoImportShippingSettings: productFeedSettings.autoImportShippingSettings,
      targetCountries: productFeedSettings.targetCountries,
      shippingSettings: productFeedSettings.shippingSettings,
      attributeMapping: {
        exportProductsWithShortDescription:
        productFeedSettings?.attributeMapping?.exportProductsWithShortDescription
        || null,
        customConditionAttribute: productFeedSettings?.attributeMapping?.customConditionAttribute
        || null,
        customColorAttribute: productFeedSettings?.attributeMapping?.customColorAttribute
        || null,
        customSizeAttribute: productFeedSettings?.attributeMapping?.customSizeAttribute
        || null,
        customAgeGroupAttribute: productFeedSettings?.attributeMapping?.customAgeGroupAttribute
        || null,
        customGenderGroupAttribute:
        productFeedSettings?.attributeMapping?.customGenderGroupAttribute
        || null,
      },
    };
    try {
      const response = await fetch(`${rootState.app.psGoogleShoppingApiUrl}/incremental-sync/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${rootState.accounts.tokenPsAccounts}`,
        },
        body: JSON.stringify(newSettings),
      });
      if (!response.ok) {
        throw new HttpClientError(response.statusText, response.status);
      }
      response.json();
    } catch (error) {
      console.error(error);
    }
  },

  async [ActionsTypes.GET_SHIPPING_SETTINGS]({rootState, commit}) {
    const response = await fetch(`${rootState.app.psGoogleShoppingAdminAjaxUrl}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify({
        action: 'getCarrierValues',
      }),
    });
    if (!response.ok) {
      throw new HttpClientError(response.statusText, response.status);
    }
    const result = await response.json();
    commit(MutationsTypes.SAVE_AUTO_IMPORT_SHIPPING_INFORMATIONS, result);
    return result;
  },

  async [ActionsTypes.GET_PRODUCT_FEED_SYNC_SUMMARY]({rootState, commit}) {
    const response = await fetch(`${rootState.app.psGoogleShoppingApiUrl}/validation/summary`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${rootState.accounts.tokenPsAccounts}`,
      },
    });
    if (!response.ok) {
      throw new HttpClientError(response.statusText, response.status);
    }
    const result = await response.json();
    commit(MutationsTypes.SET_VALIDATION_SUMMARY, result);
    return result;
  },

  async [ActionsTypes.GET_TOTAL_PRODUCTS]({rootState, commit}) {
    const response = await fetch(`${rootState.app.psGoogleShoppingAdminAjaxUrl}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify({
        action: 'getProductsReadyToSync',
      }),
    });
    if (!response.ok) {
      throw new HttpClientError(response.statusText, response.status);
    }
    const result = await response.json();
    commit(MutationsTypes.SAVE_TOTAL_PRODUCTS, Number(result.total));
    return result;
  },
};
