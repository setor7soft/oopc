<?php
namespace Setor7\Oopc\Block\Adminhtml\System\Config;

use Magento\Config\Block\System\Config\Form\Field;
use Magento\Framework\Data\Form\Element\AbstractElement;
use Magento\Framework\Component\ComponentRegistrar;
use Magento\Backend\Block\Template\Context;

class Version extends Field
{
    private $_componentRegistrar;

    public function __construct(
        Context $context,
        ComponentRegistrar $componentRegistrar,
        array $data = []
    )
    {
        $this->_componentRegistrar = $componentRegistrar;
        parent::__construct($context, $data);
    }

    protected function _getElementHtml(AbstractElement $element)
    {
        $element->getValue();
        $nameSpace = explode("\\", __NAMESPACE__);
        $moduleName = $nameSpace[0] . '_' . $nameSpace[1];
        $configFile = $this->_componentRegistrar
                ->getPath(ComponentRegistrar::MODULE, $moduleName)
            . DIRECTORY_SEPARATOR . 'etc' . DIRECTORY_SEPARATOR . 'module.xml';
        $xml = new \SimpleXMLElement(file_get_contents($configFile));
        return "<span style='margin-bottom:-8px; display:block;'>" .
        $xml->module[0]
            ->attributes()
            ->setup_version . "</span>";
    }
}
