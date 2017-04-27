<?php

namespace Setor7\Oopc\Plugin;

use Setor7\Oopc\Helper\Data;
use Magento\Framework\ObjectManagerInterface;

class ConfigPlugin
{
    const ENABLE_OPC = 'setor7_oopc/general/enable_in_frontend';

    protected $_helper;
    protected $_objectManager;

    public function __construct(
        Data $helper,
        ObjectManagerInterface $objectManager
    )
    {
        $this->_helper = $helper;
        $this->_objectManager = $objectManager;
    }


    public function getEnable()
    {
        return $this->_helper->getEnable();
    }


    public function afterSave()
    {
        if(!$this->getEnable()){
            $outputPath = "advanced/modules_disable_output/setor7_oopc";
            $config = $this->_objectManager->create('Magento\Config\Model\ResourceModel\Config');
            $config->saveConfig($outputPath, 1, 'default', 0);
        }else{
            $outputPath = "advanced/modules_disable_output/setor7_oopc";
            $config = $this->_objectManager->create('Magento\Config\Model\ResourceModel\Config');
            $config->saveConfig($outputPath, 0, 'default', 0);
        }
    }
}
