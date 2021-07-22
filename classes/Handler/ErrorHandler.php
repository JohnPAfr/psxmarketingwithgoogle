<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */

namespace PrestaShop\Module\PsxMarketingWithGoogle\Handler\ErrorHandler;

use Module;
use PrestaShop\Module\PsxMarketingWithGoogle\Config\Config;
use PsxMarketingWithGoogle;
use Raven_Client;

/**
 * Handle Error.
 */
class ErrorHandler
{
    /**
     * @var Raven_Client
     */
    protected $client;

    /**
     * @var ErrorHandler
     */
    private static $instance;

    public function __construct()
    {
        /** @var PsxMarketingWithGoogle */
        $module = Module::getInstanceByName('psxmarketingwithgoogle');

        $this->client = new Raven_Client(
            Config::PSX_MKTG_WITH_GOOGLE_SENTRY_CREDENTIALS,
            [
                'level' => 'warning',
                'tags' => [
                    'php_version' => phpversion(),
                    'psxmarketingwithgoogle_version' => $module->version,
                    'prestashop_version' => _PS_VERSION_,
                    'psxmarketingwithgoogle_is_enabled' => \Module::isEnabled('psxmarketingwithgoogle'),
                    'psxmarketingwithgoogle_is_installed' => \Module::isInstalled('psxmarketingwithgoogle'),
                ],
            ]
        );

        $this->client->install();
    }

    /**
     * @param \Exception $error
     * @param mixed $code
     * @param bool|null $throw
     * @param array|null $data
     *
     * @return void
     *
     * @throws \Exception
     */
    public function handle($error, $code = null, $throw = true, $data = null)
    {
        $this->client->captureException($error, $data);
        if ($code && true === $throw) {
            http_response_code($code);
            throw $error;
        }
    }

    /**
     * @return ErrorHandler
     */
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new ErrorHandler();
        }

        return self::$instance;
    }

    /**
     * @return void
     */
    private function __clone()
    {
    }
}
