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

enum MutationsTypes {

    // request mutations
    SET_REPORTING_PERIOD_SELECTED = 'SET_REPORTING_PERIOD_SELECTED',
    SET_REPORTING_DATES = 'SET_REPORTING_DATES',
    SET_REPORTING_DAILY_RESULTS_TYPE = 'SET_REPORTING_DAILY_RESULTS_TYPE',
    SET_REPORTING_CAMPAIGNS_PERFORMANCES_ORDERING = 'SET_REPORTING_CAMPAIGNS_PERFORMANCES_ORDERING',
    SET_REPORTING_PRODUCT_PERFORMANCES_ORDERING = 'SET_REPORTING_PRODUCT_PERFORMANCES_ORDERING',
    SET_REPORTING_PRODUCT_PARTITIONS_PERFORMANCES_ORDERING = 'SET_REPORTING_PRODUCT_PARTITIONS_PERFORMANCES_ORDERING',
    SET_SSC_DIMENSIONS_AND_FILTERS = 'SET_SSC_DIMENSIONS_AND_FILTERS',
    SET_SEARCHED_FILTERS = 'SET_SEARCHED_FILTERS',
    SET_DIMENSION_CHOSEN = 'SET_DIMENSION_CHOSEN',
    SET_DIMENSION_CHOSEN_CHILDREN = 'SET_DIMENSION_CHOSEN_CHILDREN',
    SET_FILTERS_CHOSEN = 'SET_FILTERS_CHOSEN',
    SET_TOTAL_CAMPAIGNS_PERFORMANCES_RESULTS = 'SET_TOTAL_CAMPAIGNS_PERFORMANCES_RESULTS',

    // errors mutations
    SET_REPORTING_KPIS_ERROR = 'SET_REPORTING_KPIS_ERROR',
    SET_REPORTING_CAMPAIGNS_PERFORMANCES_SECTION_ERROR = 'SET_REPORTING_CAMPAIGNS_PERFORMANCES_SECTION_ERROR',
    SET_REPORTING_PRODUCTS_PERFORMANCES_SECTION_ERROR= 'SET_REPORTING_PRODUCTS_PERFORMANCES_SECTION_ERROR',
    SET_REPORTING_FILTERS_PERFORMANCES_SECTION_ERROR = 'SET_REPORTING_FILTERS_PERFORMANCES_SECTION_ERROR',

    // result mutations
    TOGGLE_STATUS_REMARKETING_TRACKING_TAG = 'TOGGLE_STATUS_REMARKETING_TRACKING_TAG',
    TOGGLE_STATUS_REMARKETING_TRACKING_TAG_ALREADY_EXIST = 'TOGGLE_STATUS_REMARKETING_TRACKING_TAG_ALREADY_EXIST',
    SET_REMARKETING_CONVERSION_ACTIONS_ASSOCIATED = 'SET_REMARKETING_CONVERSION_ACTIONS_ASSOCIATED',
    SET_REPORTING_KPIS = 'SET_REPORTING_KPIS',
    SET_REPORTING_DAILY_RESULTS = 'SET_REPORTING_DAILY_RESULTS',
    SET_REPORTING_CAMPAIGNS_PERFORMANCES_RESULTS = 'SET_REPORTING_CAMPAIGNS_PERFORMANCES_RESULTS',
    RESET_REPORTING_CAMPAIGNS_PERFORMANCES = 'RESET_REPORTING_CAMPAIGNS_PERFORMANCES',
    SET_REPORTING_PRODUCTS_PERFORMANCES = 'SET_REPORTING_PRODUCTS_PERFORMANCES',
    SET_REPORTING_FILTERS_PERFORMANCES = 'SET_REPORTING_FILTERS_PERFORMANCES',
    SET_ERROR_CAMPAIGN_NAME_EXISTS = 'SET_ERROR_CAMPAIGN_NAME_EXISTS',
    SAVE_NEW_CAMPAIGN = 'SAVE_NEW_CAMPAIGN',
    SAVE_CAMPAIGNS_TO_LIST = 'SAVE_CAMPAIGNS_TO_LIST',
    SAVE_NEXT_PAGE_TOKEN_CAMPAIGN_LIST = 'SAVE_NEXT_PAGE_TOKEN_CAMPAIGN_LIST',
    SAVE_LIMIT_CAMPAIGN_PERFORMANCE_LIST = 'SAVE_LIMIT_CAMPAIGN_PERFORMANCE_LIST',
    SAVE_ACTIVE_PAGE_CAMPAIGN_PERFORMANCE_LIST = 'SAVE_ACTIVE_PAGE_CAMPAIGN_PERFORMANCE_LIST',
    UPDATE_CAMPAIGN_STATUS = 'UPDATE_CAMPAIGN_STATUS',
    UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN',
    RESET_CAMPAIGNS_LIST = 'RESET_CAMPAIGNS_LIST',
    SET_SSC_LIST_ORDERING = 'SET_SSC_LIST_ORDERING'
}

export {MutationsTypes as default};
