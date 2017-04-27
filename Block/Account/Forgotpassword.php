<?php

namespace Setor7\Oopc\Block\Account;

use Magento\Customer\Model\Url;
use Magento\Framework\View\Element\Template;

class Forgotpassword extends Template
{

    protected $_customerUrl;

    public function __construct(
        Template\Context $context,
        Url $customerUrl,
        array $data = []
    ) {
        $this->_customerUrl = $customerUrl;
        parent::__construct($context, $data);
    }

    public function getLoginUrl()
    {
        return $this->_customerUrl->getLoginUrl();
    }

    public function getFormActionUrl(){
        return $this->getUrl('customer/account/forgotpasswordpost', ['_secure' => true]);
    }

    public function getPostUrl(){
        return $this->getUrl('onepage/account/forgotpassword', ['_secure' => true]);
    }
}
