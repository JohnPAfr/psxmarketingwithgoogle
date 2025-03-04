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
import {fetchOnboarding} from 'mktg-with-google-common';
import MutationsTypes from './mutations-types';
import ActionsTypes from './actions-types';

export default {
  async [ActionsTypes.GET_FREE_LISTING_STATUS]({commit}) {
    try {
      const json = await (await fetchOnboarding(
        'GET',
        'free-listings/settings',
      )).json();
      commit(MutationsTypes.SET_FREE_LISTING_STATUS, json.enabled);
    } catch (error) {
      console.error(error);
    }
  },
};
